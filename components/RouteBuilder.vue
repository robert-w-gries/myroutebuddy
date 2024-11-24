<template>
  <div :class="['p-4 bg-white rounded-lg shadow dark:bg-gray-800', isFinalView ? 'w-full' : '']">
    <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Your Route</h2>
    
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search your route..."
      class="w-full border rounded-lg p-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
    />

    <Container
      :get-child-payload="getTaskPayload"
      group-name="tasks"
      @drop="onDrop"
    >
      <Draggable
        v-for="(task, index) in filteredRoute"
        :key="task.id"
        :class="[
          'p-4 rounded-lg shadow border hover:bg-gray-100 transition mb-2 relative',
          task.completed ? 'bg-gray-200 line-through text-gray-500' : 'bg-gray-50 text-gray-800',
          task.custom ? 'border-blue-600 dark:border-green-600' : ''
        ]"
      >
        <span class="absolute top-1 left-1.5 text-xs text-gray-400 dark:text-gray-500 font-mono">
          {{ index + 1 }}
        </span>

        <div class="flex items-center justify-between">
          <div>
            <!-- Editing Mode -->
            <div v-if="task.isEditing">
              <input
                type="text"
                v-model="task.editableTask"
                class="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div class="flex space-x-2">
                <button
                  @click="saveEdit(task)"
                  class="bg-green-500 text-white px-3 py-1 rounded shadow hover:bg-green-600 transition"
                >
                  Save
                </button>
                <button
                  @click="cancelEdit(task)"
                  class="bg-gray-500 text-white px-3 py-1 rounded shadow hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
            <!-- Display Mode -->
            <div v-else>
              <h3 class="font-semibold mt-2">{{ task.task }}</h3>
              <p class="text-sm text-gray-500">
                {{ task.custom ? 'Custom Task / Note' : `${task.points} points` }}
              </p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <!-- Complete Task -->
            <input
              type="checkbox"
              :checked="task.completed"
              @change="toggleCompletion(task)"
              class="w-5 h-5 text-blue-500 rounded border-gray-300 focus:ring focus:ring-blue-200 cursor-pointer"
            />
            <!-- Edit Button for Custom Tasks -->
            <button
              v-if="task.custom"
              @click="editTask(task)"
              class="w-8 h-8 bg-yellow-500 text-white hover:bg-yellow-600 rounded-full shadow-sm flex items-center justify-center"
            >
              ✎
            </button>
            <!-- Remove -->
            <button
              @click="removeTaskById(task.id)"
              class="w-8 h-8 bg-red-500 text-white hover:bg-red-600 rounded-full shadow-sm flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        </div>
      </Draggable>
    </Container>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue3-smooth-dnd';

export default {
  props: {
    route: Array,
    isFinalView: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchQuery: '',
    }
  },
  computed: {
    filteredRoute() {
      if (!this.searchQuery) return this.route;
      const query = this.searchQuery.toLowerCase();
      return this.route.filter(task => task.task.toLowerCase().includes(query));
    }
  },
  methods: {
    getTaskPayload(index) {
      return this.filteredRoute[index];
    },
    onDrop(dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        let newRoute = [...this.route];

        if (dropResult.removedIndex !== null) {
          newRoute.splice(dropResult.removedIndex, 1);
        }

        if (dropResult.addedIndex !== null) {
          const task = dropResult.payload;

          if (task.completed === undefined) {
            task.completed = false;
          }

          if (!newRoute.some((t) => t.id === task.id)) {
            newRoute.splice(dropResult.addedIndex, 0, task);
          } else {
            if (dropResult.removedIndex !== null) {
              newRoute.splice(dropResult.addedIndex, 0, task);
            } else {
              alert('Task is already in your route.');
            }
          }
        }

        this.$emit('update-route', newRoute);
      }
    },
    removeTaskById(taskId) {
      const updatedRoute = this.route.filter((task) => task.id !== taskId);
      this.$emit('update-route', updatedRoute);
    },
    toggleCompletion(task) {
      const updatedTask = { ...task, completed: !task.completed };
      this.updateTask(updatedTask);
    },
    editTask(task) {
      const updatedTask = { ...task, isEditing: true, editableTask: task.task };
      this.updateTask(updatedTask);
    },
    saveEdit(task) {
      const updatedTask = { ...task, task: task.editableTask, isEditing: false };
      delete updatedTask.editableTask;
      this.updateTask(updatedTask);
    },
    cancelEdit(task) {
      const updatedTask = { ...task, isEditing: false };
      delete updatedTask.editableTask;
      this.updateTask(updatedTask);
    },
    updateTask(updatedTask) {
      const index = this.route.findIndex((t) => t.id === updatedTask.id);
      if (index !== -1) {
        const newRoute = [...this.route];
        newRoute.splice(index, 1, updatedTask);
        this.$emit('update-route', newRoute);
      }
    },
  },
  components: {
    Container,
    Draggable,
  },
};
</script>