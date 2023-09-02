import {createRouter, createWebHistory} from 'vue-router'
import LoginView from "@/views/login/LoginView.vue";
import WallView from "@/views/wall/WallView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },

    {
      path: '/wall/:wallname',
      component: WallView
    }
  ]
})

export default router
