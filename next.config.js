/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_BASE_URL: process.env.NEXT_SERVER_BASE_URL,
  },
  images: {
    domains: ['images.unsplash.com', 'avatars.dicebear.com'],
  },
}

module.exports = nextConfig
