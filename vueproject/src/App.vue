<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
  
}
*::-webkit-scrollbar {
  width: 1px;
  height: 9px;
  background-color: transparent;
} 
/*定义滚动条的轨道的背景颜色*/
*::-webkit-scrollbar-track {
  background-color: #f0f6ff;
}
 /*定义滚动条轨道 内阴影+圆角*/
*::-webkit-scrollbar-thumb {
  background-color: #dbdbdb;
  border-radius: 6px;
} 
/*定义滑块 内阴影+圆角*/
*::-webkit-scrollbar-thumb:hover {
  background-color: #c2c2c2;
  border-radius: 6px;
} 
.scrollbarHide::-webkit-scrollbar {
  display: none;
}
.scrollbarShow::-webkit-scrollbar {
  display: block;
}
</style>
