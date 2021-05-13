/* postcss 配置文件 */
module.exports = {
  plugins: {
    // autoprefixer: {
    //   overrideBrowserslist: ['Android >= 4.0', 'IOS >= 8']
    // },
    'postcss-pxtorem': {
      // 转换的根元素基准值
      rootValue: 37.5,
      // 需要转换的属性
      propList: ['*']
    }
  }
}
