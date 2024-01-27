<template>
  <button :class="classes[variant || 'primary']">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  variant?: string
}>()

const classes = computed<{ [key: string]: string }>(() => {
  return {
    primary:
      'flex items-center justify-center gap-2 py-2 px-4 border bg-blue-400 text-white rounded transition w-full hover:bg-blue-500',
    secondary:
      'flex items-center justify-between gap-2 p-4 border border-gray-300 rounded text-gray-400 hover:text-blue-400 hover:border-blue-400 transition bg-white',
  }
})
</script>
