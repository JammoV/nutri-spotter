/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            hostname: '*.googleusercontent.com',
            protocol: 'https',
        }]
    },
}

export default nextConfig
