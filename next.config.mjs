/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus-eastus.blob.core.windows.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus-eastus2.blob.core.windows.net",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
