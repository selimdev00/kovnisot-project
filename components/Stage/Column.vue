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
            class="bg-transparent focus:outline-none text-xl font-bold cursor-pointer"
          />
        </form>
      </div>

      <div class="flex gap-2">
        <span
          class="cursor-pointer text-gray-400 transition hover:text-red-600"
          @click="removeStage"
        >
          <IconTrash />
        </span>

        <span
          class="cursor-pointer text-gray-400 transition hover:text-blue-600"
          @click="stageTitleRef?.focus()"
        >
          <IconPencilOutline />
        </span>
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
