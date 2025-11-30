import { ref, watch, computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { getCityFromCoordinates } from '../api';
import { useWeatherStore } from '../store';
import { getWeatherByLocation } from '../api';
import { GEOLOCATION_QUERY_KEYS } from './weather-query-keys';

interface GeolocationPosition {
    latitude: number;
    longitude: number;
}

function getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                reject(error);
            }
        );
    });
}

export function useGeolocation() {
    const weatherStore = useWeatherStore();
    const positionRef = ref<GeolocationPosition | null>(null);
    const shouldRequest = ref(false);

    const canRequestPosition = computed(() => 
        shouldRequest.value && 
        !!navigator.geolocation && 
        !weatherStore.hasRequestedGeolocation()
    );

    const positionQuery = useQuery({
        queryKey: GEOLOCATION_QUERY_KEYS.position(),
        queryFn: async () => {
            const pos = await getCurrentPosition();
            positionRef.value = pos;
            weatherStore.setGeolocationRequested();
            return pos;
        },
        enabled: canRequestPosition,
        retry: false,
    });

    const canRequestCity = computed(() => 
        !!positionRef.value && 
        positionQuery.isSuccess.value
    );

    const cityQuery = useQuery({
        queryKey: computed(() => GEOLOCATION_QUERY_KEYS.city(
            positionRef.value?.latitude,
            positionRef.value?.longitude
        )),
        queryFn: async () => {
            if (!positionRef.value) return null;
            return await getCityFromCoordinates(
                positionRef.value.latitude,
                positionRef.value.longitude
            );
        },
        enabled: canRequestCity,
        retry: false,
    });

    watch(cityQuery.data, async (cityData) => {
        if (cityData?.location && !weatherStore.checkIfWeatherLocationExists(cityData.location)) {
            try {
                await getWeatherByLocation(cityData.location);
                weatherStore.addWeatherLocation(cityData.location, true);
            } catch {
            }
        }
    });

    async function requestUserLocation(): Promise<void> {
        if (weatherStore.hasRequestedGeolocation()) {
            return;
        }

        if (!navigator.geolocation) {
            return;
        }

        shouldRequest.value = true;
    }

    return {
        isRequesting: computed(() => positionQuery.isFetching.value || cityQuery.isFetching.value),
        error: computed(() => positionQuery.error.value || cityQuery.error.value),
        requestUserLocation,
        cityData: cityQuery.data,
    };
}

