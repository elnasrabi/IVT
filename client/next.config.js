// next.config.js
module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://localhost:55050:path*',
          },
        ]
      },
  };