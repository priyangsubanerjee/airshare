/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  skipWaiting: true,
  register: true,
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "randomprops.vercel.app",
      "localhost",
      "airshare-six.vercel.app",
      "localhost:5589",
      "ip.seeip.org",
      "192.168.163.50",
    ],
  },
};

module.exports = withPWA(nextConfig);
