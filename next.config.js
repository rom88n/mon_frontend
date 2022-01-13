/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,

  // async rewrites() {
  //   return {
  //     fallback: [
  //       // These rewrites are checked after both pages/public files
  //       // and dynamic routes are checked
  //       {
  //         source: '/api/:path*',
  //         destination: `http://localhost:3030/api/:path*`,
  //       },
  //     ],
  //   };
  // },

  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: `http://localhost:3030/admin/:path*`,
      },
      {
        source: '/api/:path*',
        destination: `http://localhost:3030/api/:path*`,
      },
    ]
  },

  webpack: (config) => {

    return config;
  },
  images: {
    domains: ['image.gametracker.com'],
  },
  env: {
    API_PATH: process.env.API_PATH,
  }
};
