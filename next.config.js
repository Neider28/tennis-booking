/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  env: {
    API_PROD: 'https://tennis-booking-backend.onrender.com',
    API_DEV: 'http://localhost:4000',
  },
};

module.exports = nextConfig;
