/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Local images served from public/ — no external domains needed for prototype
    unoptimized: false,
  },
}

export default nextConfig
