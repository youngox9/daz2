<template>
<div>
  <div class="container">
    <div class="content">
      <div class="wrap">
        <div class="tabs-slider">
          <div class="inline-tabs">
            <div class="row row-no-gutter">
              <div class="col">
                <a class="tab tab-pink" :class="{active:slideIndex === 0}" @click="slideTo(0)" v-track="`playlist_white`">白桃閨蜜</a>
              </div>
              <div class="col">
                <a  class="tab tab-orange" :class="{active:slideIndex === 1}" @click="slideTo(1)" v-track="`playlist_yollow`">黃桃閨蜜</a>
              </div>
            </div>
          </div>
          <swiper class="tab-slider" :options="swiperOption" ref="swiper">
            <swiper-slide> 
              <friday-item v-if="slideIndex === 0" :width="400" :height="800" src="https://player.omusic.friday.tw/embed?command=playlist_2158250" />
            </swiper-slide>
            <swiper-slide>
              <friday-item v-if="slideIndex === 1" :width="400" :height="800" src="https://player.omusic.friday.tw/embed?command=playlist_2158251" />
            </swiper-slide>
          </swiper>
          <router-link v-ani class="daz-btn" tag="a" to="/choose" v-ripple v-track="`playlist_play`">
            <p>測出你的閨蜜情歌</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import store from "../store/";
import Vue from "vue";
import { swiper, swiperSlide } from "vue-awesome-swiper";

import * as PIXI from "pixi.js";
import { TweenMax, Power2, TimelineLite } from "gsap/umd/TweenMax";
import fridayItem from "../components/fridayItem";
import "swiper/dist/css/swiper.css";

export default {
  props: {},
  data() {
    return {
      slideIndex: 0,
      swiperOption: {
        speed: 1200,
        effect: "coverflow",
        // spaceBetween: "10%",
        coverflowEffect: {
          rotate: 120,
          slideShadows: false
        },
        on: {
          slideChangeTransitionEnd: this.onChange.bind(this),
          slideChangeTransitionStart: this.onChange.bind(this),
          slideChange: this.onChange.bind(this)
        }
      }
    };
  },
  computed: {},
  components: {
    swiper,
    swiperSlide,
    fridayItem
  },
  watch: {},
  created() {},
  mounted() {
    this.swiper = this.$refs.swiper.swiper;
    store.commit("setPage", `playlist`);
  },
  methods: {
    slideTo(index) {
      this.swiper.slideTo(index);
    },
    onChange(e) {
      if (this.swiper) {
        this.slideIndex = this.swiper.activeIndex;
      }
    }
  }
};
</script>
<style lang="scss">
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
      top: 2%;
      text-align: center;
    }
  }
}

.daz-btn {
  margin: 0 auto;
  width: 60%;
  margin-top: 6%;
}

.tab-slider {
  position: relative;
  z-index: 1;
  height: 100%;
  border: 4px solid #c74e6f;
  box-shadow: 4px 2px 20px #7a7474;
  .swiper-slide {
    position: relative;
    padding-bottom: 130%;
    background: black url("../../img/loading_2.svg") center/64px no-repeat;
  }
}

.inline-tabs {
  display: block;
  width: 100%;
  position: relative;
  z-index: 2;
  .tab {
    width: 100%;
    display: block;
    font-size: 1.4em;
    padding: 6px;
    border-radius: 1em 1em 0px 0px;
    cursor: pointer;
    margin-right: -2px;
    transition: 0.3s ease all;
    border-bottom: 0px solid white !important;
    font-weight: bolder;
    background-color: white;
    &:last-child {
      margin-right: 0;
    }
    &.tab-pink {
      color: #c74e6f;
      border: 2px solid #c74e6f;
      &.active {
        color: white;
        background-color: #c74e6f;
      }
    }
    &.tab-orange {
      color: #e58a76;
      border: 2px solid #e58a76;
      &.active {
        color: white;
        background-color: #e58a76;
      }
    }
  }
}
</style>