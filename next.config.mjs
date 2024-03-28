/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['cepp-bookingsystem.s3.amazonaws.com', 'lh3.googleusercontent.com'],
    },
    typescript: {     
      ignoreBuildErrors: true,   
      
    },
    output: 'standalone',
  };
  
  
  export default nextConfig;
  
