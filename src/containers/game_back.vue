<template>
<div>
  <div class="container">
    <div class="content">
      <div class="cd-cover" v-if="data.length > 0">
        <div class="toggle" @click="toggle()"></div>
        <div class="outer" :class="{active:isOpen}">
          <img class="pic" :src="getCD()">
          <div class="wrap">
            <h3 v-html="data[num].tit"></h3>
            <p v-html="data[num].des"></p>
          </div>
        </div>
        <div class="cd" :class="{active:isOpen}">
          <img src="img/music_box02.png">
          <div class="wrap" ref="wrap">
            <friday-item v-if="isOpen" :src="`https://player.omusic.friday.tw/embed?command=song_${data[num].link}`" :width="300" :height="300" />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <router-link tag="a" to="/" v-ani class="item daz-btn" v-ripple v-track="`back_play`">
              <p>參加活動</p>
            </router-link>
          </div>
          <div class="col">
            <router-link tag="a" to="/product" v-ani class="item daz-btn" v-ripple v-track="`back_product`">
              <p>桃憩新品</p>
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
import swal from "sweetalert";
import fridayItem from "../components/fridayItem";
import { TweenMax, Power2, TimelineLite } from "gsap/umd/TweenMax";

export default {
  data() {
    return {
      iframeStyle: {
        transform: "scale(0)"
      },
      isOpen: false,
      data: []
    };
  },
  watch: {},
  components: {
    fridayItem
  },
  computed: {
    fb: () => store.state.fb,
    token: () => store.state.token,
    num: () => store.state.song_num
  },
  created() {
    const onSuccess = data => {
      this.data = data;
    };
    $.ajax({
      type: "GET",
      url: "src/data.json",
      success: onSuccess,
      dataType: "json"
    });
  },
  mounted() {
    store.commit("setPage", `share_back`);
    setTimeout(() => {
      store.commit("setLoading", false);
    }, 1500);
  },
  methods: {
    getCD() {
      if (
        this.num === 0 ||
        this.num === 1 ||
        this.num === 2 ||
        this.num === 3 ||
        this.num === 4
      ) {
        return `img/music_box01a.png`;
      } else {
        return `img/music_box01.png`;
      }
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
  }
  .cd-cover {
    position: absolute;
    width: 105%;
    top: 32%;
    left: -2.5%;
    .toggle {
      z-index: 9;
      position: absolute;
      top: 31%;
      left: 82%;
      width: 35%;
      height: 34%;
      cursor: pointer;
      // animation: finger 2s 0s infinite both;
      // background: url("../../img/hand.png") center/35% auto no-repeat;
    }
    .row {
      position: absolute;
      width: 110%;
      bottom: 0;
      left: 0;
      z-index: 3;
      .daz-btn {
        position: relative;
        width: 100%;
      }
    }
    .outer {
      display: block;
      width: 100%;
      position: relative;
      z-index: 2;
      transition: 2s ease all;
      transform-origin: left bottom;
      &.animating {
        animation: slideInLeft 1.2s 0s 1 both;
      }
      &.active {
        opacity: 0.86;
        transform: translate(-120%, 30%) rotate(-12deg);
      }
      .pic {
        display: block;
        width: 100%;
        position: relative;
        z-index: 2;
      }
      .wrap {
        z-index: 3;
        position: absolute;
        top: 45%;
        left: 50%;
        padding: 0 0 0 14%;
        width: 100%;
        transform: rotate(-6deg) translate(-50%, -50%);
        h3 {
          letter-spacing: 0.2em;
          font-size: 1.4em;
          margin: 0;
          margin-bottom: 2%;
          color: #c54e6e;
        }
        p {
          letter-spacing: 0.12em;
          font-size: 1.1em;
          line-height: 1.5;
        }
      }
    }
    .cd {
      z-index: 1;
      top: 50%;
      left: 50%;
      display: block;
      width: 85%;
      position: absolute;
      transition: 2s ease all;
      transform: rotate(-90deg) translate(-50%, -50%);
      transform-origin: 0% 0%;
      border-radius: 100%;
      overflow: hidden;
      &.active {
        transform: rotate(0deg) translate(-50%, -50%);
      }
      > img {
        display: block;
        width: 100%;
      }
      .wrap {
        position: absolute;
        top: 0%;
        left: 0%;
        height: 100%;
        width: 100%;
        background: url("../../img/loading_2.svg") center/64px no-repeat;
        transform: scale(0.85);
        > iframe {
          display: none;
          top: 50%;
          left: 50%;
          height: 300px;
          width: 300px;
          transform: translate(-50%, -50%);
          transform-origin: 0 0;
          position: absolute;
          &.active {
            display: block;
          }
          // transform-origin: 7% 12%;
        }
      }
    }
  }
}
</style>