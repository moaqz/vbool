<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps<{
  correctAnswers: number;
  totalQuestions: number;
}>();

const incorrectAnswers = computed(() => {
  return props.totalQuestions - props.correctAnswers;
});
</script>

<template>
  <div
    class="flex flex-col gap-5 w-full max-w-md mx-auto bg-dark shadow-md border border-gray-800 rounded-md px-4 py-6"
  >
    <h2 class="text-3xl font-medium text-gray-200 text-center">
      Quiz Finished!
    </h2>

    <div class="flex flex-col gap-4 text-gray-300">
      <div class="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span class="text-lg font-semibold">
          Correct Answers {{ correctAnswers }}
        </span>
      </div>

      <div class="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <span class="text-lg font-semibold">
          Incorrect Answers {{ incorrectAnswers }}
        </span>
      </div>
    </div>

    <RouterLink
      to="/"
      class="px-4 py-2 inline-flex items-center justify-center gap-2 bg-white font-semibold text-black rounded-md transition-all hover:bg-white/90"
    >
      Back to menu
    </RouterLink>
  </div>
</template>
