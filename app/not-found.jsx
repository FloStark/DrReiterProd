import Link from 'next/link';
import { PageFrame } from './components/Shell';
import { getSite } from './lib/content';

export default function NotFound() {
  const site = getSite();

  return (
    <PageFrame site={site}>
      <section className="mx-auto max-w-4xl px-5 py-24 text-center md:px-8">
        <h1 className="font-serif text-5xl md:text-7xl">Seite nicht gefunden</h1>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white">Zur Startseite</Link>
      </section>
    </PageFrame>
  );
}
