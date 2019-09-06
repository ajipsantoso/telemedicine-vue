const middware = {
  async checkRole({store, next, to}) {
    console.log('role:',store.getters['auth/status'], store.getters['auth/isLogedIn'])
    if (store.getters['auth/isLogedIn']) {
      let res = await store.dispatch(`auth/userDetail`, await store.getters['auth/status']);
      console.log('res role', res, to.meta.role)
      if (res && to.meta.role) {
        const routeRole = to.meta.role;
        const hasFunction = routeRole === await store.getters['auth/status'];
        console.log('role res:',res, hasFunction)
        if (!hasFunction) {
          next({
            path:'/unauthorized'
          });
        } else {
          next();
        }
      } else {
        console.log('NO RES', res);
        next();
      }
    } else {
      next({
        name: 'login',
      });
    }
  },
  async checkDashboard({store, next, to}) {
    console.log('dash:',store.getters['auth/isDoctor'])
    if (store.getters['auth/isLogedIn']) {
        if (store.getters['auth/isDoctor']){
          next({
            path:'/doctor'
          });
        } else {
          next({
            path:'/patient'
          });
        }
    } else {
      next({
        name: 'login',
      });
    }
  }
}
export const registerMiddleware = (router, store) => {
  router.beforeEach(async (to, from, next) => {
    console.log('to:',to)
    if (to.path === '/') {
      console.log('to:','/')
      await middware.checkDashboard({store, next, to});
    } else if (to.meta.middleware) {
      console.log('to: -','guest')
      if (to.meta.middleware.guest) {
        console.log('to: -','here')
        if (store.getters['auth/isLogedIn']){
          console.log('to:','hm')
          next({
            path: '/',
          })
        } else {
          console.log('to:','next')
          next();
        }
      }
      else if (to.meta.middleware.auth) {
        if (!store.getters['auth/isLogedIn']) {
          next({
            path: '/login',
          })
        } else {
          await middware.checkRole({store, to, next});
        }
      }
    } else {
      next();
    }
  });
  // router.afterEach(async (to, from) => {
  //   if (store.getters['auth/isLogedIn']) {
  //     let res = await store.dispatch('auth/userDetail');
  //     console.log('res',res)
  //     if (res && to.meta.role) {
  //       const routeRole = to.meta.role;
  //       const userRole = store.getters['auth/userRole'];
  //       const hasFunction = routeRole.includes(userRole)
  //       if (!hasFunction) {
  //         router.push('/unauthorized')
  //       }
  //     }
  //   }
  // })
}