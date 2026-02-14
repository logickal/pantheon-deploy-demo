'use client';

interface StepControlsProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onReset: () => void;
}

export default function StepControls({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onReset,
}: StepControlsProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="bg-white border-t border-gray-200 px-8 py-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Previous Button */}
        <button
          onClick={onPrevious}
          disabled={isFirstStep}
          className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        {/* Step Indicator */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Step {currentStep} of {totalSteps}
          </span>

          {/* Reset Button */}
          <button
            onClick={onReset}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          disabled={isLastStep}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          Next
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
