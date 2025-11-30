import { useQuery } from '@tanstack/vue-query';
import { getWeatherByLocation, WeatherResponse } from '../api';
import { WEATHER_QUERY_KEYS } from './weather-query-keys';

export function useWeatherQuery(locationName: string, enabled = true) {
    return useQuery<WeatherResponse>({
        queryKey: WEATHER_QUERY_KEYS.location(locationName),
        queryFn: () => getWeatherByLocation(locationName),
        enabled: enabled && !!locationName,
        staleTime: 5 * 60 * 1000,
    });
}

