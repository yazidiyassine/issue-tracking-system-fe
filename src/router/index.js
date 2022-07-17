import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Middlewares from '../middlewares/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "rogin" */ '../views/auth/Login.vue'),
    meta: {
      middleware: [Middlewares.guest]
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/auth/Register.vue'),
    meta: {
      middleware: [Middlewares.guest]
    }
  },
  {
  path:'/dashboard',
  name: 'dashboard',
  component: () => import(/*    webpackChunkName: "dashboard" */ '../views/pages/Dashboard.vue'),
  meta: {
    middleware: [Middlewares.auth]
  }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

function nextCheck(context, middleware, index) {
  const nextMiddleware = middleware[index];

  if(!nextMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMidd = nextCheck(context, middleware, index +1);
    nextMiddleware({context, nextMidd})
  }
}

router.beforeEach( (to, from, next) => {
  if(to.meta.middleware) {
      const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware :
      [to.meta.middleware];

      const ctx = {
        from, 
        next,
        router,
        to
      };

      const nextMiddleware = nextCheck(ctx, middleware, 1);
      return middleware[0]({...ctx, nextMiddleware})
  }
  return next();
});

export default router