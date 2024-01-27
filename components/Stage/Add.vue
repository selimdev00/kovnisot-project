<template>
  <div
    class="min-w-[350px] bg-red border border-gray-300 rounded p-4 flex items-center justify-center transition"
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

        <div class="flex flex-col gap-1">
          <label for="name" class="text-sm text-gray-700">Stage name</label>

          <input
            id="name"
            v-model="stageName"
            type="text"
            class="w-full py-2 px-4 border border-gray-300 rounded hover:text-blue-400 hover:border-blue-400 transition bg-white focus:outline-none focus:border-blue-400"
            placeholder="Stage name"
          />
        </div>

        <button
          class="flex items-center justify-center gap-2 py-2 px-4 border bg-blue-400 text-white rounded transition w-full hover:bg-blue-500"
          type="submit"
        >
          Add stage

          <IconPlusCircle />
        </button>
      </form>

      <button
        v-else
        class="flex items-center justify-between gap-2 p-4 border border-gray-300 rounded text-gray-400 hover:text-blue-400 hover:border-blue-400 transition bg-white"
        @mouseover="hovering = true"
        @mouseleave="hovering = false"
        @click="adding = true"
      >
        <span>Add stage</span>

        <span>
          <IconPlusCircle />
        </span>
      </button>
    </transition>
  </div>
</template>

<script setup lang="ts">
const canbanStore = useCanbanStore()

const hovering = ref<boolean>(false)
const adding = ref<boolean>(false)

const stageName = ref<string>('')

const addStage = () => {
  stageName.value = ''

  adding.value = false

  setTimeout(() => {
    canbanStore.addStage(stageName.value)

    useNuxtApp().$toast.info('Stage added')
  }, 300)
}
</script>
