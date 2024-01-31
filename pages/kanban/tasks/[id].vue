<template>
  <div class="p-4 flex flex-col items-start gap-4">
    <div class="flex items-center gap-4">
      <nuxt-link to="/" class="p-2 outline-blue-400">
        <div
          class="group inline-block flex justify-center items-center cursor-pointer"
        >
          <IconArrowBack class="z-10" />

          <span
            class="transition scale-0 group-hover:scale-100 absolute bg-blue-200 text-white w-[30px] h-[30px] rounded-full z-0"
          />
        </div>
      </nuxt-link>

      <h1 class="text-3xl font-bold">
        {{ task.title }}
      </h1>
    </div>

    <div class="w-full grid grid-cols-[3fr_10fr] gap-4">
      <div
        class="p-4 bg-white rounded transition border border-gray-300 hover:border-blue-400 cursor-pointer relative"
      >
        <div>
          Task name:

          <span>{{ task.title }}</span>
        </div>

        <div>
          Description:

          <span>{{ task.description }}</span>
        </div>

        <div v-if="stage">
          Stage:

          <span>{{ stage.title }}</span>
        </div>

        <div>
          Created at:

          <span>{{
            DateTime.fromISO(task.created_at).toFormat('dd LLL yyyy')
          }}</span>
        </div>

        <div>
          Updated at:

          <span>{{
            DateTime.fromISO(task.updated_at).toFormat('dd LLL yyyy')
          }}</span>
        </div>
      </div>

      <div
        class="p-4 bg-white rounded transition border border-gray-300 hover:border-blue-400 cursor-pointer relative w-full"
      >
        <form class="flex flex-col gap-2" @submit.prevent="updateTask">
          <FormInput
            id="title"
            v-model="task.title"
            type="text"
            label="Title"
          />

          <FormInput
            id="description"
            v-model="task.description"
            type="textarea"
            label="Description"
          />

          <FormSelect
            id="stage_id"
            v-model="task.stage_id"
            label="Stage"
            :options="stageOptions"
            placeholder="Select stage"
          />

          <div class="w-fit self-end flex gap-2">
            <FormButton type="submit" role="button" alt="Save">
              Save
            </FormButton>

            <FormButton
              variant="danger"
              role="button"
              alt="Delete task"
              @click.prevent="removeTask"
            >
              Delete task
            </FormButton>
          </div>
        </form>
      </div>
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
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'
import type { Option } from '~/types/FormSelect'
import type { Stage, UpdateTaskDTO } from '~/types/Canban'
import { useConfirmDialog } from '@vueuse/core'

const { isRevealed, reveal, confirm, cancel, onConfirm } = useConfirmDialog()

const canbanStore = useCanbanStore()
const route = useRoute()

const task = ref<UpdateTaskDTO>(
  Object.assign({}, canbanStore.findTask(route.params.id as string)),
)
if (!task.value.id) {
  throw createError({ statusCode: 404, statusMessage: 'Task not found' })
}

const stage = ref<Stage | null>(canbanStore.findStage(task.value.stage_id))

const updateTask = () => {
  canbanStore.updateTask(task.value)

  return navigateTo('/kanban')
}

const handleGoBack = (e: KeyboardEvent) => {
  if (e.key === 'Esc') {
    return navigateTo('/kanban')
  }
}

const stageOptions = computed<Option[]>(() => {
  return canbanStore.stages.map((e: Stage) => {
    return { key: e.title, value: e.id }
  })
})

const removeTask = () => {
  reveal()
}

onConfirm(() => {
  canbanStore.removeTask(task.value.stage_id, task.value.id)
  return navigateTo('/kanban')
})

onMounted(() => {
  window.addEventListener('keydown', handleGoBack)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleGoBack)
})
</script>
