import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "HOME" */ './views/items/Home.vue'),
    },
    {
      path: '/create',
      name: 'create',
      component: () => import(/* webpackChunkName: "HOME" */ './views/items/Create.vue'),
    },
    {
      path: '/edit/:id',
      name: 'create',
      component: () => import(/* webpackChunkName: "HOME" */ './views/items/Edit.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
