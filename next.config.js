/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true
  },
  images: {
    loader: 'akamai',
    path: ''
  }
}

module.exports = nextConfig
