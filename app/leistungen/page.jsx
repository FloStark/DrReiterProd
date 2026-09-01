import { InfoPageClient } from '../components/PageClients';
import { getPage, getSite } from '../lib/content';
import { infoQuery, variablesFor } from '../lib/queries';
import { metadataForPage } from '../lib/seo';

export function generateMetadata() {
  return metadataForPage('leistungen', 'infoPages', '/leistungen');
}

export default function LeistungenPage() {
  const site = getSite();
  const page = getPage('leistungen', 'infoPages');

  return <InfoPageClient query={infoQuery} variables={variablesFor('leistungen.json')} data={{ siteSettings: site, infoPages: page }} />;
}
