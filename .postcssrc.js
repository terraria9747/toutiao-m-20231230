module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // - 如果是 Vant 的样式，就把 `rootValue` 设置为 37.5 来转换
      // - 如果是我们的样式，就按照 75 的 `rootValue` 来转换
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*'],
      // 禁止rem适配转换的文件
      exclude: 'github-markdown'
    }
  }
}
