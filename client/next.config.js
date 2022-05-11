// next.config.js
module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://afs-web01:5051/:path*',
          },
        ]
      },
  };