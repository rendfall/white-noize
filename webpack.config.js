const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const IS_PRODUCTION = process.env.NODE_ENV;

const plugins = {
    dev: [],
    prod: [
        new UglifyJsPlugin()
    ]
};

module.exports = {
    entry: './src/main.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },

    stats: {
        colors: true
    },

    devtool: 'source-map',

    plugins: IS_PRODUCTION
        ? plugins.prod
        : plugins.dev
};
