<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useQuestions, QuestionAnswer } from '../composables/useQuestions';
import Question from '../components/Question.vue';
import QuizHeader from '../components/QuizHeader.vue';
import QuizResult from '../components/QuizResult.vue';
import { API_BASE_URL } from '../lib/constants';

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
const loading = ref(true);

async function getQuizQuestions() {
  const queryParams = router.query;
  const url = `${API_BASE_URL}?amount=${queryParams.amount}&category=${queryParams.category}&type=boolean`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    setQuestions(data.results);
  } catch (error) {
    // TODO:
    console.error('Error fetching questions', error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => getQuizQuestions());
</script>

<template>
  <div class="grid grid-rows-[auto_1fr] items-center h-screen">
    <p v-if="loading" class="text-center font-medium text-lg">Loading...</p>

    <template v-else-if="!loading && questions && questions.length > 0">
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
        v-if="!quizCompleted"
      />

      <QuizResult
        :correctAnswers="correctCount"
        :total-questions="questions.length"
        v-else
      />
    </template>
  </div>
</template>
