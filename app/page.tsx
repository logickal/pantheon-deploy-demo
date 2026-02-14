'use client';

import { useState } from 'react';
import DeploymentVisualization from '@/components/DeploymentVisualization';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { deploymentSteps } from '@/data/deploymentSteps';

export default function Home() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleNext = () => {
    if (currentStepIndex < deploymentSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
  };

  // Enable keyboard navigation (arrow keys)
  useKeyboardNavigation({
    onNext: handleNext,
    onPrevious: handlePrevious,
  });

  const currentStep = deploymentSteps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === deploymentSteps.length - 1;

  return (
    <div className="relative h-screen bg-gradient-pantheon-dark overflow-hidden">
      {/* Pantheon Logo - Top Left */}
      <div className="absolute top-8 left-8 z-10">
        <img
          src="/pantheon-logo-white.png"
          alt="Pantheon"
          className="h-8 w-auto mb-2"
        />
        <div className="text-xs text-gray-400 font-body tracking-widest">
          ZERO-DOWNTIME DEPLOYMENTS
        </div>
      </div>

      {/* Progress Dots - Top Right */}
      <div className="absolute top-10 right-8 flex gap-3 z-10">
        {deploymentSteps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => setCurrentStepIndex(index)}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === currentStepIndex
                ? 'bg-[#FFDC28] w-12 shadow-lg shadow-[#FFDC28]/50'
                : index < currentStepIndex
                ? 'bg-[#5F41E5] w-2 hover:w-3'
                : 'bg-gray-600 w-2 hover:w-3 hover:bg-gray-500'
            }`}
            title={step.title}
            aria-label={`Step ${step.id}: ${step.title}`}
          />
        ))}
      </div>

      {/* Main Visualization Area - Full Screen */}
      <DeploymentVisualization
        currentStep={currentStep}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />

      {/* Navigation Arrows with Pantheon styling */}
      {!isFirstStep && (
        <button
          onClick={handlePrevious}
          className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-xl bg-[#23232D]/80 backdrop-blur-sm border border-[#5F41E5]/30 flex items-center justify-center hover:bg-[#3017A1] hover:border-[#FFDC28] hover:scale-110 transition-all duration-300 z-10 group"
          aria-label="Previous step"
        >
          <svg className="w-7 h-7 text-white group-hover:text-[#FFDC28] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {!isLastStep && (
        <button
          onClick={handleNext}
          className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-xl bg-[#23232D]/80 backdrop-blur-sm border border-[#5F41E5]/30 flex items-center justify-center hover:bg-[#3017A1] hover:border-[#FFDC28] hover:scale-110 transition-all duration-300 z-10 group"
          aria-label="Next step"
        >
          <svg className="w-7 h-7 text-white group-hover:text-[#FFDC28] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Reset Button - Bottom Left */}
      <button
        onClick={handleReset}
        className="absolute bottom-8 left-8 px-6 py-3 rounded-xl bg-[#23232D]/80 backdrop-blur-sm border border-[#5F41E5]/30 text-sm font-bold text-white hover:bg-[#3017A1] hover:border-[#FFDC28] hover:text-[#FFDC28] hover:scale-105 transition-all duration-300 z-10 tracking-wide"
      >
        RESET
      </button>

      {/* Step Counter & Keyboard Hint - Bottom Right */}
      <div className="absolute bottom-8 right-8 text-right z-10">
        <div className="text-sm font-bold text-[#FFDC28] mb-1">
          STEP {currentStep.id} / {deploymentSteps.length}
        </div>
        <div className="text-xs text-gray-400 font-body tracking-wider">
          USE ← → ARROW KEYS
        </div>
      </div>
    </div>
  );
}
