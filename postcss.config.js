module.exports = {
    plugins: [
        require('@tailwindcss/postcss')(), // ✅ Important for Webpack
        require('autoprefixer'),
    ],
}
  