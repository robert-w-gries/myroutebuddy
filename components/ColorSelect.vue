<template>
    <div class="relative color-select">
      <button
        @click="isOpen = !isOpen"
        :class="[
          'w-7 h-7 rounded-full shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-110',
          task.color ? task.color : 'bg-gray-500',
          'hover:ring-2 hover:ring-offset-2 hover:ring-gray-200',
          task.color === 'bg-yellow-400' ? 'ring-2 ring-yellow-600 ring-inset' : 'ring-2 ring-white ring-inset'
        ]"
      >
        <span class="text-white"></span>
      </button>
  
      <!-- Color Select Dropdown -->
      <div
        v-if="isOpen"
        class="absolute right-full top-1/2 -translate-y-1/2 mr-2 flex flex-row gap-2 p-2 bg-white rounded-lg shadow-lg border transform origin-right transition-all duration-200"
        :class="[
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none',
          'z-50'
        ]"
        @click.stop
      >
        <!-- Remove color option -->
        <button
          @click="removeColor"
          class="w-7 h-7 bg-gray-100 rounded-full transition-all duration-200 hover:scale-110 hover:ring-2 hover:ring-offset-2 hover:ring-gray-200 ring-2 ring-gray-300 ring-inset flex items-center justify-center"
        >
          ✕
        </button>
        <button
          v-for="color in colors"
          :key="color.bg"
          @click="selectColor(color)"
          :class="[
            'w-7 h-7 rounded-full transition-all duration-200 hover:scale-110',
            color.bg,
            'hover:ring-2 hover:ring-offset-2',
            color.ring,
            color.ringColor
          ]"
        ></button>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    task: Object
  },
  data() {
    return {
      isOpen: false,
      colors: [
        { 
          bg: 'bg-red-500', 
          ring: 'hover:ring-red-200',
          ringColor: 'ring-2 ring-white ring-inset',
          textColor: 'text-white dark:text-white',
          mutedText: 'text-red-200 dark:text-red-200',
          borderColor: 'border-red-600',
          hoverColor: 'hover:bg-red-400',
          numberColor: 'text-red-300'
        },
        { 
          bg: 'bg-orange-500', 
          ring: 'hover:ring-orange-200',
          ringColor: 'ring-2 ring-white ring-inset',
          textColor: 'text-white dark:text-white',
          mutedText: 'text-orange-200 dark:text-orange-200',
          borderColor: 'border-orange-600',
          hoverColor: 'hover:bg-orange-400',
          numberColor: 'text-orange-300'
        },
        { 
          bg: 'bg-yellow-400', 
          ring: 'hover:ring-yellow-600',
          ringColor: 'ring-2 ring-white ring-inset',
          textColor: 'text-gray-900 dark:text-gray-900',
          mutedText: 'text-yellow-700 dark:text-yellow-700',
          borderColor: 'border-yellow-500',
          hoverColor: 'hover:bg-yellow-300',
          numberColor: 'text-yellow-600'
        },
        { 
          bg: 'bg-green-500', 
          ring: 'hover:ring-green-200',
          ringColor: 'ring-2 ring-white ring-inset',
          textColor: 'text-white dark:text-white',
          mutedText: 'text-green-200 dark:text-green-200',
          borderColor: 'border-green-600',
          hoverColor: 'hover:bg-green-400',
          numberColor: 'text-green-300'
        },
        { 
          bg: 'bg-blue-500', 
          ring: 'hover:ring-blue-200',
          ringColor: 'ring-2 ring-white ring-inset',
          textColor: 'text-white dark:text-white',
          mutedText: 'text-blue-200 dark:text-blue-200',
          borderColor: 'border-blue-600',
          hoverColor: 'hover:bg-blue-400',
          numberColor: 'text-blue-300'
        },
        { 
          bg: 'bg-purple-500', 
          ring: 'hover:ring-purple-200',
          ringColor: 'ring-2 ring-white ring-inset',
          textColor: 'text-white dark:text-white',
          mutedText: 'text-purple-200 dark:text-purple-200',
          borderColor: 'border-purple-600',
          hoverColor: 'hover:bg-purple-400',
          numberColor: 'text-purple-300'
        }
      ]
    }
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdown)
  },
  methods: {
    selectColor(color) {
      this.$emit('update:task', {
        ...this.task,
        color: color.bg,
        textColor: color.textColor,
        mutedText: color.mutedText,
        borderColor: color.borderColor,
        hoverColor: color.hoverColor,
        numberColor: color.numberColor
      })
      this.isOpen = false
    },
    removeColor() {
      // Only remove the color-related properties, preserve the default text colors
       this.$emit('update:task', {
        ...this.task,
        color: null,
        borderColor: this.task.custom ? 'border-blue-600' : 'border-gray-200',
        textColor: 'text-gray-800',
        mutedText: 'text-gray-500',
        numberColor: 'text-gray-400',
        hoverColor: 'hover:bg-gray-100'
      })
      this.isOpen = false
    },
    closeDropdown(e) {
      if (!e.target.closest('.color-select')) {
        this.isOpen = false
      }
    }
  }
}
</script>

<!-- For fun :) -->
<style scoped>


.ease-spring {
  transition-timing-function: cubic-bezier(0.5, 0, 0.3, 1.3);
}

.animate-in {
  animation: popIn 0.4s cubic-bezier(0.5, 0, 0.3, 1.3) forwards;
  animation-delay: var(--spring-delay);
  opacity: 0;
  transform: scale(0);
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>