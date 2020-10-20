const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')

module.exports = webpackMerge.merge(
  commonConfiguration,
  {
    mode: 'development',
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      contentBase: './dist',
      open: true,
      hot: true
    },
    module: {
      rules: [
        {
          test: /\.(styl|css)$/,
          use: [
            'style-loader',
            'css-loader',
            'stylus-loader'
          ]
        }
      ]
    }
  }
)
