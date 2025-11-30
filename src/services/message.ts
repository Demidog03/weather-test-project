import { App } from 'vue';
import { useMessage, MessageApi } from 'naive-ui';

let messageApi: MessageApi | null = null;

export function initMessageService(app: App) {
}

export function setMessageApi(api: MessageApi) {
    messageApi = api;
}

export function getMessageApi(): MessageApi | null {
    return messageApi;
}

export function showError(message: string, duration: number = 5000) {
    if (messageApi) {
        messageApi.error(message, { duration });
    } else {
        console.error('Message API not initialized:', message);
    }
}

export function showSuccess(message: string, duration: number = 3000) {
    if (messageApi) {
        messageApi.success(message, { duration });
    } else {
        console.log('Message API not initialized:', message);
    }
}

export function showWarning(message: string, duration: number = 4000) {
    if (messageApi) {
        messageApi.warning(message, { duration });
    } else {
        console.warn('Message API not initialized:', message);
    }
}

export function showInfo(message: string, duration: number = 3000) {
    if (messageApi) {
        messageApi.info(message, { duration });
    } else {
        console.info('Message API not initialized:', message);
    }
}

