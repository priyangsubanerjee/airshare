/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});

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
