<template>
<div ref="container" class="box-container" :class="{active:isFocus}">
  <div ref="box" class="box" :style="boxStyle">
    <slot/>
  </div>
</div>
</template>

<script>
import store from "../store/";
import Vue from "vue";
import browserDetect from "browser-detect";
const isIOS = browserDetect().os.indexOf("OS") > -1;

export default {
  props: {},
  watch: {},
  name: "boxItem",
  data() {
    return {
      isFocus: false,
      boxStyle: {
        width: 0,
        fontSize: "100%",
        left: 0
      }
    };
  },
  computed: {
    page: () => store.state.ui.page
  },
  watch: {
    page(val) {
      this.resize();
    }
  },
  created() {},
  mounted() {
    const _self = this;
    $(window).bind("resize scroll", this.resize);
    this.resize();
    $(document).on("focus", "input", e => {
      const target = e.target;
      _self.isFocus = true;
      if (!isIOS) {
        setTimeout(() => {
          target.scrollIntoView({
            behavior: "smooth",
            block: "end"
          });
        }, 400);
      }
    });
    $(document).on("blur", "input", () => {
      _self.isFocus = false;
    });
  },
  updated() {},
  components: {},
  methods: {
    resize() {
      if (this.isFocus) {
        return;
      }
      setTimeout(() => {
        const ratio = 720 / 1332;
        const $container = this.$refs.container;
        const W = $container.clientWidth;
        const H = $container.clientHeight;
        const ww = $(window).width();
        const hh = $(window).height();
        const w = H * ratio > ww ? ww : H * ratio;
        const h = H * ratio ? H : ww * ratio;
        const b = w * H;
        const fontSize = `${w / 720 * 100}%`;
        const left = w > W ? -(w - W) / 2 : 0;
        this.boxStyle.width = w + "px";
        this.boxStyle.height = h + "px";
        this.boxStyle.left = left + "px";
        this.boxStyle.fontSize = fontSize;
      }, 600);
    }
  }
};
</script>

<style lang="scss" scoped>
.box-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  &.active {
    overflow: hidden;
    overflow-y: auto;
  }
  .box {
    // border: 1px solid black;
    display: block;
    height: 100%;
    margin: 0 auto;
    position: relative;
    overflow: visible;
    .container,
    .view {
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      position: absolute;
      overflow-y: auto;
    }
  }
}
</style>
