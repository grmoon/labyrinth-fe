const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const mode = process.env.NODE_ENV == 'production' ? 'production': 'development';
const path = require('path');

module.exports = {
    devtool: mode == 'production' ? '' : 'source-map',
    mode,
    entry: {
        'app': path.resolve('src', 'index')
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        historyApiFallback: true
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                use: [
                    'vue-loader',
                    'eslint-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    'eslint-loader'
                ]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    mode == 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                exclude: /node_modules/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.worker\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'worker-loader',
                    options: {
                        publicPath: '/'
                    }
                }]
            }
        ]
    },
    resolve: {
        alias: {
            '@components': path.resolve('src', 'components'),
            '@enums': path.resolve('src', 'js', 'enums'),
            '@img': path.resolve('src', 'img'),
            '@js': path.resolve('src', 'js'),
            '@labyrinth': path.resolve('src', 'js', 'labyrinth'),
            '@workers': path.resolve('src', 'js', 'workers')
        },
        extensions: ['.vue', '.js', '.svg', '.worker.js']
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve('src', 'html', 'index.html')
        }),
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve()
        }),
        new VueLoaderPlugin()
    ]
}