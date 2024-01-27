<template>
  <div
    class="min-w-[350px] bg-red border border-gray-300 rounded p-4 flex flex-col transition"
  >
    {{ stage.id }}
  </div>
</template>

<script setup lang="ts">
import type { Stage } from '~/types/Canban'

defineProps<{ stage: Stage }>()
</script>
