'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-pantheon-dark">
      <h1 className="text-4xl font-display font-bold text-white">Something went wrong</h1>
      <p className="mt-4 text-gray-400 font-body">
        {error.message || 'An unexpected error occurred'}
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-md bg-pantheon-yellow px-4 py-2 font-body text-black hover:bg-pantheon-yellow/90"
      >
        Try again
      </button>
    </div>
  );
}
