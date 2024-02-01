<template>
  <li>
    <button
      class="outline-none p-4 bg-white rounded transition border-2 border-gray-300 hover:border-blue-400 cursor-pointer relative hover:text-blue-600 focus:text-blue-600 focus:border-blue-400 w-full text-left"
      @click="goToTask"
    >
      <h3 class="text font-bold">
        {{ task.title }}
      </h3>

      <p v-if="task.description" class="text-gray-500 text-sm">
        {{ task.description }}
      </p>

      <div class="flex absolute right-2 top-2">
        <button
          class="cursor-pointer text-gray-500 transition hover:text-red-600 outline-red-400 p-1 focus:text-red-600"
          role="button"
          alt="Delete task"
          @click.stop="reveal"
        >
          <IconTrash />
        </button>

        <nuxt-link
          :to="`/kanban/tasks/${task.id}`"
          class="p-1 outline-blue-400 focus:text-blue-600 hover:text-blue-600 text-gray-500 transition"
          role="button"
          alt="Edit task"
        >
          <IconPencilOutline />
        </nuxt-link>
      </div>

      <teleport to="body">
        <ModalConfirm
          :is-revealed="isRevealed"
          title="Are you sure to delete this task?"
          text="You won't be able to undo this action"
          @confirm="confirm"
          @cancel="cancel"
        />
      </teleport>
    </button>
  </li>
</template>

<script setup lang="ts">
import type { Task, StageId } from '~/types/Canban'
import { useConfirmDialog } from '@vueuse/core'

const { isRevealed, reveal, confirm, cancel, onConfirm } = useConfirmDialog()

const canbanStore = useCanbanStore()

const props = defineProps<{
  task: Task
  stageId: StageId
}>()

onConfirm(() => {
  canbanStore.removeTask(props.stageId, props.task.id)
})

const goToTask = () => {
  return navigateTo(`/kanban/tasks/${props.task.id}`)
}
</script>
