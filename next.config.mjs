/** @type {import('next').NextConfig} */
// doc https://docs.walletconnect.com/web3modal/nextjs/about#extra-configuration
const nextConfig = {
    webpack: config => {
      config.externals.push('pino-pretty', 'lokijs', 'encoding')
      return config
    }
  }

export default nextConfig;
