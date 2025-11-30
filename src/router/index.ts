import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import WeatherList from '@/modules/weather/ui/WeatherList.vue';
import WeatherSettings from "@/modules/weather/ui/WeatherSettings.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'WeatherList',
        component: WeatherList,
    },
    {
        path: '/weather/settings',
        name: 'WeatherSettings',
        component: WeatherSettings,
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
