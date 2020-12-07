const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

const reactConfig = (env, args) => {
    const isProduction = args.mode === "production";

    return {
        entry: { reactApp: "./src/index.tsx" },
        target: "electron-renderer",
        devtool: isProduction ? undefined : "source-map",
        output: {
            filename: isProduction
                ? "[name].[contenthash].js"
                : "[name].bundle.js",
            path: path.resolve(__dirname, "dist", "renderer"),
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
        },
        optimization: {
            moduleIds: "deterministic",
            minimize: isProduction,
            runtimeChunk: "single",
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all",
                    },
                },
            },
        },
        devServer: {
            historyApiFallback: true,
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "awesome-typescript-loader",
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, "src", "index.html"),
            }),
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css",
            }),
            isProduction
                ? new CleanWebpackPlugin()
                : new webpack.HotModuleReplacementPlugin(),
        ],
    };
};

module.exports = reactConfig;
