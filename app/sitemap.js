import { getSite } from './lib/content';
import { absoluteUrl } from './lib/seo';

const routes = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/lukas-reiter', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/sigrid-reiter', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/leistungen', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/vorsorgeuntersuchung', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/gutachten', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/terminvereinbarung', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/rezeptbestellung', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/kontakt', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/impressum', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/datenschutz', priority: 0.2, changeFrequency: 'yearly' }
];

export default function sitemap() {
  const site = getSite();
  const lastModified = new Date();

  return routes.map((route) => ({
    url: absoluteUrl(site, route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));
}
