<template>
<div class="success-modal" :class="{active:open}">
  <div class="blur" @click="onClose()" />
  <div class="wrap">
    <h3>已收到你的資料！<span v-if="config.isMobile"><br/>敬請密切留意手機簡訊</span></h3>
    <img class="pic" src="img/end_obj01.png">
    <a class="fb-share" target="_blank" :href="getShare()" v-if="!isShare" @click="onShare()">
      <img src="img/icon_fb.png">
      <span>還差一步，立即分享到facebook</span>
    </a>
    <a class="close" @click="onClose()">
      <img src="img/bt_close.png">
    </a>
  </div>
</div>
</template>
<script>
import store from "../store/";

export default {
  components: {},
  props: {},
  data() {
    return {
      isEnd: false,
      isMobile: false
    };
  },
  watch: {
    open(val) {
      if (val === true) {
        store.commit("setPage", this.getTrack());
      }
    }
  },
  computed: {
    open: () => store.state.ui.success_modal.open,
    num: () => store.state.song_num,
    isShare: () => store.state.ui.isShare,
    config: () => store.state.ui.success_modal,
    result: () => store.state.prize.prize
  },
  created() {},
  mounted() {},
  methods: {
    getTrack() {
      switch (this.result) {
        case 1:
          // 單球
          return "success_ice";
          break;
        case 2:
          // 音樂
          return "success_friday";
          break;
        case 3:
          // 夏日派對
          return "success_ticket";
          break;
      }
    },
    onShare() {
      store.commit("setShare", true);
      window.trackEvent(this.getTrack(), `${this.getTrack()}_share`);
    },
    getShare() {
      const n = this.num + 1;
      const count = n < 10 ? "0" + n : n;
      var share = `https://www.facebook.com/sharer/sharer.php?u=`;
      var url = share + `https://haagen-dazs-summer.com.tw/share_${count}.html`;
      return url;
    },
    onClose() {
      store.commit("setSuccessModal", {
        open: false,
        mobile: false
      });
      setTimeout(() => {
        store.commit("setShare", false);
      }, 600);

      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.success-modal {
  visibility: hidden;
  opacity: 0;
  z-index: 9;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  vertical-align: middle;
  white-space: nowrap;
  text-align: center;
  transition: 0.3s ease all;
  &.active {
    visibility: visible;
    opacity: 1;
    > .blur {
      opacity: 1;
    }
    > .wrap {
      opacity: 1;
      transform: translate(0, 0%);
    }
  }
  > .wrap {
    position: relative;
    border-radius: 2em;
    background-color: white;
    z-index: 2;
    display: inline-block;
    vertical-align: middle;
    white-space: initial;
    padding: 6% 2%;
    box-shadow: 1px 4px 13px rgba(176, 176, 176, 0.5);
    transition: 0.6s ease all;
    opacity: 0;
    transform: translate(0, 20%);
    h3 {
      font-size: 1.6em;
      line-height: 2;
      color: #c74e6e;
      margin: 0;
      margin-bottom: 6%;
      font-weight: bolder;
    }
    > .pic {
      width: 60%;
    }
    > .close {
      display: block;
      width: 36px;
      margin: 6% auto 0 auto;
      transition: 0.3s ease all;
      &:hover {
        transform: rotate(180deg);
      }
      > img {
        display: block;
        width: 100%;
      }
    }
    > .fb-share {
      margin: 0 auto;
      display: inline-block;
      color: white;
      background-color: #3c579e;
      border-radius: 2em;
      overflow: hidden;
      padding: 1.5% 6%;
      vertical-align: middle;
      border: 1px solid transparent;
      transition: 0.3s ease all;
      &:hover {
        color: #3c579e;
        background-color: white;
        border: 1px solid #3c579e;
      }
      > span,
      > img {
        display: inline-block;
        vertical-align: middle;
      }
      > img {
        width: 1.5em;
        display: inline-block;
        vertical-align: middle;
        margin-bottom: 2%;
      }
      > span {
        font-size: 0.8em;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
  &:before {
    content: "";
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }
  > .blur {
    content: "";
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.86);
    z-index: 1;
    opacity: 1;
  }
}
</style>