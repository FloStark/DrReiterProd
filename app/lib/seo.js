import { getPage, getSite } from './content';

export function absoluteUrl(site, path = '/') {
  const base = (site.siteUrl || 'https://ordination-reiter.com').replace(/\/$/, '');
  const pathname = path.startsWith('/') ? path : `/${path}`;
  return `${base}${pathname}`;
}

export function absoluteAssetUrl(site, assetPath) {
  if (!assetPath) return undefined;
  if (/^https?:\/\//.test(assetPath)) return assetPath;
  return absoluteUrl(site, assetPath);
}

export function pageMetadata(page, path = '/') {
  const site = getSite();
  const title = page.seoTitle || page.title || site.siteTitle;
  const description = page.seoDescription || site.defaultDescription || site.siteTitle;
  const canonical = absoluteUrl(site, path);
  const image = absoluteAssetUrl(site, site.socialImage);

  return {
    metadataBase: new URL(site.siteUrl || 'https://ordination-reiter.com'),
    title,
    description,
    keywords: site.keywords,
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.siteTitle,
      locale: 'de_AT',
      type: 'website',
      images: image ? [{ url: image, width: 1200, height: 630, alt: site.siteTitle }] : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined
    },
    icons: site.favicon ? { icon: site.favicon, shortcut: site.favicon, apple: site.favicon } : undefined,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1
      }
    },
    icons: site.favicon ? { icon: site.favicon, shortcut: site.favicon, apple: site.favicon } : undefined
  };
}

export function metadataForPage(slug, queryId, path) {
  return pageMetadata(getPage(slug, queryId), path);
}
