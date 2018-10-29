import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const lazyLoad =
  process.env.NODE_ENV === "production"
    ? file => () =>
        import(/* webpackChunkName: "x-[index]" */ "@/views/" + file + ".vue")
    : file => require("@/views/" + file + ".vue").default;

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: lazyLoad("About")
    }
  ]
});
