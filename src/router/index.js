import Vue from "vue";
import Router from "vue-router";
import homepage from "../containers/homepage";
import notfound from "../containers/notfound";
import game from "../containers/game";
import game_back from "../containers/game_back";
import choose from "../containers/choose";
import fail from "../containers/fail";
import form from "../containers/form";
import product from "../containers/product";
import success from "../containers/success";
import songs from "../containers/songs";
import ice from "../containers/ice";
import ice_code from "../containers/ice_code";
import ice_result from "../containers/ice_result";
import ice_error from "../containers/ice_error";
import ice_success from "../containers/ice_success";


Vue.use(Router);

export default new Router({
  mode: "abstract",
  // mode: "hash",
  routes: [{
      path: "/",
      name: "homepage",
      component: homepage,
    },
    {
      path: "/choose",
      name: "choose",
      component: choose,

    },
    {
      path: "/game",
      name: "game",
      component: game
    },
    {
      path: "/game_back",
      name: "game_back",
      component: game_back
    },
    {
      path: "/fail",
      name: "fail",
      component: fail
    },
    {
      path: "/form",
      name: "form",
      component: form
    },
    {
      path: "/product",
      name: "product",
      component: product
    },
    {
      path: "/success",
      name: "success",
      component: success
    },
    {
      path: "/songs",
      name: "songs",
      component: songs
    },
    {
      path: "/ice",
      name: "ice",
      component: ice
    },
    {
      path: "/ice_code",
      name: "ice_code",
      component: ice_code
    },
    {
      path: "/ice_result",
      name: "ice_result",
      component: ice_result
    },
    {
      path: "/ice_error",
      name: "ice_error",
      component: ice_error
    },
    {
      path: "/ice_success",
      name: "ice_success",
      component: ice_success
    },
    {
      path: "*",
      name: "notfound",
      component: notfound
    }
  ]
});