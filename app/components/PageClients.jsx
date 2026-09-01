'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { tinaField, useTina } from 'tinacms/dist/react';
import { PageFrame } from './Shell';

function usePageTina(props) {
  return useTina({ query: props.query, variables: props.variables, data: props.data }).data;
}

function OrdinationSlideshow({ ordination }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const slides = ordination.images?.length ? ordination.images : [];

  useEffect(() => {
    if (slides.length < 2 || paused) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 4500);
    return () => window.clearInterval(interval);
  }, [paused, slides.length]);

  const previousSlide = () => setActive((current) => (current - 1 + slides.length) % slides.length);
  const nextSlide = () => setActive((current) => (current + 1) % slides.length);

  return (
    <section className="ordination-gallery px-5 py-16 md:px-8 md:py-24" aria-labelledby="ordination-title">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] bg-white/70 p-4 shadow-2xl shadow-black/5 md:grid-cols-[0.75fr_1.25fr] md:items-center md:rounded-[3rem] md:p-8">
        <div className="p-2 md:p-6">
          <p className="eyebrow" data-tina-field={tinaField(ordination, 'eyebrow')}>{ordination.eyebrow}</p>
          <h2 id="ordination-title" className="mt-4 text-4xl font-bold leading-[0.95] md:text-6xl" data-tina-field={tinaField(ordination, 'title')}>{ordination.title}</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-black/65" data-tina-field={tinaField(ordination, 'text')}>{ordination.text}</p>
        </div>
        <div className="overflow-hidden rounded-[2rem] border border-black/5 bg-white p-3 shadow-2xl shadow-black/10 md:rounded-[2.75rem]" role="region" aria-roledescription="Slideshow" aria-label="Fotos der Ordination">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-reiter/45 md:rounded-[2.2rem]" aria-live="polite">
            {slides.map((slide, index) => (
              <div key={`${slide.alt}-${index}`} className={`absolute inset-0 transition-all duration-700 ease-out ${active === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`} aria-hidden={active !== index}>
                {slide.image ? (
                  <img className="h-full w-full object-cover" src={slide.image} alt={slide.alt || ordination.title} style={{ objectPosition: slide.imagePosition || 'center' }} data-tina-field={tinaField(slide, 'image')} />
                ) : (
                  <div className="grid h-full place-items-center text-center text-black/45" data-tina-field={tinaField(slide, 'image')}>
                    <span className="max-w-xs px-6 text-sm font-semibold uppercase tracking-[0.24em]">Bild in TinaCMS hochladen</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between gap-4 px-2">
            <p className="text-sm text-black/55" data-tina-field={slides[active] ? tinaField(slides[active], 'alt') : undefined}>{slides[active]?.alt || 'Ordinationsfoto'}</p>
            <div className="flex items-center gap-2">
              <button className="rounded-full border border-black/15 bg-white px-3 py-1 text-xs transition hover:bg-black hover:text-white" type="button" onClick={previousSlide}>Zurück</button>
              <button className="rounded-full border border-black/15 bg-white px-3 py-1 text-xs transition hover:bg-black hover:text-white" type="button" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>{paused ? 'Start' : 'Pause'}</button>
              <button className="rounded-full border border-black/15 bg-white px-3 py-1 text-xs transition hover:bg-black hover:text-white" type="button" onClick={nextSlide}>Weiter</button>
              {slides.map((slide, index) => (
                <button key={`${slide.alt}-dot-${index}`} className={`h-2.5 rounded-full transition-all ${active === index ? 'w-8 bg-black' : 'w-2.5 bg-black/20'}`} type="button" aria-label={`Bild ${index + 1} anzeigen`} aria-current={active === index ? 'true' : undefined} onClick={() => setActive(index)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeClient(props) {
  const data = usePageTina(props);
  const site = data.siteSettings;
  const page = data.homePage;

  return (
    <PageFrame site={site}>
      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl divide-y divide-black/15 px-5 py-12 md:grid-cols-2 md:divide-x md:divide-y-0 md:px-8">
        {page.doctors.map((doctor, index) => (
          <article key={doctor.href} className={`flex flex-col items-center justify-between gap-8 text-center ${index === 0 ? 'pb-10 md:pr-12 md:pb-0' : 'pt-10 md:pt-0 md:pl-12'}`}>
            <div className="flex w-full flex-col items-center gap-6">
              <Link href={doctor.href} className="profile-photo" aria-label={doctor.name}>
                {doctor.photo ? <img src={doctor.photo} alt={doctor.name} style={{ objectPosition: doctor.photoPosition || 'center' }} data-tina-field={tinaField(doctor, 'photo')} /> : <span data-tina-field={tinaField(doctor, 'initials')}>{doctor.initials}</span>}
              </Link>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-black/55" data-tina-field={tinaField(doctor, 'specialty')}>{doctor.specialty}</p>
                {index === 0 ? (
                  <h1 className="mt-3 font-serif text-4xl md:text-6xl" data-tina-field={tinaField(doctor, 'name')}>{doctor.name}</h1>
                ) : (
                  <h2 className="mt-3 font-serif text-4xl md:text-6xl" data-tina-field={tinaField(doctor, 'name')}>{doctor.name}</h2>
                )}
              </div>
              <div className="premium-card w-full max-w-md rounded-[2rem] border border-black/10 bg-white p-5 text-left shadow-sm">
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45" data-tina-field={tinaField(doctor, 'servicesTitle')}>{doctor.servicesTitle}</h3>
                <ul className="mt-4 grid gap-3">
                  {doctor.services.map((service, serviceIndex) => (
                    <li key={service} className="flex items-start gap-3 rounded-2xl bg-reiter/35 px-4 py-3" data-tina-field={tinaField(doctor, 'services', serviceIndex)}>
                      <span className="service-dot" aria-hidden="true" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-2 text-sm leading-7">
              <p><strong>Ordinationszeiten:</strong> <span data-tina-field={tinaField(doctor, 'openingHours')}>{doctor.openingHours}</span></p>
              <p><strong>Telefon:</strong> <a href={`tel:${doctor.phoneHref}`} data-tina-field={tinaField(doctor, 'phoneLabel')}>{doctor.phoneLabel}</a></p>
            </div>
          </article>
        ))}
      </section>
      <OrdinationSlideshow ordination={page.ordination} />
      <section id="anfahrt" className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.4rem] bg-[#24384d] p-5 text-white shadow-2xl shadow-black/10 md:grid-cols-[0.8fr_1.2fr] md:items-center md:rounded-[3rem] md:p-8 lg:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80" data-tina-field={tinaField(page.directions, 'eyebrow')}>{page.directions.eyebrow}</p>
            <h2 className="mt-4 text-4xl font-bold leading-none text-white md:text-6xl" data-tina-field={tinaField(page.directions, 'title')}>{page.directions.title}</h2>
            <p className="mt-6 max-w-xl leading-7 text-white/90" data-tina-field={tinaField(page.directions, 'text')}>{page.directions.text}</p>
          </div>
          <iframe className="h-80 w-full rounded-[2rem] border-0 shadow-2xl shadow-black/20" title={page.directions.mapTitle} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${encodeURIComponent(page.directions.mapQuery)}&output=embed`} />
        </div>
      </section>
    </PageFrame>
  );
}

export function DoctorClient(props) {
  const data = usePageTina(props);
  const site = data.siteSettings;
  const doctor = data.doctorPages;

  return (
    <PageFrame site={site}>
      <section className="doctor-heading mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="rounded-[2.4rem] bg-[#f4efe7] p-7 shadow-2xl shadow-black/5 md:rounded-[3.5rem] md:p-10 lg:p-12">
          <p className="eyebrow" data-tina-field={tinaField(doctor, 'subtitle')}>{doctor.subtitle}</p>
          <h1 className="mt-5 text-5xl font-bold leading-[0.92] tracking-[-0.05em] md:text-8xl" data-tina-field={tinaField(doctor, 'title')}>{doctor.title}</h1>
        </div>
      </section>
      {doctor.sections.map((section) => (
        <section key={section.id} id={section.id} className="doctor-section px-5 py-10 md:px-8 md:py-14">
          <div className={`mx-auto grid max-w-7xl gap-10 rounded-[2.4rem] p-6 shadow-2xl md:grid-cols-[0.8fr_1.2fr] md:rounded-[3rem] md:p-10 ${section.theme === 'accent' ? 'bg-[#24384d] text-white shadow-black/10' : 'bg-white/75 text-black shadow-black/5'}`}>
            <div>
              <p className={`eyebrow ${section.theme === 'accent' ? '!text-white/75' : ''}`} data-tina-field={tinaField(section, 'short')}>{section.short}</p>
              <h2 className="mt-4 text-4xl font-bold leading-none tracking-[-0.04em] md:text-6xl" data-tina-field={tinaField(section, 'title')}>{section.title}</h2>
            </div>
            <div className="space-y-8">
              <p className={`text-xl leading-9 ${section.theme === 'accent' ? 'text-white/90' : 'text-black/70'}`} data-tina-field={tinaField(section, 'text')}>{section.text}</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {section.services.map((service, index) => (
                  <li key={service} className={`flex items-start gap-3 rounded-[1.5rem] border p-5 ${section.theme === 'accent' ? 'border-white/10 bg-white/10 text-white' : 'border-black/5 bg-[#f4efe7]'}`} data-tina-field={tinaField(section, 'services', index)}>
                    <span className={section.theme === 'accent' ? 'mt-2 h-2 w-2 flex-none rounded-full bg-reiter shadow-[0_0_0_5px_rgb(195_207_219_/_0.18)]' : 'service-dot'} aria-hidden="true" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
              {section.actions ? (
                <div className="grid max-w-xs gap-3">
                  <Link href="/terminvereinbarung" className="rounded-full bg-black px-6 py-3 text-center text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#24384d]">Terminvereinbarung</Link>
                  <Link href="/rezeptbestellung" className="rounded-full border border-black/15 bg-white px-6 py-3 text-center text-sm font-bold transition hover:-translate-y-0.5 hover:border-black">Rezeptbestellung</Link>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ))}
    </PageFrame>
  );
}

export function BookingClient(props) {
  const data = usePageTina(props);
  const site = data.siteSettings;
  const page = data.bookingPage;
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const steps = page.steps;

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  return (
    <PageFrame site={site}>
      <section className="booking-page mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="rounded-[2.5rem] bg-gradient-to-br from-reiter/55 via-white to-white p-6 shadow-2xl shadow-black/5 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50" data-tina-field={tinaField(page, 'eyebrow')}>{page.eyebrow}</p>
          <h1 className="mt-4 font-serif text-5xl md:text-7xl" data-tina-field={tinaField(page, 'heading')}>{page.heading}</h1>
          <p className="mt-5 max-w-2xl leading-7 text-black/65" data-tina-field={tinaField(page, 'intro')}>{page.intro}</p>
        </div>
        <div className="mt-10 grid gap-3 text-sm font-semibold uppercase tracking-[0.18em] sm:grid-cols-3">
          {steps.map((label, index) => <span key={label} className={`step-dot ${step === index ? 'is-active' : ''}`} data-tina-field={tinaField(page, 'steps', index)}>{label}</span>)}
        </div>
        <form className="appointment-panel mt-10 rounded-[2rem] border border-black/10 bg-white p-5 shadow-xl shadow-black/5 md:p-8" aria-describedby="booking-status" onSubmit={(event) => event.preventDefault()}>
          {step === 0 ? (
            <section className="space-y-5">
              <h2 className="font-serif text-3xl" data-tina-field={tinaField(page, 'doctorQuestion')}>{page.doctorQuestion}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {page.doctors.map((doctor, index) => (
                  <label key={doctor.name} className="doctor-booking-card" data-tina-field={tinaField(page, 'doctors', index)}>
                    <input className="sr-only" required type="radio" name="doctor" value={doctor.name} checked={form.doctor === doctor.name} onChange={update} />
                    <span className="booking-photo" data-tina-field={tinaField(doctor, doctor.photo ? 'photo' : 'initials')}>
                      {doctor.photo ? <img src={doctor.photo} alt={doctor.name} style={{ objectPosition: doctor.photoPosition || 'center' }} /> : doctor.initials}
                    </span>
                    <span className="grid gap-1">
                      <strong data-tina-field={tinaField(doctor, 'label')}>{doctor.label}</strong>
                      <small data-tina-field={tinaField(doctor, 'name')}>{doctor.name}</small>
                    </span>
                  </label>
                ))}
              </div>
            </section>
          ) : null}
          {step === 1 ? (
            <section className="space-y-5">
              <h2 className="font-serif text-3xl" data-tina-field={tinaField(page, 'appointmentHeading')}>{page.appointmentHeading}</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {page.appointmentTypes.map((type, index) => (
                  <label key={type} className="choice-card min-h-28" data-tina-field={tinaField(page, 'appointmentTypes', index)}>
                    <input required type="radio" name="type" value={type} checked={form.type === type} onChange={update} />{type}
                  </label>
                ))}
                <label className="choice-card min-h-28">Tag<input required className="field-input mt-3" type="date" name="date" value={form.date || ''} onChange={update} /></label>
                <label className="choice-card min-h-28">Uhrzeit<select required className="field-input mt-3" name="time" value={form.time || ''} onChange={update}><option value="">Bitte wählen</option>{page.times.map((time) => <option key={time}>{time}</option>)}</select></label>
              </div>
            </section>
          ) : null}
          {step === 2 ? (
            <section className="space-y-5">
              <h2 className="font-serif text-3xl" data-tina-field={tinaField(page, 'patientHeading')}>{page.patientHeading}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="field-label">Vorname<input required className="field-input" name="firstName" value={form.firstName || ''} onChange={update} /></label>
                <label className="field-label">Nachname<input required className="field-input" name="lastName" value={form.lastName || ''} onChange={update} /></label>
                <label className="field-label">Geburtsdatum<input required className="field-input" type="date" name="birthDate" value={form.birthDate || ''} onChange={update} /></label>
                <label className="field-label">SV-Nummer<input required className="field-input" inputMode="numeric" name="socialNumber" value={form.socialNumber || ''} onChange={update} /></label>
                <label className="field-label md:col-span-2">Adresse<input required className="field-input" name="address" value={form.address || ''} onChange={update} /></label>
              </div>
            </section>
          ) : null}
          <div className="mt-8 flex justify-between gap-3">
            <button className="rounded-full border border-black px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em]" type="button" hidden={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}>Zurück</button>
            <button className="rounded-full bg-black px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white disabled:opacity-50" type="button" disabled={submitted} onClick={() => (step === steps.length - 1 ? setSubmitted(true) : setStep((current) => Math.min(steps.length - 1, current + 1)))}>{submitted ? 'Gesendet' : step === steps.length - 1 ? 'Absenden' : 'Weiter'}</button>
          </div>
          <p id="booking-status" className="mt-4 text-sm text-black/60" aria-live="polite">{submitted ? 'Ihre Terminanfrage wurde vorbereitet.' : `Aktueller Schritt: ${steps[step]}`}</p>
        </form>
      </section>
    </PageFrame>
  );
}

export function PrescriptionsClient(props) {
  const data = usePageTina(props);
  const site = data.siteSettings;
  const page = data.prescriptionsPage;
  const medications = props.medications;
  const [doctor, setDoctor] = useState('');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [count, setCount] = useState(1);
  const [items, setItems] = useState([]);
  const matches = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (value.length < 2 || selected?.name === query) return [];
    return medications.filter((medication) => medication.name.toLowerCase().includes(value) || medication.substance.toLowerCase().includes(value)).slice(0, 8);
  }, [medications, query, selected]);

  const addMedication = () => {
    if (!doctor || !selected || selected.name !== query) return;
    setItems((current) => [...current, { ...selected, doctor, count }]);
    setQuery('');
    setSelected(null);
    setCount(1);
  };

  return (
    <PageFrame site={site}>
      <section className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50" data-tina-field={tinaField(page, 'eyebrow')}>{page.eyebrow}</p>
        <h1 className="mt-4 font-serif text-5xl md:text-7xl" data-tina-field={tinaField(page, 'heading')}>{page.heading}</h1>
        <p className="mt-5 max-w-2xl leading-7 text-black/65" data-tina-field={tinaField(page, 'intro')}>{page.intro}</p>
        <form className="mt-10 space-y-8 rounded-3xl border border-black/10 p-5 md:p-8" onSubmit={(event) => event.preventDefault()}>
          <section className="space-y-5">
            <h2 className="font-serif text-3xl" data-tina-field={tinaField(page, 'steps', 0)}>{page.steps[0]}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {page.doctorOptions.map((option, index) => <label key={option} className="choice-card" data-tina-field={tinaField(page, 'doctorOptions', index)}><input required type="radio" name="doctor" value={option} checked={doctor === option} onChange={(event) => setDoctor(event.target.value)} />{option}</label>)}
            </div>
          </section>
          <section className="space-y-5">
            <h2 className="font-serif text-3xl" data-tina-field={tinaField(page, 'steps', 1)}>{page.steps[1]}</h2>
            <div className="relative">
              <input className="field-input" type="search" role="combobox" aria-expanded={matches.length > 0} aria-controls="medication-results" aria-autocomplete="list" autoComplete="off" placeholder={page.searchPlaceholder} value={query} onChange={(event) => { setQuery(event.target.value); setSelected(null); }} />
              {matches.length ? <div id="medication-results" className="autocomplete" role="listbox">{matches.map((medication) => <button key={medication.id} role="option" aria-selected={selected?.id === medication.id} type="button" onClick={() => { setSelected(medication); setQuery(medication.name); }}>{medication.name}<br /><small>{medication.substance} · {medication.package}</small></button>)}</div> : null}
            </div>
            <p className="text-sm text-black/55" aria-live="polite" data-tina-field={tinaField(page, 'emptySelectionText')}>{selected ? `Ausgewählt: ${selected.name} (${selected.package})` : page.emptySelectionText}</p>
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
              <label className="field-label">Packungen<input className="field-input" type="number" min="1" max="12" value={count} onChange={(event) => setCount(event.target.value)} /></label>
              <button className="rounded-full bg-black px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white" type="button" onClick={addMedication}>Zur Liste hinzufügen</button>
            </div>
          </section>
          <section className="space-y-5">
            <h2 className="font-serif text-3xl" data-tina-field={tinaField(page, 'steps', 2)}>{page.steps[2]}</h2>
            <ul className="space-y-3">{items.map((item, index) => <li key={`${item.id}-${index}`} className="flex flex-col gap-3 rounded-2xl border border-black/10 p-4 sm:flex-row sm:items-center sm:justify-between"><span><strong>{item.name}</strong><br /><small>{item.count} Packung(en) · {item.doctor}</small></span><button className="rounded-full border border-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]" type="button" onClick={() => setItems((current) => current.filter((_, itemIndex) => itemIndex !== index))}>Entfernen</button></li>)}</ul>
            {!items.length ? <p className="text-sm text-black/55" data-tina-field={tinaField(page, 'emptyListText')}>{page.emptyListText}</p> : null}
          </section>
        </form>
      </section>
    </PageFrame>
  );
}

export function ContactClient(props) {
  const data = usePageTina(props);
  const site = data.siteSettings;
  const page = data.contactPage;
  return (
    <PageFrame site={site}>
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50" data-tina-field={tinaField(page, 'eyebrow')}>{page.eyebrow}</p>
        <h1 className="mt-4 font-serif text-5xl md:text-7xl" data-tina-field={tinaField(page, 'heading')}>{page.heading}</h1>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl bg-reiter p-8 text-white">
            <p className="text-2xl font-serif" data-tina-field={tinaField(page, 'addressLines')}>{page.addressLines.map((line) => <span key={line}>{line}<br /></span>)}</p>
            <p className="mt-6">Telefon: <a href={`tel:${page.phoneHref}`} data-tina-field={tinaField(page, 'phoneLabel')}>{page.phoneLabel}</a></p>
            <p>E-Mail: <a href={`mailto:${page.email}`} data-tina-field={tinaField(page, 'email')}>{page.email}</a></p>
          </div>
          <div className="space-y-6">
            <iframe className="h-80 w-full rounded-3xl border-0" title={page.mapTitle} loading="lazy" src={`https://www.google.com/maps?q=${encodeURIComponent(page.mapQuery)}&output=embed`} />
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <h2 className="font-serif text-3xl" data-tina-field={tinaField(page.access, 'title')}>{page.access.title}</h2>
              <p className="mt-4 leading-7 text-black/65" data-tina-field={tinaField(page.access, 'text')}>{page.access.text}</p>
              <ul className="mt-5 grid gap-3">
                {page.access.items.map((item, index) => (
                  <li key={item} className="flex gap-3 rounded-2xl bg-reiter/30 px-4 py-3" data-tina-field={tinaField(page.access, 'items', index)}>
                    <span className="service-dot mt-2" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}

export function InfoPageClient(props) {
  const data = usePageTina(props);
  const site = data.siteSettings;
  const page = data.infoPages;

  return (
    <PageFrame site={site}>
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50" data-tina-field={tinaField(page, 'eyebrow')}>{page.eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-serif text-5xl md:text-7xl" data-tina-field={tinaField(page, 'heading')}>{page.heading}</h1>
        <p className="mt-6 max-w-3xl text-xl leading-9 text-black/65" data-tina-field={tinaField(page, 'intro')}>{page.intro}</p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {page.sections.map((section, index) => (
            <article key={`${section.title}-${index}`} className="premium-card rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
              <h2 className="font-serif text-3xl" data-tina-field={tinaField(section, 'title')}>{section.title}</h2>
              <p className="mt-4 leading-7 text-black/65" data-tina-field={tinaField(section, 'text')}>{section.text}</p>
              <ul className="mt-5 grid gap-3">
                {section.items.map((item, itemIndex) => (
                  <li key={item} className="flex gap-3 rounded-2xl bg-reiter/30 px-4 py-3" data-tina-field={tinaField(section, 'items', itemIndex)}>
                    <span className="service-dot mt-2" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {section.href ? (
                <Link href={section.href} className="mt-6 inline-flex rounded-full bg-black px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white" data-tina-field={tinaField(section, 'linkLabel')}>
                  {section.linkLabel}
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </PageFrame>
  );
}

export function FaqClient(props) {
  const data = usePageTina(props);
  const site = data.siteSettings;
  const page = data.faqPage;

  return (
    <PageFrame site={site}>
      <section className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50" data-tina-field={tinaField(page, 'eyebrow')}>{page.eyebrow}</p>
        <h1 className="mt-4 font-serif text-5xl md:text-7xl" data-tina-field={tinaField(page, 'heading')}>{page.heading}</h1>
        <p className="mt-6 max-w-3xl text-xl leading-9 text-black/65" data-tina-field={tinaField(page, 'intro')}>{page.intro}</p>
        <div className="mt-12 divide-y divide-black/10 rounded-[2rem] border border-black/10 bg-white shadow-sm">
          {page.faqs.map((faq, index) => (
            <details key={faq.question} className="group p-6" open={index === 0}>
              <summary className="cursor-pointer list-none font-serif text-2xl" data-tina-field={tinaField(faq, 'question')}>
                {faq.question}
                <span className="float-right text-base transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 leading-7 text-black/65" data-tina-field={tinaField(faq, 'answer')}>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </PageFrame>
  );
}

export function LegalClient(props) {
  const data = usePageTina(props);
  const site = data.siteSettings;
  const page = data.legalPages;
  return (
    <PageFrame site={site}>
      <section className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
        <h1 className="font-serif text-5xl md:text-7xl" data-tina-field={tinaField(page, 'heading')}>{page.heading}</h1>
        <div className="mt-8 space-y-4 leading-7 text-black/70">
          {page.body.map((line, index) => line.startsWith('### ') ? (
            <h2 key={`${line}-${index}`} className="pt-5 font-serif text-2xl text-black" data-tina-field={tinaField(page, 'body', index)}>{line.replace('### ', '')}</h2>
          ) : (
            <p key={`${line}-${index}`} data-tina-field={tinaField(page, 'body', index)}>{line}</p>
          ))}
        </div>
      </section>
    </PageFrame>
  );
}
