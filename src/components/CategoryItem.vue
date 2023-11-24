<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  name: string;
  id: string;
  modelValue: string;
}>();

const isActive = computed(() => props.modelValue === props.id);
</script>

<template>
  <label
    class="transition-colors p-3 rounded-md group flex items-center gap-4"
    :class="{
      'bg-gray-200/10 text-accent': isActive,
      'hover:bg-gray-200/10 text-gray-400': !isActive,
    }"
  >
    <input
      type="radio"
      class="hidden"
      @change="$emit('update:modelValue', id)"
      :checked="id === modelValue"
      :value="id"
    />
    <p class="text-lg font-semibold">{{ name }}</p>
  </label>
</template>
