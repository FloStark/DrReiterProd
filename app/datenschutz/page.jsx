import { LegalClient } from '../components/PageClients';
import { getPage, getSite } from '../lib/content';
import { legalQuery, variablesFor } from '../lib/queries';

export default function DatenschutzPage() {
  const site = getSite();
  const page = getPage('datenschutz', 'legalPages');

  return <LegalClient query={legalQuery} variables={variablesFor('datenschutz.json')} data={{ siteSettings: site, legalPages: page }} />;
}
