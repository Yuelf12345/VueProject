<template>
    <div> 
        nodefile
        当前角色可访问路由：{{ menuData }}
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
   data() {
      return {
      }
   },
   created(){
   },
   computed:{
    ...mapGetters([
      'menuData'
    ])
   },
   methods:{
   },
}
</script>
<style lang="scss" scoped>
 
</style>