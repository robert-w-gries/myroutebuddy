<template>
    <div class="p-4 bg-white rounded-lg shadow mb-4">
      <h2 class="text-xl font-bold mb-4 text-gray-800">Available Tasks</h2>
      <ul class="space-y-2">
        <li
          v-for="task in tasks"
          :key="task.id"
          class="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-4 rounded-lg shadow border cursor-pointer"
          @click="selectTask(task)"
        >
          <span class="font-medium text-gray-700">{{ task.task }}</span>
          <span class="text-sm text-gray-500">{{ task.points }} pts</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      tasks: Array,
    },
    methods: {
      selectTask(task) {
        this.$emit('add-task', task);
      },
    },
  };
  </script>
  