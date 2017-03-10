var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');

var AUTOPREFIXER_BROWSERS = [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 35',
    'Firefox >= 31',
    'Explorer >= 9',
    'iOS >= 7',
    'Opera >= 12',
    'Safari >= 7.1'
];

var NODE_ENV = process.env.NODE_ENV;
var IS_BUILD = (NODE_ENV === 'production' || NODE_ENV === 'test');

module.exports = {
    entry: {
        vender: ['react', 'react-dom', 'react-router', 'mobx'],
        app: ['./src/index']
    },
    output: {
        publicPath: '',
        filename: 'assets/[name].js?[chunkhash:8]',
        chunkFilename: 'assets/[name].js?[chunkhash:8]',
        path: path.resolve(__dirname, './dist/')
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                enforce: 'pre'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'react-hot-loader!babel-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader!postcss-loader'
                    })
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader!postcss-loader!sass-loader'
                    })
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: "url-loader?limit=8192&name=assets/[name].[ext]?[hash:8]"
            }
        ]
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vender'],
            filename: 'assets/[name].js?[hash:8]'
        }),
        new ExtractTextPlugin("assets/[name].css?[contenthash:8]"),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './src/views/index.html',
            inject: true,
            hash: false
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [autoprefixer({ browsers: AUTOPREFIXER_BROWSERS })]
            }
        }),
        new CopyWebpackPlugin([
            { from: './src/static', to: './' },
            { from: './src/json', to: './json' }
        ]),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(NODE_ENV)
            }
        })
      ].concat(IS_BUILD ? [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ] : []),
    resolve: {
        extensions: ['*', '.js', '.jsx']
    }
};
