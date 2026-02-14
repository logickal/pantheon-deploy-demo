import { DeploymentStep } from '@/types/deployment';

export const deploymentSteps: DeploymentStep[] = [
  {
    id: 1,
    title: 'Production Running',
    description: 'Live environment serving traffic with current code version. All systems operational.',
    visualState: {
      phase: 'stable',
      activeContainers: 'current',
    },
  },
  {
    id: 2,
    title: 'Deploy Triggered',
    description: 'Deployment initiated via Dashboard or Terminus CLI. New code ready for release.',
    visualState: {
      phase: 'initiated',
      trigger: 'terminus env:deploy',
    },
  },
  {
    id: 3,
    title: 'Build New Containers',
    description: 'Pantheon spins up fresh containers with updated codebase and dependencies.',
    visualState: {
      phase: 'building',
      newContainers: 'building',
    },
  },
  {
    id: 4,
    title: 'Parallel Execution',
    description: 'New containers run alongside current production. No downtime occurs.',
    visualState: {
      phase: 'parallel',
      activeContainers: 'both',
    },
  },
  {
    id: 5,
    title: 'Health Verification',
    description: 'Automated checks validate new containers are healthy and ready for traffic.',
    visualState: {
      phase: 'healthcheck',
      status: 'validating',
    },
  },
  {
    id: 6,
    title: 'Traffic Cutover',
    description: 'Load balancer seamlessly redirects all traffic to new containers. Zero dropped requests.',
    visualState: {
      phase: 'switching',
      trafficTarget: 'new',
    },
  },
  {
    id: 7,
    title: 'Rollback Ready',
    description: 'Deployment complete. Previous containers remain available for instant rollback if needed.',
    visualState: {
      phase: 'deployed',
      rollbackAvailable: true,
    },
  },
  {
    id: 8,
    title: 'Complete',
    description: 'Deployment verified. Old containers terminated. Full zero-downtime deployment achieved.',
    visualState: {
      phase: 'complete',
      activeContainers: 'new',
    },
  },
];
