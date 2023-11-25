<script setup lang="ts">
import { RouterLink } from 'vue-router';
import RestartIcon from '../icons/RestartIcon.vue';
import Button from './Button.vue';

const emit = defineEmits(['restart-quiz']);
</script>

<template>
  <header class="py-3 px-4 flex justify-between items-center">
    <RouterLink to="/">
      <h1 class="text-3xl font-semibold">VBool</h1>
    </RouterLink>

    <Button
      class="inline-block p-1 rounded-md bg-green-700 transition-colors hover:bg-green-800"
      @click="emit('restart-quiz')"
      data-cy="restart-button"
    >
      <RestartIcon /> Restart Game
    </Button>
  </header>
</template>
