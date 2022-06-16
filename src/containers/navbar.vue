<template>
<div class="navbar-wrap" :class="{active:nav}">
  <div class="navbar-blur" @click="toggle()" v-track="`menu`"></div>
  <div class="navbar">
    <router-link class="logo" to="/" tag="img" src="img/logo.png" @click="toggle()" v-track="`to index`"></router-link>
    <div class="toggle" @click="toggle()" :style="getToggle()" v-track="'menu'"></div>
  </div>
  <div class="nav">
    <ul>
      <li @click="toggle()" >
        <router-link to="/" v-ripple v-track="`menu_game`">桃憩夏日</router-link>
      </li>
      <li @click="toggle()" v-track="`menu_product`">
        <router-link to="/product" v-ripple>產品介紹</router-link>
      </li>
      <li @click="openRule()" v-track="`menu_rule`">
        <a v-ripple>活動辦法</a>
      </li>
      <li @click="toggle()" v-track="`menu_playlist`">
        <router-link to="/songs" v-ripple>完整歌單頁</router-link>
      </li>
      <!-- <li @click="toggle()">
        <router-link to="/" v-ripple>AR APP下載</router-link>
      </li> -->
    </ul>
  </div>
</div>
</template>

<script>
import store from "../store/";

import VueHamburger from "vue-hamburger";
import "vue-hamburger/index.css";

export default {
  props: [],
  name: "navbar",
  components: {
    VueHamburger
  },
  data() {
    return {};
  },
  mounted() {},
  updated() {},
  computed: {
    nav: () => store.state.ui.nav,
    page: () => store.state.ui.page
  },
  methods: {
    openRule() {
      this.toggle();
      store.commit("setRuleModal", true);
    },
    getToggle() {
      return {
        background: `url("${
          this.nav ? "img/menu01a.png" : "img/menu01.png"
        }") center/contain no-repeat`
      };
    },
    toggle() {
      store.commit("setNav", !this.nav);
      store.commit("setTick", false);
    }
  }
};
</script>

<style lang="scss">
$navHeight: 2em;
$navWidth: 100%;
.view {
  // overflow: hidden;
  z-index: 3;
  position: absolute;
  // transform: translate(0, 0);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: 0.3s ease all;
  .container {
    padding-top: 20%;
  }
  // &.active {
  //   .container {
  //     filter: blur(4px);
  //   }
  // }
}

.navbar-wrap {
  // position: absolute;
  z-index: 998;
  &.active {
    .toggle {
      transform: rotate(360deg);
    }
    .nav {
      opacity: 1;
      transform: translate(0%, 0);
      &:before {
        transform: translate(-2%, -50%) scale(1);
      }
      li {
        @for $i from 1 through 10 {
          $delay: $i - 1;
          &:nth-child(#{$i}) {
            animation: bounceInRight 1.2s $delay * 0.12s 1 both;
          }
        }
      }
    }
    .navbar-blur {
      opacity: 1;
      visibility: visible;
      cursor: pointer;
    }
  }
  .navbar {
    position: absolute;
    z-index: 999;
    width: 100%;
    padding-bottom: $navHeight;
    background-color: #ffffff;
    .logo {
      cursor: pointer;
      display: block;
      margin: 0 auto;
      height: 70%;
      width: auto;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .toggle {
      position: absolute;
      z-index: 999;
      width: 10%;
      right: 2%;
      top: 10%;
      height: 80%;
      cursor: pointer;
      transition: 0.3s ease all;
      img {
        width: 100%;
        display: block;
      }
    }
    .navbar-blur {
      opacity: 0;
      visibility: hidden;
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
      z-index: 1;
      background-color: rgba(0, 0, 0, 0.56);
      transition: 0.3s ease all;
    }
  }
  .nav {
    position: absolute;
    width: 60%;
    height: 100%;
    top: 0;
    right: 0;
    z-index: 2;
    transition: 0.6s ease-in-out all;
    transform: translate(100%, 0);
    padding: 0;
    padding: 0% 6% 0 0;
    z-index: 998;
    opacity: 0;
    text-align: center;
    &:after {
      content: "";
      display: inline-block;
      vertical-align: middle;
      height: 100%;
    }
    &:before {
      content: "";
      position: fixed;
      // padding: 25em;
      $size: 200vh;
      height: $size;
      width: $size;
      left: 0;
      display: block;
      top: 50%;
      border-radius: 100%;
      background-color: rgba(199, 78, 110, 0.9);
      z-index: 1;
      transition: 0.6s ease all;
      transform: translate(10%, -50%) scale(0.2);
    }
    > ul {
      list-style: none;
      display: inline-block;
      vertical-align: middle;
      padding: 0;
      li {
        z-index: 2;
        position: relative;
        text-align: center;
        font-weight: bolder;
        font-weight: lighter;
        margin-bottom: 12px;
        transition: 0.3s ease all;
        a {
          display: block;
          color: white;
          text-decoration: none !important;
          cursor: pointer;
          transition: 0.3s ease all;
          padding: 6% 0px;
          margin-bottom: 2%;
          font-size: 2.8vh;
          font-weight: bolder;
          letter-spacing: 0.12em;
          border-bottom: 1px solid rgba(255, 255, 255, 0.48);
          &:hover {
            color: rgba(199, 78, 110, 1);
            background-color: #ffffff;
          }
        }
      }
    }
  }
}
</style>
