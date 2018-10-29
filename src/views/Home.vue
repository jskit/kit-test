<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div class="test">
      <p>测试样式</p>
      <Test1 msg="Welcome to Your Vue.js App">
        <div class="slot">slot content</div>
      </Test1>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Test1 from "@/components/Test1.vue";

export default {
  name: "home",
  components: {
    Test1
  }
};
</script>

<style lang="stylus" scoped>
.test
  color red
  border 1px solid

.test .h1
  color yellow

// >>>连接符
.test >>> .h1
  color orange

// /deep/ 已废弃
.test /deep/ .h1
  color blue

.slot
  color lightblue
</style>
