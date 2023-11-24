<script setup lang="ts">
import NewGameModal from '../components/NewGameModal.vue';
</script>

<template>
  <div
    class="flex flex-col gap-4 items-center justify-center min-h-screen max-w-sm mx-auto px-2"
  >
    <div class="space-y-1">
      <h1 class="text-8xl font-medium text-gray-200">VBool</h1>
      <p class="text-xl text-gray-300">Ready to test your knowledge?</p>
    </div>

    <NewGameModal />
  </div>
</template>
