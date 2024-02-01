<template>
  <div class="min-h-screen p-4 flex flex-col gap-4">
    <div class="flex w-full justify-center items-center sm:text-4xl text-xl">
      <nuxt-link
        to="/"
        class="cursor-pointer group absolute left-4 w-12 h-12 flex items-center justify-center outline-none"
      >
        <IconArrowBack class="z-10" />

        <div
          class="h-full w-full bg-blue-100 rounded-full absolute top-0 left-0 scale-0 transition group-hover:scale-100 group-focus:scale-100 z-0"
        />
      </nuxt-link>

      <h1 class="font-bold text-center text-gray-800 uppercase">
        Kanban System
      </h1>
    </div>

    <div
      class="flex gap-4 py-4 flex-1 overflow-y-hidden overflow-x-auto transition-all"
    >
      <TransitionGroup name="list" tag="ul" class="flex gap-4">
        <StageColumn
          v-for="stage in canbanStore.stages"
          :key="stage.id"
          :stage="stage"
        />

        <StageAdd key="add" />
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
const canbanStore = useCanbanStore()
</script>
