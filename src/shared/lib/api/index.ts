import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { showError, showWarning } from '@/services/message';

const apiClient: AxiosInstance = axios.create({
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response) {
            const status = error.response.status;
            const data = error.response.data as any;
            
            let errorMessage = 'An error occurred';
            
            switch (status) {
                case 400:
                    errorMessage = data?.message || data?.error || 'Bad request. Please check your input.';
                    break;
                case 401:
                    errorMessage = 'Unauthorized. Please check your credentials.';
                    break;
                case 403:
                    errorMessage = 'Access forbidden. You don\'t have permission to access this resource.';
                    break;
                case 404:
                    errorMessage = data?.message || `Location "${error.config?.url?.split('/').pop() || 'unknown'}" not found.`;
                    break;
                case 422:
                    errorMessage = data?.message || data?.error || 'Validation error. Please check your input.';
                    break;
                case 429:
                    errorMessage = 'Too many requests. Please try again later.';
                    showWarning(errorMessage);
                    return Promise.reject(error);
                case 500:
                    errorMessage = 'Internal server error. Please try again later.';
                    break;
                case 502:
                case 503:
                case 504:
                    errorMessage = 'Service temporarily unavailable. Please try again later.';
                    break;
                default:
                    errorMessage = data?.message || data?.error || `Error ${status}: ${error.response.statusText}`;
            }
            
            showError(errorMessage);
        } else if (error.request) {
            const errorMessage = 'Network error. Please check your internet connection.';
            showError(errorMessage);
        } else {
            const errorMessage = error.message || 'An unexpected error occurred';
            showError(errorMessage);
        }
        
        return Promise.reject(error);
    }
);

export default apiClient;

