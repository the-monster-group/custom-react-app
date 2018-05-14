const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = (env, argv) => ({
  entry: {
    app: './src/index.js'
  },
  module: {
    rules: [
      { //scripts
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?cacheDirectory=true'
        }
      },
      { //images
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
              outputPath: 'assets/images/',
              publicPath: argv.mode === 'development' ? '' : '../images/'
            }
          }
        ]
      },
      { //fonts
        test: /\.(otf|ttf|eot|svg|woff(2)?)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
              outputPath: 'assets/fonts/',
              publicPath: argv.mode === 'development' ? '' : '../fonts/'
            }
          }
        ]
      },
      { //css components
        test: /\.s?[ac]ss$/,
        exclude: /vendors\.scss$/,
        use: [
          argv.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,    
              modules: true,
              sourceMap: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          'sass-loader',
        ],
      },
      { //css node_modules/vendors/globals
        test: /vendors\.scss$/,
        use: [
          argv.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      }
    ]
  },
  output: {
    path: __dirname + '/dist',
    filename: 'assets/scripts/[name].js',
    chunkFilename: 'assets/scripts/[id].js'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './dist'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        extractVendorsStyles: {
          test: /vendors\.s?css$/,
          name: "vendors",
          chunks: "all",
          enforce: false
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/styles/[name].css",
      chunkFilename: "assets/styles/[name].css"
    }),
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: __dirname + '/dist/index.html'
    })
  ]
});
