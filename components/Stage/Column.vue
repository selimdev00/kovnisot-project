<template>
  <div
    :data-kanban-stage="stage.id"
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
            name="stageTitle"
            type="text"
            class="bg-transparent focus:outline-blue-400 text-xl font-bold cursor-pointer"
            @blur="saveStage"
          />
        </form>
      </div>

      <div class="flex gap-2">
        <button
          class="cursor-pointer text-gray-500 transition hover:text-red-600 p-1 outline-red-600 focus:text-red-600"
          role="button"
          alt="Delete stage"
          @click="removeStage"
        >
          <IconTrash />
        </button>

        <button
          class="cursor-pointer text-gray-500 transition hover:text-blue-600 p-1 outline-blue-400 focus:text-blue-600"
          role="button"
          alt="Edit stage"
          @click="stageTitleRef?.focus()"
        >
          <IconPencilOutline />
        </button>
      </div>
    </div>

    <div class="p-4 flex-1 flex flex-col gap-4 items-center bg-gray-50">
      <transition name="fade" mode="out-in">
        <div v-if="!addingTask" class="w-full flex flex-col gap-4">
          <div
            class="w-full min-h-[80px] relative"
            :data-stage-dropzone="stage.id"
          >
            <draggable
              v-model="stageTasks"
              item-key="id"
              group="tasks"
              class="flex flex-col gap-2 w-full min-h-[80px]"
              @change="onTaskMove"
            >
              <template #item="{ element }">
                <TaskItem
                  :data-task-stage="props.stage.id"
                  :data-task="element.id"
                  :task="element"
                  :stage-id="props.stage.id"
                />
              </template>
            </draggable>

            <transition name="fade">
              <span
                v-if="stageTasks.length === 0"
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 text-sm"
              >
                No tasks
              </span>
            </transition>
          </div>

          <div class="flex flex-col gap-4">
            <div class="h-full flex flex-col gap-2 w-full">
              <div class="mx-auto">
                <FormButton
                  variant="secondary"
                  role="button"
                  alt="Add task"
                  name="Add task"
                  @click="turnAddingTaskOn"
                >
                  <span>Add task</span>

                  <span>
                    <IconPlusCircle />
                  </span>
                </FormButton>
              </div>
            </div>
          </div>
        </div>

        <TaskAdd
          v-else-if="addingTask"
          :stage-id="stage.id"
          @close="turnAddingTaskOff"
        />
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

import type { Stage, Task } from '~/types/Canban'
import { useConfirmDialog } from '@vueuse/core'

import draggable from 'vuedraggable'

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

const stageTasks = computed({
  get: () => props.stage.tasks,
  set: (value) => {
    canbanStore.updateStageTasks(props.stage.id, value)
  },
})

const onTaskMove = (e: { added: { element: Task } }) => {
  const added = e.added

  if (!added) return

  canbanStore.updateTaskOnMove({ ...added.element, stage_id: props.stage.id })
}
</script>
