<template>
<div>
  <div class="container" track-title="game_choose">
    <div class="content">
      <div class="wrap">
        <h2>閨蜜一起的點點滴滴，組成一首又一首的動人樂章，猜猜看最具代表你們的閨蜜情歌是哪首?</h2>
        <div class="row row-custom-gutter">
          <div class="col col-12">
            <p class="">閨蜜的生日</p>
          </div>
          <div class="col col-6">
            <div class="dazs-select" :class="{error: month_1 < 0 && validation}">
              <span>{{getMonthChinese(month_1)}}</span>
              <select v-model="month_1">
                  <option v-for="(index, value) in Array(12)" :key="index" :value="value" >
                    {{ getMonthChinese(value)}}
                  </option>
              </select>
            </div>
          </div>
          <div class="col col-6">
            <div class="dazs-select" :class="{error:date_1< 0 && validation}">
              <span>{{getDateValue(date_1)}}</span>
              <select v-model="date_1" :disabled=" month_1 < 0">
                  <option v-for="(index, value) in dates_1" :key="index" :value="value" >
                    {{ getDateValue(value) }}
                  </option>
              </select>
            </div>
          </div>
        </div>
        <div class="row row-custom-gutter">
          <div class="col col-12">
            <p class="pink">你的生日</p>
          </div>
          <div class="col col-6">
            <div class="dazs-select pink" :class="{error:month_2< 0 && validation}">
              <span>{{getMonthChinese(month_2)}}</span>
              <select v-model="month_2">
                  <option v-for="(index, value) in Array(12)" :key="index" :value="value" >
                    {{ getMonthChinese(value)}}
                  </option>
              </select>
            </div>
          </div>
          <div class="col col-6">
            <div class="dazs-select pink" :class="{error:date_2< 0 && validation}">
              <span>{{getDateValue(date_2)}}</span>
              <select v-model="date_2" :disabled=" month_2 < 0">
                  <option v-for="(index, value) in dates_2" :key="index" :value="value" >
                    {{ getDateValue(value) }}
                  </option>
              </select>
            </div>
          </div>
        </div>
        <a v-ani class="item daz-btn" @click="goGame()" v-ripple v-track="`game_play`">
          <img src="img/bt_play01.png">
        </a>
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
window.swal = swal;
export default {
  props: {},
  data() {
    return {
      month_1: -1,
      date_1: -1,
      month_2: -1,
      date_2: -1,
      validation: false
    };
  },
  watch: {
    month_1() {
      this.date_1 = 1;
    },
    month_2() {
      this.date_2 = 1;
    }
  },
  computed: {
    token: () => store.state.token,
    dates_1() {
      return this.getMonthDays(this.month_1);
    },
    dates_2() {
      return this.getMonthDays(this.month_2);
    }
  },
  created() {},
  mounted() {
    store.commit("setPage", `game_choose`);
    this.init();
  },
  methods: {
    goGame() {
      if (
        this.date_1 >= 0 &&
        this.date_2 >= 0 &&
        this.month_1 >= 0 &&
        this.month_2 >= 0
      ) {
        const num =
          (this.date_1 + this.date_2 + this.month_1 + this.month_2) % 10;
        store.commit("setSong", num);
        store.commit("setLoading", true);
        this.$router.push({
          path: "game"
        });
      } else {
        this.validation = true;
        swal("Opps!", "請確實填寫日期哦!", "error");
      }
    },
    getMonthDays(index) {
      switch (index) {
        case 0:
          return Array(32);
        case 1:
          return Array(29);
        case 2:
          return Array(32);
        case 3:
          return Array(31);
        case 4:
          return Array(32);
        case 5:
          return Array(31);
        case 6:
          return Array(32);
        case 7:
          return Array(32);
        case 8:
          return Array(31);
        case 9:
          return Array(32);
        case 10:
          return Array(31);
        case 11:
          return Array(32);
        default:
          return Array(0);
      }
    },
    getDateValue(date) {
      return date > 0 ? date : "日期";
    },
    getMonthChinese(index) {
      switch (index) {
        case 0:
          return "一月";
        case 1:
          return "二月";
        case 2:
          return "三月";
        case 3:
          return "四月";
        case 4:
          return "五月";
        case 5:
          return "六月";
        case 6:
          return "七月";
        case 7:
          return "八月";
        case 8:
          return "九月";
        case 9:
          return "十月";
        case 10:
          return "十一月";
        case 11:
          return "十二月";
        default:
          return "月份";
      }
    },
    init() {}
  }
};
</script>
<style lang="scss" scoped>
.daz-btn {
  position: relative;
  width: 70%;
  margin: 6% auto;
  &.animating {
    animation: bounceInUp 1.2s 0s 1 both;
    &.animated {
      animation: pulse 2s 0s infinite both;
    }
  }
}

.dazs-select {
  cursor: pointer;
  margin: 2% 0 10% 0;
  display: block;
  width: 100%;
  border: none;
  position: relative;
  background-color: #c54e6e;
  transition: 0.6s ease all;
  &.pink {
    background-color: #f6a6b1;
  }
  &.error {
    box-shadow: 0px 0px 16px #ffc107;
  }
  &:after {
    position: absolute;
    right: 0;
    top: 0;
    width: 20%;
    height: 100%;
    content: "";
    background: url("../../img/icon_down.png") center/50% auto no-repeat;
  }
  span {
    text-align: center;
    color: white;
    display: block;
    line-height: 2;
    font-size: 1.5em;
  }
  select {
    cursor: pointer;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 1.5em;
  }
}

.container {
  height: 100%;
  .content {
    padding: 0;
    position: relative;
    height: 100%;
    width: 100%;
    > .wrap {
      position: absolute;
      top: 34%;
      left: 10%;
      width: 80%;
      color: #c74e6f;
      h2 {
        font-size: 1em;
        line-height: 1.6;
      }
      p {
        margin: 0;
        &.pink {
          color: #f6a6b1;
        }
      }
    }
  }
}
</style>