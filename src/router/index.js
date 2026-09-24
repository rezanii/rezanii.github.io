import Vue from "vue";
import VueRouter from "vue-router";
import Site from "../views/Site.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Home", component: Site },
  // route lama -> anchor, supaya link lama tidak mati
  { path: "/about", redirect: "/#about" },
  { path: "/skills", redirect: "/#resume" },
  { path: "/work", redirect: "/#projects" },
  { path: "/contact", redirect: "/#contact" },
  { path: "*", redirect: "/" }
];

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
