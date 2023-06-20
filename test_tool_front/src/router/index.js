import { createRouter, createWebHashHistory } from 'vue-router'
import practice from '../views/practice.vue'
import projectMain from '../views/projectMain.vue'
import projectUnit1 from '../views/projectUnit1.vue'
import projectUnit2 from '../views/projectUnit2.vue'
import projectIntegration1 from '../views/projectIntegration1.vue'
import projectIntegration2 from '../views/projectIntegration2.vue'
const routes = [
  {
    path: '/',
    name: 'practice',
    component: practice
  },
  {
    path: '/projectMain',
    component:projectMain,
    children: [
      { path: '/Unit1', component: projectUnit1 },
      { path: '/Unit2', component: projectUnit2 },
      { path: '/Integration1', component: projectIntegration1 },
      { path: '/Integration2', component: projectIntegration2 }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
