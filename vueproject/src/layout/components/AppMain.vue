<template>
   <section class="app-main">
     <transition name="fade-transform" mode="out-in">
       <router-view :key="key" />
     </transition>
   </section>
 </template>
 
 <script>
 export default {
   name: 'AppMain',
   computed: {
     key() {
       return this.$route.path
     }
   }
 }
 </script>
 
 <style lang="scss" scoped>
 .app-main {
   /*50 = navbar  */
   min-height: calc(100vh - 50px);
   width: 100%;
   max-height: 100vh;
   position: relative;
   overflow: hidden;
 }
 .fixed-header+.app-main {
   padding-top: 50px;
 }
 .el-popup-parent--hidden {
   .fixed-header {
     padding-right: 15px;
   }
 }
 </style>
 