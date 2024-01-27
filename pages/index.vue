<template>
  <div class="min-h-screen p-4 flex flex-col">
    <h1 class="text-3xl font-bold mb-4 text-center text-gray-800 uppercase">
      Kanban System
    </h1>

    <div class="flex gap-4 py-4 flex-1 overflow-y-hidden overflow-x-auto">
      <StageAdd />

      <TransitionGroup tag="ul" class="flex gap-4">
        <StageColumn
          v-for="stage in canbanStore.stages"
          :key="stage.id"
          :stage="stage"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
const canbanStore = useCanbanStore()
</script>
<style></style>
