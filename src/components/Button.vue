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
    class="px-4 py-2 bg-white font-semibold text-black rounded-md transition-all hover:bg-white/90"
    :class="{ 'w-full': wfull }"
    :type="type"
  >
    <slot />
  </button>
</template>
