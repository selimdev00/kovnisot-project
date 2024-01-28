<template>
  <div
    class="min-w-[400px] bg-red border border-gray-300 rounded p-4 flex items-center justify-center transition"
    :class="{
      'border-blue-400': hovering || adding,
      'bg-blue-50': hovering || adding,
    }"
  >
    <transition name="fade" mode="out-in">
      <form
        v-if="adding"
        class="flex flex-col justify-center items-center gap-2 h-full relative"
        @submit.prevent="addStage"
      >
        <div class="absolute top-0 flex justify-center items-center w-full">
          <div
            class="absolute left-0 group inline-block flex items-center justify-center cursor-pointer"
            @click="adding = false"
          >
            <IconArrowBack class="z-10" />

            <span
              class="transition scale-0 group-hover:scale-100 absolute bg-blue-200 text-white w-[30px] h-[30px] rounded-full z-0"
            >
            </span>
          </div>

          <h3 class="text-lg font-bold">Add stage</h3>
        </div>

        <FormInput
          id="stageName"
          ref="stageNameRef"
          v-model="stageName"
          label="Stage name"
          placeholder="Stage name"
          :error="errorMessage"
        />

        <FormButton type="submit" variant="primary">
          Add stage
          <IconPlusCircle />
        </FormButton>
      </form>

      <FormButton
        v-else
        variant="secondary"
        @mouseover="hovering = true"
        @mouseleave="hovering = false"
        @click="turnAddingModeOn"
      >
        <span>Add stage</span>

        <span>
          <IconPlusCircle />
        </span>
      </FormButton>
    </transition>
  </div>
</template>

<script setup lang="ts">
const canbanStore = useCanbanStore()

const hovering = ref<boolean>(false)
const adding = ref<boolean>(false)

const stageName = ref<string>('')
const errorMessage = ref<string>('')

const stageNameRef = ref<HTMLInputElement | null>(null)

const addStage = () => {
  errorMessage.value = ''

  if (!stageName.value) {
    errorMessage.value = 'Stage name is required'
  } else {
    setTimeout(() => {
      canbanStore.addStage(stageName.value)

      useNuxtApp().$toast.info('Stage added')

      stageName.value = ''

      adding.value = false
      hovering.value = false
    }, 300)
  }
}

const turnAddingModeOn = () => {
  adding.value = true

  stageNameRef.value?.focus()
}

watch(stageNameRef, () => {
  if (stageNameRef.value?.input) stageNameRef.value.input.focus()
})
</script>
