/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    // Overwrite the default configuration
    if (!isServer) {
      // Use 'source-map' for the development environment and 'hidden-source-map' for production
      config.devtool = dev ? 'source-map' : 'hidden-source-map';
    }

    return config;
  },
}

module.exports = nextConfig
