<template>
  <div class="flex flex-col gap-1 w-full">
    <label :for="id" class="text-sm text-gray-700">{{ label }}</label>

    <textarea
      v-if="type === 'textarea'"
      :id="id"
      :name="id"
      :value="modelValue"
      class="w-full py-2 px-4 border border-gray-300 rounded hover:text-blue-400 hover:border-blue-400 transition bg-white focus:outline-none focus:border-blue-400"
      :class="{ 'border-red-400': error }"
      :placeholder="placeholder"
      @input="emit('update:modelValue', $event.target.value)"
    ></textarea>

    <input
      v-else
      :id="id"
      :value="modelValue"
      :type="type"
      class="w-full py-2 px-4 border border-gray-300 rounded hover:text-blue-400 hover:border-blue-400 transition bg-white focus:outline-none focus:border-blue-400"
      :class="{ 'border-red-400': error }"
      :placeholder="placeholder"
      @input="emit('update:modelValue', $event.target.value)"
    />

    <div class="flex justify-end">
      <span class="text-xs text-red-400">{{ error }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    id: string
    label: string
    modelValue: string
    placeholder: string
    type?: 'text' | 'textarea'
    error?: string
  }>(),
  {
    type: 'text',
  },
)

const emit = defineEmits(['update:modelValue'])
</script>
