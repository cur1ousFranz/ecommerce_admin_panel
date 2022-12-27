import { createRouter, createWebHistory } from 'vue-router'
// LAYOUT COMPONENT
import GuestLayout from '../components/GuestLayout.vue'
import AdminLayout from '../components/AdminLayout.vue'
// GUEST
import LandingPage from '../views/guest/LandingPage.vue'
// ADMIN
import Home from '../views/admin/Home.vue'
import Products from '../views/admin/Products.vue'
const routes = [
  {
    path: '/',
    component : GuestLayout,
    redirect : '/',
    children: [
      { path: '/', name: 'LandingPage' , component: LandingPage },
    ]
  },
  {
    path: '/home',
    component : AdminLayout,
    redirect : '/home',
    children: [
      { path: '/home', name: 'Home' , component: Home },
      { path: '/products', name: 'Products' , component: Products },
    ]
  },

]

const router = createRouter({
  history : createWebHistory(),
  routes
})

// router.beforeEach((to, from, next) => {

// })

export default router
