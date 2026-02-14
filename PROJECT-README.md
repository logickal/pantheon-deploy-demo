# Pantheon Deployment Demo

Interactive Next.js 15 application demonstrating Pantheon's zero-downtime deployment process through immersive animations.

## Design Philosophy

This is designed as an **interactive animation experience**, not a slide deck:
- Full-screen immersive visualization
- Click anywhere to advance (or use arrow keys)
- Subtle UI elements that don't distract from the content
- Smooth transitions and animations

## Project Structure

```
pantheon-deploy-demo/
├── app/
│   ├── page.tsx          # Main demo page with state management
│   ├── layout.tsx        # Root layout with metadata
│   └── globals.css       # Global styles
├── components/
│   ├── DeploymentVisualization.tsx  # Main visual area for animations
│   └── StepControls.tsx             # Previous/Next/Reset controls
├── hooks/
│   └── useKeyboardNavigation.ts     # Arrow key navigation hook
├── types/
│   └── deployment.ts                # TypeScript types for deployment steps
└── data/
    └── deploymentSteps.ts           # Deployment step definitions
```

## Features

- **Click-to-advance**: Click anywhere on the screen to move forward
- **Keyboard navigation**: Use arrow keys (← →) to navigate steps
- **Subtle navigation**: Floating arrow buttons and progress dots
- **Reset capability**: Bottom-left button to restart the animation
- **8 deployment stages**: Placeholder steps ready for customization
- **Smooth animations**: Fade-in and scale effects for transitions
- **Responsive design**: Built with Tailwind CSS 4
- **TypeScript**: Fully typed for better developer experience

## UI Elements

- **Progress dots** (top-right): Clickable dots showing current position
- **Navigation arrows** (left/right): Appear when not on first/last step
- **Reset button** (bottom-left): Returns to step 1
- **Keyboard hint** (bottom-right): Subtle reminder of arrow key controls

## Getting Started

### Development Server

```bash
cd pantheon-deploy-demo
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Customizing the Deployment Process

### 1. Update Step Definitions

Edit `data/deploymentSteps.ts` to match your actual deployment process:

```typescript
export const deploymentSteps: DeploymentStep[] = [
  {
    id: 1,
    title: 'Your Step Title',
    description: 'Step description',
    visualState: {
      // Add any data needed for visualization
      containers: [],
      loadBalancer: {},
      // ... etc
    },
  },
  // ... more steps
];
```

### 2. Customize Visualizations

Edit `components/DeploymentVisualization.tsx` to create custom animations for each step. You can:

- Add SVG diagrams
- Implement CSS animations
- Use animation libraries (framer-motion, react-spring, etc.)
- Add step-specific visual components

### 3. Extend the Visual State Type

Update `types/deployment.ts` to define the structure of your visual data:

```typescript
export interface DeploymentStep {
  id: number;
  title: string;
  description: string;
  visualState: {
    containers?: Container[];
    loadBalancer?: LoadBalancerState;
    traffic?: TrafficState;
    // ... your custom types
  };
}
```

## Current Placeholder Steps

The demo currently includes 8 placeholder steps based on zero-downtime deployment concepts:

1. **Initial State** - Current production environment
2. **Code Commit** - New code pushed to repository
3. **Build Phase** - New containers being built
4. **Container Spin-up** - New containers starting alongside old ones
5. **Health Checks** - System verifying new containers
6. **Traffic Switch** - Load balancer redirecting traffic
7. **Verification** - Deployment verified, old containers on standby
8. **Cleanup** - Old containers terminated

## Next Steps

1. **Define your actual deployment process** - Update the steps in `data/deploymentSteps.ts`
2. **Design visual components** - Create diagrams/animations for each step
3. **Add interactivity** - Consider adding tooltips, animations, or additional controls
4. **Style refinements** - Customize colors, layouts, and typography to match Pantheon branding

## Technology Stack

- **Next.js 15.5.12** - React framework
- **React 19.1.0** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **ESLint** - Code linting

## Notes

- The visualization area is currently a placeholder - ready for your custom implementation
- Keyboard navigation is enabled by default
- The app is fully responsive and works on all screen sizes
