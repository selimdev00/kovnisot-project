<template>
  <div class="p-4 flex flex-col items-start gap-4">
    <div class="flex items-center gap-4">
      <nuxt-link
        to="/"
        class="p-2 outline-blue-400"
      >
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
        <form
          class="flex flex-col gap-2"
          @submit.prevent="updateTask"
        >
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
          />

          <div class="w-fit self-end flex gap-2">
            <FormButton type="submit">
              Save
            </FormButton>

            <FormButton variant="danger">
              Delete
            </FormButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'
import type { Option } from '~/types/FormSelect'
import type { Stage, UpdateTaskDTO } from '~/types/Canban'

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
  task.value.stage_id = Number(task.value.stage_id)

  canbanStore.updateTask(task.value)

  return navigateTo('/')
}

const handleGoBack = (e: KeyboardEvent) => {
  if (e.key === 'Backspace' || e.key === 'Esc') {
    return navigateTo('/')
  }
}

const stageOptions = computed<Option[]>(() => {
  return canbanStore.stages.map((e: Stage) => {
    return { key: e.title, value: e.id }
  })
})

onMounted(() => {
  window.addEventListener('keydown', handleGoBack)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleGoBack)
})
</script>
