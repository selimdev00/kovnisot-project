<template>
  <div class="h-full relative flex flex-col justify-center">
    <div class="absolute top-0 flex justify-center items-center w-full">
      <div
        class="absolute left-0 group inline-block flex items-center justify-center cursor-pointer"
        @click="emit('close')"
      >
        <IconArrowBack class="z-10" />

        <span
          class="transition scale-0 group-hover:scale-100 absolute bg-blue-200 text-white w-[30px] h-[30px] rounded-full z-0"
        >
        </span>
      </div>

      <h3 class="text-lg font-bold">Add stage</h3>
    </div>

    <form
      class="flex flex-col justify-center items-center gap-2 h-full"
      @submit.prevent="addTask"
    >
      <FormInput
        id="title"
        v-model="payload.title"
        label="Name"
        placeholder="Task name"
        type="text"
        :error="errors.title"
      />

      <FormInput
        id="description"
        v-model="payload.description"
        label="Description"
        placeholder="Task description"
        type="textarea"
        :error="errors.description"
      />

      <FormButton type="submit" variant="primary">
        <IconPlusCircle /> Add task
      </FormButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '~/types/Canban'

const props = defineProps<{
  stageId: number
}>()

const canbanStore = useCanbanStore()

const emit = defineEmits(['close'])

const payload = ref<Task>({
  id: 0,
  title: '',
  description: '',
})

const errors = ref({
  title: '',
  description: '',
})

const addTask = () => {
  errors.value.title = ''
  errors.value.description = ''

  if (!payload.value.title) {
    errors.value.title = 'Title is required'
  }

  if (!payload.value.description) {
    errors.value.description = 'Description is required'

    return
  }

  canbanStore.addTask(props.stageId, payload.value)

  payload.value = {
    id: 0,
    title: '',
    description: '',
  }

  emit('close')
}
</script>
