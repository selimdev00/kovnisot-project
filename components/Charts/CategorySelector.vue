<template>
  <div class="flex gap-2">
    <button
      class="group py-2 px-4 border-2 border-gray-800 text-gray-500 rounded-lg bg-gray-800 flex items-center justify-center font-medium gap-2 transition transition outline-none focus:border-blue-600"
      :class="{ '!bg-blue-600 text-white': filter === 'all' }"
      @click="handleChange('all')"
    >
      Все
    </button>

    <button
      v-for="item in options"
      :key="item.name"
      class="group py-2 px-4 border border-gray-800 text-gray-500 rounded-lg bg-gray-800 flex items-center justify-center font-medium gap-2 transition outline-none focus:border-blue-600"
      :class="{ '!bg-blue-600 text-white': filter === item.name }"
      @click="handleChange(item.name as string)"
    >
      <span
        class="block h-1 w-1 rounded-full border-[1px] border-opacity-90 border-gray-600"
        :style="`background-color: ${filter === item.name ? 'white' : item.color}`"
      />

      {{ item.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { SeriesItem } from '~/types/Chart'

const filter = ref<string>('all')

const props = defineProps<{
  modelValue: string
  options: SeriesItem[]
}>()

const emit = defineEmits(['update:modelValue'])

const handleChange = (name: string) => {
  filter.value = name
  emit('update:modelValue', name)
}
</script>
