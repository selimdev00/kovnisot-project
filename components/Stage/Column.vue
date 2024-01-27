<template>
  <div
    class="min-w-[350px] bg-red border border-gray-300 rounded flex flex-col transition"
  >
    <div
      class="p-4 flex justify-between items-center border-b border-gray-300 bg-blue-50"
    >
      <h2 class="text-xl font-bold">{{ stage.title }}</h2>

      <div class="flex gap-2">
        <span
          class="cursor-pointer text-gray-400 transition hover:text-red-600"
          @click="removeStage"
        >
          <IconTrash />
        </span>
      </div>
    </div>

    <div
      class="p-4 flex-1 flex flex-col items-center justify-center bg-gray-50"
    >
      <ul v-if="stage.tasks.length" class="h-full flex flex-col gap-2 w-full">
        <li
          v-for="task in stage.tasks"
          :key="task.id"
          class="p-4 bg-white rounded transition border border-gray-300 hover:border-blue-400 cursor-pointer"
        >
          {{ task.title }}
        </li>

        <FormButton variant="secondary">
          <span>Add task</span>

          <span>
            <IconPlusCircle />
          </span>
        </FormButton>
      </ul>

      <div v-else class="text-gray-400 text-center flex flex-col gap-4">
        <span>No tasks</span>

        <FormButton variant="secondary">
          <span>Add task</span>

          <span>
            <IconPlusCircle />
          </span>
        </FormButton>
      </div>
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
                  Are you sure to delete this stage?
                </h2>

                <p>Deleting stage will remove all tasks in this stage</p>
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
  </div>
</template>

<script setup lang="ts">
import type { Stage } from '~/types/Canban'

import { useConfirmDialog } from '@vueuse/core'

const { isRevealed, reveal, confirm, cancel, onConfirm } = useConfirmDialog()

const removeStage = () => {
  reveal()
}

onConfirm(() => {
  canbanStore.removeStage(props.stage.id)
})

const canbanStore = useCanbanStore()

const props = defineProps<{ stage: Stage }>()
</script>
