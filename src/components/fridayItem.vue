<template>
<div class="fridayWrap" ref="wrap">
  <iframe ref="iframe" :width="width" :height="height" :src="src" frameborder="0" scrolling="no" :style="iframeStyle"></iframe>
</div>
</template>
<script>
export default {
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    src: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      iframeStyle: {
        height: this.height,
        widht: this.width,
        transform: "scale(0)"
      }
    };
  },
  watch: {},
  created() {},
  mounted() {
    $(window).resize(this.resize);
    this.resize();
  },
  methods: {
    resize() {
      const $wrap = $(this.$refs.wrap);
      const ww = $wrap.width();
      const hh = $wrap.height();
      const rect = ww;
      const ori = this.width;
      const ratio = rect / ori;
      this.iframeStyle.transform = `scale(${ratio})`;
    }
  }
};
</script>
<style lang="scss">
.fridayWrap {
  position: absolute;
  top: 0%;
  left: 0%;
  height: 100%;
  width: 100%;
  overflow: hidden;
  iframe {
    position: relative;
    display: block;
    transform-origin: 0 0;
  }
}
</style>