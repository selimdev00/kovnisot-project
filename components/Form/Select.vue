<template>
  <div class="flex flex-col gap-1 w-full">
    <select
      :id="id"
      :value="modelValue"
      class="w-full py-2 px-4 border border-gray-300 rounded hover:text-blue-400 hover:border-blue-400 transition bg-white focus:outline-blue-400 focus:border-blue-400"
      :class="{ 'border-red-400': error }"
      :placeholder="placeholder"
      @input="emit('update:modelValue', $event.target.value)"
    >
      <option
        v-for="option in options"
        :key="option.key"
        :value="option.value"
        :selected="option.value === modelValue"
      >
        {{ option.key }}
      </option>
    </select>

    <div class="flex justify-end">
      <span class="text-xs text-red-400">{{ error }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string
  label: string
  modelValue: string
  placeholder: string
  error?: string
  options: { key: string; value: string | number }[]
}>()

const emit = defineEmits(['update:modelValue'])
</script>
