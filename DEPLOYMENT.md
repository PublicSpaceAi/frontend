# Dokploy Deployment Guide

## Overview
This guide provides instructions for deploying the PS-AI Frontend Next.js application on Dokploy.

## Prerequisites
- Dokploy instance installed and running
- Docker installed locally (for testing)
- Git repository access
- Environment variables configured

## Files Included

### 1. **nixpacks.json**
- Nixpacks configuration for containerized deployment
- Specifies Node.js environment, build, and start phases
- Exposes port 3002

### 2. **Dockerfile**
- Multi-stage Docker build for optimized production image
- Stage 1: Build the Next.js application
- Stage 2: Production runtime with minimal dependencies

### 3. **docker-compose.yml**
- Local testing configuration
- Includes health checks and environment variables
- Use with: `docker-compose up`

### 4. **.dockerignore**
- Optimizes Docker build by excluding unnecessary files
- Reduces image size and build time

### 5. **dokploy.config.yml**
- Deployment configuration for Dokploy
- Resource limits, health checks, and networking settings

## Deployment Steps

### Option 1: Using Docker (Recommended for Dokploy)

1. **Build the Docker image:**
   ```bash
   docker build -t ps-ai-frontend:latest .
   ```

2. **Test locally with docker-compose:**
   ```bash
   docker-compose up
   ```
   Access at: `http://localhost:3002`

3. **Push to Dokploy:**
   - Connect your Git repository to Dokploy
   - Dokploy will automatically detect the Dockerfile
   - Configure environment variables in Dokploy dashboard
   - Deploy with a single click

### Option 2: Using Nixpacks (Alternative)

1. **Dokploy automatically detects nixpacks.json**
   - No additional configuration needed
   - More lightweight than Docker

2. **Configure in Dokploy:**
   - Select "Nixpacks" as build method
   - Add environment variables
   - Deploy

## Environment Variables

Configure these variables in your Dokploy deployment:

```env
# Required
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-secret-key-here

# Optional
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NODE_ENV=production
```

## Port Configuration

The application runs on port **3002** by default.
- Ensure this port is mapped correctly in Dokploy
- Update load balancer/reverse proxy settings if needed

## Health Checks

The deployment includes health checks:
- **Endpoint:** `http://localhost:3002/`
- **Interval:** 30 seconds
- **Timeout:** 10 seconds
- **Retries:** 3
- **Start Period:** 40 seconds

## Resource Limits

Default resource allocation:
- **Memory Requests:** 256Mi
- **Memory Limits:** 512Mi
- **CPU Requests:** 100m
- **CPU Limits:** 500m

Adjust in `dokploy.config.yml` based on your needs.

## Logging

Logs are stored with the following configuration:
- **Driver:** json-file
- **Max Size:** 10m per log file
- **Max Files:** 3 retention

View logs in Dokploy dashboard or via Docker:
```bash
docker logs <container-id>
```

## Domain & SSL

1. **Configure in Dokploy:**
   - Add your custom domain
   - Enable SSL/TLS (automatic via Let's Encrypt)

2. **Update environment variables:**
   ```env
   NEXTAUTH_URL=https://your-custom-domain.com
   NEXT_PUBLIC_SITE_URL=https://your-custom-domain.com
   ```

## Troubleshooting

### Application fails to start
- Check environment variables are correctly set
- Verify NEXTAUTH_SECRET is provided
- Check logs in Dokploy dashboard

### Port 3002 not accessible
- Verify port mapping in Dokploy
- Check firewall rules
- Ensure health checks are passing

### Build fails
- Check Docker version compatibility
- Verify npm packages install correctly locally
- Review build logs in Dokploy dashboard

## Local Testing Before Deployment

```bash
# Install dependencies
npm install --legacy-peer-deps

# Build the project
npm run build

# Test with docker-compose
docker-compose up

# Or run directly
npm run start
```

Visit `http://localhost:3002` to verify.

## Performance Tips

1. **Enable caching** in Dokploy for faster deployments
2. **Use CDN** for static assets (`.next/static/`)
3. **Configure database** connection pooling
4. **Monitor metrics** in Dokploy dashboard

## Additional Resources

- [Dokploy Documentation](https://dokploy.com)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Nixpacks Documentation](https://nixpacks.com)

## Support

For deployment issues:
1. Check application logs
2. Verify environment variables
3. Test locally with docker-compose
4. Review Dokploy documentation
5. Check Docker image size and layers

---

**Last Updated:** October 31, 2025
**Application:** PS-AI Frontend
**Framework:** Next.js 15.3.1
**Node Version:** 18+
