const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const mode = process.NODE_ENV == 'production' ? 'development' : 'production';

module.exports = {
    devtool: 'source-map',
    mode,
    entry: {
        'app': path.resolve('src', 'index')
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
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    resolve: {
        alias: {
            '@components': path.resolve('src', 'components'),
            '@enums': path.resolve('src', 'js', 'enums'),
            '@img': path.resolve('src', 'img'),
            '@js': path.resolve('src', 'js'),
            '@labyrinth': path.resolve('src', 'js', 'labyrinth')
        },
        extensions: ['.vue', '.js', '.svg']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('src', 'html', 'index.html')
        }),
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve()
        }),
        new VueLoaderPlugin()
    ]
}