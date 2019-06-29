const path = require('path');
const webpack = require("webpack");
const vConsolePlugin = require('vconsole-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

let vConsolePluginState = false;
process.env.env_config !== 'prod' ? vConsolePluginState = true : vConsolePluginState = false;

console.log(process.env.env_config, process.env.NODE_ENV);
module.exports = {
  resolve: {
    alias: {
      tinaI18n: path.resolve(__dirname, 'src/i18n')
    }
  },
  plugins: [
    new vConsolePlugin({
      // enable: vConsolePluginState
      enable: false
    }),
    new webpack.DefinePlugin({      // 配置的全局常量 (指定为生产环境，进而让一些library可以做一些优化)
      'process.env.env_config': JSON.stringify(process.env.env_config),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new CopyPlugin([
      {from: path.join(__dirname, "./src/public"), to: path.join(__dirname, "./dist/public")},
      {from: path.join(__dirname, "./src/i18n"), to: path.join(__dirname, "./dist/i18n")}
    ])
  ]
};
