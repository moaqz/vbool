<script setup lang="ts">
import { RouterLink } from 'vue-router';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.vue';
import RestartIcon from '../icons/RestartIcon.vue';

const emit = defineEmits(['restart-quiz']);
</script>

<template>
  <header class="py-3 px-4 flex items-center gap-2">
    <RouterLink
      to="/"
      title="Go Back"
      class="inline-block p-1 rounded-md bg-green-700 transition-colors hover:bg-green-800"
    >
      <ArrowLeftIcon />
    </RouterLink>

    <button
      class="inline-block p-1 rounded-md bg-green-700 transition-colors hover:bg-green-800 rotate-180"
      aria-label="Restart Quiz"
      title="Restart Quiz"
      @click="emit('restart-quiz')"
    >
      <RestartIcon />
    </button>
  </header>
</template>
