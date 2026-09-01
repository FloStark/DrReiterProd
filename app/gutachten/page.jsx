import { InfoPageClient } from '../components/PageClients';
import { getPage, getSite } from '../lib/content';
import { infoQuery, variablesFor } from '../lib/queries';
import { metadataForPage } from '../lib/seo';

export function generateMetadata() {
  return metadataForPage('gutachten', 'infoPages', '/gutachten');
}

export default function GutachtenPage() {
  const site = getSite();
  const page = getPage('gutachten', 'infoPages');

  return <InfoPageClient query={infoQuery} variables={variablesFor('gutachten.json')} data={{ siteSettings: site, infoPages: page }} />;
}
