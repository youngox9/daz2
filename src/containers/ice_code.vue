<template>
<div>
  <div class="container">
    <div class="content">
      <div class="wrap">
        <!-- 單球 -->
        <div class="result">
          <img class="tit" v-ani src="img/winner_tit.png">
          <p>用手機號碼查詢 單球使用狀況</p>
          <h3 v-ani>請輸入手機號碼</h3>
          <div class="form" v-ani>
            <input type="tel" placeholder="請輸入手機" v-model="phone" :class="{error:!validation.phone.check && validation.active}" maxlength="10">
            <a class="daz-btn" @click="check()" v-ripple v-track="`exchange_phone_send`">
              <p>送出資料</p>
            </a>
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
      phone: "",
      validation: {
        active: false,
        phone: {
          check: false,
          msg: "請填寫正確的手機號碼"
        }
      }
    };
  },
  computed: {
    ice: () => store.state.ice
  },
  watch: {
    phone(val) {
      this.validation.phone.check = /[0-9]{2}[0-9]{8}/.test(val);
    }
  },
  created() {},
  mounted() {
    store.commit("setPage", `exchange_phone`);
  },
  methods: {
    check() {
      if (this.validation.phone.check) {
        this.submit();
      } else {
        this.validation.active = true;
        swal("Opps!", "手機輸入錯誤! 請重新檢查看看", "error");
      }
    },
    onError() {
      swal("Opps!", "發生錯誤", "error").then(() => {
        this.$router.push({
          path: "/"
        });
      });
    },
    submit() {
      const data = {
        phone: this.phone,
        code: this.ice.code
      };
      const onSuccess = data => {
        store.commit("setLoading", false);
        store.commit("setIce", {
          ...data,
          phone: this.phone,
          code: this.ice.code
        });
        if (data.result === true) {
          this.$router.push({
            path: "/ice_result"
          });
        } else {
          this.$router.push({
            path: "/ice_error"
          });
        }
      };
      store.commit("setLoading", true);
      $.ajax({
        type: "POST",
        url: "https://haagen-dazs-summer.com.tw/api/check_award",
        success: onSuccess,
        data,
        dataType: "json"
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
        input {
          line-height: 2;
          margin-bottom: 6%;
          height: 3em;
        }
        .daz-btn {
          display: block;
          width: 40%;
          margin: 0 auto;
          p {
            color: white;
          }
          &.animating {
            animation: bounceInUp 1.2s 0.6s 1 both;
          }
        }
      }
    }
  }
}
</style>