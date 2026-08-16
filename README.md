# Hafnia Estates — website

Five pages, each a **single self-contained HTML file**. All styling and
scripts are built into each file, so you can double-click any page and see
it exactly as it will look live.

```
hafnia-estates/
├── index.html        → Home
├── for-expats.html    → For expats & companies
├── for-owners.html     → For property owners
├── about.html           → About
├── contact.html          → Contact (with form)
└── images/                 → Put your photos here
```

---

## Adding your own photos

Every image area on the site currently shows a green placeholder with a
filename on it, like `images/hero.jpg`. To add a real photo, just save your
image into the `images/` folder with **exactly that filename**. Nothing else
needs changing — the site picks it up automatically.

| Filename | Where it appears | Suggested size |
|---|---|---|
| `hero.jpg` | Big image on the homepage hero | 1600 × 1000 px |
| `expats.jpg` | Homepage, expat section | 1200 × 900 px |
| `owners.jpg` | Homepage, property owner section | 1200 × 900 px |
| `city-1.jpg` … `city-4.jpg` | Homepage photo strip (4 squares) | 800 × 800 px |
| `process.jpg` | For expats page, timeline section | 900 × 1200 px (tall) |
| `payment.jpg` | For property owners page | 900 × 1200 px (tall) |
| `about.jpg` | About page | 1200 × 900 px |

If a file isn't there yet, the placeholder simply shows instead — so the
site never looks broken, and you can add photos one at a time.

**Where to get good free photos:** Unsplash.com and Pexels.com both allow
free commercial use. Search terms that work well here: "Copenhagen
apartment", "Scandinavian interior", "Nyhavn", "Copenhagen architecture".
Later on, your own photos of actual properties will be far stronger.

**Tip:** compress images before uploading (squoosh.app is free) so the site
loads fast. Aim for under 300 KB per photo.

---

## Publishing the site (free, about 5 minutes)

Use **Netlify** — easiest option, no coding, free tier is plenty.

1. Go to **netlify.com** and create a free account.
2. Zip the whole `hafnia-estates` folder (right-click → Compress).
3. On Netlify, drag the zip into the box marked **"Drag and drop your site
   output folder here."**
4. It publishes instantly at an address like `yourname.netlify.app`.
5. Go to **Site settings → Domain management → Add a domain** to connect
   your own domain once you've bought it.

**Alternatives:** Vercel and Cloudflare Pages work the same way and are also
free.

### Buying a domain
`hafniaestates.dk` from **simply.com** or **one.com** costs roughly
100–150 DKK/year. Netlify's "Add a domain" guide shows exactly which DNS
settings to enter at your registrar.

---

## Before you go live — replace these placeholders

Search and replace across all five files:

- `hello@hafniaestates.dk` → your real email address
- `+45 00 00 00 00` → your real phone number
- `[your CVR no.]` → your CVR number once registered

### The contact form
It currently opens the visitor's own email app with the message pre-filled
(a "mailto" link). That's free and needs no server, but only works if the
visitor has an email client set up.

For a proper form that emails you directly from any device, sign up free at
**formspree.io** or **web3forms.com**, then in `contact.html` change:

```html
<form id="cform" novalidate>
```
to
```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```
(and delete the `id="cform"` so the mailto script doesn't intercept it).

---

## Running cost

- Netlify hosting — 0 DKK
- Domain — roughly 100–150 DKK/year
- Optional business email — 0–700 DKK/year

Total: roughly 0–850 DKK/year.
