import { ContactClient } from '../components/PageClients';
import { getPage, getSite } from '../lib/content';
import { contactQuery, variablesFor } from '../lib/queries';

export default function ContactPage() {
  const site = getSite();
  const page = getPage('contact', 'contactPage');

  return <ContactClient query={contactQuery} variables={variablesFor('contact.json')} data={{ siteSettings: site, contactPage: page }} />;
}
