<template>
  <div :class="$style.about">
    <img alt="Vue logo" src="../assets/logo.png">
    <div :class="$style.test">
      <p>测试样式</p>
      <Test2 msg="Welcome to Your Vue.js App"
        :parentStyle="parentStyle">
        <div :class="$style.slot">slot content</div>
      </Test2>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Test2 from "@/components/Test2.vue";
import style from "@/style/test.styl";

console.log(style);

export default {
  name: "home",
  data() {
    return {
      parentStyle: style.aa,
    }
  },
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

.slot
  color lightblue
</style>
