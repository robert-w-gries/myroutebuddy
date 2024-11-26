<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div class="p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            {{ message }}
          </h3>
          <div class="mt-5 sm:mt-6 flex justify-end space-x-3">
            <button @click="onCancel" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
              Cancel
            </button>
            <button @click="onConfirm" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['show', 'message'],
    methods: {
      onConfirm() {
        this.$emit('confirm');
      },
      onCancel() {
        this.$emit('cancel');
      },
    },
  };
  </script>
  