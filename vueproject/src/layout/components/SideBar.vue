<template>
    <div> 
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
            </el-radio-group>
            <el-menu default-active="1-4-1" class="el-menu-vertical-demo" 
            @open="handleOpen" 
            @close="handleClose" 
            :collapse="isCollapse"
            router
            >
            <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                <i class="el-icon-location"></i>
                  <span slot="title">导航一</span>
                </template>
                <el-menu-item-group>
                <span slot="title">分组一</span>
                  <el-menu-item index="1-1" route = '/'>选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            
            </el-menu>
    </div>
</template>
<script>

// import { asyncRoutes } from '@/router';

export default {
    data() {
      return {
        isCollapse: true
      };
    },
    mounted(){
      // const navs =asyncRoutes.filter((item) => item.meta?.permission)[0].children // 过滤拿到数据

    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>
<style lang="scss" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
