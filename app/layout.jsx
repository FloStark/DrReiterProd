import './globals.css';
import { getPage, getSite } from './lib/content';
import { absoluteUrl } from './lib/seo';

export default function RootLayout({ children }) {
  const site = getSite();
  const contact = getPage('contact', 'contactPage');
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: site.siteTitle,
    url: absoluteUrl(site, '/'),
    logo: site.logo ? absoluteUrl(site, site.logo) : undefined,
    image: site.socialImage ? absoluteUrl(site, site.socialImage) : undefined,
    telephone: contact.phoneLabel,
    email: contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.addressLines?.[0],
      postalCode: '8020',
      addressLocality: 'Graz',
      addressCountry: 'AT'
    },
    medicalSpecialty: ['InternalMedicine', 'PrimaryCare'],
    physician: [
      { '@type': 'Physician', name: 'Dr. Lukas Reiter', medicalSpecialty: 'InternalMedicine' },
      { '@type': 'Physician', name: 'Dr. Sigrid Reiter', medicalSpecialty: 'PrimaryCare' }
    ]
  };

  return (
    <html lang="de">
      <body className="min-h-screen bg-white text-black antialiased">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      </body>
    </html>
  );
}
