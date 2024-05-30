/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,
  swcMinify: true,

  // Uncoment to add domain whitelist
  // images: {
  //   domains: [
  //     'res.cloudinary.com',
  //   ],
  // },
  experimental: {
    esmExternals: true,
  },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i, // Match font file extensions
      use: {
        loader: 'file-loader',
        options: {
          outputPath: 'static/fonts/', // Output font files to the "static/fonts" directory
          publicPath: '/_next/static/fonts/', // Public path to the "static/fonts" directory
          name: '[name].[ext]', // Use the original filename
        },
      },
    });

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
