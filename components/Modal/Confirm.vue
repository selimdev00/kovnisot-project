<template>
  <transition name="fade">
    <div
      v-if="isRevealed"
      class="fixed inset-0 z-50 w-full h-full bg-black/50 flex items-center justify-center"
      @click="cancel"
    >
      <div
        class="flex items-center justify-center w-full p-4 gap-4 bg-white rounded shadow max-w-[400px] mx-auto overflow-auto relative transition duration-300"
        @click.stop
      >
        <div class="flex flex-col items-center gap-5">
          <div class="flex flex-col gap-1 items-center">
            <h2 class="text-xl font-bold">
              {{ title }}
            </h2>

            <p>{{ text }}</p>
          </div>

          <div class="flex gap-4">
            <FormButton
              ref="confirmButtonRef"
              role="button"
              alt="yes"
              @click="confirm"
            >
              {{ yes }}
            </FormButton>
            <FormButton variant="danger" role="button" alt="no" @click="cancel">
              {{ no }}
            </FormButton>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { FormButton } from '#components'

const props = withDefaults(
  defineProps<{
    isRevealed: boolean
    title: string
    text: string
    yes?: string
    no?: string
  }>(),
  {
    yes: 'Yes',
    no: 'No',
  },
)

const emit = defineEmits(['confirm', 'cancel'])

const cancel = () => {
  emit('cancel')
}

const confirm = () => {
  emit('confirm')
}

const confirmButtonRef = ref<InstanceType<typeof FormButton> | null>(null)

watch(confirmButtonRef, () => {
  if (props.isRevealed) confirmButtonRef.value?.button?.focus()
})
</script>
