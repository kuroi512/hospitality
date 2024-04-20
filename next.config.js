/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  env: {
    BASE_URL: process.env.BASE_URL,
    GUEST_API_URL: process.env.API_URL + '/guest-api',
    USER_API_URL: process.env.API_URL + '/user-api',
    HELPER_API_URL: process.env.API_URL + '/helper-api',
    CDN_URL: process.env.CDN_URL,
    BASE_API_URL: process.env.API_URL
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.hospitality.mn'
      },
      {
        protocol: 'http',
        hostname: 'localhost'
      },
      {
        protocol: 'https',
        hostname: 'hospitality-cdn.sgp1.cdn.digitaloceanspaces.com'
      }
    ]
  }
}

module.exports = nextConfig
