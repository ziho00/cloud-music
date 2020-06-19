const merge = require("webpack-merge")
const path = require("path")
const baseConfig = require("./webpack.base.conf")

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [],
  },
  devServer: {
    // eslint-disable-next-line no-undef
    contentBase: path.resolve(__dirname, "../dist"),
    open: true,
  },
})
