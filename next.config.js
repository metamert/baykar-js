/** @type {import('next').NextConfig} */
const nextConfig = {
  baseUrl: "app/",
  paths: {
    "@/*": ["./*"],
    "@/styles/*": ["styles/*"],
    "@/components/*": ["components/*"],
    "@/store/*": ["store/*"],
  },
};

module.exports = nextConfig;
