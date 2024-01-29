<template>
  <div
    class="min-w-[400px] bg-red border border-gray-300 rounded flex flex-col transition"
  >
    <div
      class="p-4 flex gap-6 justify-between items-center border-b border-gray-300 bg-blue-50"
    >
      <div class="flex flex-col gap-1">
        <div class="flex flex-wrap gap-x-1 items-center text-xs text-gray-500">
          <span> {{ stage.tasks.length }} tasks </span>

          <span>|</span>

          <span>
            Created:
            {{
              DateTime.fromISO(stage.created_at).setLocale('en').toRelative()
            }}
            ago
          </span>

          <span>|</span>

          <span>
            Last updated:
            {{
              DateTime.fromISO(stage.updated_at).setLocale('en').toRelative()
            }}
            ago
          </span>
        </div>

        <form @submit.prevent="saveStage">
          <input
            ref="stageTitleRef"
            v-model="stageTitle"
            type="text"
            class="bg-transparent focus:outline-blue-400 text-xl font-bold cursor-pointer"
          />
        </form>
      </div>

      <div class="flex gap-2">
        <button
          class="cursor-pointer text-gray-400 transition hover:text-red-600 p-1 outline-red-600 focus:text-red-600"
          @click="removeStage"
        >
          <IconTrash />
        </button>

        <button
          class="cursor-pointer text-gray-400 transition hover:text-blue-600 p-1 outline-blue-400 focus:text-blue-600"
          @click="stageTitleRef?.focus()"
        >
          <IconPencilOutline />
        </button>
      </div>
    </div>

    <div
      class="p-4 flex-1 flex flex-col items-center justify-center bg-gray-50"
    >
      <transition name="fade" mode="out-in">
        <ul
          v-if="!addingTask && stage.tasks.length"
          class="h-full flex flex-col gap-2 w-full"
        >
          <TaskItem
            v-for="task in stage.tasks"
            :key="task.id"
            :task="task"
            :stage-id="props.stage.id"
          />

          <li class="mx-auto">
            <FormButton variant="secondary" @click="turnAddingTaskOn">
              <span>Add task</span>

              <span>
                <IconPlusCircle />
              </span>
            </FormButton>
          </li>
        </ul>

        <TaskAdd
          v-else-if="addingTask"
          :stage-id="stage.id"
          @close="turnAddingTaskOff"
        />

        <div v-else class="text-gray-400 text-center flex flex-col gap-4">
          <span>No tasks</span>

          <FormButton variant="secondary" @click="turnAddingTaskOn">
            <span>Add task</span>

            <span>
              <IconPlusCircle />
            </span>
          </FormButton>
        </div>
      </transition>
    </div>

    <teleport to="body">
      <ModalConfirm
        :is-revealed="isRevealed"
        title="Are you sure to delete this stage?"
        text="Deleting stage will remove all tasks in this stage"
        @confirm="confirm"
        @cancel="cancel"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'

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

const stageTitle = ref<string>(props.stage.title)
const stageTitleRef = ref<HTMLInputElement | null>(null)

const saveStage = () => {
  canbanStore.updateStageTitle(props.stage.id, stageTitle.value)

  stageTitleRef.value?.blur()
}

const addingTask = ref<boolean>(false)

const turnAddingTaskOn = () => {
  addingTask.value = true
}

const turnAddingTaskOff = () => {
  addingTask.value = false
}
</script>
