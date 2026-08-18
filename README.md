# Hafnia Homes — website

Six self-contained HTML pages, in English and Danish. All styling and
scripts are inside each file, so you can double-click any page and see it
exactly as it will look live.

```
index.html       Home
housing.html     Housing — for people moving to Copenhagen
companies.html   Companies — corporate relocation
owners.html      Owners — includes the rent calculator
about.html       About
contact.html     Contact
sitemap.xml      Tells Google which pages exist
robots.txt       Points crawlers at the sitemap
CNAME            Your custom domain, for GitHub Pages
images/          Put your photos here
```

---

## The language switch

Every page has an EN / DA switch in the top right. English is the default.
The choice is remembered in the visitor's browser, and Danish speakers get
Danish automatically on their first visit.

You can also link straight to a language with `?lang=da`, for example
`hafniahomes.dk/owners.html?lang=da` — useful in an email to a Danish
property owner.

### Editing the text

Danish sits in an attribute on the same element as the English:

```html
<h4 data-da="Klar ved ankomst">Ready on arrival</h4>
```

Change the text between the tags for English, and the text inside
`data-da="..."` for Danish. A few elements use `data-dahtml` instead,
where the Danish version contains formatting, and form placeholders use
`data-daph`. They work the same way.

If you add new text, remember to add a `data-da` to it, or it will stay in
English when someone switches.

---

## Prices currently on the site

**Owners** (`owners.html`)
- Tenant Finding — 50% of one month's rent + VAT
- Full Service — 100% of one month's rent + VAT, adds the move-in
  inspection and key handover
- Move-out inspection — listed inside Full Service as available on request,
  no price shown
- Both invoiced only once a lease has been signed

**Companies** (`companies.html`)
- Arrival Essentials — DKK 3,500 per employee
- Full Settlement — DKK 6,500 per employee
- Reduced rates from five placements a year

**Tenants** (`housing.html`) — no fee, and there must not be one.

### Two things not to change without advice

**No tenant fee.** Lejeloven § 15 prohibits charging a tenant, or anyone
who is the tenant on the lease, for arranging a residential lease. That
includes a company that signs the lease itself. This is why the company
packages are priced as settlement services only, and why they are optional
rather than a condition of getting the home.

**Move-out deadlines.** Lejeloven § 187 sets hard deadlines, and missing
one voids the owner's repair claim entirely. If you take on a move-out
inspection, you take on that calendar with it. Price it accordingly and
check your professional indemnity insurance covers it.

---

## The rent calculator

On `owners.html`. An owner enters an address or postcode plus the size in
m², picks condition and furnishing, and gets an estimated monthly range.
The "Request a valuation" button then opens an email with everything they
entered already written into it, in whichever language they were reading.

**Where the numbers come from.** Copenhagen's average rental level is around
DKK 210 per m² per month (mid-2026). The calculator holds a per-postcode
base rate around that average, then adjusts for size (smaller flats rent for
more per m²), condition, and furnishing (furnished adds roughly 18%).

**Updating the rates.** In `owners.html`, search for `var AREAS=`. It is a
list of `[from, to, "Area name", rate]`. Change the last number to change
that area's base rate in DKK per m² per month. Worth reviewing once or
twice a year, and especially once your own deals tell you more than the
market averages do.

---

## Adding your photos

Each image area shows a placeholder with a filename on it. Save your photo
into `images/` with that exact filename and it appears automatically.
Nothing in the code needs changing. The full list is in
`images/README.txt`.

Free photos: unsplash.com or pexels.com. Search "Copenhagen apartment",
"Scandinavian interior", "Copenhagen architecture". Compress at
squoosh.app and keep each under about 300 KB.

`hero.jpg` is also the preview image when anyone shares a link on LinkedIn,
so it is the first one worth doing.

---

## Publishing

1. Unzip this folder. Upload **the files themselves**, not the folder and
   not the zip. When it is right, you see `index.html` in the GitHub file
   list straight away without clicking into anything.
2. **Settings → Pages → Branch: main, folder / (root)**, save.
3. **Settings → Pages → Custom domain**, enter `hafniahomes.dk`.
4. At your registrar, add four A records for `@` pointing to
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
   `185.199.111.153`, and a CNAME for `www` pointing to
   `yourusername.github.io`.
5. Tick **Enforce HTTPS** once it becomes available.

To edit later: click any file on GitHub, click the pencil icon, edit,
**Commit changes**. The live site updates by itself.

### The .com domain
Point `hafniahomes.com` at `https://hafniahomes.dk` with a **permanent
(301)** redirect in your registrar's control panel. A 301 passes SEO value
across; a temporary 302 does not. Do not host the site on both.

---

## Before going live

Search and replace across all six files:

- `hello@hafniahomes.dk` → your real email
- `+45 00 00 00 00` → your real phone number, in the visible text **and**
  in the `"telephone"` line of the structured data block near the top
- `[CVR-nr.]` → your CVR number

### The contact form
It opens the visitor's own email app with the message filled in, in
whichever language they were reading. Free and needs no server, but it only
works if they have an email client set up. For a form that emails you from
any device, sign up free at formspree.io and change:

```html
<form id="cform" novalidate>
```
to
```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```

### Once you are live
Add the site to Google Search Console and submit
`https://hafniahomes.dk/sitemap.xml`. It is the single highest-value thing
you can do for search visibility, and it takes about five minutes.
