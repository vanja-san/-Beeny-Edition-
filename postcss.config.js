module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env')({
      stage: 1,
      features: {
        'nesting-rules': true,
        'custom-properties': true,
        'custom-media-queries': true
      }
    }),
    require('autoprefixer'),
    process.env.NODE_ENV === 'production' ? require('cssnano') : false
  ]
}