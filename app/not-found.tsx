import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-pantheon-dark">
      <h1 className="text-6xl font-display font-bold text-white">404</h1>
      <p className="mt-4 text-gray-400 font-body">Page not found</p>
      <Link href="/" className="mt-6 text-pantheon-yellow hover:underline font-body">
        Return to deployment demo
      </Link>
    </div>
  );
}
