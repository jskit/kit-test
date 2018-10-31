<template>
  <div :class="$style.test">
    <h1 :class="$style.h1">{{ msg }}</h1>
    <h3 :class="$style.h3">Installed CLI Plugins</h3>
    <slot></slot>
    <button :class="$style['btn-lg']">btn-lg</button>
    <button :class="$style.btnLg">btnLg</button>
    <button :class="[$style.btn, parentStyle]">{{msg}}</button>
    <button :class="[$style['btn-info']]">composes</button>
    <span :class="{ [$style['text-extend']]: isExtend }">扩展支持</span>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
    parentStyle: String,
  },
  data() {
    return {
      isExtend: true
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" module>
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

.btn
  background gray

.btn-info
  composes btn
  color $color-info

.test
  border 2px solid

.h1
  color green

.h3
  color blue

.btn-lg
  padding 20px
  color $color-success

.btnLg
  padding 30px
  color $color-info

.text-extend
  composes: aa from '../style/test.styl';
  display inline-block
  margin 20px 0
  border-top 4px solid orange
</style>
