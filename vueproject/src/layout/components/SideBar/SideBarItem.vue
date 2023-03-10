<template>

    <el-submenu :index="item.path" v-if="item?.children" :popper-append-to-body = false>
        <template #title>
            <i :class="item?.meta.icon"></i>
            <span slot="title">{{item?.meta.title}}</span>
        </template>
        <SideBarItem v-for="(i,key) in item.children" :key="key" :item="i"/>
    </el-submenu>

    <el-menu-item v-else :index="item?.path" v-show="!item.hidden">
            <i :class=item.meta.icon></i>
            <span slot="title">{{item?.meta.title}}</span>
    </el-menu-item >
  
</template>
   
<script>

export default {
    name: 'SideBarItem',
    props:{
        item: {
        type: Object,
        required: true
        },
        isNest: {
        type: Boolean,
        default: false
        },
        basePath: {
        type: String,
        default: ''
        }
    },
    data(){
        return {
            
        }
    }
}


</script>

<style lang="scss" scoped>

</style>
