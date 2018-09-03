const path = require('path');


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
        aggregateTimeout: 500,
        ignored: '/node_modules/',
        poll: 1000
    },
    devtool: 'cheap-eval-source-map'
};