/**
 * PM2 Ecosystem Configuration
 * 
 * This configuration is for reference. The deployment uses inline PM2 commands,
 * but this file can be used for local testing or manual PM2 management.
 * 
 * Usage: pm2 start ecosystem.config.js
 */

module.exports = {
  apps: [
    {
      name: "nooshland",
      script: "server.js",
      cwd: "./.next/standalone",
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "400M",
      node_args: "--max-old-space-size=400",
      env: {
        PORT: 4001,
        NODE_ENV: "production"
      },
      // Auto-restart on crash
      autorestart: true,
      // Watch for file changes (disable in production)
      watch: false,
      // Logging
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      // Advanced settings
      min_uptime: "10s",
      max_restarts: 10,
      restart_delay: 4000
    }
  ]
}

