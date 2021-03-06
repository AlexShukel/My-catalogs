const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const electronConfig = (env, args) => {
    const isProduction = args.mode === "production";

    return {
        target: "electron-main",
        node: {
            __dirname: false,
        },
        entry: { electron: path.resolve("src", "electron.ts") },
        output: {
            path: path.resolve(__dirname, "dist", "main"),
            filename: "[name].bundle.js",
        },
        devtool: isProduction ? undefined : "source-map",
        resolve: {
            extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
            modules: [path.resolve(__dirname, "src"), "node_modules"],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "awesome-typescript-loader",
                },
            ],
        },
        plugins: [new CleanWebpackPlugin()],
    };
};

module.exports = electronConfig;

// This were in CleanWebpackPlugin
// {
//     cleanOnceBeforeBuildPatterns: [
//         path.join(__dirname, "dist", "main", "**"),
//     ],
// }
