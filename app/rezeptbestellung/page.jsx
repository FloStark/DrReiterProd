import { PrescriptionsClient } from '../components/PageClients';
import { getMedications, getPage, getSite } from '../lib/content';
import { prescriptionsQuery, variablesFor } from '../lib/queries';

export default function PrescriptionsPage() {
  const site = getSite();
  const page = getPage('prescriptions', 'prescriptionsPage');
  const medications = getMedications();

  return <PrescriptionsClient query={prescriptionsQuery} variables={variablesFor('prescriptions.json')} data={{ siteSettings: site, prescriptionsPage: page }} medications={medications} />;
}
