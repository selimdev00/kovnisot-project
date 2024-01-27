<template>
  <div
    class="min-w-[350px] bg-red border border-gray-300 rounded p-4 flex items-center justify-center transition"
    :class="{
      'border-blue-400': hovering,
      'bg-blue-50': hovering,
    }"
  >
    <button
      class="flex items-center justify-between gap-2 p-4 border border-gray-300 rounded text-gray-400 hover:text-blue-400 hover:border-blue-400 transition bg-white"
      @mouseover="hovering = true"
      @mouseleave="hovering = false"
      @click="canbanStore.addStage"
    >
      <span>Add stage</span>

      <span>
        <IconPlusCircle />
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
const canbanStore = useCanbanStore()

const hovering = ref<boolean>(false)
</script>
