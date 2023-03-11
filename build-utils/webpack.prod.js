const path = require('path');

module.exports = {
  mode: 'production',
  plugins: [],
  devServer: {
    static: path.resolve(__dirname, '..', './dist'),
  },
  devtool: 'source-map',
};
