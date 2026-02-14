# Pantheon Zero-Downtime Deployment Demo

An interactive web-based visualization demonstrating Pantheon's zero-downtime deployment process. Built for customer demonstrations and presentations.

## Overview

This demo illustrates Pantheon's unique deployment workflow across Test and Live environments, highlighting:
- Container image building and deployment
- Same images deployed from Test to Live (no rebuild)
- Rolling deployments with traffic cutover
- Zero-downtime during production deployments

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

1. **Initial State** - Shows active Live environment
2. **Build Container Images** - Image building in Test environment
3. **Deployed to Test** - New containers deployed and tested
4. **Live Deployment Begins** - Multi-phase deployment to Live (4 sub-steps)
5. **Parallel Execution** - Old and new containers running together
6. **Traffic Cutover** - Traffic switches to new containers, old containers dim
7. **Deployment Complete** - Old containers retired, deployment finished

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
- `slide-down-deploy` - Image deployment animation
- `traffic-flow` - Traffic flow animation

## License

Proprietary - Pantheon Systems, Inc.
