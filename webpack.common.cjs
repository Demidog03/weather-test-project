const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const isProd = process.env.NODE_ENV === 'production';
const envFile = isProd ? '.env.production' : '.env.development';

module.exports = {
    entry: path.resolve(__dirname, 'src/main.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: isProd ? 'js/[name].[contenthash].js' : 'js/[name].js',
        chunkFilename: isProd ? 'js/[name].[contenthash].chunk.js' : 'js/[name].chunk.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            vue$: 'vue/dist/vue.runtime.esm-bundler.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            appendTsSuffixTo: [/\.vue$/]
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: {
                                auto: (resourcePath) => resourcePath.endsWith('.module.scss')
                            }
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024
                    }
                },
                generator: {
                    filename: 'images/[name][hash][ext][query]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][hash][ext][query]'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new Dotenv({
            path: path.resolve(__dirname, envFile),
            safe: false,
            systemvars: true,
            silent: false,
            defaults: false,
            expand: true
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            filename: isProd ? 'css/[name].[contenthash].css' : 'css/[name].css',
            chunkFilename: isProd ? 'css/[name].[contenthash].chunk.css' : 'css/[name].chunk.css'
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true
                }
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ]
};
