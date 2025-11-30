<template>
  <n-card 
    size="small" 
    :class="['weather-card']"
    hoverable
  >
    <template #header>
      <n-space justify="space-between" align="center">
        <n-text tag="h4" style="font-size: 16px; margin: 0; font-weight: 600;">{{ locationName }}</n-text>
        <n-icon 
          v-if="weather" 
          :component="weatherIcon" 
          :size="24"
        />
      </n-space>
    </template>

    <n-space vertical :size="12">
      <n-space vertical :size="8" style="text-align: center;">
        <n-space align="center" justify="center" :size="8">
          <n-icon 
            :component="weatherIcon" 
            :size="48"
          />
          <n-statistic 
            :value="weather.temperature" 
            suffix="°C" 
            :value-style="{ fontSize: '36px', fontWeight: '700' }"
          />
        </n-space>
        <n-text depth="3" style="font-size: 12px;">Feels like: {{ weather.feelsLike }}°C</n-text>
        <n-text strong style="font-size: 15px; text-transform: capitalize;">{{ weather.condition }}</n-text>
        <n-text depth="3" style="text-transform: capitalize; font-size: 12px; ">{{ weather.description }}</n-text>
      </n-space>

      <n-divider style="margin: 12px 0; background: rgba(0,0,0,0.06);" />

      <n-grid :cols="2" :x-gap="10" :y-gap="10">
        <n-grid-item>
          <n-space align="center" :size="6">
            <n-icon :component="WaterOutline" :size="18" />
            <n-statistic 
              label="Humidity" 
              :value="weather.humidity" 
              suffix="%" 
              size="small"
            />
          </n-space>
        </n-grid-item>
        <n-grid-item>
          <n-space align="center" :size="6">
            <n-icon :component="SpeedometerOutline" :size="18" />
            <n-statistic 
              label="Pressure" 
              :value="weather.pressure" 
              suffix="hPa" 
              size="small"
            />
          </n-space>
        </n-grid-item>
        <n-grid-item>
          <n-space align="center" :size="6">
            <n-icon :component="ThermometerOutline" :size="18" />
            <n-statistic 
              label="Dew Point" 
              :value="weather.dewPoint" 
              suffix="°C" 
              size="small"
            />
          </n-space>
        </n-grid-item>
        <n-grid-item>
          <n-space align="center" :size="6">
            <n-icon :component="EyeOutline" :size="18" />
            <n-statistic 
              label="Visibility" 
              :value="weather.visibility" 
              suffix="km" 
              size="small"
            />
          </n-space>
        </n-grid-item>
        <n-grid-item>
          <n-space align="center" :size="6">
            <n-icon :component="LeafOutline" :size="18" />
            <n-statistic 
              label="Wind Speed" 
              :value="weather.windSpeed" 
              suffix="m/s" 
              size="small"
            />
          </n-space>
        </n-grid-item>
        <n-grid-item>
          <n-space align="center" :size="6">
            <n-icon :component="CompassOutline" :size="18" />
            <n-statistic 
              label="Wind Direction" 
              :value="weather.windDirectionText"
              :suffix="`(${weather.windDirection}°)`"
              size="small"
            />
          </n-space>
        </n-grid-item>
      </n-grid>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { WeatherResponse } from '../api';
import {
  SunnyOutline,
  CloudyOutline,
  RainyOutline,
  SnowOutline,
  ThunderstormOutline,
  PartlySunnyOutline,
  WaterOutline,
  SpeedometerOutline,
  ThermometerOutline,
  EyeOutline,
  LeafOutline,
  CompassOutline
} from '@vicons/ionicons5';

  interface Props {
    locationName: string;
    weather: WeatherResponse;
  }

  const props = defineProps<Props>();

  function getWeatherIcon(condition: string) {
    const cond = condition.toLowerCase();
    if (cond.includes('clear')) return SunnyOutline;
    if (cond.includes('cloud')) return CloudyOutline;
    if (cond.includes('rain') || cond.includes('drizzle')) return RainyOutline;
    if (cond.includes('snow')) return SnowOutline;
    if (cond.includes('thunder') || cond.includes('storm')) return ThunderstormOutline;
    if (cond.includes('partly') || cond.includes('few')) return PartlySunnyOutline;
    return SunnyOutline;
  }

  const weatherIcon = computed(() => getWeatherIcon(props.weather.condition));
  </script>

  <style scoped lang="scss">
  .weather-card {
    transition: all 0.3s ease;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    overflow: hidden;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }

    :deep(.n-card-header) {
      padding: 16px 20px 12px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      background: rgba(255, 255, 255, 0.5);
    }

    :deep(.n-card__content) {
      padding: 16px 20px 20px;
    }
  }
</style>

