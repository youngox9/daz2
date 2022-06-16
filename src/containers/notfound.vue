<template>
<div>
  <div class="container">
    <h2>頁面找不到</h2>
  </div> 
</div>
</template>

<script>
import Vue from "vue";
import boxItem from "../components/boxItem";

export default {
  name: "homepage",
  components: {
    boxItem
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  updated() {},
  computed: {},
  methods: {}
};
</script>

<style scoped lang="scss">
h2 {
  font-size: 2em;
  text-align: center;
  top: 20%;
  left: 20%;
  position: absolute;
}
</style>
