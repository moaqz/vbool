<script setup lang="ts">
import { computed } from 'vue';
import { type Question, QuestionAnswer } from '../composables/useQuestions';

const props = defineProps<Question>();
const emit = defineEmits(['select-question']);

const isButtonDisabled = computed(() => {
  return props.selected_answer !== null;
});
</script>

<template>
  <div class="flex flex-col w-full gap-3 max-w-2xl mx-auto px-2">
    <p
      v-html="question"
      class="text-xl text-center font-semibold p-6 shadow-md bg-dark border rounded-md border-gray-800 break-words"
      data-cy="quiz-question"
    />

    <ul class="grid gap-4 sm:grid-cols-2">
      <li
        class="rounded-md text-lg font-medium shadow-md bg-dark border border-gray-800 text-center"
        :class="{
          '!bg-green-600 animate-rotation':
            selected_answer === QuestionAnswer.Yes &&
            selected_answer === correct_answer,
          '!bg-red-600 animate-vibrate':
            selected_answer === QuestionAnswer.Yes &&
            selected_answer !== correct_answer,
        }"
      >
        <button
          class="w-full p-4"
          @click="emit('select-question', QuestionAnswer.Yes)"
          :disabled="isButtonDisabled"
          data-cy="true-button"
        >
          {{ QuestionAnswer.Yes }}
        </button>
      </li>
      <li
        class="rounded-md text-lg font-medium shadow-md bg-dark border border-gray-800 text-center"
        :class="{
          '!bg-green-600 animate-rotation':
            selected_answer === QuestionAnswer.No &&
            selected_answer === correct_answer,
          '!bg-red-600 animate-vibrate':
            selected_answer === QuestionAnswer.No &&
            selected_answer !== correct_answer,
        }"
      >
        <button
          class="w-full p-4"
          @click="emit('select-question', QuestionAnswer.No)"
          :disabled="isButtonDisabled"
          data-cy="false-button"
        >
          {{ QuestionAnswer.No }}
        </button>
      </li>
    </ul>
  </div>
</template>
