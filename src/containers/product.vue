<template>
<div>
  <div class="container">
    <div class="content">
      <div class="wrap">
        <div class="product-slider">
          <swiper :options="swiperOption" ref="swiper">
            <swiper-slide>
              <div class="pro pro-1">
                <h3>白桃覆盆子</h3>
                <p>在精選春季，優雅風味的白桃<br/>融入熱情酸甜的覆盆子果醬<br/>原來自然的熱情與優雅能如此完美融合<br/>讓你口口都驚艷</p>
                <div class="pro-pic">
                  <img class="pic" src="img/pro_01a.png">
                  <img class="head" src="img/pro_01c.png">
                  <img class="tit-01" src="img/pro_01b.png">
                  <img class="tit-02" src="img/pro_01b02.png">
                </div>
                <div class="swiper-pagination" slot="pagination"></div>
                <a v-track="`white_buy`" class="daz-btn" target="_blank" href="https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=4877218&str_category_code=2000200622&mdiv=2000200622&Area=DgrpCategory" v-ripple>
                  <p>立即品味</p>
                </a>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="pro pro-2">
                <h3>黃桃優格</h3>
                <p>清爽細緻的優格冰淇淋<br/>和照耀在地中海暖陽下的希臘黃桃<br/>讓你每口都感覺到<br/>盛夏太陽的禮讚</p>
                <div class="pro-pic">
                  <img class="pic" src="img/pro_02a.png">
                  <img class="head" src="img/pro_02c.png">
                  <img class="tit-01" src="img/pro_02b.png">
                  <img class="tit-02" src="img/pro_01c02.png">
                </div>
                <div class="swiper-pagination" slot="pagination"></div>
                <a v-track="`yollow_buy`" class="daz-btn" target="_blank" href="https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=4877218&str_category_code=2000200622&mdiv=2000200622&Area=DgrpCategory" v-ripple>
                  <p>立即品味</p>
                </a>
              </div>
            </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev" v-track="`pro-next`"></div>
            <div class="swiper-button-next" slot="button-next" v-track="`pro-prev`"></div>
          </swiper>
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

import "swiper/dist/css/swiper.css";

export default {
  props: {},
  data() {
    return {
      swiperOption: {
        loop: true,
        pagination: {
          el: ".swiper-pagination"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        on: {
          slideChange: this.slideChange
        },
        effect: "coverflow",
        spaceBetween: "10%",
        coverflowEffect: {
          rotate: 30,
          slideShadows: false
        }
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.swiper.swiper;
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  watch: {},
  created() {},
  mounted() {
    store.commit("setPage", `product_white`);
  },
  methods: {
    slideChange() {
      if (this.swiper) {
        const index = this.swiper.realIndex;
        console.log(index);
        switch (index) {
          case 0:
            store.commit("setPage", `product_white`);
            break;
          case 1:
            store.commit("setPage", `product_yollow`);
            break;
        }
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
      top: 10%;
      text-align: center;
    }
  }
}

.product-slider {
  width: 100%;
  display: block;
  overflow: visible;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  .swiper-button-prev,
  .swiper-button-next {
    width: 15%;
    padding-bottom: 15%;
  }
  .swiper-button-prev {
    background: url("../../img/bt_prev.png") center/contain no-repeat;
  }
  .swiper-button-next {
    background: url("../../img/bt_next.png") center/contain no-repeat;
  }
  .swiper-wrapper,
  .swiper-container {
    overflow: visible;
  }
  .swiper-slide {
    overflow: visible;
    .pro {
      opacity: 0;
    }
    &.swiper-slide-active {
      .pro {
        opacity: 1;
        h3 {
          animation: slideInUp 1.2s 0s 1 both;
        }
        p {
          animation: slideInUp 1.2s 0.2s 1 both;
        }
        .pro-pic {
          animation: slideInUp 1.2s 0.4s 1 both;
        }
        .tit-01 {
          animation: slideInRight 1.2s 2s 1 both;
        }
        .tit-02 {
          animation: slideInLeft 1.2s 2s 1 both;
        }
        .daz-btn {
          animation: slideInUp 1.2s 0.6s 1 both;
        }
        .head {
          animation: headRotate 1.2s 1.6s 1 both;
        }
      }
    }
  }
  .pro {
    display: block;
    width: 80%;
    margin: 0 auto;
    overflow: visible;
    transition: 0.3s ease all;
    &.pro-1 {
      .swiper-pagination {
        .swiper-pagination-bullet {
          border: 1px solid #c74e6e;
          background-color: white;
          &.swiper-pagination-bullet-active {
            background-color: #c74e6e;
          }
        }
      }
    }
    &.pro-2 {
      h3 {
        color: #ca7055;
      }
      .swiper-pagination {
        .swiper-pagination-bullet {
          border: 1px solid #ca7055;
          background-color: white;
          &.swiper-pagination-bullet-active {
            background-color: #ca7055;
          }
        }
      }
    }
    .swiper-pagination {
      position: relative;
      display: block;
      margin: 6% auto;
      .swiper-pagination-bullet {
        display: inline-block;
        margin-right: 2%;
        transition: 0.3s ease all;
        width: 12px;
        height: 12px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    > h3 {
      font-size: 2.5em;
      color: #c74e6e;
      margin: 0;
      font-weight: bolder;
    }
    > p {
      font-size: 1.2em;
      line-height: 1.5;
    }
    .pro-pic {
      display: block;
      width: 65%;
      margin: 12% auto 0 auto;
      position: relative;
      .pic {
        width: 80%;
        display: block;
        margin: 0 auto;
      }
      .head {
        width: 72%;
        display: block;
        position: absolute;
        left: 17.5%;
        top: -0.5%;
        transform-origin: 95% 48%;
      }
      .tit-01 {
        width: 60%;
        display: block;
        position: absolute;
        left: -16.5%;
        top: 19.5%;
      }
      .tit-02 {
        width: 41%;
        display: block;
        position: absolute;
        left: 72.5%;
        top: -2.5%;
      }
    }
    .daz-btn {
      margin: 0 auto;
      width: 60%;
    }
  }
}
</style>