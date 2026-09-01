export const siteFields = `
  siteTitle
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
  subtitle
  sections {
    id
    short
    title
    theme
    text
    services
    actions
  }
`;

export const bookingFields = `
  title
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
  eyebrow
  heading
  addressLines
  phoneLabel
  phoneHref
  email
  mapTitle
  mapQuery
`;

export const legalFields = `
  title
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

export const legalQuery = `query legalPages($sitePath: String!, $pagePath: String!) {
  siteSettings(relativePath: $sitePath) { ${siteFields} }
  legalPages(relativePath: $pagePath) { ${legalFields} }
}`;

export const variablesFor = (pagePath) => ({ sitePath: 'site.json', pagePath });
