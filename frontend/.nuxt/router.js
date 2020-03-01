import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _01f7c646 = () => interopDefault(import('../pages/memos/write.vue' /* webpackChunkName: "pages/memos/write" */))
const _708e2298 = () => interopDefault(import('../pages/user/confirm.vue' /* webpackChunkName: "pages/user/confirm" */))
const _5e14027e = () => interopDefault(import('../pages/user/login.vue' /* webpackChunkName: "pages/user/login" */))
const _2a9585b5 = () => interopDefault(import('../pages/user/sign_up.vue' /* webpackChunkName: "pages/user/sign_up" */))
const _51997edc = () => interopDefault(import('../pages/user/_id.vue' /* webpackChunkName: "pages/user/_id" */))
const _aa49d534 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/memos/write",
    component: _01f7c646,
    name: "memos-write"
  }, {
    path: "/user/confirm",
    component: _708e2298,
    name: "user-confirm"
  }, {
    path: "/user/login",
    component: _5e14027e,
    name: "user-login"
  }, {
    path: "/user/sign_up",
    component: _2a9585b5,
    name: "user-sign_up"
  }, {
    path: "/user/:id?",
    component: _51997edc,
    name: "user-id"
  }, {
    path: "/",
    component: _aa49d534,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
