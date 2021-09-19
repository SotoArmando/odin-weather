module.exports = {
  target: 'node',
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.s[ac]ss$/i,
      use: [
        // Creates `style` nodes from JS strings
        'style-loader',
        // Translates CSS into CommonJS
        'css-loader',
        // Compiles Sass to CSS
        'sass-loader',
      ],

    }, {
      exclude: '/node_modules',
    }],
  },
};
