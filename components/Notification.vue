<template>
    <transition-group name="slide-fade" tag="div" class="fixed top-3 right-0 left-3 z-50 mx-auto">
    <div
        v-for="(notification, index) in notifications"
        :key="notification.id"
        class="max-w-lg mb-4"
      >
        <div
          :class="[
            'flex items-start p-4 rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden',
            notification.type === 'success' ? 'bg-green-500 text-white' :
            notification.type === 'error' ? 'bg-red-500 text-white' :
            notification.type === 'info' ? 'bg-blue-500 text-white' :
            'bg-gray-800 text-white'
          ]"
        >
          <div class="flex-shrink-0">
            <!-- Icons based on notification type -->
            <svg v-if="notification.type === 'success'" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <!-- Success Icon -->
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <svg v-else-if="notification.type === 'error'" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <!-- Error Icon -->
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <svg v-else class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <!-- Info Icon -->
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 11-9.546 6.032A10 10 0 0112 2z" />
            </svg>
          </div>
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-medium">
              {{ notification.message }}
            </p>
          </div>
          <div class="ml-4 flex-shrink-0 flex">
            <button @click="removeNotification(notification.id)" class="inline-flex text-white focus:outline-none focus:ring-2 focus:ring-white">
              <span class="sr-only">Close</span>
            </button>
          </div>
        </div>
      </div>
    </transition-group>
  </template>
  
  <script>
  export default {
    props: ['notifications'],
    methods: {
      removeNotification(id) {
        this.$emit('remove-notification', id);
      },
    },
  };
  </script>
  
  <style>
  .slide-fade-enter-active {
    transition: all 0.5s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.3s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(100px);
    opacity: 0;
  }
  </style>
  