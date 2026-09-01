import { DoctorClient } from '../components/PageClients';
import { getDoctor, getSite } from '../lib/content';
import { doctorQuery, variablesFor } from '../lib/queries';
import { pageMetadata } from '../lib/seo';

export function generateMetadata() {
  return pageMetadata(getDoctor('lukas-reiter'), '/lukas-reiter');
}

export default function LukasReiterPage() {
  const site = getSite();
  const doctor = getDoctor('lukas-reiter');

  return <DoctorClient query={doctorQuery} variables={variablesFor('lukas-reiter.json')} data={{ siteSettings: site, doctorPages: doctor }} />;
}
