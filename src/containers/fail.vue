<template>
<div>
  <div class="container">
    <div class="content">
      <div class="wrap">
        <h3 v-ani>Opps!別氣餒</h3>
        <p v-ani>再玩一次<br/>好禮就是你的<br/>召喚更多閨蜜來參加<br/>可能有更多好運喔！</p>
        <img  class="pro" src="img/end_pic.png">
        <div class="row row-custom-gutter">
          <div class="col col-6" v-if="!isShare" v-track="`share`">
            <a v-ani :href="getShare()" target="_blank" class="item daz-btn" @click="onShare()" v-ripple  v-track="`loose_share`">
              <p>分享你們的情歌</p>
            </a>
          </div>
          <div class="col col-6">
            <router-link v-ani class="item daz-btn" tag="a" to="/choose" v-ripple v-track="`loose_again`">
              <p>再玩一次</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import store from "../store/";
import * as PIXI from "pixi.js";
import { TweenMax, Power2, TimelineLite } from "gsap/umd/TweenMax";

export default {
  props: {},
  data() {
    return {
      isOpen: false
    };
  },
  watch: {},
  computed: {
    isShare: () => store.state.ui.isShare,
    num: () => store.state.song_num
  },
  created() {},
  mounted() {
    window.iframe = this.$refs.iframe;
    store.commit("setPage", "loose");
  },
  methods: {
    onShare() {
      store.commit("setShare", true);
    },
    getShare() {
      const n = this.num + 1;
      const count = n < 10 ? "0" + n : n;
      var share = `https://www.facebook.com/sharer/sharer.php?u=`;
      var url =
        share + `https://haagen-dazs-summer.com.tw/share/share_${count}.html`;
      return url;
    },
    toggle() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  .content {
    padding: 0;
    position: relative;
    height: 100%;
    width: 100%;
    > .wrap {
      position: relative;
      width: 100%;
      left: 0;
      top: 10%;
      text-align: center;
      > h3 {
        font-size: 2.5em;
        color: #c74e6e;
        margin: 0;
        font-weight: bolder;
        &.animating {
          animation: bounceInUp 1.2s 0s 1 both;
        }
      }
      > p {
        font-size: 1.2em;
        line-height: 1.5;
        &.animating {
          animation: bounceInUp 1.2s 0.2s 1 both;
        }
      }
      .pro {
        display: block;
        width: 80%;
        margin: 0 auto;
        margin-bottom: 12%;
        &.animating {
          animation: bounceInUp 1.2s 0.4s 1 both;
        }
      }
      .daz-btn {
        width: 100%;
        &.animating {
          animation: bounceInUp 1.2s 0.6s 1 both;
        }
      }
    }
  }
}
</style>