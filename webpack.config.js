var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

  //  Defines the entrypoint of our application.
  entry: path.resolve(__dirname, 'src/abl-payment-summary.js'),

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
      },
      { 
        test: /\.css$/, 
        include: path.resolve('src/'),
        loader: ExtractTextPlugin.extract("style-loader", "css-loader") 
      }
    ]
  },
  babel: {
    presets: ['es2015']
  },
  plugins: [
    new ExtractTextPlugin("abl-payment-summary.css"),
  ]
};
