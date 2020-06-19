const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
module.exports = {
  entry: {
    // eslint-disable-next-line no-undef
    bundle: path.resolve(__dirname, "../src/main.js")
  },
  output: {
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[hash].js"
  },
  resolve: {
    extensions: ["*", ".js", ".json", ".vue"],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }, {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
        },
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader", "postcss-loader"]
      }, {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader", 'postcss-loader']
      }, {
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: "[name].[ext]",
              esModule: false
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
    // eslint-disable-next-line no-undef
      template: path.resolve(__dirname, "../public/index.html")
    }),
    new VueLoaderPlugin(),
  ]
}
