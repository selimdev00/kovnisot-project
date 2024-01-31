<template>
  <div class="flex flex-col gap-1 w-full">
    <label :for="id" class="text-sm text-gray-700">{{ label }}</label>

    <textarea
      v-if="type === 'textarea'"
      :id="id"
      :name="id"
      :value="modelValue"
      class="w-full py-2 px-4 border border-gray-300 rounded hover:text-blue-400 hover:border-blue-400 transition bg-white focus:outline-blue-400 focus:border-blue-400"
      :class="{ 'border-red-400': error, [inputClasses]: true }"
      :placeholder="placeholder"
      @input="handleInput"
    />

    <input
      v-else
      :id="id"
      ref="input"
      :value="modelValue"
      :type="type"
      :class="{ 'border-red-400': error, [inputClasses]: true }"
      :placeholder="placeholder"
      :name="id"
      @input="handleInput"
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
    placeholder?: string
    type?: 'text' | 'textarea'
    error?: string
  }>(),
  {
    type: 'text',
    placeholder: '',
    error: '',
  },
)

const input = ref<HTMLInputElement | null>(null)

defineExpose({ input })

const emit = defineEmits(['update:modelValue'])

const inputClasses =
  'w-full py-2 px-4 border border-gray-300 rounded hover:text-blue-400 hover:border-blue-400 transition bg-white focus:outline-blue-400 focus:border-blue-400'

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>
