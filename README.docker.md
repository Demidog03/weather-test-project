# Docker Setup Guide

This project includes Docker configuration for both development and production environments.

## Prerequisites

- Docker Desktop or Docker Engine installed
- Docker Compose installed

## Quick Start

### Development Environment

Start the development server with hot reload:

```bash
# Start dev service
docker-compose up dev

# Or in detached mode
docker-compose up -d dev
```

The application will be available at `http://localhost:8080`

### Production Environment

Build and start the production server:

```bash
# Build and start prod service
docker-compose up --build prod

# Or in detached mode
docker-compose up -d --build prod
```

The application will be available at `http://localhost:80`

## Commands

### Start Services

```bash
# Start both services
docker-compose up

# Start specific service
docker-compose up dev
docker-compose up prod

# Start in detached mode
docker-compose up -d
```

### Stop Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Build Services

```bash
# Build all services
docker-compose build

# Build specific service
docker-compose build dev
docker-compose build prod

# Rebuild without cache
docker-compose build --no-cache
```

### View Logs

```bash
# View logs for all services
docker-compose logs

# View logs for specific service
docker-compose logs dev
docker-compose logs prod

# Follow logs
docker-compose logs -f dev
```

### Execute Commands

```bash
# Run command in dev container
docker-compose exec dev pnpm install

# Run command in prod container
docker-compose exec prod sh
```

## Environment Variables

Make sure to create `.env.development` and `.env.production` files in the project root:

**.env.development**
```env
API_URL=http://localhost:3000
NODE_ENV=development
```

**.env.production**
```env
API_URL=https://api.example.com
NODE_ENV=production
```

## Service Details

### Dev Service
- **Port**: 8080
- **Features**: Hot reload, source maps, webpack dev server
- **Volumes**: Source code mounted for live updates
- **Environment**: Development mode

### Prod Service
- **Port**: 80
- **Features**: Optimized build, nginx server, production optimizations
- **Volumes**: None (static files in image)
- **Environment**: Production mode

## Troubleshooting

### Port Already in Use

If port 8080 or 80 is already in use, modify the ports in `docker-compose.yml`:

```yaml
ports:
  - "8081:8080"  # Change host port
```

### Permission Issues

On Linux, you might need to run with sudo:

```bash
sudo docker-compose up
```

### Clear Docker Cache

```bash
docker-compose down -v
docker system prune -a
docker-compose build --no-cache
```

### View Container Status

```bash
docker-compose ps
```

## Production Deployment

For production deployment, consider:

1. Using environment-specific compose files
2. Setting up reverse proxy (nginx/traefik)
3. Using Docker secrets for sensitive data
4. Setting up health checks and monitoring
5. Using Docker Swarm or Kubernetes for orchestration

