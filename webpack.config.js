const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // 入口
    entry: './src/main.js',
    // 输出
    output: {
        filename: './assets/index.js',
        path: resolve(__dirname, 'dist'),
        clean: true
    },
    // loader
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(jpg|png|gif)$/,
                generator: {
                    filename: 'assets/[name][ext]'
                }
            },
            {
                test: /\.(ttf|woff2)$/,
                generator: {
                    filename: 'assets/[name][ext]'
                }
            }
        ]

    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(__dirname, "./index.html"),
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/index.css'
        })

    ],
    devServer: {
        contentBase: resolve(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    mode: 'production'
}
