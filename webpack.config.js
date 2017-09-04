var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

module.exports = {
  entry: ['babel-polyfill', PATHS.app],
  output: {
    path: PATHS.build,
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    publicPath: '/'
  },
  target: 'node',
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },
  externals: nodeExternals(),
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  ],
  module: {
    loaders: [{
        test: /\.js$/,
        loader: 'babel-loader'
      },

      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
