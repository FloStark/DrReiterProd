import { LegalClient } from '../components/PageClients';
import { getPage, getSite } from '../lib/content';
import { legalQuery, variablesFor } from '../lib/queries';

export default function ImpressumPage() {
  const site = getSite();
  const page = getPage('impressum', 'legalPages');

  return <LegalClient query={legalQuery} variables={variablesFor('impressum.json')} data={{ siteSettings: site, legalPages: page }} />;
}
