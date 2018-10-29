<template>
  <div class="test">
    <h1 class="h1">{{ msg }}</h1>
    <h3 class="h3">Installed CLI Plugins</h3>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
h3
  margin 40px 0 0

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983

.test
  border 5px solid green

.h1
  color green

.h3
  color blue
</style>
