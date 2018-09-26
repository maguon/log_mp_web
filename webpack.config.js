const path = require('path');
const webpack = require('webpack');
const UglifyPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    entry: {
        index:'./web/src/components/index.jsx',
        login:'./web/src/components/login.jsx'
    },
    output: {
        path: path.resolve(__dirname, 'web/assets'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                loaders: ['babel-loader?presets[]=es2015,presets[]=react,presets[]=stage-0'],
                exclude: /(node_modules|bower_components)/,
            }
        ]

    },
    resolve: {
        extensions: ['*', '.js', '.jsx','es6']
    },
    watchOptions: {
        aggregateTimeout: 1000,
        ignored: '/node_modules/',
        poll: 1000
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env': {'NODE_ENV': JSON.stringify('production')}
        }),
        new UglifyPlugin({ uglifyOptions: { output: { comments: false } } }),
        new webpack.optimize.AggressiveMergingPlugin()
    ],
    devtool: process.env.NODE_ENV === 'production'
        ? 'false':'cheap-eval-source-map'
};