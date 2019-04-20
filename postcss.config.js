module.exports = {
  parser: 'postcss-scss',
  plugins: [
    require('postcss-clean'),
    require('autoprefixer'),
  ]
};