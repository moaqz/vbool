import { computed, ref } from 'vue';

export enum QuestionAnswer {
  Yes = 'True',
  No = 'False',
}

export type Question = {
  type: 'boolean';
  difficulty: 'medium' | 'easy' | 'hard';
  category: string;
  question: string;
  correct_answer: QuestionAnswer;
  incorrect_answers: string[];
  selected_answer: QuestionAnswer | null;
};

export function useQuestions() {
  const questions = ref<Question[]>([]);
  const currentIndex = ref(0);
  const quizCompleted = ref(false);
  const correctCount = ref(0);

  const currentQuestion = computed(() => {
    return questions.value[currentIndex.value];
  });

  const score = computed(() => {
    return correctCount.value * 100;
  });

  function setQuestions(data: Question[]) {
    questions.value = data.map((question) => ({
      ...question,
      selected_answer: null,
    }));
  }

  function getNextQuestion() {
    const totalQuestions = questions.value.length - 1;

    if (currentIndex.value < totalQuestions) {
      currentIndex.value++;
      return;
    }

    quizCompleted.value = true;
  }

  function selectAnswer(selectedAnswer: QuestionAnswer) {
    const correctAnswer = currentQuestion.value.correct_answer;
    currentQuestion.value.selected_answer = selectedAnswer;

    if (correctAnswer === selectedAnswer) {
      correctCount.value++;
    }

    setTimeout(() => {
      getNextQuestion();
    }, 1000);
  }

  function resetQuiz() {
    currentIndex.value = 0;
    correctCount.value = 0;
    quizCompleted.value = false;
    questions.value = questions.value.map((question) => ({
      ...question,
      selected_answer: null,
    }));
  }

  return {
    questions,
    currentQuestion,
    quizCompleted,
    score,
    setQuestions,
    getNextQuestion,
    selectAnswer,
    resetQuiz,
  };
}
