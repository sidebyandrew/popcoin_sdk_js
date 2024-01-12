const path = require('path');

module.exports = {
    entry: './src/popcoin_sdk.ts', // 入口文件
    output: {
        filename: 'popcoin_sdk.js', // 输出文件名
        path: path.resolve(__dirname, 'dist'), // 输出路径
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'], // 解析这些扩展名的文件
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
};
