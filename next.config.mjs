/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/photos/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  // Old résumés and links still point at the portfolio's previous home on
  // this site; it now lives at maestrobrendon.com.
  async redirects() {
    return [
      { source: "/brendon", destination: "https://www.maestrobrendon.com/", permanent: true },
      { source: "/brendon/:path*", destination: "https://www.maestrobrendon.com/:path*", permanent: true },
      { source: "/brendon-archive-1", destination: "https://www.maestrobrendon.com/", permanent: true },
    ]
  },
}

export default nextConfig
