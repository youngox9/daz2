<template>
<div>
  <div class="container">
    <div class="content">
      <div class="wrap" :class="{'wrap-top':result === 4 || result === 5}">
        <!-- 單球 -->
        <div class="result result-1" v-if="result === 1">
          <h3 v-ani>親愛的，恭喜你獲得</h3>
          <h4 v-ani>
            <img class="logo-font" src="img/logo_font.png">
            <span>單球兌換券一張</span>
          </h4>
          <img class="pro" src="img/winner-pro01.png">
          <p v-ani>兌換期間至2018/08/10<br/>相關兌換詳情見活動辦法</p>
          <a v-ani class="item daz-btn daz-btn-2" @click="submit()" v-ripple v-track="getLabel()">
            <p>填寫資料</p>
          </a>
        </div>
        <!-- Friday音樂 -->
        <div class="result result-2" v-if="result === 2">
          <h3 v-ani>親愛的，恭喜你獲得</h3>
          <h4 v-ani>friDay 音樂 90天 無限暢聽服務<br/>序號一組</h4>
          <img class="pro" src="img/win_firday.png">
          <p v-ani>開通期限至2019/01/31止<br/>相關兌換詳情見活動辦法</p>
          <a v-ani class="item daz-btn daz-btn-2" @click="submit()" v-ripple v-track="getLabel()">
            <p>填寫資料</p>
          </a>
        </div>
        <!-- 夏日派對入場券 -->
        <div class="result result-3" v-if="result === 3">
          <h3 v-ani>親愛的，恭喜你獲得</h3>
          <h4 v-ani>
            柯夢波丹夏日派對<br/>入場卷兩張
          </h4>
          <img class="pro" src="img/win_ticket.png">
          <p v-ani>夏日派對活動期間2018/7/21<br/>相關兌換詳情見活動辦法</p>
          <div class="row row-custom-gutter">
            <div class="col">
              <a v-ani class="item daz-btn daz-btn-2" @click="submit()" v-ripple v-track="getLabel()">
                <p>填寫資料</p>
              </a>
            </div>
          </div>
        </div>
        <!-- 螢幕截圖 -->
        <!-- <div class="result result-4" v-if="result === 4">
          <div class="full-pic">
            <img src="img/winner_screen_2.png">
          </div>
        </div> -->
        <!-- 螢幕截圖 -->
        <!-- <div class="result result-5" v-if="result === 5">
          <div class="full-pic">
            <img src="img/winner_screen_1.png">
          </div>
        </div> -->
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
    return {};
  },
  computed: {
    result: () => store.state.prize.prize
  },
  watch: {},
  created() {},
  mounted() {
    store.commit("setPage", this.getTrack());
    if (this.result === 4 || this.result === 5) {
      store.commit("setTick", true);
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    getTrack() {
      switch (this.result) {
        case 1:
          // 單球
          return "win_ice";
          break;
        case 2:
          // 音樂
          return "win_friday";
          break;
        case 3:
          // 夏日派對
          return "win_ticket";
          break;
      }
    },
    getLabel() {
      switch (this.result) {
        case 1:
          // 單球
          return "information_ice";
          break;
        case 2:
          // 音樂
          return "information_friday";
          break;
        case 3:
          // 夏日派對
          return "information_ticket";
          break;
      }
    },
    submit() {
      let needAddress;
      switch (this.result) {
        case 1:
          // 單球
          needAddress = false;
          break;
        case 2:
          // 音樂
          needAddress = false;
          break;
        case 3:
          // 夏日派對
          needAddress = true;
          break;
        case 4:
          // 螢幕截圖
          needAddress = false;
          break;
      }
      this.$router.push({
        path: "form",
        query: {
          needAddress
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  overflow-y: auto;
  .content {
    padding: 0;
    position: relative;
    height: 100%;
    width: 100%;
    .admin-control {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 99;
      .daz-btn {
        width: 100%;
      }
    }
    > .wrap {
      position: relative;
      width: 100%;
      left: 0;
      top: 2em;
      text-align: center;
      &.wrap-top {
        top: 0%;
      }
      .result {
        .full-pic {
          position: relative;
          top: 0;
          left: 0;
          max-height: 100%;
          display: block;
          width: 100%;
          overflow-y: auto;
          > img {
            display: block;
            width: 100%;
          }
        }
        > h3 {
          font-size: 18px;
          color: #c74e6e;
          margin: 0;
          font-weight: bolder;
          &.animating {
            animation: bounceInUp 1.2s 0s 1 both;
          }
        }
        > h4 {
          font-size: 1.4em;
          line-height: 1.5;
          font-weight: bolder;
          &.animating {
            animation: bounceInUp 1.2s 0.2s 1 both;
          }
          > .logo-font {
            display: inline-block;
            vertical-align: middle;
            width: 8em;
          }
          > span {
            display: inline-block;
            vertical-align: middle;
          }
        }
        > p {
          font-size: 1em;
          line-height: 1.5;
          font-weight: bolder;
          &.animating {
            animation: bounceInUp 1.2s 0.2s 1 both;
          }
        }
        .pro {
          display: block;
          width: 70%;
          margin: 12% auto 4% auto;
          &.animating {
            animation: bounceInUp 1.2s 0.4s 1 both;
          }
        }
        .daz-btn {
          margin: 0 auto;
          display: block;
          width: 40%;
          &.animating {
            animation: bounceInUp 1.2s 0.6s 1 both;
          }
        }
      }
    }
  }
}
</style>