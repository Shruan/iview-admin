import Home from '@/views/Home.vue'
import FirstMenuView from '@/components/FirstMenuView'
import Layout from '@/views/layout'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/About',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/orderManage',
    name: 'OrderManage',
    component: FirstMenuView,
    meta: {
      icon: 'ios-paper',
      title: '工单'
    },
    children: [
      {
        path: 'add_order',
        name: 'AddOrder',
        component: Layout,
        meta: {
          icon: 'ios-list-box-outline',
          title: '新建工单'
        },
        children: [
          {
            path: 'createOrder',
            name: 'CreateOrder',
            component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
            meta: {
              title: '新建工单'
            }
          },
          {
            path: 'homePage',
            name: 'HomePage',
            component: Home,
            meta: {
              hideInMenu: true
            }
          }
        ]
      }
    ]
  },
  {
    path: '/customerManage',
    name: 'CustomerManage',
    component: FirstMenuView,
    meta: {
      icon: 'md-person',
      title: '客户'
    },
    children: [
      {
        path: 'customerManage',
        name: 'CustomerManage',
        component: Layout,
        meta: {
          icon: 'ios-list-box-outline',
          title: '客户管理'
        },
        children: [
          {
            path: 'customerManage',
            name: 'CustomerManage',
            component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
            meta: {
              title: '新建客户'
            }
          },
          {
            path: 'homePage2',
            name: 'HomePage2',
            component: Home,
            meta: {
              hideInMenu: true
            }
          }
        ]
      }
    ]
  },
  {
    path: '/systemSet',
    name: 'SystemSet',
    component: FirstMenuView,
    meta: {
      icon: 'ios-settings',
      title: '设置'
    },
    children: [
      {
        path: 'systemManage',
        name: 'SystemManage',
        component: Layout,
        meta: {
          icon: 'ios-list-box-outline',
          title: '设置'
        },
        children: [
          {
            path: 'systemSet',
            name: 'SystemSet',
            component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
            meta: {
              title: '设置'
            }
          }
        ]
      }
    ]
  }
]
