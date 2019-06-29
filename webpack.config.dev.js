/* eslint-disable */
const webpack = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const pageConfig = require('./page.config.js');
const vConsolePlugin = require('vconsole-webpack-plugin');
const webpackConfigBase = require('./webpack.config.base');
const merge = require("webpack-merge");

let webpackConfig = {
  mode: 'none',
  // 配置入口
  entry: {},
  // 配置出口
  output: {
    path: path.join(__dirname, "./dist/"),
    filename: 'static/js/[name].[hash:7].js',
    publicPath: '/',
  },
  devtool: 'source-map',
  // 起本地服务
  devServer: {
    contentBase: path.join(__dirname, '/'),
    historyApiFallback: true,
    inline: true,
    hot: true,
    host: '127.0.0.1',
    port: '8088'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: [path.join(__dirname, "./src/i18n")],
        include: [path.join(__dirname, "./src")],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      // html中的img标签
      {
        test: /\.html$/,
        loader:'html-withimg-loader',
        include: [path.join(__dirname, "./src")],
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, "./src")],
        options: {
          presets: ["@babel/preset-env"],
          plugins: ['@babel/plugin-syntax-dynamic-import']
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            // 'css-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            'sass-loader'
          ],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
      }
    ]
  },
  plugins:[
    //设置每一次build之前先删除dist
    new CleanWebpackPlugin(
      ['dist/*',],　     //匹配删除的文件
      {
          root: __dirname,   //根目录
          verbose: true,    //开启在控制台输出信息
          dry: false     //启用删除文件
      }
    ),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'static/css/[name].[hash:7].css'
    }),
  ]
};

if(pageConfig && Array.isArray(pageConfig)){
  pageConfig.map(page => {
    webpackConfig.entry[page.name] = `./src/pages/${page.jsEntry}`;
    webpackConfig.plugins.push(new HtmlWebpackPlugin({
      filename: path.join(__dirname,`/dist/${page.name}.html`),
      template: path.join(__dirname,`/src/pages/${page.html}`),
      inject: true,
      chunks: [page.name],
      inlineSource: '.(js|css)$',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      chunksSortMode: 'dependency'
    }))
  })
}


module.exports = merge(webpackConfigBase, webpackConfig);
