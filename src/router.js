import Vue from 'vue';
import Router from 'vue-router';

import auth from './middleware/auth';
import log from './middleware/log';

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
      meta: {
        middleware: log,
      },
    },
    {
      path: `/login`,
      name: `login`,
      component: Login,
      meta: {
        middleware: log,
      },
    },
    {
      path: `/user`,
      name: `user`,
      component: User,
      meta: {
        // Try to switch those two around to see how
        // this affects execution of the callbacks.
        middleware: [auth, log],
      },
    },
  ],
  mode: `history`,
});

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Than run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
    const middleware = [];

    // Retrieve all middleware from the router match tree
    to.matched.forEach((match) => {
        if (match.meta.middleware) {
            middleware.push(...match.meta.middleware);
        }
    });

    if (middleware.length > 0) {
        const context = {
            from,
            next,
            router,
            to,
        };
        const nextMiddleware = nextFactory(context, middleware, 1);

        return middleware[0]({...context, next: nextMiddleware});
    }

    return next();
});
export default router;
