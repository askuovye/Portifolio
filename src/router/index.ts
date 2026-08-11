import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/sobre',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/projetos',
    name: 'projects',
    component: () => import('../views/ProjectsView.vue'),
  },
  {
    path: '/experiencias',
    name: 'experiences',
    component: () => import('../views/ExperiencesView.vue'),
  },
  {
    path: '/contato',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

export default router
