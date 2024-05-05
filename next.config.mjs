/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            hostname: '*.googleusercontent.com',
            protocol: 'https',
        }]
    },
    logging: {
        fetches: {
            fullUrl: true
        }
    }
}

export default nextConfig
