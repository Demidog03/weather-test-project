<script setup lang="ts">
import { onMounted } from 'vue';
import { useMessage } from 'naive-ui';
import { setMessageApi } from '@/services/message';

onMounted(() => {
  const messageApi = useMessage();
  setMessageApi(messageApi);
});
</script>

<template>
  <slot />
</template>

