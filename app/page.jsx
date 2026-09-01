import { HomeClient } from './components/PageClients';
import { getPage, getSite } from './lib/content';
import { homeQuery, variablesFor } from './lib/queries';
import { metadataForPage } from './lib/seo';

export function generateMetadata() {
  return metadataForPage('home', 'homePage', '/');
}

export default function HomePage() {
  const site = getSite();
  const page = getPage('home', 'homePage');

  return <HomeClient query={homeQuery} variables={variablesFor('home.json')} data={{ siteSettings: site, homePage: page }} />;
}
