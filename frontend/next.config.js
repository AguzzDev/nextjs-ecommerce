module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["localhost", "res.cloudinary.com"],
  },
  module: {
    
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
    optimization: {
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
      runtimeChunk: true,
    },
  },
}
