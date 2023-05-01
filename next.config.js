/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: '127.0.0.1'
      },
      {
        hostname: 'api.seesaw.kz'
      }
    ],
  }
}

module.exports = nextConfig
