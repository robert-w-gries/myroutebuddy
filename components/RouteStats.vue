<template>
  <div class="sticky top-2 z-10">
    <div
      class="grid grid-cols-4 gap-4 p-4 bg-gray-50 border border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded-lg shadow-sm backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90"
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
          Steps
        </div>
        <div class="text-lg font-bold text-gray-900 dark:text-gray-100">
          {{ stats.steps }}
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
      // Filter out custom notes for tasks count
      const actualTasks = this.route.filter((task) => !task.custom);
      const totalTasks = actualTasks.length;
      const completedTasks = actualTasks.filter(
        (task) => task.completed
      ).length;

      // Include all items (tasks + custom notes) for steps count
      const totalSteps = this.route.length;
      const completedSteps = this.route.filter((task) => task.completed).length;

      // Points calculation (only from actual tasks, not custom notes)
      const totalPoints = actualTasks.reduce(
        (sum, task) => sum + (task.points || 0),
        0
      );
      const completedPoints = actualTasks
        .filter((task) => task.completed)
        .reduce((sum, task) => sum + (task.points || 0), 0);

      // Progress based on all steps (tasks + custom notes)
      const progressPercentage =
        totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

      return {
        tasks: `${completedTasks}/${totalTasks}`,
        steps: `${completedSteps}/${totalSteps}`,
        points: `${completedPoints}/${totalPoints}`,
        progress: progressPercentage,
      };
    },
  },
};
</script>
