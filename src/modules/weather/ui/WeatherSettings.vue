<template>
  <n-layout-content style="padding: 24px; max-width: 1000px; margin: 0 auto;">
    <n-space vertical :size="32">
      <n-space align="center" :size="24">
        <n-button
            text
            type="info"
            size="large"
            @click="goToList"
        >
          <template #icon>
            <n-icon>
              <ArrowBack />
            </n-icon>
          </template>
          Back to list
        </n-button>
        <n-h2 style="margin-bottom: 0">
          <n-text type="info">
            Weather Location Settings
          </n-text>
        </n-h2>
      </n-space>

      <n-card>
        <template #header>
          <n-space justify="space-between" align="center">
            <n-text strong style="font-size: 18px;">My Locations</n-text>
            <n-text depth="3">{{ selectedWeatherLocations.length }} location{{ selectedWeatherLocations.length !== 1 ? 's' : '' }}</n-text>
          </n-space>
        </template>

        <n-empty v-if="selectedWeatherLocations.length === 0" description="No locations added yet">
          <template #extra>
            <n-text depth="3">Add your first location below to get started</n-text>
          </template>
        </n-empty>

        <draggable
          v-else
          v-model="orderedLocations"
          :animation="300"
          handle=".drag-handle"
          item-key="id"
          class="locations-list"
          ghost-class="ghost-item"
          chosen-class="chosen-item"
          drag-class="drag-item"
          :force-fallback="true"
          :fallback-tolerance="0"
          fallback-class="drag-item"
        >
          <template #item="{ element }">
            <n-card class="location-item">
              <n-space justify="space-between" align="center">
                <n-space align="center" :size="12">
                  <n-icon 
                    :component="MenuOutline" 
                    :size="24"
                    class="drag-handle"
                    style="cursor: move; color: #86909c;"
                  />
                  <n-text strong style="font-size: 16px;">{{ element.name }}</n-text>
                </n-space>
                <n-button 
                  text 
                  type="error" 
                  size="small"
                  @click="removeLocation(element.id)"
                >
                  <template #icon>
                    <n-icon>
                      <Trash />
                    </n-icon>
                  </template>
                </n-button>
              </n-space>
            </n-card>
          </template>
        </draggable>
      </n-card>

      <n-card>
        <template #header>
          <n-h3 style="margin: 0;">
            <n-text type="success">
              Add New Location
            </n-text>
          </n-h3>
        </template>

        <n-space vertical :size="16">
          <n-text depth="3">
            Enter a city name to add it to your weather locations
          </n-text>
          
          <n-input-group>
            <n-input 
              v-model:value="locationValue" 
              placeholder="Enter city name (e.g., New York, London, Tokyo)" 
              size="large"
              @keyup.enter="addLocation"
              :disabled="validating"
            />
            <n-button 
              type="primary" 
              size="large"
              strong
              @click="addLocation" 
              :loading="validating"
              :disabled="!locationValue.trim()"
              class="add-location-btn"
            >
              <template #icon>
                <n-icon>
                  <Add />
                </n-icon>
              </template>
              <span class="add-location-text">Add Location</span>
            </n-button>
          </n-input-group>

          <n-alert v-if="locationValue && weatherStore.checkIfWeatherLocationExists(locationValue.trim())" type="warning">
            This location is already in your list
          </n-alert>
        </n-space>
      </n-card>
    </n-space>
  </n-layout-content>
</template>

<script setup lang="ts">
  import { ArrowBack, Trash, Add, MenuOutline} from '@vicons/ionicons5';
  import { useWeatherStore } from '@/modules/weather/store';
  import { getWeatherByLocation } from '@/modules/weather/api';
  import { computed, ref } from 'vue';
  import {useRouter} from "vue-router";
  import draggable from 'vuedraggable';

  const router = useRouter();
  const locationValue = ref('');
  const validating = ref(false);
  const weatherStore = useWeatherStore();
  const selectedWeatherLocations = computed(() => weatherStore.selectedWeatherLocations);
  
  const orderedLocations = computed({
    get: () => weatherStore.selectedWeatherLocations,
    set: (newOrder) => {
      weatherStore.reorderLocations(newOrder);
    }
  });

  async function addLocation() {
    if (!locationValue.value.trim()) return;

    const locationName = locationValue.value.trim();

    if (weatherStore.checkIfWeatherLocationExists(locationName)) {
      return;
    }

    validating.value = true;
    try {
      await getWeatherByLocation(locationName);
      weatherStore.addWeatherLocation(locationName);
      locationValue.value = '';
    } catch {
    } finally {
      validating.value = false;
    }
  }

  function removeLocation(locationId: string) {
    weatherStore.removeWeatherLocation(locationId);
  }

  function goToList() {
    router.push('/');
  }
</script>

<style scoped lang="scss">
  .add-location-btn {
    @media (max-width: 768px) {
      .add-location-text {
        display: none;
      }
      :global(.n-button__icon) {
        margin: 0 !important;
      }
    }
  }

  .locations-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow: hidden;
    contain: layout;
    padding-bottom: 4px;
    
    :deep(.sortable-ghost) {
      opacity: 0.4;
    }
    
    :deep(.sortable-drag) {
      opacity: 0.8;
    }
  }

  .location-item {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
    will-change: transform, opacity;
    animation: cardAppear 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    contain: layout style paint;
    
    @for $i from 1 through 20 {
      &:nth-child(#{$i}) {
        animation-delay: #{$i * 0.03}s;
      }
    }
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }

  .locations-list :deep(.ghost-item) {
    opacity: 0.3 !important;
    border: 2px dashed rgba(0, 0, 0, 0.2) !important;
    transform: scale(0.95) !important;
    border-radius: 8px;
    background: transparent !important;
    visibility: visible !important;
    display: block !important;
    
    :deep(.n-card-body) {
      visibility: hidden;
    }
  }

  .locations-list :deep(.chosen-item:not(.ghost-item)) {
    opacity: 0 !important;
    visibility: hidden !important;
  }

  .drag-handle {
    cursor: grab;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    pointer-events: auto;
    padding: 8px;
    margin: -8px;
    min-width: 40px;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 6px;
    
    &:hover {
      background-color: rgba(102, 126, 234, 0.1);
      color: #667eea !important;
      transform: scale(1.1);
    }
    
    &:active {
      cursor: grabbing;
      transform: scale(0.95);
      background-color: rgba(102, 126, 234, 0.2);
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

<style>
.drag-item,
.sortable-fallback,
body > .drag-item,
body > .sortable-fallback,
.chosen-item.drag-item,
.chosen-item.sortable-fallback {
  opacity: 0 !important;
  visibility: hidden !important;
  display: none !important;
}
</style>
