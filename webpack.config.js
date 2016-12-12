module.exports = {
    entry: __dirname + '/src/main.js',

    output: {
        path: __dirname + '/dist/',
        filename: 'app.js'
    },

    devtool: 'cheap-source-map',

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0']
                }
            },
            {
                test: /\.scss$/,
                loader: ['style', 'css', 'sass']
            }
        ]
    }
};
