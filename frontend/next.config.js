/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    API_HOST: process.env.API_HOST || 'localhost',
    API_PORT: process.env.API_PORT || '8080',
  },
}

module.exports = nextConfig
