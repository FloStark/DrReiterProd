import { BookingClient } from '../components/PageClients';
import { getPage, getSite } from '../lib/content';
import { bookingQuery, variablesFor } from '../lib/queries';
import { metadataForPage } from '../lib/seo';

export function generateMetadata() {
  return metadataForPage('booking', 'bookingPage', '/terminvereinbarung');
}

export default function BookingPage() {
  const site = getSite();
  const page = getPage('booking', 'bookingPage');

  return <BookingClient query={bookingQuery} variables={variablesFor('booking.json')} data={{ siteSettings: site, bookingPage: page }} />;
}
