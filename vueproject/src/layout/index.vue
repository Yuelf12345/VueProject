<template>
    <div> 
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <AppMain></AppMain>
    </div>
</template>
<script>
import { Navbar, Sidebar ,AppMain } from './components'

export default {
  components:{
    Navbar,
    Sidebar,
    AppMain
  },
   data() {
      return {
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
