<template>
  <li
    class="p-4 bg-white rounded transition border border-gray-300 hover:border-blue-400 cursor-pointer relative"
  >
    <h3 class="text font-bold">{{ task.title }}</h3>

    <p v-if="task.description" class="text-gray-500 text-sm">
      {{ task.description }}
    </p>

    <div class="flex gap-2 absolute right-4 top-4">
      <span
        class="cursor-pointer text-gray-400 transition hover:text-red-600"
        @click="reveal"
      >
        <IconTrash />
      </span>

      <nuxt-link :to="`/tasks/${task.id}`"
        ><span
          class="cursor-pointer text-gray-400 transition hover:text-blue-600"
        >
          <IconPencilOutline /> </span
      ></nuxt-link>
    </div>

    <teleport to="body">
      <transition name="fade">
        <div
          v-if="isRevealed"
          class="fixed inset-0 z-50 w-full h-full bg-black/50 flex items-center justify-center"
        >
          <div
            class="flex items-center justify-center w-full p-4 gap-4 bg-white rounded shadow max-w-[400px] mx-auto overflow-auto relative transition duration-300"
          >
            <div class="flex flex-col items-center gap-5">
              <div class="flex flex-col gap-1 items-center">
                <h2 class="text-xl font-bold">
                  Are you sure to delete this task?
                </h2>

                <p class="text-gray-500">
                  You won't be able to undo this action
                </p>
              </div>

              <div class="flex gap-4">
                <FormButton @click="confirm">Yes</FormButton>
                <FormButton
                  class="!text-red-600 bg-white border-red-600 hover:bg-red-600 hover:!text-white"
                  @click="cancel"
                  >Cancel</FormButton
                >
              </div>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </li>
</template>

<script setup lang="ts">
import type { Task, Stage } from '~/types/Canban'
import { useConfirmDialog } from '@vueuse/core'

const { isRevealed, reveal, confirm, cancel, onConfirm } = useConfirmDialog()

const canbanStore = useCanbanStore()

const props = defineProps<{
  task: Task
  stageId: number
}>()

onConfirm(() => {
  canbanStore.removeTask(props.stageId, props.task.id)
})
</script>
