import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/">
      <div className="text-2xl font-headline font-bold text-white transition-colors hover:text-accent">
        ReelSharper
      </div>
    </Link>
  );
}
