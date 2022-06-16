<template>
    <div class="loading-modal" :class="{active:config}"></div>
</template>
<script>
import store from "../store/";

export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    config: () => store.state.ui.loading_modal
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.loading-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  visibility: hidden;
  opacity: 0;
  transition: 0.3s ease all;
  background-color: rgba(0, 0, 0, 0.86);
  &:after {
    content: "";
    opacity: 0;
    position: absolute;
    width: 64px;
    height: 64px;
    display: block;
    border-radius: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 0%);
    transform-origin: center;
    transition: 0.6s ease all;
    background: white url("../../img/loading.svg") center/48px no-repeat;
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