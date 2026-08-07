/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Don't advertise the framework/version in the X-Powered-By header --
  // low cost, removes one piece of recon info for attackers.
  poweredByHeader: false,
  eslint: {
    // Lint errors should fail CI, not be silently skipped at build time.
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;
