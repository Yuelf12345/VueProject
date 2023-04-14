// import routerView from '@/components/routerView.vue'
import routerView from '@/layout/components/AppMain.vue'

// 异步路由 不同用户不同路由,根据权限来定的
const asyncRoutes = [
    {
      name: 'Order',
      path: '/order',
      component: routerView,
      redirect: '/order/oList',
      meta: {
        title: '订单管理',
        icon: 'el-icon-tickets',
        permission: true,
        roles:['all']
      },
      children: [{
        name: 'WorkOrder',
        path: '/order/oList',
        component: () => import('@/views/order/oList'),
        meta: {
          title: '订单列表',
          roles:['all']
        },
      },
        {
          name: 'WorkOrder',
          path: '/order/woList',
          component: () => import('@/views/order/workOrder'),
          meta: {
            title: '生产订单',
            roles:['all']
          },
        }]
    },
   {
    name: 'Files',
    path: '/files',
    component: routerView,
    redirect: '/files/vue',
    meta: {
      title: '文档',
      icon: 'el-icon-files',
      permission: true,
      roles:['all']
    },
    children: [
      {
        name: 'Vue',
        path: '/files/vue',
        component: () => import('@/views/files/vuefile'),
        meta: {
          title: 'Vue文档',
          roles:['all']
        },
      },
      {
        name: 'Node',
        path: '/files/node',
        component: () => import('@/views/files/nodefile'),
        meta: {
          title: 'Node文档',
          roles:['all'],
          btnPermissions: ['Admin', 'All', 'User']
        },
      },
      {
        name: 'Webpack',
        path: '/files/webpack',
        component: () => import('@/views/files/webpackfile'),
        meta: {
          title: 'Webpack文档',
          roles:['all'],
          btnPermissions: ['User']
        }
      }]
  },{
    name: 'Assembly',
    path: '/assembly',
    component: routerView,
    redirect: '/assembly/button',
    meta: {
      title: '组件',
      icon: 'el-icon-guide',
      permission: true,
      roles:['all'],
      btnPermissions: ['All']
    },
    children: [
      {
        name: 'Button',
        path: '/assembly/button',
        component: () => import('@/views/assembly/button'),
        meta: {
          title: '按钮',
          roles:['all'],
          btnPermissions: ['Admin']
        },
      },
      {
        name: 'Card',
        path: '/assembly/card',
        component: () => import('@/views//assembly/card'),
        meta: {
          title: '卡片',
          roles:['all'],
          btnPermissions: ['User']
        },
      },
      {
        name: 'Table',
        path: '/assembly/table',
        component: () => import('@/views//assembly/table'),
        meta: {
          title: '表格',
          roles:['all'],
          btnPermissions: ['All']
        }
      }]
  },{
    name: 'Acl',
    path: '/acl',
    component: routerView,
    meta: {
      title: '权限管理',
      icon: 'el-icon-lock',
      permission: true,
      roles:['admin'],
      btnPermissions: ['Admin']
    },
    children: [
      {
        name: 'User',
        path: '/acl/User',
        component: () => import('@/views/acl/user/list'),
        meta: {
          title: '用户管理',
          roles:['admin'],
          btnPermissions: ['Admin']
        },
      },
      {
        name: 'Role',
        path: '/acl/role',
        component: () => import('@/views/acl/role/list'),
        meta: {
          title: '角色管理',
          roles:['admin'],
          btnPermissions: ['Admin']
        },
      },
      {
        name: 'RoleAuth',
        path: '/acl/auth/:id',
        component: () => import('@/views/acl/role/roleAuth'),
        meta: {
          activeMenu: '/acl/role/list',
          title: '角色授权',
          roles:['admin'],
          btnPermissions: ['Admin']
        },
        hidden: true
      },{
        name: 'Permission',
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/list'),
        meta: {
          title: '权限管理',
          roles:['admin'],
          btnPermissions: ['Admin']
        },
      },]
  }];

export default asyncRoutes