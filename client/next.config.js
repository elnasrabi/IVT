// next.config.js
module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://localhost:55050:path*',
          },
        ]
      },
  };