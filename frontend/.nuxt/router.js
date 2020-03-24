import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _724968dc = () => interopDefault(import('../pages/memos/write.vue' /* webpackChunkName: "pages/memos/write" */))
const _b8c66afa = () => interopDefault(import('../pages/user/confirm.vue' /* webpackChunkName: "pages/user/confirm" */))
const _f658b528 = () => interopDefault(import('../pages/user/login.vue' /* webpackChunkName: "pages/user/login" */))
const _5da42da0 = () => interopDefault(import('../pages/user/sign_up.vue' /* webpackChunkName: "pages/user/sign_up" */))
const _55c54c82 = () => interopDefault(import('../pages/user/edit/_id.vue' /* webpackChunkName: "pages/user/edit/_id" */))
const _e5ded406 = () => interopDefault(import('../pages/user/_id.vue' /* webpackChunkName: "pages/user/_id" */))
const _96d6a04a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _724968dc,
    name: "memos-write"
  }, {
    path: "/user/confirm",
    component: _b8c66afa,
    name: "user-confirm"
  }, {
    path: "/user/login",
    component: _f658b528,
    name: "user-login"
  }, {
    path: "/user/sign_up",
    component: _5da42da0,
    name: "user-sign_up"
  }, {
    path: "/user/edit/:id?",
    component: _55c54c82,
    name: "user-edit-id"
  }, {
    path: "/user/:id?",
    component: _e5ded406,
    name: "user-id"
  }, {
    path: "/",
    component: _96d6a04a,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
