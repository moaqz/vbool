<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { QUIZ_CATEGORIES } from '../lib/constants';
import Button from './Button.vue';
import CategoryItem from './CategoryItem.vue';

const router = useRouter();
const dialogRef = ref<HTMLDialogElement>();
const category = ref<string>(QUIZ_CATEGORIES[0].name);

function handleSubmit() {
  router.push({
    name: 'play',
    query: {
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
      <fieldset>
        <legend class="font-semibold text-lg mb-2 text-gray-200">
          Categories
        </legend>

        <div class="grid grid-cols-2 gap-2">
          <CategoryItem
            v-for="item in QUIZ_CATEGORIES"
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
