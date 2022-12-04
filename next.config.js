/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withPWA(nextConfig);

module.exports = {
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
