<template>
    <div> 
        button
        <el-button  type="primary" v-btnPermission>管理员可见</el-button>


        <div class="app-wrap" ref="view"></div>
    </div>
</template>
<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' 
let scene, camera, renderer, controler;
export default {
   data() {
      return {
        viewNode: null,
          animationId: null
      }
   },
   created(){
   },
   mounted(){
    this.initThreeScene();
        this.animation();
   },
   destroyed() {
       scene.clear()
       renderer.dispose()
       renderer.forceContextLoss()
       renderer.content= null
       cancelAnimationFrame(this.animationId)
    },
   computed:{
   },
   methods:{
    initThreeScene() {
            this.viewNode = this.$refs.view;
            scene = new THREE.Scene()
            camera = new THREE.PerspectiveCamera( 45, this.viewNode.clientWidth / this.viewNode.clientHeight, 1, 18000 );
            camera.position.set(0, 50, 20)
            renderer = new THREE.WebGLRenderer({ alpha: true });
            renderer.setSize( this.viewNode.clientWidth , this.viewNode.clientHeight );
            this.viewNode.appendChild( renderer.domElement );
            let AmbientLight = new THREE.AmbientLight( 0xcccccc);
            scene.add( AmbientLight )
            var DirectionalLight = new THREE.DirectionalLight( 0xeeeeee)
            DirectionalLight.position.set( 0, 150, 0 );
            scene.add( DirectionalLight );
            //控制器，旋转缩放场景等
            controler = new OrbitControls(camera, renderer.domElement);
            controler.minPolarAngle = 0; 
            controler.maxPolarAngle = Math.PI/2;
            controler.minDistance = 1;
            controler.maxDistance = 800;
            //辅助线
            let grid = new THREE.GridHelper( 50, 30, 0xcc4400, 0x404543 );
            scene.add( grid );
        },
        animation() {
            renderer.render(scene,camera)
            this.animationId = requestAnimationFrame(this.animation);
        }
   },
}
</script>
<style lang="scss" scoped>
 .app-wrap {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
}
</style>