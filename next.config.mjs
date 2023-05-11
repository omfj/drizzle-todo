/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    serverComponentsExternalPackages: ["mysql2"],
  },
};

export default config;
