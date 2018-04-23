const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([
            {
                from: 'node_modules/materialize-css/dist/css/materialize.min.css',
                to: 'css/'
            },
            {
                from: 'node_modules/materialize-css/dist/js/materialize.min.js',
                to: 'js/'
            },
            {
                from: 'node_modules/jquery/dist/jquery.min.js',
                to: 'js/'
            }
        ]),
        new HtmlWebpackPlugin({
            title: 'Calendar',
            template: require('html-webpack-template'),
            inject: false,
            appMountId: 'root',
            meta: [
                {
                    name: 'keywords',
                    content: 'FHSU,FORT,HAYS,STATE,UNIVERSITY,CALENDAR'
                },
                {
                    name: 'description',
                    content: 'My implementation of calendar.fhsu.edu'
                }
            ],
            mobile: true,
            scripts: [
                'js/jquery.min.js',
                'js/materialize.min.js'
            ],
            links: [
                'https://fonts.googleapis.com/icon?family=Material+Icons'
            ]
            
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: 'css/materialize.min.css',
            append: false
        })
    ]
}