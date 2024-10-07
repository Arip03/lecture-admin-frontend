<template>
    <button
      :class="[ 
        'px-3 py-1 rounded font-sans font-normal text-small border border-gray-300', 
        isActive ? 'bg-red-600 text-white' : 'bg-white text-gray-700',
        'hover:bg-gray-200 active:bg-gray-300'
      ]"
      @click="handleClick"
    >
      {{ label }}
    </button>
  </template>
  
  <script setup lang="ts">
  const props = defineProps<{
    label: string;
    isActive: boolean;
    page: number;
  }>();
  
  const emit = defineEmits(['update:page']);
  
  const handleClick = () => {
    emit('update:page', props.page);
  };
  </script>  