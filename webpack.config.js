// webpack.config.js
// const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

console.log("ENVIRONMENT", process.env.NODE_ENV);

module.exports = {
    mode: process.env.NODE_ENV, // NODE_ENV environment variable from package.json
    entry: "./client/index.js",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        publicPath: '/' //used for base path for other assets
    },
    devServer: {
        static: {
            publicPath: "/",
            directory: path.join(__dirname, "/client"),
        },
        compress: true,
        open: true,
        hot: true,
        port: 8080,
        proxy: {
        "/api": "http://localhost:3000/",
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'client/index.html'
        })
    ],
    // Other webpack configuration settings
    module: {
        rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
            loader: "babel-loader",
            options: {
                presets: ["@babel/react", "@babel/env"],
            },
            },
        },
        {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [
            "style-loader", // 3. Inject styles into DOM
            "css-loader", // 2. Turns css into commonjs
            "sass-loader"
            ],
        },
        ],
    },
};