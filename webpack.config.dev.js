var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");

module.exports = {

  //  Defines the entrypoint of our application.
  entry: [path.resolve(__dirname, 'src/abl-payment-summary.js')],

  //  Bundle to ./dst.
  output: {
    path: path.resolve(__dirname, 'dst'),
    filename: 'abl-payment-summary.js'
  },
  
  //  Make sure we include sourcemaps. This is for the bundled
  //  code, not the uglfied code (we uglify with npm run build,
  //  see package.json for details).
  devtool: 'source-map',

  //  Define externals (things we don't pack).
  externals: {
    angular: 'angular',
  },

  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel',
        include: __dirname + '/src',
      },
      {
        test: /\.css/,
        loaders: ['style', 'css'],
        include: __dirname + '/src'
      }
    ],
    preLoaders: [
      {
        test: /\.js$/,
        exclude: [
          path.resolve('node_modules/')
        ],
        loader: 'babel'
      },{
        test: /\.js$/,
        include: path.resolve('src/'),
        loader: 'ng-annotate'
      },
      {
        test: /\.html$/,
        include: path.resolve('src/'),
        loader: "html-loader"
      }
    ]
  },
  babel: {
    presets: ['es2015']
  },
  plugins: [
    new ExtractTextPlugin("abl-payment-summary.css"),
    new webpack.HotModuleReplacementPlugin()
  ]
};
