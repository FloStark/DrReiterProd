import { getSite } from './lib/content';

export default function robots() {
  const site = getSite();
  const host = (site.siteUrl || 'https://ordination-reiter.com').replace(/\/$/, '');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin']
      }
    ],
    sitemap: `${host}/sitemap.xml`,
    host
  };
}
