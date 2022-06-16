<template>
<div class="full-ticket" :class="{active:ticketModal}">
  <div class="wrap">
    <div class="close" @click="close()"></div>
    <img src="img/winner_screen_1.png" v-if="prize === 4">
    <img src="img/winner_screen_2.png" v-if="prize === 5">
  </div>
</div>
</template>
<script>
import store from "../store/";

export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {
    ticketModal(val) {
      if (val === true) {
        switch (this.prize) {
          case 4:
            store.commit("setPage", "win_drink");
            break;
          case 5:
            store.commit("setPage", "win_buffy");
            break;
        }
      }
    }
  },
  computed: {
    ticketModal: () => store.state.ui.ticketModal,
    prize: () => store.state.prize.prize
  },
  created() {},
  mounted() {},
  methods: {
    close() {
      store.commit("setTick", false);
      this.$router.push({
        path: "/"
      });
    },
    isActive() {
      return this.prize === 4 || this.prize === 5;
    }
  }
};
</script>
<style lang="scss" scoped>
.full-ticket {
  position: absolute;
  z-index: 9;
  overflow-y: auto;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: white;
  padding-top: 2em;
  visibility: hidden;
  opacity: 0;
  transform: translate(0, 100%);
  transition: 0.3s ease all;
  &.active {
    visibility: visible;
    opacity: 1;
    transform: translate(0, 0%);
  }
  > .wrap {
    position: relative;
    height: 100%;
    width: 100%;
    .close {
      z-index: 2;
      position: absolute;
      right: 6px;
      top: 6px;
      width: 42px;
      height: 42px;
      background: url("../../img/bt_close.png") center/contain no-repeat;
    }
    > img {
      display: block;
      width: 100%;
    }
  }
}
</style>