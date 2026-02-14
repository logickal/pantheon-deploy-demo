import { DeploymentStep } from '@/types/deployment';

export const deploymentSteps: DeploymentStep[] = [
  {
    id: 1,
    title: 'Initial State',
    description: 'Live environment: 5 containers serving production traffic.\nTest environment: 2 containers running.',
    visualState: {
      phase: 'stable',
      liveContainers: { old: 5, new: 0 },
      testContainers: { old: 2, new: 0 },
      trafficTarget: 'old',
    },
  },
  {
    id: 2,
    title: 'Build Container Images',
    description: 'Code promoted from Dev to Test. New container images built from code artifact.',
    visualState: {
      phase: 'building',
      showBuildProcess: true,
    },
  },
  {
    id: 3,
    title: 'Deployed to Test',
    description: 'New container images deployed to Test environment. 2 containers now running updated code.',
    visualState: {
      phase: 'test-deployed',
      testContainers: { old: 0, new: 2 },
      liveContainers: { old: 5, new: 0 },
      trafficTarget: 'old',
    },
  },
  {
    id: 4,
    title: 'Live Deployment Begins',
    description: 'Same images from Test deployed to Live. 5 new containers building while production continues.',
    visualState: {
      phase: 'live-building',
      liveContainers: { old: 5, new: 5, newState: 'building' },
      testContainers: { old: 0, new: 2 },
      trafficTarget: 'old',
    },
  },
  {
    id: 5,
    title: 'Parallel Execution',
    description: 'Both sets running. Old containers serve traffic. New containers ready.',
    visualState: {
      phase: 'parallel',
      liveContainers: { old: 5, new: 5, newState: 'ready' },
      testContainers: { old: 0, new: 2 },
      trafficTarget: 'old',
    },
  },
  {
    id: 6,
    title: 'Traffic Cutover',
    description: 'Load balancer seamlessly switches traffic from old containers to the new containers with zero downtime.',
    visualState: {
      phase: 'switching',
      liveContainers: { old: 5, new: 5, oldState: 'dimming' },
      testContainers: { old: 0, new: 2 },
      trafficTarget: 'new',
      showTrafficFlow: true,
    },
  },
  {
    id: 7,
    title: 'Deployment Complete',
    description: 'Old containers retired. New containers serving all production traffic. Deployment process complete.',
    visualState: {
      phase: 'complete',
      liveContainers: { old: 0, new: 5 },
      testContainers: { old: 0, new: 2 },
      trafficTarget: 'new',
    },
  },
];
