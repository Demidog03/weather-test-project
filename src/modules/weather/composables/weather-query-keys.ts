import type { CityFromCoordinatesResponse } from '../api';

export const WEATHER_QUERY_PREFIX = 'weather' as const;
export const GEOLOCATION_QUERY_PREFIX = 'geolocation' as const;

export const WEATHER_QUERY_KEYS = {
    location: (locationName: string) => [WEATHER_QUERY_PREFIX, 'location', locationName] as const,
};

export const GEOLOCATION_QUERY_KEYS = {
    position: () => [GEOLOCATION_QUERY_PREFIX, 'position'] as const,
    city: (lat?: number, lon?: number) => 
        lat !== undefined && lon !== undefined
            ? [GEOLOCATION_QUERY_PREFIX, 'city', lat, lon] as const
            : [GEOLOCATION_QUERY_PREFIX, 'city'] as const,
};

