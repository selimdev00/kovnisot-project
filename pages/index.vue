<template>
  <div class="p-10 flex flex-col gap-4 h-screen overflow-hidden">
    <div class="flex flex-col items-center gap-4">
      <h1 class="font-bold sm:text-5xl text-3xl text-center leading-[1em]">
        Welcome, recruiter or whoever you are
      </h1>

      <p class="sm:text-lg text-gray-600">Choose section to check</p>
    </div>

    <div class="grid sm:grid-cols-2 gap-10 flex-1 h-full">
      <nuxt-link
        v-for="link in links"
        :key="link.id"
        :to="link.to"
        class="border border-blue-400 h-full uppercase font-semibold text-lg p-4 text-center flex items-center justify-center transition hover:bg-blue-50 rounded focus:bg-blue-50 outline-none"
      >
        {{ link.title }}
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
type LinkBlock = {
  id: number
  title: string
  to: string
  description: string
}

useHead({
  title: 'Welcome',
})

const links: LinkBlock[] = [
  {
    id: 1,
    title: 'Kanban',
    to: '/kanban',
    description: 'Kanban system with several features',
  },
  {
    id: 2,
    title: 'Chart',
    to: '/chart',
    description: 'Charts from Figma',
  },
]
</script>
