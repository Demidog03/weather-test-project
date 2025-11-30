import { v4 } from 'uuid';
import { defineStore } from 'pinia';
import { StorageService } from '@/shared/lib/storage';

interface SelectedWeatherLocation {
    id: string;
    name: string;
}

const STORAGE_KEY = 'selectedWeatherLocations';
const GEOLOCATION_REQUESTED_KEY = 'geolocationRequested';

export const useWeatherStore = defineStore('weather', {
    state: () => {
        const savedLocations = StorageService.getItem<SelectedWeatherLocation[]>(STORAGE_KEY);
        return {
            selectedWeatherLocations: savedLocations || [] as SelectedWeatherLocation[],
        };
    },
    actions: {
        addWeatherLocation(locationName: string, atBeginning = false) {
            if (this.checkIfWeatherLocationExists(locationName)) {
                return;
            }
            const newLocation = {
                id: v4(),
                name: locationName,
            };
            if (atBeginning) {
                this.selectedWeatherLocations.unshift(newLocation);
            } else {
                this.selectedWeatherLocations.push(newLocation);
            }
            this.saveToStorage();
        },
        removeWeatherLocation(locationId: string) {
            this.selectedWeatherLocations = this.selectedWeatherLocations.filter(l => l.id !== locationId);
            this.saveToStorage();
        },
        saveToStorage() {
            StorageService.setItem(STORAGE_KEY, this.selectedWeatherLocations);
        },
        checkIfWeatherLocationExists(locationName: string) {
            return this.selectedWeatherLocations.some(l => l.name === locationName);
        },
        reorderLocations(newOrder: SelectedWeatherLocation[]) {
            this.selectedWeatherLocations = newOrder;
            this.saveToStorage();
        },
        hasRequestedGeolocation(): boolean {
            return StorageService.getItem<boolean>(GEOLOCATION_REQUESTED_KEY) || false;
        },
        setGeolocationRequested() {
            StorageService.setItem(GEOLOCATION_REQUESTED_KEY, true);
        },
    }
});
