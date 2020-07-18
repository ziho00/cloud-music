const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  entry: {
    // eslint-disable-next-line no-undef
    bundle: path.resolve(__dirname, '../src/main.js')
  },
  output: {
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, '../cloudMusic'),
    filename: '[name].[hash].js',
    publicPath: '/player/'
  },
  devServer: {
    hot: true,
    historyApiFallback: {
      rewrites: [{
        from: /.*/g,
        to: '/index.html' //与output的publicPath有关(HTMLplugin生成的html默认为index.html)
      }]
    }
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.vue'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@utils': path.resolve(__dirname, '../src/utils')
    }
  },
  externals: { // 使用外部 CDN 引入的 JS 库
    'vue':'Vue',
    'axios':'axios',
    'vuex': 'Vuex',
    'vue-router': 'VueRouter',
    'better-scroll': 'BScroll'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader']
      }, {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
      }, {
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: '[name].[ext]',
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
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new VueLoaderPlugin()
  ]
}
