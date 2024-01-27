<template>
  <div
    class="min-w-[350px] bg-red border border-gray-300 rounded flex flex-col transition"
  >
    <div class="p-4 flex items-center border-b border-gray-300 bg-blue-50">
      <h2 class="text-xl font-bold">{{ stage.title }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Stage } from '~/types/Canban'

defineProps<{ stage: Stage }>()
</script>
