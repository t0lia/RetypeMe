/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    API_REST: process.env.API_REST,
    API_WS: process.env.API_WS,
  },
}

module.exports = nextConfig
