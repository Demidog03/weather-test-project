<template>
  <n-card size="small" class="weather-card">
    <template #header>
      <n-text tag="h4" style="font-size: 16px; margin: 0; font-weight: 600;">
        <n-skeleton :width="100" :height="20" />
      </n-text>
    </template>

    <n-space vertical :size="12">
      <n-space vertical :size="16" style="text-align: center;">
        <n-skeleton :width="80" :height="55" style="margin: 0 auto;" />
        <n-skeleton :width="100" :height="16" style="margin: 0 auto;" />
        <n-skeleton :width="70" :height="18" style="margin: 0 auto;" />
        <n-skeleton :width="120" :height="16" style="margin: 0 auto;" />
      </n-space>

      <n-divider style="margin: 8px 0;" />

      <n-grid :cols="2" :x-gap="8" :y-gap="8">
        <n-grid-item v-for="i in 6" :key="i">
          <n-skeleton :width="80" :height="65" />
        </n-grid-item>
      </n-grid>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
  .weather-card {
    transition: all 0.3s ease;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    overflow: hidden;

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

