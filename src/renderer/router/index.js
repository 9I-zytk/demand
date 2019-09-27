import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'login',
    component: require('@/components/login').default
  }, {
    path: '/register',
    name: 'register',
    component: require('@/components/register').default
  }, {
    path: '/home',
    name: 'home',
    component: require('@/pages/home').default,
    children: [
      {
        path: 'canvas-text',
        name: 'canvasText',
        component: require('@/pages/canvasText').default
      }, {
        path: 'axis',
        name: 'axis',
        component: require('@/pages/axis').default
      }, {
        path: 'planeWar',
        name: 'planeWar',
        component: require('@/pages/planeWar').default
      }, {
        path: '',
        name: 'dashboard',
        component: require('@/pages/dashboard').default
      }, {
        path: 'arrowDemo',
        name: 'arrow',
        component: require('@/pages/arrowDemo').default
      }
    ]
  }, {
    path: '/plane',
    name: 'plane'
    // component: require('@/pages/planeWar').default
  }, {
    path: '*',
    redirect: '/home'
  }]
})
