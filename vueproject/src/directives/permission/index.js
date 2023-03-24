import Vue from 'vue'

const btnPermissions = Vue.directive('btnPermission', {
    bind: function (el, binding, vnode) {
        let btnPermissionsArr = [];
        if(binding.value){
            btnPermissionsArr = Array.of(binding.value);
        }else{
            btnPermissionsArr = vnode.context.$route.meta.btnPermissions;
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