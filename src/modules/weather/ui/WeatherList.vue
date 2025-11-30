<template>
  <n-layout-content style="padding: 24px; max-width: 1200px; margin: 0 auto;">
    <n-space style="margin-bottom: 20px;" align="center" justify="space-between" :size="20">
      <n-h2 style="margin-bottom: 0;">
        <n-text type="info">
          Weather List
        </n-text>
      </n-h2>
      <n-button
          text
          type="info"
          size="large"
          @click="goToSettings"
      >
        <template #icon>
          <n-icon>
            <Settings />
          </n-icon>
        </template>
        Settings
      </n-button>
    </n-space>
      <n-space vertical :size="20">
        <n-empty v-if="selectedWeatherLocations.length === 0" description="No locations selected">
          <template #extra>
            <n-text depth="3">Add locations in Weather Settings</n-text>
          </template>
        </n-empty>

        <n-grid v-else cols="1 s:2 m:3" responsive="screen" :x-gap="12" :y-gap="12" class="weather-grid">
          <n-grid-item v-for="location in selectedWeatherLocations" :key="location.id" class="weather-card-item">
            <WeatherCardItem :location="location" />
          </n-grid-item>
        </n-grid>
      </n-space>
  </n-layout-content>
</template>

<script setup lang="ts">
import {computed, onMounted, watch} from 'vue';
  import {useRouter} from 'vue-router';
  import {useWeatherStore} from '../store';
  import {useGeolocation} from '../composables/useGeolocation';
  import WeatherCardItem from './WeatherCardItem.vue';
  import {Settings} from "@vicons/ionicons5";

  const router = useRouter();
  const weatherStore = useWeatherStore();
  const { requestUserLocation } = useGeolocation();

  const selectedWeatherLocations = computed(() => weatherStore.selectedWeatherLocations);

  function goToSettings() {
    router.push('/weather/settings');
  }

  onMounted(() => {
    requestUserLocation();
  });
</script>

<style scoped lang="scss">
  :deep(.n-layout-content) {
    overflow-x: hidden;
  }

  .weather-grid {
    overflow: hidden;
    contain: layout;
    
    .weather-card-item {
      animation: cardAppear 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
      contain: layout style paint;
      
      @for $i from 1 through 20 {
        &:nth-child(#{$i}) {
          animation-delay: #{$i * 0.03}s;
        }
      }
    }
  }

  @keyframes cardAppear {
    0% {
      opacity: 0;
      transform: translateY(15px) scale(0.95);
      filter: blur(2px);
    }
    50% {
      transform: translateY(-1px) scale(1.01);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }
</style>
