const path = require('path');

module.exports = {
  entry: './src/app.tsx',
  // devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // chunkFilename:'bundle.chunk.js',
  },
  devServer:{
    static:path.join(__dirname,'dist'),
    historyApiFallback:true,
    port: 9090
  }
};