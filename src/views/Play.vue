<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useQuestions, QuestionAnswer } from '../composables/useQuestions';
import Question from '../components/Question.vue';
import QuizHeader from '../components/QuizHeader.vue';
import QuizResult from '../components/QuizResult.vue';
import Spinner from '../components/Spinner.vue';
import { API_BASE_URL, QUIZ_CATEGORIES, QUIZ_AMOUNT } from '../lib/constants';

const {
  currentQuestion,
  questions,
  quizCompleted,
  correctCount,
  setQuestions,
  selectAnswer,
  resetQuiz,
} = useQuestions();

const router = useRoute();
const status = ref<'loading' | 'error' | 'success'>('loading');

async function getQuizQuestions() {
  const category = Array.isArray(router.query.category)
    ? router.query.category[0]
    : router.query.category;

  let categoryId: number;

  if (!category || !QUIZ_CATEGORIES.some((c) => c.name === category)) {
    categoryId = QUIZ_CATEGORIES[0].id;
  } else {
    categoryId = QUIZ_CATEGORIES.find((c) => c.name == category)!.id;
  }

  const url = `${API_BASE_URL}?amount=${QUIZ_AMOUNT}&category=${categoryId}&type=boolean`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (Array.isArray(data.results) && data.results.length > 0) {
      setQuestions(data.results);
      status.value = 'success';
      return;
    }

    status.value = 'error';
  } catch (error) {
    status.value = 'error';
  }
}

onMounted(() => getQuizQuestions());
</script>

<template>
  <div
    v-if="status == 'loading'"
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  >
    <Spinner class="text-center font-medium text-lg" />
  </div>

  <div
    v-else-if="status == 'success'"
    class="grid grid-rows-[auto_1fr] items-center h-screen"
  >
    <QuizHeader @restart-quiz="() => resetQuiz()" />

    <Question
      :category="currentQuestion.category"
      :correct_answer="currentQuestion.correct_answer"
      :difficulty="currentQuestion.difficulty"
      :incorrect_answers="currentQuestion.incorrect_answers"
      :type="currentQuestion.type"
      :selected_answer="currentQuestion.selected_answer"
      :question="currentQuestion.question"
      @select-question="(answer: QuestionAnswer) => selectAnswer(answer)"
      v-if="currentQuestion && !quizCompleted"
    />

    <QuizResult
      :correctAnswers="correctCount"
      :total-questions="questions.length"
      v-else
    />
  </div>

  <div
    class="h-screen flex flex-col items-center justify-center gap-4 px-2 max-w-xl mx-auto"
    v-else
  >
    <h1
      data-cy="error-message"
      class="text-4xl font-medium text-gray-200 text-balance text-center"
    >
      Ooops! Something went wrong. Please try again later
    </h1>

    <RouterLink
      to="/"
      data-cy="back-to-menu-link"
      class="px-4 py-2 inline-flex items-center justify-center gap-2 bg-white font-semibold text-black rounded-md transition-all hover:bg-white/90"
    >
      Back to menu
    </RouterLink>
  </div>
</template>
