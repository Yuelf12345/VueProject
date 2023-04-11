<template>
    <div> 
        子组件
        <input type="text" v-model="myMsg">
    </div>
</template>
<script>
export default {
    props:{
            msg:String
    },
   data() {
      return {
        myMsg:""
      }
   },
   watch:{
    msg(newValue){
        this.myMsg = newValue
    },
    myMsg(newValue){
        this.$emit("update:msg",newValue)
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
