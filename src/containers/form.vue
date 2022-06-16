<template>
<div>
  <div class="container">
    <div class="content">
      <div class="wrap">
        <img class="pic-tit" v-ani src="img/winner_tit.png">
        <p class="tit" v-ani>立即留下資料，領取中獎獎項</p>
        <div class="form" v-ani>
          <div class="row row-custom-gutter row-center">
            <div class="col col-auto">
              <p>姓名：</p>
            </div>
            <div class="col">
              <input type="text" placeholder="請輸入姓名" :class="{error:!validation.name.check && validation.active}" v-model="data.name">
              <span class="valid" v-if="!validation.name.check&& validation.active">{{validation.name.msg}}</span>
            </div>
          </div>
          <div class="row row-custom-gutter row-center">
            <div class="col col-auto">
              <p>電話：</p>
            </div>
            <div class="col">
              <input type="tel" placeholder="請輸入電話" maxlength="10" :class="{error:!validation.phone.check && validation.active}" v-model="data.phone">
              <span class="valid" v-if="!validation.phone.check && validation.active">{{validation.phone.msg}}</span>
            </div>
          </div>
          <div class="row row-custom-gutter row-center">
            <div class="col col-auto">
              <p>EMAIL：</p>
            </div>
            <div class="col">
              <input type="email" placeholder="請輸入電子郵件" :class="{error:!validation.email.check&& validation.active}" v-model="data.email">
              <span class="valid" v-if="!validation.email.check&& validation.active">{{validation.email.msg}}</span>
            </div>
          </div>
          <div class="row row-custom-gutter row-center" v-if="needAddress">
            <div class="col col-auto">
              <p>地址：</p>
            </div>
            <div class="col">
              <input type="text" placeholder="請輸入地址" :class="{error:!validation.address.check&& validation.active}" v-model="data.address">
              <span class="valid" v-if="!validation.address.check&& validation.active">{{validation.address.msg}}</span>
            </div>
          </div>
          <div class="row row-custom-gutter">
            <div class="col col-auto">
              <div class="checkbox-wrap" :class="{error:!validation.agree.check&& validation.active}">
                <input type="checkbox" v-model="data.agree" value="">
                <div class="check"></div>
              </div>
            </div>
            <div class="col">
              <span class="protect">本人已閱讀<span @click="openRule()">活動辦法</span>、個人資料保護法及隱私權申明，並同意遵守相關規定，且願意收到哈根達斯相關訊息。<br/>※每支電話每天可有一次中獎機會。<br/>※完成填寫資料才算中獎。<br/>※請勿關閉垃圾簡訊，簡訊是否發送成功以簡訊發送公司後台為準，將不重新發送且不以其他形式重新提供兌換網址。</span>
              <span class="valid" v-if="!validation.agree.check&& validation.active">{{validation.agree.msg}}</span>
            </div>
          </div>
          <a class="daz-btn" @click="check()" v-ripple v-track="`submit-${result}`">
            <p>送出資料</p>
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
import swal from "sweetalert";

export default {
  props: {},
  data() {
    return {
      isEnd: false,
      isOpen: false,
      needAddress: true,
      data: {
        name: "",
        phone: "",
        email: "",
        address: "",
        agree: ""
      },
      validation: {
        active: false,
        name: {
          check: false,
          msg: "請填寫姓名"
        },
        phone: {
          check: false,
          msg: "請填寫正確的手機號碼"
        },
        email: {
          check: false,
          msg: "請填選正確的電子郵件地址"
        },
        address: {
          check: false,
          msg: "請填寫正確的地址"
        },
        agree: {
          check: false,
          msg: "請勾選同意活動條款"
        }
      }
    };
  },
  watch: {
    "data.name"(val) {
      this.validation.name.check = val.length > 0;
    },
    "data.phone"(val) {
      this.validation.phone.check = /[0-9]{2}[0-9]{8}/.test(val);
    },
    "data.email"(val) {
      this.validation.email.check = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(
        val
      );
    },
    "data.agree"(val) {
      this.validation.agree.check = val;
    },
    "data.address"(val) {
      this.validation.address.check = val.length > 0;
    }
  },
  created() {},
  computed: {
    fb: () => store.state.fb,
    prize: () => store.state.prize,
    result: () => store.state.prize.prize
  },
  mounted() {
    this.needAddress = this.$route.query.needAddress;
    window.iframe = this.$refs.iframe;
    store.commit("setPage", this.getTrack());
  },
  methods: {
    openRule() {
      store.commit("setRuleModal", true);
    },
    getTrack() {
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
          // 柯夢波丹夏日派對
          return "information_ticket";
          break;
      }
    },
    getLabel() {
      switch (this.result) {
        case 1:
          // 單球
          return "information_ice_send";
          break;
        case 2:
          // 音樂
          return "information_friday_send";
          break;
        case 3:
          // 柯夢波丹夏日派對
          return "information_ticket_send";
          break;
      }
    },
    check() {
      if (
        this.validation.name.check &&
        this.validation.phone.check &&
        this.validation.name.check &&
        this.validation.email.check &&
        (this.needAddress ? this.validation.address.check : true) &&
        this.validation.agree.check
      ) {
        this.submit();
      } else {
        swal("Opps!", "資料驗證錯誤哦! 請重新檢查看看", "error").then(value => {
          this.validation.active = true;
        });
      }
    },
    submit() {
      const onSuccess = data => {
        store.commit("setLoading", false);
        if (data.result === true) {
          store.commit("setSuccessModal", {
            open: true,
            isMobile: this.needAddress ? false : true
          });
          this.$router.push({
            path: "/"
          });
          window.trackEvent(this.getTrack(), this.getLabel());
        } else {
          swal("Opps!", `發生錯誤!\n${data.msg}`, "error");
        }
      };
      const data = {
        code: this.prize.code,
        username: this.data.name,
        phone: this.data.phone,
        email: this.data.email,
        [this.needAddress ? "address" : ""]: this.data.address,
        fb_token: this.fb.accessToken,
        fb_id: this.fb.userID
      };
      store.commit("setLoading", true);
      $.ajax({
        type: "POST",
        url: "https://haagen-dazs-summer.com.tw/api/form_data",
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
      top: 5%;
      .pic-tit {
        width: 80%;
        display: block;
        margin: 0 auto;
        &.animating {
          animation: bounceInDown 1.2s 0s 1 both;
        }
      }
      > .tit {
        text-align: center;
        color: #c74e6e;
        font-size: 1.6em;
        font-weight: bolder;
        &.animating {
          animation: bounceInDown 1.2s 0.2s 1 both;
        }
      }
      .daz-btn {
        display: block;
        margin: 0 auto;
        margin-top: 6%;
        > p {
          color: white;
        }
        width: 70%;
        &.animating {
          animation: bounceInUp 1.2s 0.6s 1 both;
        }
      }
    }
  }
}
</style>