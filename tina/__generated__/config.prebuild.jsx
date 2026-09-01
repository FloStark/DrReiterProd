// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.HEAD || "main";
var clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "37a76d06-2d72-4b01-9e06-67c1e2a180a8";
var navigationFields = [
  { type: "string", name: "label", label: "Label", required: true },
  { type: "string", name: "href", label: "Link", required: true }
];
var imagePositionOptions = [
  { label: "Mitte", value: "center" },
  { label: "Oben", value: "top" },
  { label: "Unten", value: "bottom" },
  { label: "Links", value: "left" },
  { label: "Rechts", value: "right" }
];
var imagePositionField = {
  type: "string",
  name: "imagePosition",
  label: "Bildposition / Zuschnitt",
  options: imagePositionOptions
};
var photoPositionField = {
  type: "string",
  name: "photoPosition",
  label: "Profilbild-Position / Zuschnitt",
  options: imagePositionOptions
};
var mapFields = [
  { type: "string", name: "eyebrow", label: "Eyebrow" },
  { type: "string", name: "title", label: "Titel", required: true },
  { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
  { type: "string", name: "mapTitle", label: "Karten-Titel" },
  { type: "string", name: "mapQuery", label: "Google Maps Query" }
];
var homeDoctorFields = [
  { type: "string", name: "name", label: "Name", required: true },
  { type: "string", name: "initials", label: "Initialen", required: true },
  { type: "string", name: "specialty", label: "Facharztbezeichnung", required: true },
  { type: "image", name: "photo", label: "Profilfoto" },
  photoPositionField,
  { type: "string", name: "href", label: "Leistungsseite", required: true },
  { type: "string", name: "servicesTitle", label: "Leistungslisten-Titel" },
  { type: "string", name: "services", label: "Leistungen", list: true },
  { type: "string", name: "openingHours", label: "Ordinationszeiten" },
  { type: "string", name: "phoneLabel", label: "Telefonanzeige" },
  { type: "string", name: "phoneHref", label: "Telefonlink" }
];
var bookingDoctorFields = [
  { type: "string", name: "label", label: "Kachel-Label", required: true },
  { type: "string", name: "name", label: "Name", required: true },
  { type: "string", name: "initials", label: "Initialen", required: true },
  { type: "image", name: "photo", label: "Profilbild" },
  photoPositionField
];
var legalFields = [
  { type: "string", name: "title", label: "Meta-Titel", required: true },
  { type: "string", name: "heading", label: "\xDCberschrift", required: true },
  { type: "string", name: "body", label: "Textzeilen", list: true }
];
var vacationPopupFields = [
  { type: "boolean", name: "enabled", label: "Popup anzeigen" },
  { type: "datetime", name: "endDate", label: "Anzeigen bis inklusive" },
  { type: "string", name: "title", label: "Titel" },
  {
    type: "object",
    name: "lines",
    label: "Textzeilen / Vertretungen",
    list: true,
    fields: [
      {
        type: "object",
        name: "segments",
        label: "Textsegmente in dieser Zeile",
        list: true,
        fields: [
          { type: "string", name: "text", label: "Text", required: true },
          { type: "boolean", name: "bold", label: "Fett" },
          { type: "boolean", name: "red", label: "Rot" }
        ]
      }
    ]
  }
];
var config_default = defineConfig({
  branch,
  clientId,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads"
    }
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
      stopwordLanguages: ["de"]
    }
  },
  schema: {
    collections: [
      {
        name: "siteSettings",
        label: "Globale Einstellungen",
        path: "content",
        format: "json",
        match: { include: "site" },
        ui: { router: () => "/" },
        fields: [
          { type: "string", name: "siteTitle", label: "Seitentitel", required: true },
          { type: "string", name: "brandLabel", label: "Header Title", required: true },
          { type: "image", name: "logo", label: "Header Logo" },
          { type: "image", name: "favicon", label: "Favicon" },
          { type: "object", name: "vacationPopup", label: "Urlaubsvertretungs-Popup", fields: vacationPopupFields },
          { type: "object", name: "navigation", label: "Navigation", list: true, fields: navigationFields }
        ]
      },
      {
        name: "homePage",
        label: "Seite: Startseite",
        path: "content/pages",
        format: "json",
        match: { include: "home" },
        ui: { router: () => "/" },
        fields: [
          { type: "string", name: "title", label: "Meta-Titel", required: true },
          { type: "object", name: "doctors", label: "Hero \xC4rzte", list: true, fields: homeDoctorFields },
          {
            type: "object",
            name: "ordination",
            label: "Unsere Ordination Slideshow",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "title", label: "Titel", required: true },
              { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
              {
                type: "object",
                name: "images",
                label: "Bilder",
                list: true,
                fields: [
                  { type: "image", name: "image", label: "Bild" },
                  imagePositionField,
                  { type: "string", name: "alt", label: "Alternativtext" }
                ]
              }
            ]
          },
          { type: "object", name: "directions", label: "Anfahrt & Karte", fields: mapFields }
        ]
      },
      {
        name: "doctorPages",
        label: "Seiten: Leistungen \xC4rzte",
        path: "content/doctors",
        format: "json",
        ui: { router: ({ document }) => `/${document._sys.filename}` },
        fields: [
          { type: "string", name: "slug", label: "Slug", required: true },
          { type: "string", name: "title", label: "\xDCberschrift", required: true },
          { type: "string", name: "subtitle", label: "Untertitel", required: true },
          {
            type: "object",
            name: "sections",
            label: "Abschnitte",
            list: true,
            fields: [
              { type: "string", name: "id", label: "HTML-ID", required: true },
              { type: "string", name: "short", label: "Side-Nav Kurzlabel", required: true },
              { type: "string", name: "title", label: "Abschnittstitel", required: true },
              { type: "string", name: "theme", label: "Farbschema", options: ["light", "accent"] },
              { type: "string", name: "text", label: "Beschreibung", ui: { component: "textarea" } },
              { type: "string", name: "services", label: "Leistungen", list: true },
              { type: "boolean", name: "actions", label: "Termin/Rezept Buttons anzeigen" }
            ]
          }
        ]
      },
      {
        name: "bookingPage",
        label: "Seite: Terminvereinbarung",
        path: "content/pages",
        format: "json",
        match: { include: "booking" },
        ui: { router: () => "/terminvereinbarung" },
        fields: [
          { type: "string", name: "title", label: "Meta-Titel", required: true },
          { type: "string", name: "eyebrow", label: "Eyebrow" },
          { type: "string", name: "heading", label: "\xDCberschrift", required: true },
          { type: "string", name: "intro", label: "Intro", ui: { component: "textarea" } },
          { type: "string", name: "steps", label: "Schritte", list: true },
          { type: "string", name: "doctorQuestion", label: "Arztfrage", required: true },
          { type: "object", name: "doctors", label: "Arzt-Kacheln", list: true, fields: bookingDoctorFields },
          { type: "string", name: "appointmentHeading", label: "Termin-Schritt \xDCberschrift" },
          { type: "string", name: "appointmentTypes", label: "Terminarten", list: true },
          { type: "string", name: "times", label: "Uhrzeiten", list: true },
          { type: "string", name: "patientHeading", label: "Patientendaten \xDCberschrift" }
        ]
      },
      {
        name: "prescriptionsPage",
        label: "Seite: Rezeptbestellung",
        path: "content/pages",
        format: "json",
        match: { include: "prescriptions" },
        ui: { router: () => "/rezeptbestellung" },
        fields: [
          { type: "string", name: "title", label: "Meta-Titel", required: true },
          { type: "string", name: "eyebrow", label: "Eyebrow" },
          { type: "string", name: "heading", label: "\xDCberschrift", required: true },
          { type: "string", name: "intro", label: "Intro", ui: { component: "textarea" } },
          { type: "string", name: "steps", label: "Abschnitte", list: true },
          { type: "string", name: "doctorOptions", label: "Arztoptionen", list: true },
          { type: "string", name: "searchPlaceholder", label: "Suchfeld Placeholder" },
          { type: "string", name: "emptySelectionText", label: "Text ohne Medikament" },
          { type: "string", name: "emptyListText", label: "Text ohne Liste" }
        ]
      },
      {
        name: "contactPage",
        label: "Seite: Kontakt",
        path: "content/pages",
        format: "json",
        match: { include: "contact" },
        ui: { router: () => "/kontakt" },
        fields: [
          { type: "string", name: "title", label: "Meta-Titel", required: true },
          { type: "string", name: "eyebrow", label: "Eyebrow" },
          { type: "string", name: "heading", label: "\xDCberschrift", required: true },
          { type: "string", name: "addressLines", label: "Adresszeilen", list: true },
          { type: "string", name: "phoneLabel", label: "Telefonanzeige" },
          { type: "string", name: "phoneHref", label: "Telefonlink" },
          { type: "string", name: "email", label: "E-Mail" },
          { type: "string", name: "mapTitle", label: "Karten-Titel" },
          { type: "string", name: "mapQuery", label: "Google Maps Query" }
        ]
      },
      {
        name: "legalPages",
        label: "Seiten: Rechtliches",
        path: "content/pages",
        format: "json",
        match: { include: "{impressum,datenschutz}" },
        ui: { router: ({ document }) => `/${document._sys.filename}` },
        fields: legalFields
      }
    ]
  }
});
export {
  config_default as default
};
