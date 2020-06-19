const merge = require("webpack-merge")
const path = require("path")
const baseConfig = require("./webpack.base.conf")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = merge(baseConfig, {
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [ // 自己拓展着玩呀

    ],
  },
  plugins: [
    new CleanWebpackPlugin({
    // eslint-disable-next-line no-undef
      root: path.resolve(__dirname, "../"),
      verbose: true,
      dry: false,
    }),
  ],
})
