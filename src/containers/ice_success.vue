<template>
<div>
  <div class="container">
    <div class="content">
      <div class="wrap">
        <!-- 完成流程 -->
        <div class="result">
          <img class="tit" v-ani src="img/winner_tit.png">
          <h3>已兌換成功</h3>
          <router-link v-ani class="daz-btn" tag="a" to="/" v-ripple v-track="`exchange_success_play`">
            <p>前往活動</p>
          </router-link>
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
  computed: {
    result: () => store.state.ice.result
  },
  watch: {},
  created() {},
  mounted() {
    store.commit("setPage", `exchange_success`);
  },
  methods: {}
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
          font-size: 3em;
          color: #c74e6e;
          margin: 6% 0 8% 0;
          line-height: 2;
          &.animating {
            animation: bounceInUp 1.2s 0s 1 both;
          }
        }
        .daz-btn {
          margin: 0 auto;
          // display: block;
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