# Smile Dental Surgery — website (pitch template)

A single-page, responsive website for **Smile Dental Surgery**, a husband-and-wife
NHS &amp; private dental practice on Barking Road, East Ham, London. Built as a
**pitch draft** to show the client what we can produce — some details are
placeholders to be confirmed (see below). This is not a final live site.

Built with plain HTML, CSS, and vanilla JavaScript — no framework, no build step.
Mobile-first, semantic, and accessible (keyboard-navigable, WCAG AA contrast,
`prefers-reduced-motion` honoured).

## File structure

```
Smile-Dental-Surgery/
├── index.html        # All page content and sections
├── css/
│   └── styles.css    # Design tokens + all styling (single file)
├── js/
│   └── main.js       # Nav, carousel, accordions, form, cookie/map logic
├── assets/
│   ├── logo.svg      # Monoline tooth + wordmark (uses currentColor)
│   └── images/       # Stock imagery is referenced from Unsplash by URL
└── README.md
```

## How to view locally

It's a static site, so any static server works. Recommended:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Or simply open `index.html` directly in a browser (a local server is preferred so
the Google Maps embed and `localStorage` behave normally).

## Deployment

Drop the folder onto any static host:

- **Netlify / Vercel:** drag-and-drop the folder, or connect the repo.
- **GitHub Pages:** enable Pages on the repo and serve from the root.

No build or environment configuration is required.

## Features

- Sticky top nav with smooth-scroll anchors and active-section highlighting
- Mobile hamburger menu with focus trap
- Persistent **Book Appointment** button (floating bottom-right on desktop,
  sticky bar on mobile; hides when the booking section is in view)
- Hero, About (2×2 feature cards), Services (expandable navy rows with
  private + NHS pricing), Reviews (auto-rotating carousel), Team grid,
  FAQ accordion, Booking form, Find us (consent-gated map), Footer
- Reviews carousel: ~6s auto-advance, pause on hover/focus, prev/next, dot
  indicators, keyboard arrows, respects `prefers-reduced-motion`
- Booking form: HTML5 + JS validation, `fetch()` submit to Formspree, inline
  success/error messages (no page reload)
- Cookie consent banner; the Google Maps iframe loads only after consent
- GDC compliance line in the footer

## Placeholders to confirm with the client (`[TO CONFIRM]`)

These are flagged with `[TO CONFIRM]` comments in `index.html` / `js/main.js`:

- **Founding year and practice history** (a review references attending since 2003)
- **Real bios and photos** for every team member
- **Full names** for Heather (receptionist) and the two dental nurses
- **GDC registration numbers** for each clinician (footer compliance line)
- **Confirmation that all listed services are offered** (and any to add/remove)
- **Real pricing** — the £45/£40 scale-and-polish prices came from a patient
  review and should be verified; other private prices are indicative
- **NHS vs private mix** (assumed mixed; to confirm)
- **Whether currently accepting new patients** (FAQ 6)
- **Real email address** — currently `contact@smiledentalsurgery.co.uk` placeholder
- **Privacy policy / cookie policy content** (footer link is a placeholder `#`)
- **Complaints procedure** wording
- **Formspree endpoint** — currently posts to a shared pitch endpoint
  (`https://formspree.io/f/mqeopwwg`); swap for the client's own form ID

## Notes for developers

- Colour palette and type scale live as CSS custom properties at the top of
  `css/styles.css` — change them in one place.
- The map embed URL is stored in `data-map-src` on `#mapWrap` and injected by
  JS only after consent.
- To reset the cookie choice while testing: clear the `localStorage` key
  `cookieConsent` (DevTools → Application → Local Storage).

## Credits

- Stock imagery from [Unsplash](https://unsplash.com), referenced by URL with
  optimisation query params.
- Typeface: [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts.
