// entry: {main: './src/script.js'},

const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

function reloadHtml() {
    this.plugin('compilation',
      thing => thing.plugin('html-webpack-plugin-after-emit', trigger));
    const cache = {};
    function trigger(data, callback) {
      const orig = cache[data.outputName];
      const html = data.html.source();
      if (orig && orig !== html)
        devServer.sockWrite(devServer.sockets, 'content-changed');
      cache[data.outputName] = html;
      callback();
    }
  }

module.exports = {
    entry: { main: './src/script.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: isDev ? '[name].[hash].js' : '[name].[chunkhash].js'
    },
    devServer: {
        hot: true,
        before(app, server) {
            server._watch(`./index.html`);
        }
    },
    watchOptions: {
        ignored: /node_modules/
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            ////////////
            {
                test: /\.css$/i,
                use: [
                    (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
                    'css-loader',
                    'postcss-loader'
                ]
            },
            //   {
            //     test: /\.css$/,
            //     use:  [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] // добавили минификацию CSS
            //   },
            //////////////
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        },
                    },
                ],
            },

            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader?name=./vendor/[name].[ext]'
            }

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default'],
            },
            canPrint: true
        }), // подключите плагин после MiniCssExtractPlugin
        new HtmlWebpackPlugin({
            // inject: false,
            template: './index.html',
            filename: 'index.html'
        }),
        // new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};