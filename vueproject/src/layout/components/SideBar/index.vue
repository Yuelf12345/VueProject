<template>
    <div> 
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false" v-show="isCollapse"><i class="el-icon-s-unfold"></i></el-radio-button>
            <el-radio-button :label="true" v-show="!isCollapse"><i class="el-icon-s-fold"></i></el-radio-button>
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
            <SideBarItem v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
            <el-menu-item index="/user/list">
                  <i></i>
                  <span slot="title">11111</span>
          </el-menu-item >
            </el-menu>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { asyncRoutes } from '@/router';
import SideBarItem from './SideBarItem.vue'

export default {
  components:{SideBarItem},
  props:['isCollapse'],
    data() {
      return {
       
      };
    },
    mounted(){
      console.log('4.展示路由信息,动态渲染菜单'+ asyncRoutes.filter((item) => item.meta?.permission));
    },
    computed:{
      //获取需要展示的路由
      ...mapGetters(["sidebar"]),
      routes(){
        return asyncRoutes.filter((item) => item.meta?.permission)
        // return  this.$store.state.user.resultAllRoutes;
      }
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
