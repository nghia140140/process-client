module.exports = {
  apps: [
    {
      name: "AGRITECH_SUPPLIER",
      script: "server.js",
      max_memory_restart: "256M",
      ignore_watch: ["node_modules"],
      watch_options: {
        followSymlinks: false,
      },
      env: {
        "PORT": 5002,
        "NODE_ENV": "dev",
      }
    }
  ],
};
