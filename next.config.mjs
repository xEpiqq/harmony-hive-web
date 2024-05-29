/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.module.rules.push({
          test: /pdf\.worker\.(min\.)?js/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[contenthash].[ext]',
                publicPath: '/_next/static/worker',
                outputPath: 'static/worker',
              },
            },
          ],
        });
      }
  
      return config;
    },
  };
  
  export default nextConfig;