<template>
<div>
  <div class="container">

    <div class="content">
      <div class="wrap">
        <!-- 中獎 -->
        <div class="result result-1">
          <img class="tit" v-ani src="img/winner_tit.png">
          <!--ticket-->
          <div class="ticket">
            <h4>至門市出示此畫面<br/>門市人員輸入活動代碼確認後<br/>即代表兌換成功</h4>
            <img class="pic" src="img/end_obj01.png">
            <p>請注意，此兌換券按鈕僅供門市人員使用，如自行點擊<b>此券即失效</b></p>
            <div class="row">
              <div class="col">
                <a class="daz-btn daz-gray" @click="leave()" v-ripple v-track="`exchange_store_no`">
                  <p>不了，謝謝</p>
                </a>
              </div>
              <div class="col">
                <a class="daz-btn" @click="submit()" v-ripple v-track="`exchange_store_yes`">
                  <p>立即兌換</p>
                </a>
              </div>
            </div>
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
    return {};
  },
  computed: {
    result: () => store.state.ice.result,
    ice: () => store.state.ice
  },
  watch: {},
  created() {},
  mounted() {
    store.commit("setPage", `exchange_store`);
  },
  methods: {
    submit() {
      const onSuccess = () => {
        store.commit("clearIce");
        this.$router.push({
          path: "/ice_success"
        });
      };

      const data = {
        phone: this.ice.phone,
        code: this.ice.code
      };
      $.ajax({
        type: "POST",
        url: "https://haagen-dazs-summer.com.tw/api/get_award",
        success: onSuccess,
        data,
        dataType: "json"
      });
    },
    leave() {
      this.$router.push({
        path: "/"
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
          margin: 0 0 6% 0;
          > b {
            font-weight: bolder;
          }
        }
        .pro {
          display: block;
          width: 80%;
          margin: 2% auto 0% auto;
          &.animating {
            animation: bounceInUp 1.2s 0.4s 1 both;
          }
        }
        .ticket {
          padding: 10%;
          width: 100%;
          background: url("../../img/cut_bk01.png") center/100% 100% no-repeat;
          > .pic {
            display: block;
            width: 100%;
          }
          .daz-btn {
            position: relative;
            width: 100%;
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