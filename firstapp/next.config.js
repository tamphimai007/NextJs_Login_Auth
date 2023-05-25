/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true },
  env: {
    NEXTAUTH_SECRET: 'roitai dev',
    NEXT_API:'http://localhost:3000/api'
  }
}

module.exports = nextConfig
