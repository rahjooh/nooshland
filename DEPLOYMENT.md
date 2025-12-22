# Deployment Guide

This project is configured to deploy to your host server on port 3005 and serve the domains `nooshland.com` and `nooshland.ir`.

## Prerequisites

1. **SSL Certificates**: Before deployment, ensure SSL certificates are generated for `nooshland.com`:
   ```bash
   sudo certbot certonly --nginx -d nooshland.com -d www.nooshland.com -d nooshland.ir -d www.nooshland.ir
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
   - Start with PM2 on port 3005
   - Configure Nginx to proxy to port 3005

## Manual Deployment (if needed)

If you need to deploy manually:

```bash
# On your server
cd ~/apps/nooshland
npm ci --omit=dev
pm2 restart nooshland
```

## Port Configuration

- **Application Port**: 3005
- **Nginx**: Proxies from port 443 (HTTPS) to port 3005

## PM2 Management

```bash
# Check status
pm2 status

# View logs
pm2 logs nooshland

# Restart
pm2 restart nooshland

# Stop
pm2 stop nooshland
```

## Nginx Configuration

The workflow automatically configures Nginx at `/etc/nginx/sites-available/nooshland` to:
- Redirect HTTP (port 80) to HTTPS (port 443)
- Proxy HTTPS requests to the Next.js app on port 3005
- Handle both `nooshland.com` and `nooshland.ir` domains

## Troubleshooting

1. **Port already in use**: Check if another process is using port 3005:
   ```bash
   sudo lsof -i :3005
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
   sudo ls -la /etc/letsencrypt/live/nooshland.com/
   ```

