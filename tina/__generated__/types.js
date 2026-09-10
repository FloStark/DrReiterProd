export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const SiteSettingsPartsFragmentDoc = gql`
    fragment SiteSettingsParts on SiteSettings {
  __typename
  siteTitle
  siteUrl
  defaultDescription
  keywords
  socialImage
  brandLabel
  logo
  favicon
  vacationPopup {
    __typename
    enabled
    endDate
    title
    lines {
      __typename
      segments {
        __typename
        text
        bold
        red
      }
    }
  }
  navigation {
    __typename
    label
    href
  }
}
    `;
export const HomePagePartsFragmentDoc = gql`
    fragment HomePageParts on HomePage {
  __typename
  title
  seoTitle
  seoDescription
  doctors {
    __typename
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
    __typename
    eyebrow
    title
    text
    cards {
      __typename
      title
      text
      href
      linkLabel
    }
  }
  ordination {
    __typename
    eyebrow
    title
    text
    images {
      __typename
      image
      imagePosition
      alt
    }
  }
  directions {
    __typename
    eyebrow
    title
    text
    mapTitle
    mapQuery
  }
}
    `;
export const DoctorPagesPartsFragmentDoc = gql`
    fragment DoctorPagesParts on DoctorPages {
  __typename
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
    __typename
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
}
    `;
export const BookingPagePartsFragmentDoc = gql`
    fragment BookingPageParts on BookingPage {
  __typename
  title
  seoTitle
  seoDescription
  eyebrow
  heading
  intro
  steps
  doctorQuestion
  doctors {
    __typename
    label
    name
    initials
    photo
    photoPosition
  }
  appointmentHeading
  appointmentTypes
  times
  patientHeading
}
    `;
export const InfoPagesPartsFragmentDoc = gql`
    fragment InfoPagesParts on InfoPages {
  __typename
  title
  seoTitle
  seoDescription
  eyebrow
  heading
  intro
  sections {
    __typename
    title
    text
    items
    href
    linkLabel
  }
}
    `;
export const FaqPagePartsFragmentDoc = gql`
    fragment FaqPageParts on FaqPage {
  __typename
  title
  seoTitle
  seoDescription
  eyebrow
  heading
  intro
  faqs {
    __typename
    question
    answer
  }
}
    `;
export const PrescriptionsPagePartsFragmentDoc = gql`
    fragment PrescriptionsPageParts on PrescriptionsPage {
  __typename
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
}
    `;
export const ContactPagePartsFragmentDoc = gql`
    fragment ContactPageParts on ContactPage {
  __typename
  title
  seoTitle
  seoDescription
  eyebrow
  heading
  addressLines
  phoneLabel
  phoneHref
  email
  access {
    __typename
    title
    text
    items
  }
  mapTitle
  mapQuery
}
    `;
export const LegalPagesPartsFragmentDoc = gql`
    fragment LegalPagesParts on LegalPages {
  __typename
  seoTitle
  seoDescription
  title
  heading
  body
}
    `;
export const SiteSettingsDocument = gql`
    query siteSettings($relativePath: String!) {
  siteSettings(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...SiteSettingsParts
  }
}
    ${SiteSettingsPartsFragmentDoc}`;
export const SiteSettingsConnectionDocument = gql`
    query siteSettingsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: SiteSettingsFilter) {
  siteSettingsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...SiteSettingsParts
      }
    }
  }
}
    ${SiteSettingsPartsFragmentDoc}`;
export const HomePageDocument = gql`
    query homePage($relativePath: String!) {
  homePage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...HomePageParts
  }
}
    ${HomePagePartsFragmentDoc}`;
export const HomePageConnectionDocument = gql`
    query homePageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: HomePageFilter) {
  homePageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...HomePageParts
      }
    }
  }
}
    ${HomePagePartsFragmentDoc}`;
export const DoctorPagesDocument = gql`
    query doctorPages($relativePath: String!) {
  doctorPages(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...DoctorPagesParts
  }
}
    ${DoctorPagesPartsFragmentDoc}`;
export const DoctorPagesConnectionDocument = gql`
    query doctorPagesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: DoctorPagesFilter) {
  doctorPagesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...DoctorPagesParts
      }
    }
  }
}
    ${DoctorPagesPartsFragmentDoc}`;
export const BookingPageDocument = gql`
    query bookingPage($relativePath: String!) {
  bookingPage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...BookingPageParts
  }
}
    ${BookingPagePartsFragmentDoc}`;
export const BookingPageConnectionDocument = gql`
    query bookingPageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: BookingPageFilter) {
  bookingPageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...BookingPageParts
      }
    }
  }
}
    ${BookingPagePartsFragmentDoc}`;
export const InfoPagesDocument = gql`
    query infoPages($relativePath: String!) {
  infoPages(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...InfoPagesParts
  }
}
    ${InfoPagesPartsFragmentDoc}`;
export const InfoPagesConnectionDocument = gql`
    query infoPagesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: InfoPagesFilter) {
  infoPagesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...InfoPagesParts
      }
    }
  }
}
    ${InfoPagesPartsFragmentDoc}`;
export const FaqPageDocument = gql`
    query faqPage($relativePath: String!) {
  faqPage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...FaqPageParts
  }
}
    ${FaqPagePartsFragmentDoc}`;
export const FaqPageConnectionDocument = gql`
    query faqPageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: FaqPageFilter) {
  faqPageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...FaqPageParts
      }
    }
  }
}
    ${FaqPagePartsFragmentDoc}`;
export const PrescriptionsPageDocument = gql`
    query prescriptionsPage($relativePath: String!) {
  prescriptionsPage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PrescriptionsPageParts
  }
}
    ${PrescriptionsPagePartsFragmentDoc}`;
export const PrescriptionsPageConnectionDocument = gql`
    query prescriptionsPageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PrescriptionsPageFilter) {
  prescriptionsPageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PrescriptionsPageParts
      }
    }
  }
}
    ${PrescriptionsPagePartsFragmentDoc}`;
export const ContactPageDocument = gql`
    query contactPage($relativePath: String!) {
  contactPage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ContactPageParts
  }
}
    ${ContactPagePartsFragmentDoc}`;
export const ContactPageConnectionDocument = gql`
    query contactPageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ContactPageFilter) {
  contactPageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ContactPageParts
      }
    }
  }
}
    ${ContactPagePartsFragmentDoc}`;
export const LegalPagesDocument = gql`
    query legalPages($relativePath: String!) {
  legalPages(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...LegalPagesParts
  }
}
    ${LegalPagesPartsFragmentDoc}`;
export const LegalPagesConnectionDocument = gql`
    query legalPagesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: LegalPagesFilter) {
  legalPagesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...LegalPagesParts
      }
    }
  }
}
    ${LegalPagesPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    siteSettings(variables, options) {
      return requester(SiteSettingsDocument, variables, options);
    },
    siteSettingsConnection(variables, options) {
      return requester(SiteSettingsConnectionDocument, variables, options);
    },
    homePage(variables, options) {
      return requester(HomePageDocument, variables, options);
    },
    homePageConnection(variables, options) {
      return requester(HomePageConnectionDocument, variables, options);
    },
    doctorPages(variables, options) {
      return requester(DoctorPagesDocument, variables, options);
    },
    doctorPagesConnection(variables, options) {
      return requester(DoctorPagesConnectionDocument, variables, options);
    },
    bookingPage(variables, options) {
      return requester(BookingPageDocument, variables, options);
    },
    bookingPageConnection(variables, options) {
      return requester(BookingPageConnectionDocument, variables, options);
    },
    infoPages(variables, options) {
      return requester(InfoPagesDocument, variables, options);
    },
    infoPagesConnection(variables, options) {
      return requester(InfoPagesConnectionDocument, variables, options);
    },
    faqPage(variables, options) {
      return requester(FaqPageDocument, variables, options);
    },
    faqPageConnection(variables, options) {
      return requester(FaqPageConnectionDocument, variables, options);
    },
    prescriptionsPage(variables, options) {
      return requester(PrescriptionsPageDocument, variables, options);
    },
    prescriptionsPageConnection(variables, options) {
      return requester(PrescriptionsPageConnectionDocument, variables, options);
    },
    contactPage(variables, options) {
      return requester(ContactPageDocument, variables, options);
    },
    contactPageConnection(variables, options) {
      return requester(ContactPageConnectionDocument, variables, options);
    },
    legalPages(variables, options) {
      return requester(LegalPagesDocument, variables, options);
    },
    legalPagesConnection(variables, options) {
      return requester(LegalPagesConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
