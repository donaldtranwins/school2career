const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [ './index.js' ],
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    context: resolve(__dirname, 'src'),
    module: {
        rules: [
            {
                test: /\.js|.jsx?$/,
                use: [ 'babel-loader' ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [ 'file-loader?hash=sha512&digest=hex&name=imgs/[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug' ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};