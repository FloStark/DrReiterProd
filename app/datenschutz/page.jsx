import { LegalClient } from '../components/PageClients';
import { getPage, getSite } from '../lib/content';
import { legalQuery, variablesFor } from '../lib/queries';
import { metadataForPage } from '../lib/seo';

export function generateMetadata() {
  return metadataForPage('datenschutz', 'legalPages', '/datenschutz');
}

export default function DatenschutzPage() {
  const site = getSite();
  const page = getPage('datenschutz', 'legalPages');

  return <LegalClient query={legalQuery} variables={variablesFor('datenschutz.json')} data={{ siteSettings: site, legalPages: page }} />;
}
