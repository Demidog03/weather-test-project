const { merge } = require('webpack-merge');
const common = require('./webpack.common.cjs');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'public')
        },
        historyApiFallback: true,
        hot: true,
        port: 8080,
        host: '0.0.0.0',
        allowedHosts: 'all',
        watchFiles: {
            options: {
                poll: 1000
            }
        },
        client: {
            webSocketURL: 'auto://0.0.0.0:0/ws'
        }
    },
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: /node_modules/
    },
    optimization: {
        runtimeChunk: 'single'
    }
});
