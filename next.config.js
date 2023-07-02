/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config, { dev, isServer }) => {
    if (!isServer) {
      config.devtool = dev ? 'source-map' : 'hidden-source-map';
    }
    return config;
  },
}

module.exports = nextConfig
