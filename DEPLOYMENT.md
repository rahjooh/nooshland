# Deployment Guide

This project is configured to deploy to your host server on port 4001 and serve the domain `nooshland.ir`.

## Prerequisites

1. **SSL Certificates**: Before deployment, ensure SSL certificates are generated for `nooshland.ir`:
   ```bash
   sudo certbot certonly --nginx -d nooshland.ir -d www.nooshland.ir
   ```

2. **GitHub Secrets/Variables**: Configure the following in your GitHub repository settings:

   **Required Secrets/Variables:**
   - `SSH_HOST` or `IP` - Your server IP address
   - `SSH_USER` or `USER` - SSH username
   - `SSH_PASSWORD` or `PASSWORD` - SSH password
   - `SSH_PORT` (optional, defaults to 22)

   You can set these as either:
   - **Secrets** (recommended for sensitive data like passwords)
   - **Variables** (for non-sensitive data like host/IP)

3. **Environment**: Create a GitHub environment named `host` (or update `DEPLOY_ENVIRONMENT_NAME` variable)

## Deployment Process

The GitHub Actions workflow uses **standalone mode** for optimal performance:

1. **Quality Checks**: Run linting and build verification
2. **SSH Test**: Verify SSH connectivity and configure Nginx
3. **Build on GitHub Runners**: 
   - Build happens on GitHub's powerful runners (not on your server)
   - Creates standalone build with all dependencies bundled
   - Packages only: `.next/standalone`, `.next/static`, `public`, `data`
4. **Deploy to Server**: 
   - Upload minimal standalone package (no source code)
   - **NO npm install needed** (all dependencies included)
   - Start with PM2 on port 4001 using standalone server.js
   - Configure Nginx to proxy to port 4001

**Benefits:**
- Build uses GitHub's CPU/RAM (not your server)
- No npm install on server (saves 400-800MB RAM)
- Minimal file transfer (only what's needed to run)
- Faster deployments

## Manual Deployment (if needed)

**Using Standalone Mode (Recommended):**

```bash
# On your LOCAL machine (or CI/CD)
npm run build

# Transfer .next/standalone, .next/static, public, data to server
# Then on server:
cd ~/apps/nooshland.com/.next/standalone
PORT=4001 pm2 start server.js --name "nooshland" --max-memory-restart 400M

# Or restart if already running
pm2 restart nooshland
```

**Traditional Mode (if not using standalone):**

```bash
# On your server
cd ~/apps/nooshland.com
npm ci --omit=dev
npm run build

# Start with PM2 (with 400MB memory limit)
PORT=4001 pm2 start node_modules/.bin/next --name "nooshland" --max-memory-restart 400M -- start

# Or restart if already running
pm2 restart nooshland
```

**⚠️ Important:** Standalone mode is recommended as it eliminates npm install on the server, saving significant RAM.

## Port Configuration

- **Application Port**: 4001
- **Nginx**: Proxies from port 443 (HTTPS) to port 4001

## PM2 Management

The application is configured with PM2 for process management with automatic memory limit restart at 400MB.

```bash
# Check status
pm2 status

# Monitor memory and CPU usage
pm2 monit

# View logs
pm2 logs nooshland

# Restart
pm2 restart nooshland

# Stop
pm2 stop nooshland

# Start with memory limit (if starting fresh)
PORT=4001 pm2 start node_modules/.bin/next --name "nooshland" --max-memory-restart 400M -- start
```

### Important Notes
- **Do NOT use `npm start` directly** - Always use PM2 to manage the application
- PM2 will automatically restart the app if memory exceeds 400MB
- Monitor memory usage regularly with `pm2 monit`
- The app uses direct Next.js binary instead of npm for better control

## Nginx Configuration

The workflow automatically configures Nginx at `/etc/nginx/sites-available/nooshland` to:
- Redirect HTTP (port 80) to HTTPS (port 443)
- Proxy HTTPS requests to the Next.js app on port 4001
- Handle `nooshland.ir` and `www.nooshland.ir` domains

## Troubleshooting

1. **Port already in use**: Check if another process is using port 4001:
   ```bash
   sudo lsof -i :4001
   ```

2. **PM2 not starting**: Check PM2 logs:
   ```bash
   pm2 logs nooshland --lines 50
   ```

3. **Nginx errors**: Test and check Nginx configuration:
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

4. **SSL certificate issues**: Verify certificates exist:
   ```bash
   sudo ls -la /etc/letsencrypt/live/nooshland.ir/
   ```

5. **Set up Swap File (Critical for 1GB RAM servers)**:
   ```bash
   # Create 2GB swap file
   sudo fallocate -l 2G /swapfile
   sudo chmod 600 /swapfile
   sudo mkswap /swapfile
   sudo swapon /swapfile
   
   # Make it permanent
   echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
   
   # Verify
   free -h
   ```

6. **High memory usage**: Check memory usage:
   ```bash
   pm2 monit
   pm2 list
   ```
   If memory is consistently high, consider:
   - The app will auto-restart at 400MB limit
   - Check for memory leaks in application code
   - Consider increasing the memory limit if server has more resources

## Performance Optimizations

This deployment includes several performance optimizations for low-resource servers:

### 1. Standalone Build Mode ⭐
- **What**: Build happens on GitHub runners, only minimal files transferred to server
- **Configuration**: `output: 'standalone'` in `next.config.js`
- **Benefits**:
  - No `npm install` on server (saves 400-800MB RAM)
  - Build uses GitHub's CPU/RAM (not your server)
  - Only transfers: `.next/standalone`, `.next/static`, `public`, `data`
  - Typical RAM usage: 150-200MB per app
- **How**: GitHub Actions builds → packages standalone → transfers → runs with PM2

### 2. Disabled Source Maps
- Source maps are disabled in production (`productionSourceMaps: false`)
- Reduces memory consumption significantly

### 3. Disabled Image Optimization
- Next.js image optimization is disabled (`images.unoptimized: true`)
- Reduces CPU and RAM usage
- Use pre-optimized images or external services (Cloudinary, etc.)

### 4. PM2 Memory Management
- PM2 configured with `--max-memory-restart 400M`
- Automatically restarts app if memory exceeds 400MB
- Uses direct node execution (standalone server.js) instead of npm

### Resource Budget for 1GB RAM Server

If running multiple apps:
- Ubuntu OS + Basic Services: ~300 MB
- Nginx (Reverse Proxy): ~20 MB
- Next.js App 1 (Standalone): ~150-200 MB
- Next.js App 2 (Standalone): ~150-200 MB
- Remaining Buffer: ~280 MB

**Critical:** Set up a 2-4GB swap file on your server to prevent crashes if RAM is exceeded.

