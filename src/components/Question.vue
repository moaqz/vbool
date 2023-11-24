<script setup lang="ts">
import { type Question, QuestionAnswer } from '../composables/useQuestions';

defineProps<Question>();
const emit = defineEmits(['select-question']);
</script>

<template>
  <div class="max-w-2xl mx-auto px-2">
    <p
      v-html="question"
      class="rounded-md h-32 flex justify-center items-center bg-blue-500 px-5 py-6 text-white text-xl font-semibold mb-3"
    ></p>

    <ul class="columns-2">
      <li
        class="rounded-md text-lg font-medium shadow-md bg-blue-500 text-center"
        :class="{
          'bg-green-600': selected_answer === QuestionAnswer.Yes,
        }"
      >
        <button
          class="w-full p-4"
          @click="emit('select-question', QuestionAnswer.Yes)"
          :disabled="selected_answer != null"
        >
          {{ QuestionAnswer.Yes }}
        </button>
      </li>
      <li
        class="rounded-md text-lg font-medium shadow-md bg-blue-500 text-center"
        :class="{
          'bg-red-600': selected_answer === QuestionAnswer.No,
        }"
      >
        <button
          class="w-full p-4"
          @click="emit('select-question', QuestionAnswer.No)"
          :disabled="selected_answer != null"
        >
          {{ QuestionAnswer.No }}
        </button>
      </li>
    </ul>
  </div>
</template>
