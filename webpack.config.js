module.exports = {
  target: 'node',
  entry: [
    './src/js/init.js'],
  output: {
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
