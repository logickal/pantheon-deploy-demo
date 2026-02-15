# Pantheon Zero-Downtime Deployment Demo

An interactive web-based visualization demonstrating Pantheon's zero-downtime deployment process. Built for customer demonstrations and presentations.

## Overview

This demo illustrates Pantheon's unique deployment workflow across Test and Live environments, highlighting:
- Container image building and deployment
- Same images deployed from Test to Live (no rebuild)
- Rolling deployments with traffic cutover
- Zero-downtime during production deployments

## Current Status

**Repository**: https://github.com/logickal/pantheon-deploy-demo
**Deployment**: ✓ Successfully deploying to Pantheon Front-End Sites
**Last Updated**: February 14, 2026

### Deployment Configuration Notes

This application successfully deploys to Pantheon with the following configuration:
- **Next.js Version**: 15.5.10 (aligned with working scoping-tool-poc)
- **Turbopack Root**: Configured in `next.config.ts` to prevent workspace detection issues
- **Cache Handler**: Pantheon cache handler for GCS bucket and edge cache clearing
- **Build Process**: `postinstall` script runs `next build` automatically

**Important**: The configuration was aligned with the working `scoping-tool-poc` repository to resolve deployment issues. Three changes were made simultaneously:
1. Next.js version downgrade (15.5.12 → 15.5.10)
2. Added turbopack root configuration
3. Standardized .gitignore patterns

The deployment succeeded after these changes, though it's unclear which specific change resolved the issue. Future troubleshooting should test changes individually.

## Features

- **7-Step Deployment Flow**: Walk through the complete deployment process from initial state to completion
- **Multi-phase Step 4**: Detailed sub-steps showing image deployment to Live environment
- **Camera Movements**: Automatic zoom and pan to focus on relevant environments
- **Container States**: Visual representation of building, ready, active, dimming, and retired containers
- **Keyboard Navigation**: Use arrow keys to navigate between steps
- **Click Navigation**: Click anywhere to advance, or use navigation buttons
- **Progress Indicators**: Visual dots showing current step and completion
- **Pantheon Branding**: Official colors, fonts, and design language

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the demo.

## Navigation

- **Arrow Keys**: Use ← and → to navigate between steps
- **Click**: Click anywhere on the visualization to advance
- **Progress Dots**: Click on dots at the top to jump to specific steps
- **Reset Button**: Return to the beginning at any time

## Architecture

### Components

- `Container.tsx` - Individual container visualization with 5 states
- `LoadBalancer.tsx` - Load balancer icon
- `TrafficFlow.tsx` - Animated traffic flow indicators
- `BuildingImage.tsx` - Container image with build animation
- `ImageBadge.tsx` - Version label display
- `DeploymentVisualization.tsx` - Main orchestration component

### Key Technologies

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** with custom animations
- **Poppins & Aleo** fonts via Next.js font optimization

### Deployment Steps

1. **Initial State** - Shows active Live and Test environments
2. **Build Container Images** - Image building in Test environment (smaller icon, top-center)
3. **Deployed to Test** - New containers deployed and tested
4. **Live Deployment Begins** - Multi-phase deployment to Live (4 sub-steps)
5. **Parallel Execution** - Old and new containers running together
6. **Traffic Cutover** - Traffic switches to new containers with zero downtime, old containers dim
7. **Deployment Complete** - Old containers retired, new containers slide up to center position

## Customization

### Pantheon Brand Colors

Defined in `app/globals.css`:
- Yellow: `#FFDC28`
- Purple: `#3017A1`
- Mid-Purple: `#5F41E5`
- Pink: `#DE0093`
- Black: `#23232D`

### Animation Timing

All animations are defined in `app/globals.css` using `@keyframes`. Key animations:
- `container-spawn` - Container appearing
- `building-pulse` - Building state pulse
- `slide-down-deploy` - Image deployment animation (Step 3)
- `traffic-flow` - Traffic flow animation
- `slide-up-to-center` - New containers slide up to center position (Step 7)

## Deployment to Pantheon

This project is configured for deployment to Pantheon's Front-End Sites platform using Git tags.

### Prerequisites

- Next.js 15.x (currently using 15.5.12)
- Pantheon cache handler configured
- Git repository connected to Pantheon

### Configuration Files

- **cacheHandler.mjs** - Pantheon cache handler for CDN optimization
- **next.config.ts** - Cache handler integration
- **project.toml** - Google Cloud Buildpacks configuration
- **package.json** - Postinstall script for automatic builds

### Deployment Process

Pantheon uses **Git tags** to trigger deployments. Tags must follow the pattern `pantheon_{env}_{number}`.

#### Deploy to Test Environment

```bash
# Find next tag number
git tag | grep pantheon_test | sort -V

# Create and push tag
git tag pantheon_test_1
git push deployment pantheon_test_1
git push origin pantheon_test_1
```

#### Deploy to Live Environment

```bash
# Find next tag number
git tag | grep pantheon_live | sort -V

# Create and push tag
git tag pantheon_live_1
git push deployment pantheon_live_1
git push origin pantheon_live_1
```

### Important Notes

1. **Postinstall Script**: The `postinstall` script in package.json automatically runs `next build` after `yarn install`. This is required because Pantheon runs `yarn install` then `yarn start` without explicitly running build.

2. **CSS Dependencies**: Tailwind CSS and PostCSS are in `dependencies` (not `devDependencies`) because they're required at build time.

3. **Next.js 15.x Required**: Do not upgrade to Next.js 16.x until Turbopack symlink issues with Google Cloud Buildpacks are resolved.

4. **Cache Handler**: The Pantheon cache handler automatically:
   - Uses GCS bucket for cache storage in production
   - Falls back to file-based caching in development
   - Clears edge/CDN cache on deployments
   - Provides tag-based cache invalidation

5. **Build Command**: Production builds should NOT use `--turbopack` flag. The build script uses standard Webpack bundling for compatibility.

### Environment Variables

These are automatically provided by Pantheon:
- `CACHE_BUCKET` - GCS bucket for cache storage
- `OUTBOUND_PROXY_ENDPOINT` - Edge cache proxy for CDN clearing
- `NODE_ENV=production` - Set via project.toml

### Verification

After deployment, verify the site is working:

```bash
# Check cache headers
curl -I https://your-site.pantheonsite.io/

# Test the application
open https://your-site.pantheonsite.io/
```

### Troubleshooting

**Build fails with "Could not find a production build"**
- Ensure `postinstall` script exists in package.json

**Build fails with "Cannot find module '@tailwindcss/postcss'"**
- Ensure CSS dependencies are in `dependencies`, not `devDependencies`

**Old content still showing after deployment**
- Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)
- Verify `OUTBOUND_PROXY_ENDPOINT` is set (contact Pantheon support if missing)
- Cache handler should automatically clear CDN on deployments

**Turbopack symlink errors**
- Ensure you're using Next.js 15.x (not 16.x)
- Remove `--turbopack` flag from build script

## License

Proprietary - Pantheon Systems, Inc.
