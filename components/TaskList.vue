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
  
      <!-- Add Custom Task -->
      <div class="mt-4">
        <input
          type="text"
          v-model="customTaskName"
          placeholder="Custom Task Name"
          class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          @click="addCustomTask"
          class="w-full bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg shadow-sm hover:bg-blue-600 transition"
        >
          Add Custom Task
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      tasks: Array,
    },
    data() {
      return {
        customTaskName: '',
      };
    },
    methods: {
      selectTask(task) {
        this.$emit('add-task', task);
      },
      addCustomTask() {
        if (this.customTaskName.trim()) {
          const customTask = {
            id: Date.now(),
            task: `Custom: ${this.customTaskName}`,
            points: 0,
            custom: true,
          };
          this.$emit('add-task', customTask);
          this.customTaskName = '';
        }
      },
    },
  };
  </script>
  