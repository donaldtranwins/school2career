const { resolve } = require('path');

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
                use: [ 'style-loader', 'css-loader?modules', 'postcss-loader']
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [ 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug' ]
            }
        ]
    }
};
