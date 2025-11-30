import apiClient from '@/shared/lib/api';

export interface WeatherResponse {
    location: string;
    temperature: number;
    feelsLike: number;
    condition: string;
    description: string;
    humidity: number;
    pressure: number;
    dewPoint: number;
    visibility: number;
    windSpeed: number;
    windDirection: number;
    windDirectionText: string;
}

export async function getWeatherByLocation(location: string): Promise<WeatherResponse> {
    const response = await apiClient.get<WeatherResponse>(`/weather/location/${location}`, {
        baseURL: process.env.API_URL || 'http://localhost:3000'
    });
    return response.data;
}

export interface CityFromCoordinatesResponse {
    location: string;
    country: string;
    coordinates: {
        lat: number;
        lon: number;
    };
}

export async function getCityFromCoordinates(lat: number, lon: number): Promise<CityFromCoordinatesResponse> {
    const response = await apiClient.get<CityFromCoordinatesResponse>(`/weather/city`, {
        baseURL: process.env.API_URL || 'http://localhost:3000',
        params: {
            lat,
            lon
        }
    });
    return response.data;
}

