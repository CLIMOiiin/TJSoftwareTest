import { createRouter, createWebHashHistory } from 'vue-router'
import practice from '../views/practice.vue'

const routes = [
  {
    path: '/',
    name: 'practice',
    component: practice
  },
  {
    path: '/project',
    name: 'project',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/project.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
