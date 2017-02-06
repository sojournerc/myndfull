
module.exports = {
  entry: './src/client/main.js',
  output: {
    filename: './dist/client/dev/js/main.js'
  },
  devtool: 'cheap-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: './node_modules',
        loader: 'babel-loader',
        query: {
          presets: [["es2015", { "modules": false }], 'stage-0', 'react']
        }
      }
    ]
  }
};
