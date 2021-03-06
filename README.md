# kit-test

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your end-to-end tests
```
yarn run test:e2e
```

### Run your unit tests
```
yarn run test:unit
```

## FAQ

当前还存在的问题

- 变量怎么使用，和预处理器搭配
- 统一引入`var.styl`，如何设置
- 父子组件相互控制的案例

- https://cssinjs.org
- https://cli.vuejs.org/zh/guide/css.html#css-modules
- https://github.com/css-modules/css-modules

学过网页开发就会知道，CSS 不能算编程语言，只是网页样式的一种描述方法。

为了让 CSS 也能适用软件工程方法，程序员想了各种办法，让它变得像一门编程语言。从最早的Less、SASS，到后来的 PostCSS，再到最近的 CSS in JS，都是为了解决这个问题。

CSS Modules 与以上不同，它不是将 CSS 改造成编程语言，而是功能很单纯，只加入了局部作用域和模块依赖，这恰恰是网页组件最急需的功能。

当前 CSS 面临的问题

- 全局污染
- 命名混乱
- 依赖管理不彻底
- 无法共享变量
- 代码压缩不彻底

现代Web开发中的CSS离完美还差得远，这并不奇怪。现在，项目通常是相当的复杂的，而CSS样式又是全局性的，所以到最后总是极容易地发生样式冲突：**样式相互覆盖或隐式地级联到我们未考虑到的元素**。

为了减轻CSS存在的主要痛点，我们在项目中普遍采用[BEM]()的方法来。不过这只能解决CSS问题中的一小部分。

- https://www.w3cplus.com/vue/scoped-styles-vs-css-modules.html
- https://stackoverflow.com/questions/25609678/what-do-deep-and-shadow-mean-in-a-css-selector
- https://developers.google.com/web/updates/2017/10/remove-shadow-piercing?hl=zh-cn

### 作用域CSS

在Vue中引入了CSS作用域`scoped`这个概念，`scoped`的设计思想就是让当前组件的样式不会影响到其他地方的样式，编译出来的选择器将会带上`data-v-hash`的方式来应用到对应的组件中，这样一来，CSS也不需要添加额外的选择器。也将解决CSS中选择器作用域和选择器权重的问题。

在Vue中，为了让作用域样式工作，只需要在`<style>`标签添加`scoped`属性：

```vue
<!-- Button.vue -->
<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn {
  color: red;
}
</style>
```

- 优势
  - 启用很简单，使用也很简单，不需要额外的知识
- Q: 使用作用域样式 `scoped` 存在的问题
  - 父组件级联子组件样式不生效
  - 对 `v-html` 中内在的标签样式不生效
  - A: 这种情况可以使用 `>>>` 连接符或者 `/deep/` 来解决，但这样也失去了组件封装的效果

在Vue中 `scoped` 属性的渲染规则

- 给DOM节点添加一个不重复的 `data` 属性（比如`data-v-7ba5bd90`）来表示他的唯一性
- 在每个CSS选择器末尾（编译后生成的CSS）加一个当前组件的`data`属性选择器（如[`data-v-7ba5bd90`]）来私有化样式。选择器末尾的`data`属性和其对应的DOM中的`data`属性相匹配
- 如果组件内部包含有其他组件，只会给其他组件的最外层标签加上当前组件的`data`属性

### 模块化CSS

- https://juejin.im/entry/5a37690d6fb9a045132acb15
- https://github.com/css-modules/css-modules
- https://cli.vuejs.org/zh/guide/css.html#css-modules
- http://www.ruanyifeng.com/blog/2016/06/css_modules.html
- https://github.com/camsong/blog/issues/5

CSS Modules的流行起源于React社区，它获得了社区的迅速的采用。Vue更甚之，其强大，简便的特性再加上Vue-cli对其开箱即用的支持，将其发展到另一个高度。

在Vue中使用CSS Modules和作用域CSS同样的简单。和作用域CSS类似，在`<style>`标签中添加`module`属性。比如像下面这样：

```vue
<!-- Button.vue -->
<template>
  <button :class="$style.btn">
    <slot></slot>
  </button>
</template>

<style module>
.btn {
  color: red;
}
</style>
```

你可以通过 `<style module>` 以开箱即用的方式[在 `*.vue` 文件中使用 CSS Modules](https://vue-loader.vuejs.org/zh/guide/css-modules.html)。

`:class="$style.btn"` 会被 `vue-template-compiler` 编译成为类似 `.Button_btn_3ykLd` 这样的类名，并且样式的选择器也自动发生了相应的变化。

NOTE:

> 这里有一点需要注意，我们平时有可能在类名中会使用分隔线，比如：`btn-bg`，如果通过$style调用该类名时要是写成`$style.btn-lg`，这样写是一个不合法的JavaScript变量名，此时编译会报错，应写成`$style['btn-lg']`。

原理：`module`属性会经由Vue-loader编译后，在我们的`component`产生一个叫`$style`的隐藏的`computed`属性。也就是说，我们甚至可以在Vue生命周期的`created`钩子中取得由CSS Modules生成的`class`类名：

如果我们想要在JavaScript里面将独立的CSS文件作为CSS模块来加载的话，需要在`.css`文件名前添加`.module`前缀，比如：

```vue
<script>
import styles from './src/style/foo.module.css';
</script>
or
<script>
import sassStyle from './src/scss/foo.module.scss'；
</script>
```

如果你想去掉文件名中的 `.module`，可以设置 `vue.config.js` 中的 `css.modules` 为 `true`：

使用`module`和`scoped`不一样的地方就是在于所有创建的类可以通过`$style`对象获取。因此类要应用到元素上，就需要通过`:class`来绑定`$style`这个对象。它的好处是，当我们在HTML中查看这个元素时，我们可以立刻知道它所属的是哪个组件。

- 优势
  - 启用很简单，使用依然是 CSS，几乎 0 学习成本
  - 样式默认是局部的（:local），解决了命名冲突和全局污染问题
    - 如需全局样式，使用 :global
  - class 名生成规则配置灵活，可以此来压缩 class 名
  - 可以通过`props`将`class`传到子组件中
  - 可以使用 `compose` 组合样式
  - 实现CSS，JS变量共享
  - 命名都会以组件名为前缀，更直观，控制更彻底

- 局部作用域
- 全局作用域
- 定制哈希类名
- Class的组合

## 总结

不管是CSS Modules还是作用域CSS，这两种方案都非常简单，易用。在某种程度上解决的是同样的痛点（CSS的痛）。那么你应该选择哪种呢？

`scoped`样式的使用不需要额外的知识，给人舒适的感觉。它所存在的局限，也正它的使用简单的原因。它可以用于支持小型到中型的Web应用程序。在更大的Web应用程序或更复杂的场景中，对于CSS的运用，我们更希望它是显式的，更具有控制权。比如说，你的样式可以在多组件中重用时，那么`scoped`的局限性就更为明显了。反之，CSS Modules的出现，正好解决了这些问题，不过也要付出一定的代价，那就是需要通过`$style`来引用。虽然在`<template>`中大量使用`$style`，让人看起来很蛋疼，但它会让你的样式更加安全和灵活，更易于控制。CSS Modules还有一个好处就是可以使用JavaScript获取到我们定义的一些变量，这样我们就不需要手动保持其在多个文件中同步。

最后还是那句话，**任何解决CSS的方案，没有最好的，只有最合适的！** 我们应该根据自己的项目、场景和团队进行选择。当然，不管选择哪种方案，都是为了帮助我们更好的控制样式，解决原生CSS中存在的痛点。

最终探究的方案

- 使用css-modules 以及其中的组合
- 不使用css-modules 的变量，使用 cssnext 的
- 和stylus 搭配是否有问题
- 和postcss 搭配是否有问题
