const path = require('path');

module.exports = {
  mode: 'development',
  plugins: [],
  devServer: {
    static: path.resolve(__dirname, '..', './dist'),
    hot: true,
    historyApiFallback: true,
  },
  devtool: 'eval-source-map',
};
