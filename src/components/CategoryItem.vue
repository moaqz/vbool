<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  name: string;
  icon: string;
  id: string;
  modelValue: string;
}>();

const isActive = computed(() => props.modelValue === props.id);
</script>

<template>
  <label
    class="transition-colors p-3 rounded-md group flex items-center gap-4"
    :class="{
      'bg-blue-500': isActive,
      'hover:bg-slate-700': !isActive,
    }"
  >
    <input
      type="radio"
      class="hidden"
      @change="$emit('update:modelValue', id)"
      :checked="id === modelValue"
      :value="id"
    />
    <img :src="icon" :alt="name" width="32" height="32" />
    <p class="text-lg font-semibold">{{ name }}</p>
  </label>
</template>
