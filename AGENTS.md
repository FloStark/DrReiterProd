# AGENTS.md – Ordination Dr. Reiter Web Development

## Executive Overview
Vollständiges Node.js/Express-Webprojekt für die Arztpraxis "Ordination Dr. Reiter". Ziel ist eine schlichte, performante und benutzerfreundliche Praxis-Website mit dynamischen Leistungsseiten, Multi-Step-Terminbuchung und Rezeptbestellung.

## Technical Stack
- **Backend:** Node.js, Express.js (Modular Routes)
- **Frontend / Templating:** EJS (Server-Side Rendering)
- **Styling:** Tailwind CSS (Konfiguration für Custom-Farbe `#C3CFDB`)
- **JavaScript:** Vanilla JS (Client-side Interaktivität, Dynamic Scrolling, Multi-Step Forms)

## Brand & Design System
- **Hauptweiß:** `#FFFFFF` (oder `#FEFEFE`)
- **Hauptschwarz:** `#000000`
- **Blaugrau (Accent):** `#C3CFDB`

## Coding Rules & Instructions
- Express routes live in `/routes`.
- Reusable UI components live in `/views/partials`.
- Prefer Tailwind CSS utilities and use the `reiter` color from `tailwind.config.js`.
- Prescription medication data is mocked in `/data/medications.json`.
