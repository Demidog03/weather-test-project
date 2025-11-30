<template>
  <WeatherCardSkeleton v-if="isLoading" />
  <WeatherCard 
    v-else-if="weatherData"
    :location-name="location.name"
    :weather="weatherData"
  />
</template>

<script setup lang="ts">
  import { useWeatherQuery } from '../composables/useWeatherQueries';
  import WeatherCard from './WeatherCard.vue';
  import WeatherCardSkeleton from './WeatherCardSkeleton.vue';

  interface SelectedWeatherLocation {
    id: string;
    name: string;
  }

  interface Props {
    location: SelectedWeatherLocation;
  }

  const props = defineProps<Props>();

  const { data: weatherData, isLoading } = useWeatherQuery(props.location.name);
</script>

