import Vue from "vue";
import Router from "vue-router";

import Pages from "../pages/pages";
import Three from "../pages/three";
import WebGL from "../pages/webgl";
import webgl from "./webgl";

Vue.use(Router);

const routers = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "pages",
      component: Pages,
      meta: {},
    },
    {
      path: "/pages",
      name: "pages",
      component: Pages,
      meta: {},
    },
    {
      path: "/Three",
      name: "Three",
      component: Three,
      meta: {},
    },
    {
      path: "/WebGL",
      name: "WebGL",
      redirect: "/WebGL/example1",
      component: WebGL,
      children: [...webgl],
      meta: {},
    },
  ],
});

export default routers;
