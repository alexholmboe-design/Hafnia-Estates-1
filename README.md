# Hafnia Homes — website

Twelve pages: six in English at the root, six in Danish under `/da/`.
English is the primary language. Every page is self-contained, so you can
double-click any file and see it exactly as it will look live.

```
index.html  housing.html  companies.html  owners.html  about.html  contact.html
da/index.html  da/boliger.html  da/virksomheder.html
da/udlejere.html  da/om-os.html  da/kontakt.html

favicon.svg           Browser tab icon
apple-touch-icon.png  iOS home screen icon
sitemap.xml           All 12 URLs with their language pairings
robots.txt            Points crawlers at the sitemap
CNAME                 Your custom domain, for GitHub Pages
images/               Put your photos here
```

## How the two languages work

Each language has its own real URL, which is what makes them both
indexable by Google:

| English | Danish |
|---|---|
| `/` | `/da/` |
| `/housing.html` | `/da/boliger.html` |
| `/companies.html` | `/da/virksomheder.html` |
| `/owners.html` | `/da/udlejere.html` |
| `/about.html` | `/da/om-os.html` |
| `/contact.html` | `/da/kontakt.html` |

Every page carries `hreflang` tags pointing at its counterpart, and
`x-default` points at the English version. That tells Google the two pages
are the same content in different languages rather than duplicates, and it
serves Danish searchers the Danish page.

The EN/DA switch in the header links straight to the matching page, so
someone reading `/owners.html` who clicks DA lands on `/da/udlejere.html`,
not back on the front page.

### Editing text

Each page exists twice as a separate file. To change the English wording,
edit the file at the root. To change the Danish, edit the matching file in
`da/`. If you change something meaningful, change it in both.

## Logo

The logo is built into the header and footer of every page as inline SVG,
so there is no separate image file to break. The favicon and iOS icon are
`favicon.svg` and `apple-touch-icon.png` at the root. The full logo pack,
with versions for print, dark backgrounds and social media, is in the
separate logo download.

## Prices currently on the site

**Owners** — Tenant Finding at 50% of one month's rent + VAT, Full Service
at 100% + VAT (adds the move-in inspection and key handover). Move-out
inspection listed as available on request, no price. Both invoiced only
once a lease has been signed.

**Companies** — Arrival Essentials DKK 3,500 per employee, Full Settlement
DKK 6,500 per employee, reduced rates from five placements a year.

**Tenants** — no fee, and there must not be one.

### Two things not to change without advice

**No tenant fee.** Lejeloven § 15 prohibits charging a tenant, or anyone who
is the tenant on the lease, for arranging a residential lease. That includes
a company that signs the lease itself. This is why the company packages are
priced as settlement services only, and why they are optional rather than a
condition of getting the home.

**Move-out deadlines.** Lejeloven § 187 sets hard deadlines, and missing one
voids the owner's repair claim entirely. If you take on a move-out
inspection, you take on that calendar with it.

## The rent calculator

On `owners.html` and `da/udlejere.html`. It works in whichever language the
page is in, including the emailed enquiry it generates.

**Where the numbers come from.** Copenhagen's average rental level is around
DKK 210 per m² per month (mid-2026). The calculator holds a per-postcode
base rate around that average, then adjusts for size, condition, and
furnishing (furnished adds roughly 18%).

**Updating the rates.** Search for `var AREAS=` in the file. It is a list of
`[from, to, "Area name", rate]` — change the last number to change that
area's rate in DKK per m² per month. **Change it in both language versions**,
since each file carries its own copy.

## Publishing

1. Unzip. Upload **the contents**, not the folder and not the zip. When it
   is right you see `index.html` and the `da` folder in the GitHub file list
   straight away.
2. **Settings → Pages → Branch: main, folder / (root)**.
3. **Settings → Pages → Custom domain**, enter `hafniahomes.dk`.
4. At your registrar add four A records for `@` pointing to
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
   `185.199.111.153`, and a CNAME for `www` pointing to
   `yourusername.github.io`.
5. Tick **Enforce HTTPS** once it appears.
6. Point `hafniahomes.com` at `https://hafniahomes.dk` with a **permanent
   (301)** redirect at your registrar. A 301 passes SEO value across; a 302
   does not.

## Before going live

Search and replace across all twelve files:

- `hello@hafniahomes.dk` → your real email
- `+45 00 00 00 00` → your real phone number, in the visible text **and** in
  the `"telephone"` line of the structured data near the top of each file
- `[CVR-nr.]` → your CVR number

Add a real `hero.jpg`. It is the preview image whenever anyone shares a link,
so until it exists, links posted on LinkedIn show nothing. Alternatively use
`og-image.png` from the logo pack.

### The contact form
It opens the visitor's own email app with everything filled in, in whichever
language they were reading. Free and needs no server, but it only works if
they have an email client set up. For a form that emails you from any device,
sign up free at formspree.io and change `<form id="cform" novalidate>` to
`<form action="https://formspree.io/f/YOUR_ID" method="POST">`.

### Once you are live
Add **both** `hafniahomes.dk` and the `/da/` section to Google Search Console
and submit `https://hafniahomes.dk/sitemap.xml`. The sitemap already declares
the language pairings, so Google will pick up both versions from that one
submission.
