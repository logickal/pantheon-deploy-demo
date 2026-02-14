export interface DeploymentStep {
  id: number;
  title: string;
  description: string;
  visualState: {
    // Visual state data for this step - structure TBD based on your process
    [key: string]: unknown;
  };
}

export interface DeploymentState {
  currentStep: number;
  totalSteps: number;
  steps: DeploymentStep[];
}
