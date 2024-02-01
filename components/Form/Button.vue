<template>
  <button
    ref="button"
    class="whitespace-nowrap"
    :class="classes[variant || 'primary']"
  >
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
      'flex items-center justify-center gap-2 py-2 px-4 border-2 border-blue-400 bg-blue-400 text-white rounded transition w-full hover:bg-blue-500 outline-none focus:text-blue-400 focus:border-blue-400 focus:bg-white',
    danger:
      'flex items-center justify-center gap-2 py-2 px-4 border-2 border-red-600 bg-red-600 text-white  text-red-600 rounded transition w-full hover:bg-red-600 outline-none hover:text-white focus:text-red-600 focus:border-red-600 focus:bg-white',
    secondary:
      'flex items-center justify-between gap-2 p-4 border-2 border-gray-300 rounded text-gray-400 hover:text-blue-400 hover:border-blue-400 outline-none transition bg-white  focus:text-blue-400 focus:border-blue-400',
  }
})

const button = ref<HTMLButtonElement | null>(null)
defineExpose({ button })
</script>
