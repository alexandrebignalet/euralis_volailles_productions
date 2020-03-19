const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const applicationName = "Euralis Volailles Productions";

module.exports = function(env = {}) {
    return {
        entry: {
            renderer: path.join(__dirname, 'app/renderer/app.bootstrap.js')
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: [/node_modules/],
                    loader: 'babel-loader'
                },
                { test: /\.(html|txt)$/, loader: 'raw-loader' },
                {
                    test: /\.(scss|sass)$/,
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'css-loader', options: { url: false } },
                        { loader: 'sass-loader' }
                    ]
                },
                {
                    test: /\.(png|jpg|JPG|svg|mp4|gif|ico)/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 100000,
                            name: 'images/[name].[ext]'
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'css-loader', options: { url: false } }
                    ]
                },
                {
                    test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 100000,
                            mimetype: 'image/application/font-woff',
                            name: '/fonts/[name].[ext]'
                        }
                    }]
                },
                {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 100000,
                            mimetype: 'image/application/octet-stream',
                            name: 'fonts/[name].[ext]'
                        }
                    }]
                },
                {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]'
                        }
                    }]
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 100000,
                            mimetype: 'image/svg+xml',
                            name: 'fonts/[name].[ext]'
                        }
                    }]
                }
            ]
        },
        output: {
            filename: 'js/[name].bundle.js',
            publicPath: '/'
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /node_modules/,
                        chunks: 'initial',
                        name: 'vendor',
                        enforce: true
                    }
                }
            }
        },
        node: {
            __dirname: false,
            __filename: false
        },
        resolve: {
            alias: {
                '$': path.resolve(__dirname, 'node_modules/jquery/dist/jquery.js'),
                'jquery': path.resolve(__dirname, 'node_modules/jquery/dist/jquery.js')
            }
        },
        plugins: [
            new LodashModuleReplacementPlugin(),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: applicationName,
                template: './app/index.ejs',
                templateParameters: {
                    title: applicationName,
                    base: env.electron ? './' : '/'
                },
                scriptLoading: 'defer'
            }),
            new webpack.ProvidePlugin({
                'window.jQuery': 'jquery', //in order to load it in angular
                $: 'jquery',
                jQuery: 'jquery',
                jquery: 'jquery'
            })
        ]
    }
};
