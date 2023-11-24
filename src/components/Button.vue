<script setup lang="ts">
type ButtonProps = {
  type?: 'button' | 'submit';
  wfull?: boolean;
};

withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
  wfull: false,
});
</script>

<template>
  <button
    class="px-4 py-2 bg-green-700 font-semibold rounded-md transition-colors hover:bg-green-800"
    :class="{ 'w-full': wfull }"
    :type="type"
  >
    <slot />
  </button>
</template>
