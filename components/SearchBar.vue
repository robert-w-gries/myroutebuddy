
<template>
    <div class="mb-4 w-full">
      <input
        type="text"
        v-model="query"
        :placeholder="placeholder"
        class="w-full border rounded-lg p-2 mb-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        @input="onInput"
      />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      placeholder: {
        type: String,
        default: 'Search tasks...'
      }
    },
    data() {
      return {
        query: ''
      }
    },
    methods: {
      onInput() {
        this.$emit('search', this.query)
      }
    }
  }
  </script>