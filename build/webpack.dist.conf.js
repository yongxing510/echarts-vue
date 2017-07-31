var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('../config')
var rootPath = path.resolve(__dirname, '../');

// var webpackConfig = merge(baseWebpackConfig, );



var webpackConfig = {
  entry: {
    'v-echarts-full': path.resolve(__dirname, '../src/components/echarts/index-full.js')
  },
  devtool: '#source-map',
  output: {
    path: config.build.bundleRoot,
    filename: '[name].js',
    chunkFilename: '[id].js',
    library: 'ECharts',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.js', '.vue'],
    modules: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'src': path.resolve(__dirname, '../src'),
      '@': path.resolve(__dirname, '../src')
    }
  },
  resolveLoader: {
    modules: [path.join(__dirname, '../node_modules')]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': "'production'"
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      comments: false,
      // mangle: {
      //   except: [],
      //   screw_ie8: false,
      //   keep_fnames: true
      // },
      compress: {
        // drop_console: true,
        // collapse_vars: true,
        // screw_ie8: false,
        warnings: false,
        reduce_vars: true
      }
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: 'css/[name].css'
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/components/echarts'),
        to: path.resolve(config.build.bundleRoot, './v-echarts'),
        ignore: ['.*']
      }
    ])
  ],
  module: {
    rules: [{
      test: /\.vue$/,
      enforce: 'pre',
      use: 'eslint-loader',
      include: rootPath,
      exclude: /node_modules/
    }, {
      test: /\.js$/,
      enforce: 'pre',
      use: 'eslint-loader',
      include: rootPath,
      exclude: /node_modules/
    }, {
      test: /\.vue$/,
      use: 'vue-loader'
    }, {
      test: /\.js$/,
      use: 'babel-loader',
      include: rootPath,
      exclude: /node_modules/
    }]
  }
};

module.exports = webpackConfig;
