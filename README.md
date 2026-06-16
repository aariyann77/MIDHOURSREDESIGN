# MIDHOURS® — Landing Page Redesign

A dark, editorial-style landing page concept for **MIDHOURS®**, a streetwear brand built around drop-shoulder tees, hoodies, joggers, and jeans for the Indian market.

![Static Site](https://img.shields.io/badge/type-static%20site-ff3b1f) ![License](https://img.shields.io/badge/license-MIT-c9a84c)

## ✦ Features

- Sticky nav with scrolling announcement bar
- Hero section with floating product card and animated badge
- Vibe-based collection browsing (3 mood/category cards)
- Filterable product grid (All / category / Sale)
- Bundle cross-sell module with stacked product visual
- Customer review grid
- Cart drawer with live add/remove, totals, and toast notifications
- Size guide modal with a fit table
- WhatsApp click-to-chat float button
- Scroll-reveal animations via `IntersectionObserver`

No frameworks, no build step — vanilla HTML, CSS, and JavaScript.

## ✦ Tech Stack

| | |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, grid, flexbox) |
| Behavior | Vanilla JavaScript (ES6+) |
| Fonts | [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue), [DM Sans](https://fonts.google.com/specimen/DM+Sans), [Space Mono](https://fonts.google.com/specimen/Space+Mono) via Google Fonts |

## ✦ Project Structure

```
midhours/
├── index.html              # Markup
├── css/
│   └── styles.css          # All styling, theme variables, animations
├── js/
│   └── script.js           # Cart, modals, filters, scroll-reveal
├── .github/
│   └── workflows/
│       └── deploy.yml      # Auto-deploy to GitHub Pages on push to main
├── docs/                   # Reserved for screenshots / design notes
├── .gitignore
├── LICENSE
├── package.json
└── README.md
```

## ✦ Getting Started

Clone the repo and open `index.html` directly, or serve it locally:

```bash
git clone https://github.com/<your-username>/midhours.git
cd midhours

# Option A — just open it
open index.html        # macOS
# or double-click index.html on Windows/Linux

# Option B — serve it (recommended, avoids any local-file quirks)
npm install
npm start               # serves on http://localhost:3000
```

## ✦ Deployment

This repo ships with a GitHub Actions workflow (`.github/workflows/deploy.yml`) that publishes `index.html`, `css/`, and `js/` to **GitHub Pages** automatically on every push to `main`.

To enable it:
1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main` — the site deploys automatically.

## ✦ Customization

All design tokens live at the top of `css/styles.css` under `:root`:

```css
:root {
  --black: #080808;
  --accent: #ff3b1f;
  --gold: #c9a84c;
  --font-display: 'Bebas Neue', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'Space Mono', monospace;
}
```

Update these to retheme the entire site without touching layout code.

## ✦ Known Placeholders

- Cart checkout button does not connect to a real payment processor — wire it up to your checkout/payment provider of choice.
- WhatsApp number (`919999999999`) is a placeholder — replace with the real business number in `index.html` (search for `wa.me`).
- Product imagery is represented with gradient placeholders (`.c1`–`.c8`) rather than real photography — swap in real images via `background-image` or `<img>` tags as assets become available.

## ✦ License

MIT — see [LICENSE](LICENSE). Swap this out if MIDHOURS® brand assets shouldn't be open-sourced.
