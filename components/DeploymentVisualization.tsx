'use client';

import { DeploymentStep } from '@/types/deployment';
import Container from './Container';
import LoadBalancer from './LoadBalancer';
import TrafficFlow from './TrafficFlow';
import ImageBadge from './ImageBadge';
import BuildingImage from './BuildingImage';

interface DeploymentVisualizationProps {
  currentStep: DeploymentStep;
  step4SubStep: number;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export default function DeploymentVisualization({
  currentStep,
  step4SubStep,
  onNext,
  isLastStep,
}: DeploymentVisualizationProps) {
  const step = currentStep.id;
  const visualState = currentStep.visualState;

  // Camera positioning based on step
  const getCameraTransform = () => {
    if (step === 1) return 'scale(0.7)'; // Zoomed out - see both
    if (step === 2 || step === 3) return 'scale(1.0) translateX(30%)'; // Zoomed into Test (left side)
    if (step >= 4) return 'scale(1.0) translateX(-25%)'; // Zoomed into Live (right side, centered)
    return 'scale(1)';
  };

  // Determine container states for Test environment
  const getTestContainerStates = () => {
    if (step === 1) return Array(2).fill('active');
    if (step === 2) return Array(2).fill('active'); // Still active during build
    if (step >= 3) return Array(2).fill('active'); // New containers
    return [];
  };

  const getTestOldContainerStates = () => {
    if (step <= 2) return [];
    if (step === 3) return Array(2).fill('retired'); // Old containers disappearing
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
            <div className={`absolute left-[5%] top-1/2 -translate-y-1/2 ${step >= 4 ? 'opacity-30' : 'opacity-100'} transition-opacity duration-500`}>
              {/* Environment box with border */}
              <div className="relative border-2 border-[#5F41E5]/30 rounded-2xl p-16 pb-24 bg-[#5F41E5]/5 backdrop-blur-sm min-h-[480px]">
                {/* Environment Label - Centered Above */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-[#23232D] border-2 border-[#5F41E5] rounded-lg">
                  <div className="text-xl font-bold text-[#5F41E5] tracking-wider">TEST</div>
                </div>

                {/* Test Load Balancer */}
                <div className="flex justify-center mb-8 -mt-4">
                  <LoadBalancer active={step >= 3} />
                </div>

                {/* Test Containers Area */}
                <div className="relative min-h-[240px] flex items-end justify-center">
                  {/* Old containers (fade out in step 3) */}
                  {step <= 2 && (
                    <div className="flex gap-4 justify-center items-end">
                      {getTestContainerStates().map((state, i) => (
                        <div key={`test-old-${i}`} className="relative">
                          <Container state={state as any} delay={i * 100} />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Step 3: Image deploying animation */}
                  {step === 3 && (
                    <>
                      {/* Old containers fading */}
                      <div className="absolute bottom-0 flex gap-4 justify-center items-end animate-fade-out">
                        {Array(2).fill('dimming').map((state, i) => (
                          <div key={`test-fading-${i}`} className="relative">
                            <Container state={state as any} delay={0} />
                          </div>
                        ))}
                      </div>

                      {/* Build image animating down */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 animate-slide-down-deploy">
                        <BuildingImage />
                      </div>

                      {/* New containers spawning */}
                      <div className="flex gap-4 justify-center items-end">
                        {getTestContainerStates().map((state, i) => (
                          <div key={`test-new-${i}`} className="relative">
                            <Container state="building" delay={800 + i * 100} />
                            {i === 0 && (
                              <ImageBadge version="master" show={true} />
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Step 4+: New containers active */}
                  {step >= 4 && (
                    <div className="flex gap-4 justify-center items-end">
                      {getTestContainerStates().map((state, i) => (
                        <div key={`test-${i}`} className="relative">
                          <Container state={state as any} delay={i * 100} />
                          {i === 0 && (
                            <ImageBadge version="master" show={true} />
                          )}
                          {step >= 3 && step <= 5 && (
                            <TrafficFlow active={true} delay={i * 200} />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Build image only shows in step 2 */}
                {step === 2 && (
                  <div className="mt-12 text-center">
                    <BuildingImage />
                  </div>
                )}
              </div>
            </div>

            {/* Live Environment (Right Side) */}
            <div className={`absolute right-[5%] top-1/2 -translate-y-1/2 ${step <= 3 ? 'opacity-30' : 'opacity-100'} transition-opacity duration-500`}>
              {/* Environment box with border */}
              <div className="relative border-2 border-[#FFDC28]/30 rounded-2xl p-16 pb-24 bg-[#FFDC28]/5 backdrop-blur-sm min-h-[480px]">
                {/* Environment Label - Centered Above */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-[#23232D] border-2 border-[#FFDC28] rounded-lg">
                  <div className="text-xl font-bold text-[#FFDC28] tracking-wider">LIVE</div>
                </div>

                {/* Live Load Balancer */}
                <div className="flex justify-center mb-8 -mt-4">
                  <LoadBalancer active={step >= 1} />
                </div>

                {/* Live Containers */}
                <div className="relative flex flex-col gap-6 items-center min-h-[320px]">
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

                  {/* Step 4: Multi-phase deployment */}
                  {step === 4 && (
                    <>
                      {/* Sub-step 1-2: Banner and image icon */}
                      {(step4SubStep === 1 || step4SubStep === 2) && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full flex flex-col items-center gap-8">
                          {/* "Same Images" callout - fades in on sub-step 1, fades out on sub-step 2 */}
                          <div className={`whitespace-nowrap ${step4SubStep === 1 ? 'animate-fade-in' : 'animate-fade-out'}`}>
                            <div className="px-6 py-3 bg-[#FFDC28]/20 border-2 border-[#FFDC28] rounded-xl backdrop-blur-sm">
                              <div className="text-[#FFDC28] text-sm font-bold tracking-widest text-center">
                                ⚡ SAME IMAGES FROM TEST
                              </div>
                              <div className="text-gray-300 text-xs text-center mt-1">
                                No rebuild · Guaranteed consistency
                              </div>
                            </div>
                          </div>

                          {/* Build image icon - static (already built) */}
                          <div className={step4SubStep === 1 ? 'animate-fade-in' : ''}>
                            <BuildingImage building={false} />
                          </div>
                        </div>
                      )}

                      {/* Sub-step 2 only: Container outlines appear, image deploys to each (after banner fades) */}
                      {step4SubStep === 2 && (
                        <>
                          {/* Container outlines with image deploying animation - delayed to start after banner fade */}
                          <div className="flex gap-3 justify-center items-end relative">
                            {Array(5).fill('outline').map((_, i) => (
                              <div key={`live-outline-${i}`} className="relative">
                                {/* Container outline - starts appearing after banner fade (600ms delay) */}
                                <div className="w-20 h-24 rounded-lg border-2 border-[#5F41E5]/40 bg-transparent animate-fade-in"
                                     style={{ animationDelay: `${600 + i * 100}ms` }}>
                                </div>

                                {/* Small image icon deploying onto each container */}
                                <div
                                  className="absolute top-0 left-1/2 -translate-x-1/2 animate-slide-down-deploy z-10"
                                  style={{ animationDelay: `${800 + i * 150}ms` }}
                                >
                                  <div className="w-8 h-8 rounded border border-[#FFDC28] bg-gradient-to-br from-[#5F41E5] to-[#3017A1] opacity-80"></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {/* Sub-step 3: Container image fades out, containers show building animation */}
                      {step4SubStep === 3 && (
                        <>
                          {/* Container image fading out */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full flex flex-col items-center gap-8">
                            <div className="animate-fade-out">
                              <BuildingImage building={false} />
                            </div>
                          </div>

                          {/* Containers showing repeating building animation */}
                          <div className="flex gap-3 justify-center items-end">
                            {Array(5).fill('building').map((state, i) => (
                              <div key={`live-new-building-${i}`} className="relative">
                                <Container state="building" delay={i * 100} />
                                {i === 0 && (
                                  <ImageBadge version="master" show={true} />
                                )}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  )}

                  {/* Steps 5+: New containers active */}
                  {step >= 5 && getLiveNewContainerStates().length > 0 && (
                    <div className="flex gap-3 justify-center items-end">
                      {getLiveNewContainerStates().map((state, i) => (
                        <div key={`live-new-${i}`} className="relative">
                          <Container state={state as any} delay={i * 80} />
                          {i === 0 && (
                            <ImageBadge version="master" show={true} />
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
            </div>

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
