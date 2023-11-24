<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { QUIZ_CATEGORIES } from '../lib/constants';
import Button from './Button.vue';
import CategoryItem from './CategoryItem.vue';

const router = useRouter();
const dialogRef = ref<HTMLDialogElement>();
const amount = ref('4');
const category = ref<string>(QUIZ_CATEGORIES[0].id);

function handleSubmit() {
  router.push({
    name: 'play',
    query: {
      amount: amount.value,
      category: category.value,
    },
  });
}
</script>

<template>
  <Button wfull type="button" @click="dialogRef?.showModal()">Play</Button>

  <dialog
    ref="dialogRef"
    class="w-full max-w-md backdrop:bg-black/30 bg-dark text-white px-4 py-5 rounded-md"
  >
    <form class="space-y-4" @submit.prevent="handleSubmit">
      <div class="flex gap-3">
        <label class="flex-1 font-semibold text-lg text-gray-200">
          Questions
          <input
            type="range"
            max="10"
            min="4"
            v-model="amount"
            class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-accent bg-gray-200/10"
          />
        </label>
        <span class="self-end font-semibold text-lg text-gray-400">{{
          amount
        }}</span>
      </div>

      <fieldset>
        <legend class="font-semibold text-lg mb-2 text-gray-200">
          Categories
        </legend>

        <div class="grid grid-cols-2 gap-2">
          <CategoryItem
            v-for="item in QUIZ_CATEGORIES"
            :id="item.id"
            :key="item.id"
            :name="item.name"
            v-model="category"
          />
        </div>
      </fieldset>

      <Button type="submit" wfull>New Game</Button>
    </form>
  </dialog>
</template>
