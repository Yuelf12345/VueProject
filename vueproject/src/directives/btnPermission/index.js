import Vue from 'vue'

// 自定义指令 https://v2.cn.vuejs.org/v2/guide/custom-directive.html
const btnPermissions = Vue.directive('btnPermission', {
    /**
     * @param {*} el :指令所绑定的元素，可以用来直接操作 DOM。
     * @param {*} binding :一个对象，包含以下 property(name：指令名;value：指令的绑定值)
     * @param {*} vnode :vnode：Vue 编译生成的虚拟节点
     */
    bind: function (el, binding, vnode) {
        let btnPermissionsArr = [];
        if(binding.value){
            btnPermissionsArr = Array.of(binding.value);//[binding.value]
        }else{
            btnPermissionsArr = vnode.context.$route.meta.btnPermissions;//['Admin']
        }
        if (!Vue.prototype.$_has(btnPermissionsArr)) {
            if (!el.parentNode) {
               el.style.display = 'none'
            }else{
               el.parentNode.removeChild(el)
            }
        }
    }
});
// 权限检查方法
Vue.prototype.$_has = function (value) {
    let isExist = false;
    // 获取用户按钮权限
    let btnPermissionsStr = localStorage.getItem("btnPermissions");
    if (btnPermissionsStr == undefined || btnPermissionsStr == null) {
        return false;
    }
    if (value.indexOf(btnPermissionsStr) > -1 || value == 'All') {
        isExist = true;
    }
    return isExist;
};
export default { btnPermissions }