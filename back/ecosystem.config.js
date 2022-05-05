module.exports = {
  apps: [
    {
      name: "gstock",
      script: "./dist/server.js",
      instances: "max",
      env_production: {
        NODE_ENV: "production",
        GSTOCK_PORT: "4545",
      },
      env: {
        NODE_ENV: "development",
        GSTOCK_PORT: "3000",
      },
    },
  ],
};
