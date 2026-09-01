import { DoctorClient } from '../components/PageClients';
import { getDoctor, getSite } from '../lib/content';
import { doctorQuery, variablesFor } from '../lib/queries';
import { pageMetadata } from '../lib/seo';

export function generateMetadata() {
  return pageMetadata(getDoctor('sigrid-reiter'), '/sigrid-reiter');
}

export default function SigridReiterPage() {
  const site = getSite();
  const doctor = getDoctor('sigrid-reiter');

  return <DoctorClient query={doctorQuery} variables={variablesFor('sigrid-reiter.json')} data={{ siteSettings: site, doctorPages: doctor }} />;
}
