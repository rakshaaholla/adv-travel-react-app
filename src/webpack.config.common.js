var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var helpers = require('./helpers');
var webpack = require('webpack');

module.exports = {
entry: {
'app': './src/app/main.ts',
'polyfills': './src/polyfills.ts',
'styles' : './src/assets/style.scss'
},
resolve: {
extensions: ['.ts', '.js']
},
module: {
rules: [
{
test: /.ts$/,
use: [
{
loader: 'awesome-typescript-loader',
options: {
transpileOnly: true
}
},
{ loader: 'angular2-template-loader' },
{ loader: 'angular-router-loader' }
]
},
{
test: /.html$/,
loaders: ['html-loader']
},
{
test: /.scss$/,
exclude: [ /node_modules/, helpers.root('src', 'style.scss') ],
use: [ 'to-string-loader', 'css-loader', 'sass-loader' ]
},
{
test: /.scss$/ ,
use: ExtractTextPlugin.extract({
use: 'css-loader!sass-loader'
})
},
{
test: /.(png|jpe?g|gif|svg|woff|woff2|otf|ttf|eot|ico)$/,
use: 'file-loader?name=assets/[name].[hash].[ext]'
}
],
exprContextCritical: false
},
plugins: [
new ExtractTextPlugin({ // define where to save the file
filename: 'styles/[name].bundle.css',
allChunks: true,
}),
new HtmlWebpackPlugin({
template: 'src/index.html'
}),
new CopyWebpackPlugin([
{
from: 'node_modules/froala-editor/css/',
to: 'assets/froala-editor/css/',
},
{
from: 'node_modules/font-awesome/css/font-awesome.min.css',
to: 'assets/font-awesome/css/font-awesome.min.css',
},
{
from: 'node_modules/font-awesome/fonts',
to: 'assets/font-awesome/fonts'
}
]),
new webpack.ProvidePlugin({
$: "jquery",
jQuery: "jquery"
})
]
};

webpack.config.prod.js
var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.config.common');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
output: {
path: path.resolve(__dirname, 'dist'),
publicPath: '/',
filename: '[name].[hash].js',
chunkFilename: '[id].[hash].chunk.js'
},
plugins: [
new webpack.NoEmitOnErrorsPlugin(),
new webpack.optimize.UglifyJsPlugin({
mangle: {
keep_fnames: true
}
}),
new ExtractTextPlugin('styles.[hash].css'),
new webpack.DefinePlugin({
'process.env': {
'ENV': JSON.stringify(ENV)
}
}),
new webpack.LoaderOptionsPlugin({
options: {
htmlLoader: {
minimize: false // workaround for ng2
}
}
}),
new UglifyJSPlugin()
]
});