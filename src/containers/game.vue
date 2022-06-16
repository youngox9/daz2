<template>
<div>
  <div class="container">
    <div class="content">
      <div class="cd-cover" v-if="data.length > 0">
        <div class="toggle" @click="toggle()" :class="{active:isOpen}"></div>
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
            <a v-ani class="item daz-btn daz-btn-1" :href="getShare()" target="_blank" @click="onShare()" v-ripple v-track="`game_result_${num+1}`">
              <p>分享你們的情歌</p>
            </a>
          </div>
          <div class="col">
            <a v-ani class="item daz-btn daz-btn-2" @click="getToken()" v-ripple v-track="`game_result_game_result_${num+1}`">
              <p>抽桃憩好禮</p>
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
    store.commit("setPage", `game_result_${this.num + 1}`);
    setTimeout(() => {
      store.commit("setLoading", false);
    }, 1500);

    this.resize();
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
    onShare() {
      store.commit("setShare", true);
    },
    getShare() {
      const n = this.num + 1;
      const count = n < 10 ? "0" + n : n;
      var share = `https://www.facebook.com/sharer/sharer.php?u=`;
      var redirect_uri = window.location.href;
      var url = share + `https://haagen-dazs-summer.com.tw/share_${count}.html`;
      return url;
    },
    resize() {
      $(window)
        .bind("resize", () => {
          setTimeout(() => {
            const $wrap = $(this.$refs.wrap);
            const w = $wrap.width();
            const ratio = w / 300 * 0.86;
            this.iframeStyle.transform = `scale(${ratio}) translate(-50%, -50%)`;
          }, 300);
        })
        .trigger("resize");
    },
    toggle() {
      this.isOpen = !this.isOpen;
    },
    onError() {
      // swal("Opps!", "發生錯誤", "error").then(() => {
      //   this.$router.push({
      //     path: "/choose"
      //   });
      // });
      this.$router.push({
        path: "/fail"
      });
    },
    // 先取得抽獎token
    getToken() {
      const onSuccess = data => {
        if (data.result === true) {
          const token = data.token;
          store.commit("addToken", token);
          this.getLottery();
        } else {
          this.onError();
        }
      };
      $.ajax({
        type: "POST",
        url: "https://haagen-dazs-summer.com.tw/api/register",
        success: onSuccess,
        error: this.onError,
        dataType: "json"
      });
    },
    // 抽獎
    getLottery() {
      const onSuccess = data => {
        store.commit("setLoading", false);
        if (data.result === true) {
          store.commit("setPrize", data);
          if (data.prize === 0) {
            this.$router.push({
              path: "/fail"
            });
          } else {
            this.$router.push({
              path: "/success"
            });
          }
        } else {
          this.onError();
        }
      };
      store.commit("setLoading", true);
      $.ajax({
        type: "POST",
        url: "https://haagen-dazs-summer.com.tw/api/draw",
        data: {
          token: this.token,
          fb_token: this.fb.accessToken,
          fb_id: this.fb.userID
        },
        success: onSuccess,
        error: this.onError,
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
      animation: finger 2s 0s infinite both;
      background: url("../../img/hand.png") center/35% auto no-repeat;
      &.active {
        background: none;
      }
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