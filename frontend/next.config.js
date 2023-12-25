/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    API_REST: process.env.API_REST || 'http://localhost:8080',
    API_WS: process.env.API_WS || 'ws://localhost:8080',
  },
}

module.exports = nextConfig
