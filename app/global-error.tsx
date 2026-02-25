'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)'
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffffff' }}>Something went wrong</h1>
          <p style={{ marginTop: '1rem', color: '#9ca3af' }}>
            {error.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: '1.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#ffd100',
              color: '#000000',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
