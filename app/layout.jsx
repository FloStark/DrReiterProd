import './globals.css';
import { getSite } from './lib/content';

export function generateMetadata() {
  const site = getSite();

  return {
    title: site.siteTitle,
    description: site.siteTitle,
    icons: site.favicon ? { icon: site.favicon } : undefined
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-white text-black antialiased">{children}</body>
    </html>
  );
}
