# Smile Dental Surgery Website

A premium, modern, single-page responsive website designed as a pitch template for **Smile Dental Surgery**, a family-run dental practice based in Kennington, London. The site provides a clean, reassuring, and highly accessible user experience tailored to local residents and nervous patients.

## Project Vision & Architecture

The website is constructed using standard web technologies without heavy frameworks to ensure maximum performance, accessibility, and zero build steps:
- **Core:** Semantic HTML5
- **Styling:** Modern Vanilla CSS3 utilizing Custom Properties (CSS variables), Flexbox, CSS Grid, and smooth keyframe animations
- **Interactions:** Vanilla ES6+ JavaScript for custom carousel, accordions, dynamic active-navigation tracking, and expandable details
- **Aesthetics:** Soothing dark mode / curated light theme, smooth scroll, glassmorphism accents, and interactive micro-animations

---

## File & Folder Structure

```
Smile-Dental-Surgery/
├── index.html          # Core page structure and content
├── css/
│   └── styles.css      # Core styles, design system, and keyframe animations
├── js/
│   └── main.js         # Navigation, carousel, accordion, and form logic
├── assets/
│   ├── logo.svg        # Clean vector logo combining business name and a geometric tooth icon
│   └── images/         # stock dental/clinic imagery placeholders
└── README.md           # Project documentation and implementation plan
```

---

## Proposed Build Order

We will build the website section-by-section to facilitate step-by-step reviews and course correction:

1. **Step 1: Setup & Design Tokens (`css/styles.css`)**
   - Configure modern typography using Google Fonts (Inter/DM Sans).
   - Set up the premium color palette (Trustworthy navy/blues, off-whites, and sage/sand accents).
   - Define baseline resets and dynamic layout utility classes.
2. **Step 2: SVG Logo & Core Navigation Bar**
   - Create and save the `assets/logo.svg` vector.
   - Build the responsive sticky navbar with a collapse-to-hamburger behavior on mobile.
3. **Step 3: Hero Section**
   - Create a clean hero layout highlighting the practice's warm heritage and USP.
   - Embed double CTAs (Book Appointment / Call Clinic) and high-quality background imagery.
4. **Step 4: Overview / About Section**
   - Detail the family-run history, NHS/Private treatment balance, and compassionate care ethos.
5. **Step 5: Services Section (Expandable Dropdowns)**
   - Implement custom interactive list elements styled after modern standards.
   - Integrate private base prices and standard NHS Band references.
6. **Step 6: Reviews Section (Interactive Carousel)**
   - Build a keyboard-accessible, auto-rotating carousel highlighting 10 real 5★ Google reviews.
   - Support hover-pause, dot navigation, and next/prev controls.
7. **Step 7: Meet the Team Grid**
   - Create a responsive card grid profiling the clinical and support staff.
8. **Step 8: FAQs Section (Accordion)**
   - Embed an 8-item accordion ensuring only one question remains open at any given time.
9. **Step 9: Booking Enquiry Form**
   - Build the interactive HTML5 contact form with validations for preferred services and times.
10. **Step 10: Find Us & Footer**
    - Embed Google Maps iframe alongside opening hours and regulatory compliance texts.
    - Set up the GDPR Cookie Consent Banner.

---

## Questions & Assumptions for the Client

1. **NHS/Private Availability:** Are they currently accepting new NHS patients, or only private?
2. **Clinician details:** What are the GDC numbers and exact bios for the clinical team?
3. **Form endpoint:** Do they have an existing mail gateway or CRM (e.g. Dentally/SOE) for handling bookings, or should the form submit via a secure email forwarding hook?
4. **Historical Dates:** What is the exact founding year of the practice to replace `[TO CONFIRM]`?

---

## Client Confirmations & Placeholders (`[TO CONFIRM]`)

All code files will contain `[TO CONFIRM]` comments marking sections where real content needs to replace the mock data:
- `[TO CONFIRM: Founding Year / History Details]` (Hero and About sections)
- `[TO CONFIRM: Team Bios & Photos]` (Meet the Team section)
- `[TO CONFIRM: GDC Registration Numbers]` (Footer section)
- `[TO CONFIRM: Service Catalog & Pricing]` (Services section)
- `[TO CONFIRM: Booking Form Endpoint]` (Booking section)
- `[TO CONFIRM: Privacy & Complaints Policies]` (Footer section)
- `[TO CONFIRM: New Patient Acceptance Status]` (FAQs and Booking sections)
- `[TO CONFIRM: Full Names for Dr Roberta, Jackie, John, Aya]` (Team section)

---

## How to View and Run Locally

Since this is a vanilla static site, no compile or build steps are required.

### Option 1: Direct File Access
Simply double-click `index.html` or open it directly in your browser.

### Option 2: Local HTTP Server (Recommended)
To test map embeds, cookie policies, and proper pathing, serve the folder locally:
```bash
# Using Python
python3 -m http.server 8000

# Using Node.js / npx
npx http-server -p 8000
```
Then navigate to `http://localhost:8000`.
