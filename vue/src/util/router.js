import Vue from "vue";
import VueRouter from 'vue-router'
import store from '../../store';

import Blocked from "../pages/Blocked";
import PowerOff from "../pages/PowerOff";

const routes = [
    {
        name: 'blocked',
        path: '/blocked',
        component: Blocked,
    },
    {
        name: 'off',
        path: '/off',
        component: PowerOff
    },
    {
        name: 'menu',
        path: '/',
        component: PowerOff
    },
]

Vue.use(VueRouter)

const router = new VueRouter({
    routes // short for `routes: routes`
})
//
// router.beforeEach((to, from, next) => {
//     // перехват системных состояний при редиректе
//     store.getters.checkState ? next(store.getters.checkState) : next()
// })

export default router;