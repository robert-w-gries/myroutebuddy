<template>
  <div class="sticky top-2 z-10">
    <div
      class="grid grid-cols-3 gap-4 p-4 bg-gray-50 border border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded-lg shadow-sm backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90"
    >
      <div class="text-center">
        <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
          Tasks
        </div>
        <div class="text-lg font-bold text-gray-900 dark:text-gray-100">
          {{ stats.tasks }}
        </div>
      </div>
      <div class="text-center">
        <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
          Points
        </div>
        <div class="text-lg font-bold text-gray-900 dark:text-gray-100">
          {{ stats.points }}
        </div>
      </div>
      <div class="text-center">
        <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
          Progress
        </div>
        <div class="text-lg font-bold text-gray-900 dark:text-gray-100">
          {{ stats.progress }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RouteStats",
  props: {
    route: {
      type: Array,
      required: true,
    },
  },
  computed: {
    stats() {
      const totalTasks = this.route.length;
      const completedTasks = this.route.filter((task) => task.completed).length;

      const totalPoints = this.route.reduce(
        (sum, task) => sum + (task.points || 0),
        0
      );
      const completedPoints = this.route
        .filter((task) => task.completed)
        .reduce((sum, task) => sum + (task.points || 0), 0);

      const progressPercentage =
        totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      return {
        tasks: `${completedTasks}/${totalTasks}`,
        points: `${completedPoints}/${totalPoints}`,
        progress: progressPercentage,
      };
    },
  },
};
</script>
