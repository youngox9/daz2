<template>
    <div class="page-modal" :class="{active:open}">
      <div class="wrap">
        <!-- <svg-progress-bar value="16" type="rect" :options="{gradientColor: ['rgb(33, 150, 243)','rgb(0, 0, 0)']}"></svg-progress-bar> -->
      </div>
    </div>
</template>
<script>
import store from "../store/";
import svgProgressBar from "svg-progress-bar";
export default {
  components: {
    svgProgressBar
  },
  props: {},
  data() {
    return {
      value: 100,
      options: {
        radius: 100
      },
      open: true
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {
    setTimeout(() => {
      this.open = false;
    }, 2000);
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.page-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  visibility: hidden;
  opacity: 0;
  transition: 0.3s ease all;
  background-color: rgba(255, 255, 255, 1);
  .wrap {
    // content: "";
    // opacity: 0;
    position: absolute;
    width: 100px;
    height: 100px;
    display: block;
    border-radius: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 0%);
    transform-origin: center;
    transition: 0.6s ease all;
    box-shadow: 1px 2px 3px #aaa;
    background: white url("../../img/logo.png") center/60% no-repeat;
  }
  &.active {
    visibility: visible;
    opacity: 1;
    &:after {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
}
</style>