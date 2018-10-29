<template>
  <div :class="$style.about">
    <img alt="Vue logo" src="../assets/logo.png">
    <div :class="$style.test">
      <p>测试样式</p>
      <Test2 msg="Welcome to Your Vue.js App">
        <div :class="$style.slot">slot content</div>
      </Test2>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Test2 from "@/components/Test2.vue";

export default {
  name: "home",
  components: {
    Test2
  }
};
</script>

<style lang="stylus" module>
.test
  color red
  border 1px solid

.test .h1
  color yellow

.test >>> .h1
  color orange

.slot
  color lightblue
</style>
