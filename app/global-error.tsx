'use client';

export default function GlobalError() {
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }

  return (
    <html>
      <body>
        <script dangerouslySetInnerHTML={{ __html: 'window.location.href="/"' }} />
      </body>
    </html>
  );
}
