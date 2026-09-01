import { InfoPageClient } from '../components/PageClients';
import { getPage, getSite } from '../lib/content';
import { infoQuery, variablesFor } from '../lib/queries';
import { metadataForPage } from '../lib/seo';

export function generateMetadata() {
  return metadataForPage('vorsorgeuntersuchung', 'infoPages', '/vorsorgeuntersuchung');
}

export default function VorsorgePage() {
  const site = getSite();
  const page = getPage('vorsorgeuntersuchung', 'infoPages');

  return <InfoPageClient query={infoQuery} variables={variablesFor('vorsorgeuntersuchung.json')} data={{ siteSettings: site, infoPages: page }} />;
}
