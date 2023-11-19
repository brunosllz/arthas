/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      'github.com',
      'pub-bc782eff834b482cb97f4e08b853eb2a.r2.dev',
      'avatars.githubusercontent.com',
    ],
  },
}

module.exports = nextConfig
