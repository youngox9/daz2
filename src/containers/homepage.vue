<template>
  <div>
    <div class="container">
      <div class="content">
        <img v-ani class="item fruit" src="img/index_tit00.png" />
        <img v-ani class="item tit-01" src="img/index_tit01.png" />
        <img v-ani class="item tit-02" src="img/index_tit02.png" />
        <img v-ani class="item flash-01" src="img/obj02.png" />
        <img v-ani class="item flash-02" src="img/obj03.png" />
        <img v-ani class="item cap" src="img/obj04.png" />
        <img v-ani class="item guitar" src="img/obj01.png" />
        <img v-ani class="item subtit" src="img/tit01.png" />
        <a v-ani class="item daz-btn" @click="getFB()" v-track="'index_play'">
          <div v-ripple>
            <img src="img/bt_go01.png" />
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/";
import Vue from "vue";
import boxItem from "../components/boxItem";

export default {
  name: "homepage",
  components: {
    boxItem
  },
  data() {
    return {};
  },
  created() {},
  mounted() {
    store.commit("setPage", `index`);
  },
  updated() {},
  computed: {
    fb: () => store.state.fb,
    Facebook: () => store.state.fb.Facebook
  },
  methods: {
    getFB() {
      store.commit("setLoading", false);
      this.$router.push({
        path: "/choose"
      });
      // const _self = this;
      // const appId = this.fb.appId;
      // store.commit("setLoading", true);
      // const onSuccess = () => {
      //   store.commit("setLoading", false);
      //   this.$router.push({
      //     path: "/choose"
      //   });
      // };
      // const onError = () => {
      //   store.commit("setLoading", false);
      //   swal("Opps!", "FB驗證錯誤!", "error");
      // };
      // const checkLogin = response => {
      //   console.log("getLoginStatus");
      //   const status = response.status;
      //   if (status === "connected") {
      //     const { accessToken, userID } = response.authResponse;
      //     const data = {
      //       ...this.fb,
      //       accessToken,
      //       userID
      //     };
      //     store.commit("setFB", data);
      //     onSuccess();
      //   } else {
      //     console.log("getFbUser");
      //     const link = window.location.origin + window.location.pathname;
      //     window.location.href = `http://www.facebook.com/dialog/oauth?client_id=${appId}&redirect_uri=${link}&response_type=code`;
      //   }
      // };
      // this.Facebook.getLoginStatus(checkLogin);

      // onSuccess();
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  .content {
    padding: 0;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .item {
    position: absolute;
    &.daz-btn {
      top: 70%;
      left: 19%;
      width: 64%;
      > div {
        display: block;
        > img {
          display: block;
          width: 100%;
        }
      }
      &.animating {
        animation: bounceInUp 1.2s 0.4s 1 both;
        &.animated {
          animation: pulse 2s 0s infinite both;
          img {
            animation: twinkle 1.2s 0.4s 4 both;
          }
        }
      }
    }
    &.fruit {
      top: 29%;
      left: 8%;
      width: 26%;
      &.animating {
        animation: bounceInLeft 0.6s 0s 1 both;
        &.animated {
          animation: rubberBand 2s 0s infinite both;
          img {
            animation: twinkle 1.2s 0.4s 4 both;
          }
        }
      }
    }
    &.tit-01 {
      top: 34%;
      left: 33%;
      width: 36%;
      &.animating {
        animation: jackInTheBox 1.2s 0s 1 both;
        &.animated {
          animation: pulse 4.5s 0s infinite both;
        }
      }
    }
    &.tit-02 {
      top: 43%;
      left: 36%;
      width: 49%;
      &.animating {
        animation: jackInTheBox 1.2s 0.4s 1 both;
        &.animated {
          animation: pulse 4s 0s infinite both;
        }
      }
    }
    &.flash-01 {
      top: 44%;
      left: 8%;
      width: 11%;
      &.animating {
        animation: rollIn 2s 0s 1 both;
        &.animated {
          animation: tada 2s 0s infinite both;
        }
      }
    }
    &.flash-02 {
      top: 33%;
      left: 85%;
      width: 10%;
      &.animating {
        animation: slideInUp 2s 0s 1 both;
        &.animated {
          animation: tada 2s 0s infinite both;
        }
      }
    }
    &.cap {
      top: 44%;
      left: 26%;
      width: 7%;
      &.animating {
        animation: zoomIn 2s 0s 1 both;
        &.animated {
          animation: swing 2s 0s infinite both;
        }
      }
    }
    &.guitar {
      top: 47%;
      left: 87%;
      width: 8%;
      &.animating {
        animation: bounceInRight 2s 0s 1 both;
        &.animated {
          animation: jello 2s 0s infinite both;
        }
      }
    }
    &.subtit {
      top: 54%;
      left: 12%;
      width: 80%;
      &.animating {
        animation: bounceInUp 1.2s 0s 1 both;
      }
    }
  }
}
</style>
