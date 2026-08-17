# Hafnia Estates — website

Five self-contained HTML pages. All styling and scripts are inside each file,
so you can double-click any page and see exactly how it will look live.

```
index.html       Home
housing.html     Housing (for people relocating)
companies.html   For companies (corporate housing)
owners.html      For owners — includes the rent calculator
about.html       About
contact.html     Contact
images/          Put your photos here
```

---

## Uploading to GitHub — important

Unzip this folder first. Then upload **the files themselves**, not the
`hafnia-estates` folder, and **not the zip file**.

When your GitHub repository is correct, you should see `index.html` in the
file list immediately, without clicking into any folder. If you see a single
folder instead, Netlify will show "Page not found".

Steps:
1. Unzip the download on your computer.
2. Open the unzipped folder so you can see `index.html`, `housing.html` etc.
3. On GitHub, in your repository, click **Add file → Upload files**.
4. Select all five HTML files, the `images` folder and this README, and drag
   them in.
5. Scroll down, click **Commit changes**.
6. In Netlify, the site rebuilds automatically within about 30 seconds.

To edit later: click any file on GitHub, click the pencil icon, edit, then
**Commit changes**. Netlify updates the live site by itself.

---

## Adding your photos

Each image area shows a green placeholder with a filename on it. Save your
photo into the `images/` folder using that exact filename and it appears
automatically — nothing in the code needs changing.

| Filename | Where it appears | Suggested size |
|---|---|---|
| `hero.jpg` | Homepage hero | 1600 × 1000 |
| `relocating.jpg` | Homepage, relocation section | 1200 × 800 |
| `corporate.jpg` | Homepage, companies section | 1200 × 800 |
| `city-1.jpg` … `city-4.jpg` | Homepage photo strip | 800 × 800 |
| `process.jpg` | Homes & stays page (tall) | 900 × 1200 |
| `team.jpg` | For companies page (tall) | 900 × 1200 |
| `about.jpg` | About page | 1200 × 800 |
| `owners.jpg` | For owners page | 1200 × 800 |

Free photos: unsplash.com or pexels.com. Search "Copenhagen apartment",
"Scandinavian interior", "Copenhagen architecture". Compress at squoosh.app
and keep each file under about 300 KB.

---

## Before going live — replace these

Search and replace across all five files:

- `hello@hafniaestates.dk` → your real email
- `+45 00 00 00 00` → your real phone number
- `[your CVR no.]` → your CVR number once registered

Check the prices too — they are set at DKK 4,500 (Housing Search),
DKK 7,500 (Full Settle-In), from DKK 3,500 and DKK 6,500 per corporate
placement. Adjust to whatever you decide.

## The rent calculator

On `owners.html` an owner enters an address or postcode plus the size in m²,
picks condition and furnishing, and gets an estimated monthly rent range.
The "Request a valuation" button then opens an email pre-filled with
everything they entered, including the estimate — so an enquiry arrives with
the details already in it.

**Where the numbers come from.** Copenhagen's average rental level is around
DKK 210 per m² per month (mid-2026). The calculator holds a per-postcode
base rate around that average, then adjusts for size (smaller flats rent for
more per m²), condition, and furnishing (furnished adds roughly 18%). The
result is shown as a range, not a single figure.

**Updating the rates.** In `owners.html`, search for `var AREAS=` — it is a
list of `[from, to, "Area name", rate]`. Change the last number to change
that area's base rate in DKK per m² per month. Review it once or twice a
year, or whenever you get a better feel for the real numbers from your own
deals.

Note the on-page disclaimer: the estimate does not account for Danish rent
regulation, which can cap what may legally be charged. Keep that text — it
is both accurate and the reason an owner should call you rather than just
trust the number.

### The contact form
It currently opens the visitor's own email app with the message pre-filled.
Free, no server needed, but it only works if they have an email client set
up. For a form that emails you from any device, sign up free at
formspree.io, then in `contact.html` change:

```html
<form id="cform" novalidate>
```
to
```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```
