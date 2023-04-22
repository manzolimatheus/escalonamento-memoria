import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      title: 'Início',
      showInNavbar: true,
      icon: 'home-outline'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: {
      title: 'Sobre',
      showInNavbar: true,
      icon: 'bonfire-outline'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Configurando título da página
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
