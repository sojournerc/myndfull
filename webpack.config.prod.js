
module.exports = {
  entry: './src/client/main.js',
  output: {
    filename: './dist/client/prod/js/main.js'
  },
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
