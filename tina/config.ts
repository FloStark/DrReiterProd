import { defineConfig } from 'tinacms';

const branch = process.env.GITHUB_BRANCH || process.env.HEAD || 'main';
const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID || 'a7f121a6-ef75-447d-bd19-ea1b25d3d4e2';

const navigationFields = [
  { type: 'string', name: 'label', label: 'Label', required: true },
  { type: 'string', name: 'href', label: 'Link', required: true }
] as const;

const seoFields = [
  { type: 'string', name: 'seoTitle', label: 'SEO Titel' },
  { type: 'string', name: 'seoDescription', label: 'SEO Beschreibung', ui: { component: 'textarea' } }
] as const;

const imagePositionOptions = [
  { label: 'Mitte', value: 'center' },
  { label: 'Oben', value: 'top' },
  { label: 'Unten', value: 'bottom' },
  { label: 'Links', value: 'left' },
  { label: 'Rechts', value: 'right' }
] as const;

const imagePositionField = {
  type: 'string',
  name: 'imagePosition',
  label: 'Bildposition / Zuschnitt',
  options: imagePositionOptions
} as const;

const photoPositionField = {
  type: 'string',
  name: 'photoPosition',
  label: 'Profilbild-Position / Zuschnitt',
  options: imagePositionOptions
} as const;

const mapFields = [
  { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
  { type: 'string', name: 'title', label: 'Titel', required: true },
  { type: 'string', name: 'text', label: 'Text', ui: { component: 'textarea' } },
  { type: 'string', name: 'mapTitle', label: 'Karten-Titel' },
  { type: 'string', name: 'mapQuery', label: 'Google Maps Query' }
] as const;

const linkCardFields = [
  { type: 'string', name: 'title', label: 'Titel', required: true },
  { type: 'string', name: 'text', label: 'Text', ui: { component: 'textarea' } },
  { type: 'string', name: 'href', label: 'Link' },
  { type: 'string', name: 'linkLabel', label: 'Link-Text' }
] as const;

const homeDoctorFields = [
  { type: 'string', name: 'name', label: 'Name', required: true },
  { type: 'string', name: 'initials', label: 'Initialen', required: true },
  { type: 'string', name: 'specialty', label: 'Facharztbezeichnung', required: true },
  { type: 'image', name: 'photo', label: 'Profilfoto' },
  photoPositionField,
  { type: 'string', name: 'href', label: 'Leistungsseite', required: true },
  { type: 'string', name: 'servicesTitle', label: 'Leistungslisten-Titel' },
  { type: 'string', name: 'services', label: 'Leistungen', list: true },
  { type: 'string', name: 'openingHours', label: 'Ordinationszeiten' },
  { type: 'string', name: 'phoneLabel', label: 'Telefonanzeige' },
  { type: 'string', name: 'phoneHref', label: 'Telefonlink' }
] as const;

const bookingDoctorFields = [
  { type: 'string', name: 'label', label: 'Kachel-Label', required: true },
  { type: 'string', name: 'name', label: 'Name', required: true },
  { type: 'string', name: 'initials', label: 'Initialen', required: true },
  { type: 'image', name: 'photo', label: 'Profilbild' },
  photoPositionField
] as const;

const legalFields = [
  { type: 'string', name: 'title', label: 'Meta-Titel', required: true },
  { type: 'string', name: 'heading', label: 'Überschrift', required: true },
  { type: 'string', name: 'body', label: 'Textzeilen', list: true }
] as const;

const infoPageFields = [
  { type: 'string', name: 'title', label: 'Meta-Titel', required: true },
  ...seoFields,
  { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
  { type: 'string', name: 'heading', label: 'Überschrift', required: true },
  { type: 'string', name: 'intro', label: 'Intro', ui: { component: 'textarea' } },
  {
    type: 'object',
    name: 'sections',
    label: 'Abschnitte',
    list: true,
    fields: [
      { type: 'string', name: 'title', label: 'Titel', required: true },
      { type: 'string', name: 'text', label: 'Text', ui: { component: 'textarea' } },
      { type: 'string', name: 'items', label: 'Punkte', list: true },
      { type: 'string', name: 'href', label: 'Link' },
      { type: 'string', name: 'linkLabel', label: 'Link-Text' }
    ]
  }
] as const;

const faqPageFields = [
  { type: 'string', name: 'title', label: 'Meta-Titel', required: true },
  ...seoFields,
  { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
  { type: 'string', name: 'heading', label: 'Überschrift', required: true },
  { type: 'string', name: 'intro', label: 'Intro', ui: { component: 'textarea' } },
  {
    type: 'object',
    name: 'faqs',
    label: 'Fragen und Antworten',
    list: true,
    fields: [
      { type: 'string', name: 'question', label: 'Frage', required: true },
      { type: 'string', name: 'answer', label: 'Antwort', ui: { component: 'textarea' } }
    ]
  }
] as const;

const vacationPopupFields = [
  { type: 'boolean', name: 'enabled', label: 'Popup anzeigen' },
  { type: 'datetime', name: 'endDate', label: 'Anzeigen bis inklusive' },
  { type: 'string', name: 'title', label: 'Titel' },
  {
    type: 'object',
    name: 'lines',
    label: 'Textzeilen / Vertretungen',
    list: true,
    fields: [
      {
        type: 'object',
        name: 'segments',
        label: 'Textsegmente in dieser Zeile',
        list: true,
        fields: [
          { type: 'string', name: 'text', label: 'Text', required: true },
          { type: 'boolean', name: 'bold', label: 'Fett' },
          { type: 'boolean', name: 'red', label: 'Rot' }
        ]
      }
    ]
  }
] as const;

export default defineConfig({
  branch,
  clientId,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public'
  },
  media: {
    tina: {
      publicFolder: 'public',
      mediaRoot: 'uploads'
    }
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
      stopwordLanguages: ['de']
    }
  },
  schema: {
    collections: [
      {
        name: 'siteSettings',
        label: 'Globale Einstellungen',
        path: 'content',
        format: 'json',
        match: { include: 'site' },
        ui: { router: () => '/' },
        fields: [
          { type: 'string', name: 'siteTitle', label: 'Seitentitel', required: true },
          { type: 'string', name: 'siteUrl', label: 'Website URL', required: true },
          { type: 'string', name: 'defaultDescription', label: 'Standard SEO Beschreibung', ui: { component: 'textarea' } },
          { type: 'string', name: 'keywords', label: 'SEO Keywords', list: true },
          { type: 'image', name: 'socialImage', label: 'Standard Social Sharing Bild' },
          { type: 'string', name: 'brandLabel', label: 'Header Title', required: true },
          { type: 'image', name: 'logo', label: 'Header Logo' },
          { type: 'image', name: 'favicon', label: 'Favicon' },
          { type: 'object', name: 'vacationPopup', label: 'Urlaubsvertretungs-Popup', fields: vacationPopupFields },
          { type: 'object', name: 'navigation', label: 'Navigation', list: true, fields: navigationFields }
        ]
      },
      {
        name: 'homePage',
        label: 'Seite: Startseite',
        path: 'content/pages',
        format: 'json',
        match: { include: 'home' },
        ui: { router: () => '/' },
        fields: [
          { type: 'string', name: 'title', label: 'Meta-Titel', required: true },
          ...seoFields,
          { type: 'object', name: 'doctors', label: 'Hero Ärzte', list: true, fields: homeDoctorFields },
          {
            type: 'object',
            name: 'focusAreas',
            label: 'Leistungs-Teaser',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
              { type: 'string', name: 'title', label: 'Titel', required: true },
              { type: 'string', name: 'text', label: 'Text', ui: { component: 'textarea' } },
              { type: 'object', name: 'cards', label: 'Karten', list: true, fields: linkCardFields }
            ]
          },
          {
            type: 'object',
            name: 'ordination',
            label: 'Unsere Ordination Slideshow',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
              { type: 'string', name: 'title', label: 'Titel', required: true },
              { type: 'string', name: 'text', label: 'Text', ui: { component: 'textarea' } },
              {
                type: 'object',
                name: 'images',
                label: 'Bilder',
                list: true,
                fields: [
                  { type: 'image', name: 'image', label: 'Bild' },
                  imagePositionField,
                  { type: 'string', name: 'alt', label: 'Alternativtext' }
                ]
              }
            ]
          },
          { type: 'object', name: 'directions', label: 'Anfahrt & Karte', fields: mapFields }
        ]
      },
      {
        name: 'doctorPages',
        label: 'Seiten: Leistungen Ärzte',
        path: 'content/doctors',
        format: 'json',
        ui: { router: ({ document }) => `/${document._sys.filename}` },
        fields: [
          { type: 'string', name: 'slug', label: 'Slug', required: true },
          { type: 'string', name: 'title', label: 'Überschrift', required: true },
          ...seoFields,
          { type: 'string', name: 'subtitle', label: 'Untertitel', required: true },
          { type: 'string', name: 'intro', label: 'Intro', ui: { component: 'textarea' } },
          { type: 'image', name: 'portrait', label: 'Portrait / Hero Bild' },
          photoPositionField,
          { type: 'string', name: 'credentials', label: 'Kurzinfos', list: true },
          {
            type: 'object',
            name: 'sections',
            label: 'Abschnitte',
            list: true,
            fields: [
              { type: 'string', name: 'id', label: 'HTML-ID', required: true },
              { type: 'string', name: 'short', label: 'Side-Nav Kurzlabel', required: true },
              { type: 'string', name: 'title', label: 'Abschnittstitel', required: true },
              { type: 'string', name: 'theme', label: 'Farbschema', options: ['light', 'accent'] },
              { type: 'string', name: 'text', label: 'Beschreibung', ui: { component: 'textarea' } },
              { type: 'string', name: 'details', label: 'Detailtext', ui: { component: 'textarea' } },
              { type: 'image', name: 'image', label: 'Abschnittsbild' },
              imagePositionField,
              { type: 'string', name: 'services', label: 'Leistungen', list: true },
              { type: 'string', name: 'linkHref', label: 'Link' },
              { type: 'string', name: 'linkLabel', label: 'Link-Text' },
              { type: 'boolean', name: 'actions', label: 'Termin/Rezept Buttons anzeigen' }
            ]
          }
        ]
      },
      {
        name: 'bookingPage',
        label: 'Seite: Terminvereinbarung',
        path: 'content/pages',
        format: 'json',
        match: { include: 'booking' },
        ui: { router: () => '/terminvereinbarung' },
        fields: [
          { type: 'string', name: 'title', label: 'Meta-Titel', required: true },
          ...seoFields,
          { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
          { type: 'string', name: 'heading', label: 'Überschrift', required: true },
          { type: 'string', name: 'intro', label: 'Intro', ui: { component: 'textarea' } },
          { type: 'string', name: 'steps', label: 'Schritte', list: true },
          { type: 'string', name: 'doctorQuestion', label: 'Arztfrage', required: true },
          { type: 'object', name: 'doctors', label: 'Arzt-Kacheln', list: true, fields: bookingDoctorFields },
          { type: 'string', name: 'appointmentHeading', label: 'Termin-Schritt Überschrift' },
          { type: 'string', name: 'appointmentTypes', label: 'Terminarten', list: true },
          { type: 'string', name: 'times', label: 'Uhrzeiten', list: true },
          { type: 'string', name: 'patientHeading', label: 'Patientendaten Überschrift' }
        ]
      },
      {
        name: 'infoPages',
        label: 'Seiten: Leistungen & Themen',
        path: 'content/pages',
        format: 'json',
        match: { include: '{leistungen,vorsorgeuntersuchung,gutachten}' },
        ui: { router: ({ document }) => `/${document._sys.filename}` },
        fields: infoPageFields
      },
      {
        name: 'faqPage',
        label: 'Seite: FAQ',
        path: 'content/pages',
        format: 'json',
        match: { include: 'faq' },
        ui: { router: () => '/faq' },
        fields: faqPageFields
      },
      {
        name: 'prescriptionsPage',
        label: 'Seite: Rezeptbestellung',
        path: 'content/pages',
        format: 'json',
        match: { include: 'prescriptions' },
        ui: { router: () => '/rezeptbestellung' },
        fields: [
          { type: 'string', name: 'title', label: 'Meta-Titel', required: true },
          ...seoFields,
          { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
          { type: 'string', name: 'heading', label: 'Überschrift', required: true },
          { type: 'string', name: 'intro', label: 'Intro', ui: { component: 'textarea' } },
          { type: 'string', name: 'steps', label: 'Abschnitte', list: true },
          { type: 'string', name: 'doctorOptions', label: 'Arztoptionen', list: true },
          { type: 'string', name: 'searchPlaceholder', label: 'Suchfeld Placeholder' },
          { type: 'string', name: 'emptySelectionText', label: 'Text ohne Medikament' },
          { type: 'string', name: 'emptyListText', label: 'Text ohne Liste' }
        ]
      },
      {
        name: 'contactPage',
        label: 'Seite: Kontakt',
        path: 'content/pages',
        format: 'json',
        match: { include: 'contact' },
        ui: { router: () => '/kontakt' },
        fields: [
          { type: 'string', name: 'title', label: 'Meta-Titel', required: true },
          ...seoFields,
          { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
          { type: 'string', name: 'heading', label: 'Überschrift', required: true },
          { type: 'string', name: 'addressLines', label: 'Adresszeilen', list: true },
          { type: 'string', name: 'phoneLabel', label: 'Telefonanzeige' },
          { type: 'string', name: 'phoneHref', label: 'Telefonlink' },
          { type: 'string', name: 'email', label: 'E-Mail' },
          {
            type: 'object',
            name: 'access',
            label: 'Anfahrt & Parken',
            fields: [
              { type: 'string', name: 'title', label: 'Titel' },
              { type: 'string', name: 'text', label: 'Text', ui: { component: 'textarea' } },
              { type: 'string', name: 'items', label: 'Hinweise', list: true }
            ]
          },
          { type: 'string', name: 'mapTitle', label: 'Karten-Titel' },
          { type: 'string', name: 'mapQuery', label: 'Google Maps Query' }
        ]
      },
      {
        name: 'legalPages',
        label: 'Seiten: Rechtliches',
        path: 'content/pages',
        format: 'json',
        match: { include: '{impressum,datenschutz}' },
        ui: { router: ({ document }) => `/${document._sys.filename}` },
        fields: [...seoFields, ...legalFields]
      }
    ]
  }
});
