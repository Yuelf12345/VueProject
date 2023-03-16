<template>
    <div class="h-full">
      <iframe class="wh-full" :src="src"></iframe>
    </div>
  </template>
  
  <script setup >
  import { ref } from 'vue';
  
  const src = ref('https://v3.cn.vuejs.org/');
  </script>
  
<style lang="scss" scoped>
  .h-full{
    height: 100vh;
    width: 100%;
    .wh-full{
      height: 100vh;
      width: 100%;
    }
  }
</style>