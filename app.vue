<template>
  <div>
    <h1 class="text-3xl text-green-400">Welcome</h1>

    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="addTask"
    >
      Add
    </button>

    <ul>
      <li v-for="task in canbanStore.tasks" :key="task.id">
        {{ task.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const canbanStore = useCanbanStore()

const addTask = () => {
  canbanStore.addTask({
    id: 1,
    title: 'Task 1',
  })
}
</script>
