import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/login'),
      meta: {
        middleware: { guest: true }
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../layouts/main.vue'),
      children: [
        {
          path: '/',
          name: 'dashbaordAdmin',
          component: () => import('../pages/dasboard/DashboardAdmin.vue'),
          meta: {
            middleware: { auth: true },
            role: 'doctor'
          }
        },
      ],
      meta: {
        middleware: { auth: true },
        role: 'doctor'
      }
    },
    {
      path: '/doctor',
      component: () => import('../layouts/main.vue'),
      children: [
        {
          path: '/',
          name: 'dashboardDoctor',
          component: () => import('../pages/dasboard/'),
          meta: {
            middleware: { auth: true },
            role: 'doctor'
          }
        },
        {
          path: '/classify/:id',
          name: 'classify',
          component: () => import('../pages/classify/classify.vue'),
          meta: {
            middleware: { auth: true },
            role: 'doctor'
          }
        },
        {
          path: 'addDoctor',
          name: 'createDoctor',
          component: () => import('../pages/user/createDoctor.vue'),
          meta: {
            middleware: { auth: true },
            role: 'doctor'
          }
        },
        {
          path: '/create-user',
          name: 'create',
          component: () => import('../pages/user/create.vue'),
          meta: {
            middleware: { auth: true },
            role: 'doctor'
          }
        },
        {
          path: '/edit-user',
          name: 'edit',
          component: () => import('../pages/user/create.vue'),
          props: true,
          meta: {
            middleware: { auth: true },
            role: 'doctor'
          }
        },
        {
          path: '/monitoring/:deviceId',
          name: 'monitoring',
          component: () => import('../pages/user/monitoring.vue'),
          meta: {
            middleware: { auth: true },
            role: 'doctor'
          }
        },
        {
          path: '/monitoring/th-lead/:deviceId',
          name: 'monitoringThLead',
          component: () => import('../pages/user/monitoringThreeLead.vue'),
          meta: {
            middleware: { auth: true },
            role: 'doctor'
          }
        },
      ],
      meta: {
        middleware: { auth: true },
        role: 'doctor'
      }
    },
    {
      path: '/patient',
      component: () => import('../layouts/main.vue'),
      children: [
        {
          path: '/',
          name: 'dashboardPatient',
          component: () => import('../pages/dasboard/DasboardPatient.vue'),
          meta: {
            middleware: { auth: true },
            role: 'patient'
          }
        },
      ],
      meta: {
        middleware: { auth: true },
        role: 'patient'
      }
    },
    {
      path: '/',
      meta: {
        middleware: { auth: true }
      }
    },
    {
      path: '/unauthorized',
    },
    {
      path: '/*',
      redirect: '/'
    },
  ],
});
