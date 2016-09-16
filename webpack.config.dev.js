
module.exports = {
  entry: './src/client/main.js',
  output: {
    filename: './dist/client/dev/js/main.js'
  },
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: './node_modules',
        loader: 'babel',
        query: {
          presets: [["es2015", { "modules": false }], 'stage-0', 'react']
        }
      }
    ]
  }
};
