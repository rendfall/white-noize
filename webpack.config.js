const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
            }
        ]
    },

    stats: {
        colors: true
    },

    devtool: 'source-map',

    plugins: [
        new UglifyJsPlugin()
    ]
};
