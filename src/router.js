import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import Login from './views/Login.vue';
import User from './views/User.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: `/`,
      name: `home`,
      component: Home,
    },
    {
      path: `/login`,
      name: `login`,
      component: Login,
    },
    {
      path: `/user`,
      name: `user`,
      component: User,
    },
  ],
  mode: `history`,
});

export default router;
