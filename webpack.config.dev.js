
module.exports = {
  entry: './src/client/main.js',
  output: {
    filename: './dist/client/dev/js/main.js'
  },
  devtool: 'module-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: './node_modules',
        loader: 'babel-loader?cacheDirectory',
        query: {
          presets: [["es2015", { "modules": false }], 'stage-0', 'react']
        }
      }
    ]
  }
};
