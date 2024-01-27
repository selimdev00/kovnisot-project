<template>
  <div class="p-4 flex flex-col items-start gap-4">
    <div class="flex items-center gap-4">
      <nuxt-link to="/">
        <div
          class="group inline-block flex justify-center items-center cursor-pointer"
        >
          <IconArrowBack class="z-10" />

          <span
            class="transition scale-0 group-hover:scale-100 absolute bg-blue-200 text-white w-[30px] h-[30px] rounded-full z-0"
          >
          </span>
        </div>
      </nuxt-link>

      <h1 class="text-3xl font-bold">{{ task.title }}</h1>
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

        <div>
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
            :options="
              canbanStore.stages.map((stage) => {
                return { key: stage.title, value: stage.id }
              })
            "
          />

          <FormButton class="w-fit self-end" type="submit"> Save </FormButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'

const canbanStore = useCanbanStore()
const route = useRoute()

const task = Object.assign({}, canbanStore.findTask(route.params.id as string))
if (!task) {
  throw createError({ statusCode: 404 })
}

const stage = canbanStore.findStage(task.stage_id)

const updateTask = () => {
  canbanStore.updateTask(task)

  return navigateTo('/')
}
</script>
