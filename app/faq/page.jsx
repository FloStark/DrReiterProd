import { FaqClient } from '../components/PageClients';
import { getPage, getSite } from '../lib/content';
import { faqQuery, variablesFor } from '../lib/queries';
import { metadataForPage } from '../lib/seo';

export function generateMetadata() {
  return metadataForPage('faq', 'faqPage', '/faq');
}

export default function FaqPage() {
  const site = getSite();
  const page = getPage('faq', 'faqPage');

  return <FaqClient query={faqQuery} variables={variablesFor('faq.json')} data={{ siteSettings: site, faqPage: page }} />;
}
