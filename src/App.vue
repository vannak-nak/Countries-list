<template>
  <HeaderBlock></HeaderBlock>
  <HomePage></HomePage>
</template>

<script lang="ts">
import HomePage from "./components/HomePage.vue";
import HeaderBlock from "./components/HeaderBlock.vue";

export default {
  name: "App",
  components: {
    HomePage,
    HeaderBlock,
  },
};
</script>

<style lang="scss">
*{
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.wrap{
    width: 1200px;
    margin: 0 auto;
    background: #fff;
}
</style>
