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

The GitHub Actions workflow will:

1. **Quality Checks**: Run linting and build verification
2. **SSH Test**: Verify SSH connectivity and configure Nginx
3. **Deploy**: 
   - Build the project
   - Upload to server
   - Install production dependencies
   - Start with PM2 on port 4001
   - Configure Nginx to proxy to port 4001

## Manual Deployment (if needed)

If you need to deploy manually:

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

5. **High memory usage**: Check memory usage:
   ```bash
   pm2 monit
   pm2 list
   ```
   If memory is consistently high, consider:
   - The app will auto-restart at 400MB limit
   - Check for memory leaks in application code
   - Consider increasing the memory limit if server has more resources

## Performance Optimizations

This deployment includes several performance optimizations:

### 1. Disabled Source Maps
- Source maps are disabled in production (`productionSourceMaps: false`)
- Reduces memory consumption significantly

### 2. Disabled Image Optimization
- Next.js image optimization is disabled (`images.unoptimized: true`)
- Reduces CPU and RAM usage
- Use pre-optimized images or external services (Cloudinary, etc.)

### 3. PM2 Memory Management
- PM2 configured with `--max-memory-restart 400M`
- Automatically restarts app if memory exceeds 400MB
- Uses direct Next.js binary instead of npm for better control

