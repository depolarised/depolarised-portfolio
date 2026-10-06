/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/privacy.html',
        destination: '/tobar-listening-room/privacy.html',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
