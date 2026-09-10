export const siteFields = `
  siteTitle
  siteUrl
  defaultDescription
  keywords
  socialImage
  brandLabel
  logo
  favicon
  vacationPopup {
    enabled
    endDate
    title
    lines { segments { text bold red } }
  }
  navigation { label href }
`;

export const homeFields = `
  title
  seoTitle
  seoDescription
  doctors {
    name
    initials
    specialty
    photo
    photoPosition
    href
    servicesTitle
    services
    openingHours
    phoneLabel
    phoneHref
  }
  focusAreas {
    eyebrow
    title
    text
    cards { title text href linkLabel }
  }
  ordination {
    eyebrow
    title
    text
    images { image imagePosition alt }
  }
  directions {
    eyebrow
    title
    text
    mapTitle
    mapQuery
  }
`;

export const doctorFields = `
  slug
  title
  seoTitle
  seoDescription
  subtitle
  intro
  portrait
  photoPosition
  credentials
  sections {
    id
    short
    title
    theme
    text
    details
    image
    imagePosition
    services
    linkHref
    linkLabel
    actions
  }
`;

export const bookingFields = `
  title
  seoTitle
  seoDescription
  eyebrow
  heading
  intro
  steps
  doctorQuestion
  doctors { label name initials photo photoPosition }
  appointmentHeading
  appointmentTypes
  times
  patientHeading
`;

export const prescriptionsFields = `
  title
  seoTitle
  seoDescription
  eyebrow
  heading
  intro
  steps
  doctorOptions
  searchPlaceholder
  emptySelectionText
  emptyListText
`;

export const contactFields = `
  title
  seoTitle
  seoDescription
  eyebrow
  heading
  addressLines
  phoneLabel
  phoneHref
  email
  access { title text items }
  mapTitle
  mapQuery
`;

export const infoFields = `
  title
  seoTitle
  seoDescription
  eyebrow
  heading
  intro
  sections { title text items href linkLabel }
`;

export const faqFields = `
  title
  seoTitle
  seoDescription
  eyebrow
  heading
  intro
  faqs { question answer }
`;

export const legalFields = `
  title
  seoTitle
  seoDescription
  heading
  body
`;

export const homeQuery = `query homePage($sitePath: String!, $pagePath: String!) {
  siteSettings(relativePath: $sitePath) { ${siteFields} }
  homePage(relativePath: $pagePath) { ${homeFields} }
}`;

export const doctorQuery = `query doctorPages($sitePath: String!, $pagePath: String!) {
  siteSettings(relativePath: $sitePath) { ${siteFields} }
  doctorPages(relativePath: $pagePath) { ${doctorFields} }
}`;

export const bookingQuery = `query bookingPage($sitePath: String!, $pagePath: String!) {
  siteSettings(relativePath: $sitePath) { ${siteFields} }
  bookingPage(relativePath: $pagePath) { ${bookingFields} }
}`;

export const prescriptionsQuery = `query prescriptionsPage($sitePath: String!, $pagePath: String!) {
  siteSettings(relativePath: $sitePath) { ${siteFields} }
  prescriptionsPage(relativePath: $pagePath) { ${prescriptionsFields} }
}`;

export const contactQuery = `query contactPage($sitePath: String!, $pagePath: String!) {
  siteSettings(relativePath: $sitePath) { ${siteFields} }
  contactPage(relativePath: $pagePath) { ${contactFields} }
}`;

export const infoQuery = `query infoPages($sitePath: String!, $pagePath: String!) {
  siteSettings(relativePath: $sitePath) { ${siteFields} }
  infoPages(relativePath: $pagePath) { ${infoFields} }
}`;

export const faqQuery = `query faqPage($sitePath: String!, $pagePath: String!) {
  siteSettings(relativePath: $sitePath) { ${siteFields} }
  faqPage(relativePath: $pagePath) { ${faqFields} }
}`;

export const legalQuery = `query legalPages($sitePath: String!, $pagePath: String!) {
  siteSettings(relativePath: $sitePath) { ${siteFields} }
  legalPages(relativePath: $pagePath) { ${legalFields} }
}`;

export const variablesFor = (pagePath) => ({ sitePath: 'site.json', pagePath });
