'use client';

import { DeploymentStep } from '@/types/deployment';
import Container from './Container';
import LoadBalancer from './LoadBalancer';
import TrafficFlow from './TrafficFlow';
import ImageBadge from './ImageBadge';

interface DeploymentVisualizationProps {
  currentStep: DeploymentStep;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export default function DeploymentVisualization({
  currentStep,
  onNext,
  isLastStep,
}: DeploymentVisualizationProps) {
  const step = currentStep.id;
  const visualState = currentStep.visualState;

  // Camera positioning based on step
  const getCameraTransform = () => {
    if (step === 1) return 'scale(0.7)'; // Zoomed out - see both
    if (step === 2 || step === 3) return 'scale(1.2) translateX(-35%)'; // Zoomed into Test
    if (step >= 4) return 'scale(1.2) translateX(35%)'; // Zoomed into Live
    return 'scale(1)';
  };

  // Determine container states for Test environment
  const getTestContainerStates = () => {
    if (step === 1) return Array(2).fill('active');
    if (step === 2) return Array(2).fill('dimming'); // Old being replaced
    if (step >= 3) return Array(2).fill('active'); // New containers
    return [];
  };

  // Determine container states for Live environment
  const getLiveOldContainerStates = () => {
    if (step <= 3) return Array(5).fill('active');
    if (step === 4 || step === 5) return Array(5).fill('active');
    if (step === 6) return Array(5).fill('dimming');
    if (step >= 7) return Array(5).fill('retired');
    return [];
  };

  const getLiveNewContainerStates = () => {
    if (step <= 3) return [];
    if (step === 4) return Array(5).fill('building');
    if (step === 5) return Array(5).fill('ready');
    if (step >= 6) return Array(5).fill('active');
    return [];
  };

  return (
    <div
      onClick={() => !isLastStep && onNext()}
      className={`h-full flex flex-col items-center justify-center px-20 py-16 ${
        !isLastStep ? 'cursor-pointer' : 'cursor-default'
      }`}
    >
      <div className="max-w-7xl w-full space-y-12">
        {/* Step Title & Description */}
        <div className="text-center space-y-6 animate-fade-in">
          <div className="inline-block px-6 py-2 rounded-lg bg-[#3017A1]/30 border border-[#5F41E5]/50 text-[#FFDC28] text-sm font-bold mb-2 tracking-widest backdrop-blur-sm">
            STEP {currentStep.id}
          </div>
          <h2 className="text-7xl font-display text-white tracking-tight leading-tight">
            {currentStep.title}
          </h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto font-body leading-relaxed">
            {currentStep.description}
          </p>
        </div>

        {/* Main Visual Area */}
        <div className="relative bg-[#23232D]/40 backdrop-blur-md rounded-3xl border border-[#5F41E5]/20 p-12 min-h-[600px] flex items-center justify-center overflow-hidden">
          {/* Animated gradient border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#FFDC28]/0 via-[#5F41E5]/20 to-[#DE0093]/0 opacity-50 blur-xl"></div>

          {/* Deployment Visualization with Camera Transform */}
          <div
            className="relative w-full h-full transition-transform duration-1000 ease-in-out"
            style={{ transform: getCameraTransform() }}
          >
            {/* Test Environment (Left Side) */}
            <div className={`absolute left-[10%] top-1/2 -translate-y-1/2 ${step >= 4 ? 'opacity-30' : 'opacity-100'} transition-opacity duration-500`}>
              <div className="text-center mb-8">
                <div className="text-sm font-bold text-[#5F41E5] tracking-widest mb-2">TEST ENVIRONMENT</div>
              </div>

              {/* Test Load Balancer */}
              <div className="flex justify-center mb-8">
                <LoadBalancer active={step >= 3} />
              </div>

              {/* Test Containers */}
              <div className="flex gap-4 justify-center items-end">
                {getTestContainerStates().map((state, i) => (
                  <div key={`test-${i}`} className="relative">
                    <Container state={state as any} delay={i * 100} />
                    {step >= 3 && i === 0 && (
                      <ImageBadge version="2.1.0" show={true} />
                    )}
                    {step >= 3 && step <= 5 && (
                      <TrafficFlow active={true} delay={i * 200} />
                    )}
                  </div>
                ))}
              </div>

              {step === 2 && (
                <div className="mt-8 text-center">
                  <div className="inline-block px-4 py-2 bg-[#5F41E5]/30 rounded-lg border border-[#FFDC28]/30">
                    <div className="text-[#FFDC28] text-xs font-mono">Building Images...</div>
                  </div>
                </div>
              )}
            </div>

            {/* Live Environment (Right Side) */}
            <div className={`absolute right-[10%] top-1/2 -translate-y-1/2 ${step <= 3 ? 'opacity-30' : 'opacity-100'} transition-opacity duration-500`}>
              <div className="text-center mb-8">
                <div className="text-sm font-bold text-[#FFDC28] tracking-widest mb-2">LIVE ENVIRONMENT</div>
              </div>

              {/* Live Load Balancer */}
              <div className="flex justify-center mb-8">
                <LoadBalancer active={step >= 1} />
              </div>

              {/* Live Containers */}
              <div className="flex flex-col gap-6 items-center">
                {/* Old containers row */}
                {getLiveOldContainerStates().length > 0 && (
                  <div className="flex gap-3 justify-center items-end">
                    {getLiveOldContainerStates().map((state, i) => (
                      <div key={`live-old-${i}`} className="relative">
                        <Container state={state as any} delay={i * 80} />
                        {(step <= 5 || step === 6) && state !== 'retired' && (
                          <TrafficFlow active={step <= 5} delay={i * 150} />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* New containers row */}
                {getLiveNewContainerStates().length > 0 && (
                  <div className="flex gap-3 justify-center items-end">
                    {getLiveNewContainerStates().map((state, i) => (
                      <div key={`live-new-${i}`} className="relative">
                        <Container state={state as any} delay={i * 80} />
                        {step >= 4 && i === 0 && (
                          <ImageBadge version="2.1.0" show={true} />
                        )}
                        {step >= 6 && (
                          <TrafficFlow active={true} delay={i * 150} />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Center indicator for wide view */}
            {step === 1 && (
              <div className="absolute top-8 left-1/2 -translate-x-1/2">
                <div className="text-gray-400 text-sm font-mono">← TEST | LIVE →</div>
              </div>
            )}

            {/* Same Images Callout */}
            {step === 4 && (
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 animate-fade-in">
                <div className="px-6 py-3 bg-[#FFDC28]/20 border-2 border-[#FFDC28] rounded-xl backdrop-blur-sm">
                  <div className="text-[#FFDC28] text-sm font-bold tracking-widest text-center">
                    ⚡ SAME IMAGES FROM TEST
                  </div>
                  <div className="text-gray-300 text-xs text-center mt-1">
                    No rebuild · Guaranteed consistency
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Click hint */}
          {!isLastStep && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <p className="text-gray-500 text-sm font-body tracking-wide animate-pulse">
                CLICK TO CONTINUE →
              </p>
            </div>
          )}

          {/* Decorative background elements */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-[#FFDC28]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#DE0093]/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
