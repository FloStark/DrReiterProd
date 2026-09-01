'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { tinaField } from 'tinacms/dist/react';

export function Header({ site }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 px-4 transition-all duration-300 md:px-6 ${scrolled ? 'py-3' : 'py-5'}`}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between gap-5 rounded-full border px-4 py-3 transition-all duration-300 md:px-5 ${scrolled ? 'border-black/10 bg-white/[0.92] shadow-2xl shadow-black/10 backdrop-blur-xl' : 'border-black/5 bg-white/[0.85] shadow-lg shadow-black/5 backdrop-blur-md'}`}>
        <Link href="/" className="logo-title group relative text-sm font-bold tracking-[0.08em] md:text-base" data-tina-field={tinaField(site, 'brandLabel')}>
          <span className="mr-3 grid h-9 w-9 place-items-center rounded-full bg-black text-xs font-bold tracking-normal text-white transition-transform duration-300 group-hover:scale-105">R</span>
          {site.logo ? (
            <img className="max-h-9 w-auto" src={site.logo} alt={site.brandLabel} data-tina-field={tinaField(site, 'logo')} />
          ) : (
            site.brandLabel
          )}
        </Link>
        <nav className="hidden items-center rounded-full bg-[#f4efe7] p-1 text-sm font-semibold lg:flex" aria-label="Hauptnavigation">
          {site.navigation.map((item) => (
            <Link key={item.href} href={item.href} className={`nav-pill ${pathname === item.href ? 'is-active' : ''}`} aria-current={pathname === item.href ? 'page' : undefined} data-tina-field={tinaField(item, 'label')}>
              <span className="sr-only">{pathname === item.href ? 'Aktuelle Seite: ' : ''}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/terminvereinbarung" className="hidden rounded-full bg-black px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#24384d] md:block">Termin buchen</Link>
        <button className="grid h-11 w-11 place-items-center rounded-full bg-black text-white shadow-sm transition hover:scale-105 hover:bg-[#24384d] lg:hidden" type="button" aria-expanded={open} aria-controls="main-menu" aria-label="Menü öffnen" onClick={() => setOpen(true)}>
          <span className="relative block h-3 w-5" aria-hidden="true">
            <span className="absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current" />
            <span className="absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-current" />
            <span className="absolute left-0 top-3 h-0.5 w-5 rounded-full bg-current" />
          </span>
        </button>
      </div>
      <nav id="main-menu" className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-[#f4efe7] px-5 py-6 shadow-2xl transition-transform duration-500 ease-out lg:hidden ${open ? 'translate-x-0' : 'translate-x-full'}`} aria-label="Mobile Navigation">
        <div className="flex justify-end">
          <button className="grid h-11 w-11 place-items-center rounded-full bg-white/80 text-2xl transition hover:rotate-90 hover:bg-black hover:text-white" type="button" aria-label="Menü schließen" onClick={() => setOpen(false)}>
            ×
          </button>
        </div>
        <div className="mt-10 grid gap-3 text-2xl font-bold">
          {site.navigation.map((item, index) => (
            <Link key={item.href} href={item.href} className="menu-link mobile-menu-link" aria-current={pathname === item.href ? 'page' : undefined} data-tina-field={tinaField(item, 'label')} style={{ transitionDelay: open ? `${index * 35}ms` : '0ms' }} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
      <button className={`fixed inset-0 z-40 bg-black/25 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`} aria-label="Menü schließen" type="button" onClick={() => setOpen(false)} />
    </header>
  );
}

export function Footer({ site }) {
  return (
    <footer className="border-t border-black/10 bg-white px-5 py-8 text-sm md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} <span data-tina-field={tinaField(site, 'siteTitle')}>{site.siteTitle}</span>
        </p>
        <div className="flex gap-5">
          <Link className="underline-offset-4 hover:underline" href="/impressum">Impressum</Link>
          <Link className="underline-offset-4 hover:underline" href="/datenschutz">Datenschutz</Link>
        </div>
      </div>
    </footer>
  );
}

function VacationPopup({ popup }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!popup?.enabled) return;

    const endDate = popup.endDate ? new Date(popup.endDate) : null;
    if (endDate) endDate.setHours(23, 59, 59, 999);
    if (endDate && endDate < new Date()) return;

    const storageKey = `vacation-popup-dismissed-${popup.endDate || 'open'}-${popup.title || ''}`;
    if (window.localStorage.getItem(storageKey) === 'true') return;

    setVisible(true);
  }, [popup]);

  if (!visible || !popup?.enabled) return null;

  const storageKey = `vacation-popup-dismissed-${popup.endDate || 'open'}-${popup.title || ''}`;

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-black/35 px-5 backdrop-blur-sm" role="presentation">
      <section className="w-full max-w-xl rounded-[2rem] border border-black/10 bg-white p-6 shadow-2xl shadow-black/20 md:p-8" role="dialog" aria-modal="true" aria-labelledby="vacation-popup-title">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/45">Hinweis</p>
            <h2 id="vacation-popup-title" className="mt-2 font-serif text-3xl" data-tina-field={tinaField(popup, 'title')}>{popup.title}</h2>
          </div>
          <button className="grid h-11 w-11 place-items-center rounded-full bg-reiter text-2xl transition hover:bg-black hover:text-white" type="button" aria-label="Urlaubsvertretungs-Hinweis schließen" onClick={() => { window.localStorage.setItem(storageKey, 'true'); setVisible(false); }}>
            ×
          </button>
        </div>
        <div className="mt-6 space-y-3 leading-7 text-black/75">
          {popup.lines?.map((line, lineIndex) => (
            <p key={`popup-line-${lineIndex}`} data-tina-field={tinaField(popup, 'lines', lineIndex)}>
              {line.segments?.map((segment, segmentIndex) => (
                <span key={`popup-segment-${lineIndex}-${segmentIndex}`} className={`${segment.bold ? 'font-bold' : ''} ${segment.red ? 'text-red-700' : ''}`} data-tina-field={tinaField(segment, 'text')}>
                  {segment.text}
                </span>
              ))}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}

export function PageFrame({ site, children }) {
  return (
    <>
      <Header site={site} />
      <main className="pt-24">{children}</main>
      <Footer site={site} />
      <VacationPopup popup={site.vacationPopup} />
    </>
  );
}
