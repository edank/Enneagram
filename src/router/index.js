import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import VueLinks from "../views/VueLinks.vue";
import Questions from "../views/Questions.vue";
import Result from "../views/Result.vue";

Vue.use(VueRouter);

const routes = [
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
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/vue-links",
    name: "vueLinks",
    component: VueLinks
  },
  {
    path: "/questions",
    name: "questions",
    component: Questions
  },
  {
    path: "/result",
    name: "result",
    component: Result
  }
];

const router = new VueRouter({
  routes
});

export default router;
