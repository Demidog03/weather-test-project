<template>
  <NMessageProvider>
    <MessageProviderSetup>
      <div class="app">
        <header class="app__header">
          <n-h1>
            <n-text>
              Weather App
            </n-text>
          </n-h1>
        </header>
        <main class="app__main">
          <RouterView />
        </main>
      </div>
    </MessageProviderSetup>
  </NMessageProvider>
</template>

<script setup lang="ts">
import {NMessageProvider, NText} from 'naive-ui';
import MessageProviderSetup from '@/shared/ui/MessageProviderSetup.vue';
</script>

<style scoped lang="scss">
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__header {
    padding: 1rem 2rem;
    border-bottom: 1px solid #e5e5e5;
  }

  &__main {
    flex: 1;
    padding: 8px;
  }
}
</style>
