<template>
    <div> 
        webpackfile
        <son :msg.sync="msg"></son>
    </div>
</template>
<script>
import son from './son.vue'
 
export default {
 components:{son},
   data() {
      return { 
            msg:"hello"
      }
   },
   created(){
   },
   computed:{
   },
   methods:{
   },
}
</script>
<style lang="scss" scoped>
 
</style>