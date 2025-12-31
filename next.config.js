/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable source maps to reduce memory consumption
  productionSourceMaps: false,
  // Disable image optimization to reduce CPU/RAM usage
  images: {
    domains: ['picsum.photos'],
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('better-sqlite3')
    }
    return config
  },
}

module.exports = nextConfig


