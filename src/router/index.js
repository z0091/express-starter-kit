import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Join from '../components/Join.vue';

import { auth } from '../api';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    root: '/',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: { requiresAuth: true },
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/join',
            name: 'Sign up',
            component: Join,
        },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // Authorization check here
        if (!auth.loggedIn()) {
            next({
                path: '/login',
                query: { redirect: to.fullPath },
            });
        }
    }

    next();
});

export default router;
