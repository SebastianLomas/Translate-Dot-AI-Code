const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const config = {
    mode: 'development',
    entry: path.resolve(__dirname,'src','index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader','css-loader', 'sass-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node-modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        cacheCompression: false,
                        cacheDirectory: true
                    }
                }
            }
        ]
    },
    cache: {
        type: 'filesystem'
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'src','index.html'),
            title: "Caching"
        })
    ],
    experiments: {
        topLevelAwait: true
    },
    devServer: {
        port: 5000,
        open: true
    },
    devtool: 'source-map'
}

module.exports = (env, argv) => {
    if(argv.mode === "production") {
        config.mode = "production"
        config.devtool = false
    }

    return config
}