'use client';

import { DeploymentStep } from '@/types/deployment';

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

        {/* Main Visual Area - Placeholder for animations */}
        <div className="relative bg-[#23232D]/40 backdrop-blur-md rounded-3xl border border-[#5F41E5]/20 p-20 min-h-[500px] flex items-center justify-center overflow-hidden">
          {/* Animated gradient border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#FFDC28]/0 via-[#5F41E5]/20 to-[#DE0093]/0 opacity-50 blur-xl"></div>

          {/* Placeholder visual content */}
          <div className="relative text-center space-y-8 z-10">
            <div className="w-48 h-48 mx-auto bg-gradient-to-br from-[#5F41E5] to-[#DE0093] rounded-3xl flex items-center justify-center shadow-2xl shadow-[#5F41E5]/50 border-4 border-[#FFDC28]/20 animate-pulse-glow">
              <span className="text-8xl font-display text-white">{currentStep.id}</span>
            </div>
            <div className="space-y-3">
              <p className="text-gray-400 text-base font-body tracking-wide">
                VISUAL ANIMATION PLACEHOLDER
              </p>
              <p className="text-[#5F41E5] text-sm font-bold tracking-widest">
                // DEPLOYMENT IN PROGRESS
              </p>
            </div>
            {!isLastStep && (
              <p className="text-gray-500 text-sm mt-12 font-body tracking-wide animate-pulse">
                CLICK ANYWHERE TO CONTINUE →
              </p>
            )}
          </div>

          {/* Decorative background elements */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-[#FFDC28]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#DE0093]/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
