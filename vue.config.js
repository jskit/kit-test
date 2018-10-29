const path = require("path");
// const merge = require('deepmerge')

module.exports = {
  configureWebpack: config => {
    // console.log(config);
    config.resolve.extensions.push(".css", ".styl", ".md");
    config.resolve.alias["assets"] = path.resolve("./src/assets");
  },

  // chainWebpack: config => {
  //   config.module
  //     .rule('md')
  //     .test(/\.md$/)
  //       .use('raw-loader')
  //       .loader('raw-loader')
  // },

  css: {
    modules: true,
    loaderOptions: {
      // 给 stylus-loader 传递选项
      stylus: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/var.styl` 这个文件
        data: `@import "~@/style/var";`
      }
    }
  }
};
