<template>
<div>
  <div class="container">

    <div class="content">
      <div class="wrap">
        <!-- 單球 -->
        <div class="result">
          <img class="tit" v-ani src="img/winner_tit.png">
          <h3 v-ani>在2018/08/10前，到哈根達斯門市<br/>出示兌換券，即可享有免費單球冰淇淋</h3>
          <img v-ani class="pro" src="img/win_sms.png">
          <p>蜜桃系列新品口味二選一</p>
          <a v-ani class="item daz-btn"  @click="submit()" v-ripple v-track="`exchange_rule_check`">
            <p>查看你的單球券</p>
          </a>
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
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    store.commit("setPage", `exchange_rule`);
  },
  methods: {
    submit() {
      this.$router.push({
        path: "/ice_code"
      });
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
      top: 0%;
      text-align: center;
      .result {
        .tit {
          margin: 0 auto 2% auto;
          display: block;
          width: 80%;
        }
        > h3 {
          font-size: 1.4em;
          color: #c74e6e;
          margin: 0;
          line-height: 2;
          &.animating {
            animation: bounceInUp 1.2s 0s 1 both;
          }
        }
        > p {
          color: #565656;
          font-size: 1.6em;
          text-align: center;
          font-weight: bolder;
          margin: 0 0 6% 0;
        }
        .pro {
          display: block;
          width: 80%;
          margin: 2% auto 0% auto;
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