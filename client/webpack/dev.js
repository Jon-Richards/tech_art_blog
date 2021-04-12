/* eslint-disable-next-line */
const path = require('path');
/* eslint-disable-next-line */
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
/* eslint-disable-next-line */
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

const CWD = process.cwd();

module.exports = () => ({
  mode: 'development',
  entry: {
    'pages.bundle': path.join(CWD, 'client', 'src', 'pages', 'pages.ts'),
  },
  output: {
    path: path.join(CWD, 'server', 'pages', 'static', 'pages'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env'],
                ['@babel/preset-typescript'],
              ],
            },
          },
          {
            loader: 'ts-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.scss?$/,
        use: [
          // generate a CSS file for each pack
          MiniCSSExtractPlugin.loader,
          // compile CSS into CommonJS
          'css-loader',
          // compile Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  devtool: 'inline-source-map',
  watchOptions: {
    poll: 1000,
  },
  target: 'web',
  plugins: [
    new MiniCSSExtractPlugin(),
    new ESLintWebpackPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
  ],
});
