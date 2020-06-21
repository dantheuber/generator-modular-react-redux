const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VersionFile = require('webpack-version-file');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MoveScriptExtHtmlWebpackPlugin = require('./move-script-ext-html-webpack-plugin');
const paths = require('./paths');
const packageJson = require('../package.json');
const resolveApp = require('./resolveApp');

const DEV_SERVER_PORT = 9002;

module.exports = {
  devtool: 'source-map',
  entry: {
    vendor: paths.vendor,
    app: paths.app,
  },
  output: {
    filename: '[name].[chunkhash].bundle.js',
    path: paths.dist,
    publicPath: paths.publicUrl,
    chunkFilename: '[name].[chunkhash].bundle.js',
  },
  module: {
    rules: [
      {
        test: /(?<!\.raw)\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
              },
            },
            'postcss-loader',
          ],
        }),
        exclude: /node_modules(?!\/semantic-ui-css)/,
      },
      {
        test: /\.raw\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            'postcss-loader',
          ],
        }),
        exclude: /node_modules(?!\/semantic-ui-css)/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            'postcss-loader',
          ],
        }),
        include: /node_modules(?!\/semantic-ui-css)/,
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        include: paths.src,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        include: paths.src,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: paths.public,
      to: paths.dist,
      ignore: [
        'index.html',
      ],
    }]),
    new VersionFile({
      output: paths.versionFile,
      template: paths.versionTemplateFile,
      data: {
        buildDate: new Date(),
        buildEnvironment: 'development',
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['app', 'vendor'],
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss() {
          return [
            autoprefixer({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9',
              ],
            }),
          ];
        },
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.APP_VERSION': JSON.stringify(packageJson.version),
    }),
    new ExtractTextPlugin('[name].[chunkhash].bundle.css'),
    new HtmlWebpackPlugin({
      inject: true,
      templateParameters: {
        cacheBustQuery: `?t=${Date.now()}`,
        publicPath: '/',
      },
      template: paths.indexHtml,
    }),
    new MoveScriptExtHtmlWebpackPlugin({
      headScripts: ['manifest'],
    }),
    new ScriptExtHtmlWebpackPlugin({
      preload: {
        test: [
          'vendor',
          'app',
        ],
      },
    }),
  ],
  devServer: {
    contentBase: resolveApp('dist'),
    compress: true,
    host: 'localhost',
    port: DEV_SERVER_PORT,
    publicPath: '/',
    watchContentBase: true,
    historyApiFallback: true,
    disableHostCheck: true,
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    ignored: /node_modules/,
    poll: 500,
  },
};
