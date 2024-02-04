/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },

    // images: {
    //     domains: ['https://tutorialhubs.com']
    // }
    // images: {
    //     remotePatterns: [
    //       {
    //         protocol: 'https',
    //         hostname: 'tutorialhubs.com',
    //         port: '',
    //         pathname: '/account123/**',
    //       },
    //     ],
    //   },
}

module.exports = nextConfig
