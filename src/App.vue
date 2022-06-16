<template>
<div class="wrapper">
  <!-- <page-modal/> -->
  <!-- <div class="pc-blur" v-if="!isMobile"></div> -->
  <ticket-modal/>
  <navbar/>
  <rule-modal/>
  <loading-modal/>
  <water-background />
  <box-item>
    <!-- <p class="fixed-page-name" v-html="page"></p> -->
    <success-modal/>
    <player-background :width="720" :height="1334" :active="activePlayer" />
    <transition name="router-anim" enter-active-class="animated zoomIn" leave-active-class="animated fadeOutLeft" v-on:after-enter="afterEnter">
      <router-view class="view" :class="{active:nav}"></router-view>
    </transition>
  </box-item>
</div>
</template>

<script>
import FBSDK from "fb-sdk";
import store from "./store/";

import navbar from "./containers/navbar";
import homepage from "./containers/navbar";
import LoaderItem from "./components/LoaderItem";
import waterBackground from "./components/waterBackground";
import playerBackground from "./components/playerBackground";
import imagesloaded from "imagesloaded";
import boxItem from "./components/boxItem";
import ruleModal from "./components/ruleModal";
import successModal from "./components/successModal";
import loadingModal from "./components/loadingModal";
import ticketModal from "./components/ticketModal";
import pageModal from "./components/pageModal";
import queryString from "querystring";

const search = queryString.parse(window.location.search.slice(1));

store.state.fb.Facebook = FBSDK({
  appId: store.state.fb.appId,
  cookie: true,
  xfbml: true,
  status: true,
  version: "v3.0"
});

export default {
  name: "app",
  components: {
    homepage,
    navbar,
    LoaderItem,
    waterBackground,
    playerBackground,
    boxItem,
    ruleModal,
    successModal,
    loadingModal,
    ticketModal,
    pageModal
  },
  directives: {},
  computed: {
    isMobile: () => store.state.ui.isMobile,
    page: () => store.state.ui.page,
    nav: () => store.state.ui.nav,
    appId: () => store.state.fb.appId
  },
  data() {
    return {
      isEnd: false,
      open: false,
      progress: 0,
      openPlayer: true,
      activePlayer: false
    };
  },
  watch: {
    $route(to, from) {
      switch (to.name) {
        case "homepage":
          this.activePlayer = true;
          break;
        case "game":
          this.activePlayer = true;
          break;
        case "game_back":
          this.activePlayer = true;
          break;
        case "choose":
          this.activePlayer = true;
          break;
        default:
          this.activePlayer = false;
          break;
      }
    }
  },

  mounted() {
    if (search.hasOwnProperty("code") && search.hasOwnProperty("page")) {
      if (search.page === "ice") {
        store.commit("setIce", {
          code: search.code
        });
        this.$router.push({
          path: "/ice"
        });
      } else {
        this.$router.push({
          path: "/"
        });
      }
    } else if (search.hasOwnProperty("song")) {
      const num = search.song;
      store.commit("setSong", num);
      this.$router.push({
        path: "/game_back"
      });
    } else {
      this.$router.push({
        path: "/"
      });
    }
    window.pushPage = this.pushPage;
  },
  methods: {
    pushPage(path) {
      this.$router.push({
        path
      });
    },
    afterEnter(to, from, next) {
      // store.commit("setPage", this.$route.name);
      this.$root.$emit("view-change");
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  display: block;
  max-width: 768px;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

.fixed-page-name {
  position: absolute;
  top: 2em;
  left: 0;
  z-index: 99999;
  font-size: 2em;
  color: yellow;
}
</style>
