const webpack = require('webpack');
const path = require('path');
const copy = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'main': './src/main.ts'
    },
    output: {
        path: './target/classes/static',
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
        new copy([{from: './src/index.html', to: 'index.html'}])
    ],
    resolve: {
        root: [ path.join(__dirname, 'src') ],
        extensions: ['', '.ts', '.js', '.json']
    },
    module: {
        loaders: [
            {test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader']},
            {test: /\.css$/, loaders: ['to-string-loader', 'css-loader']},
            {test: /\.html$/, loader: 'raw-loader'},
            {test: /\.json$/, loader: 'json-loader'}
        ]
        //noParse: [path.join(__dirname, 'node_modules', 'angular2', 'bundles')]
    },
    devServer: {
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 }
    },
    devtool: 'cheap-module-source-map'
};
