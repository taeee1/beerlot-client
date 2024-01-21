module.exports = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        // destination: "https://beerlot-core-obtg3qwuhq-an.a.run.app/:path*",
        destination: "https://beerlot-core-api-lopbi5pmwq-du.a.run.app/:path*",
      },
    ];
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.tls = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.child_process = false;
    }

    return config;
  },
};
