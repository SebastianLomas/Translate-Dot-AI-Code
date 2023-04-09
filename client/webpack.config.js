const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const config = {
    mode: 'development',
    entry: path.resolve(__dirname,'src','index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
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
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'src','index.html')
        })
    ],
    devServer: {
        port: 8080,
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