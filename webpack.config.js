const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

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
                test: /\.(png)$/,
                generator: {
                    filename: 'assets/[name][ext]'
                }
            },
            {
                test: /\.(ttf|woff2)$/,
                generator: {
                    filename: 'assets/[name][ext]'
                }
            },
            {
                test: /\.json$/,
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
        }),
        // css压缩
        new CssMinimizerPlugin(),
    ],
    mode: 'production',
    // 开发服务器
    devServer: {
        compress: true,
        open: true,
        hot: true,
        port: 9000
    }
}
