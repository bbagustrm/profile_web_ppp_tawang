import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ['images.unsplash.com', 'plus.unsplash.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'bqpklrzmjbliiqhzlxmj.supabase.co',
                pathname: '/storage/v1/object/public/**',
            },
        ],
    },
};

export default nextConfig;
