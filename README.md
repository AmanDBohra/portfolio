# Personal Portfolio Website

A modern, premium, fully responsive personal portfolio built with **Vite + React + TypeScript + Tailwind CSS**. Fast, accessible, SEO-friendly, and ready to deploy on **GitHub Pages** with a single push.

- Light / dark mode (respects system preference, remembers your choice)
- Sticky nav with active-section highlighting + mobile hamburger menu
- Smooth scrolling, subtle scroll-reveal animations (respects `prefers-reduced-motion`)
- Structured, easy-to-edit content in a single data file
- Accessible: keyboard navigation, focus states, skip link, semantic HTML, alt text
- SEO: meta tags, Open Graph/Twitter cards, JSON-LD, sitemap, robots.txt

## Sections

Hero · About · Skills · Featured Projects · Experience · Education · Certifications & Achievements · Services · Creative/Design Work · Resume · Testimonials · Contact · Footer

---

## Tech stack

| Purpose        | Choice                          |
| -------------- | ------------------------------- |
| Build tool     | Vite                            |
| UI library     | React 18                        |
| Language       | TypeScript                      |
| Styling        | Tailwind CSS                    |
| Animation      | Framer Motion                   |
| Icons          | lucide-react                    |
| Deployment     | GitHub Pages (GitHub Actions)   |

---

## Project structure

```
portfolio/
├─ .github/workflows/deploy.yml   # GitHub Pages CI/CD
├─ public/
│  ├─ favicon.svg                 # replace with your favicon
│  ├─ robots.txt
│  ├─ sitemap.xml
│  ├─ .nojekyll
│  └─ resume.pdf.README.txt       # put your real resume.pdf here
├─ src/
│  ├─ components/
│  │  ├─ Navbar.tsx
│  │  ├─ Footer.tsx
│  │  ├─ BackToTop.tsx
│  │  └─ ui/                       # Reveal, SectionHeading, SocialIcons, Thumb
│  ├─ hooks/                       # useTheme, useActiveSection
│  ├─ sections/                    # Hero, About, Skills, Projects, ...
│  ├─ data/portfolio.ts            # ← EDIT THIS to personalize everything
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css
├─ index.html                      # <title>, meta tags, JSON-LD
├─ tailwind.config.js
├─ vite.config.ts
└─ package.json
```

---

## Getting started

Requires **Node.js 18+**.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Type-check + production build (outputs to /dist)
npm run build

# 4. Preview the production build locally
npm run preview
```

---

## Personalize it

Almost all content lives in **`src/data/portfolio.ts`**. Open it and replace the
`ALL_CAPS` placeholders and `[PLACEHOLDER]` sample content:

- `site` — your name, title, tagline, intro, location, email, resume path, avatar
- `socials` — your social links
- `about`, `skillCategories`, `projects`, `experience`, `education`,
  `certifications`, `services`, `creativeWork`, `testimonials`

Then update these files:

- **`index.html`** — `<title>`, meta description, Open Graph URLs/image, and the JSON-LD block (`YOUR_NAME`, `YOUR_DOMAIN_OR_GITHUB_PAGES_URL`, social URLs).
- **`public/favicon.svg`** — swap for your own favicon.
- **`public/resume.pdf`** — add your real resume (see `resume.pdf.README.txt`).
- **`public/robots.txt` / `public/sitemap.xml`** — set your deployed URL.
- **Images** — add a square `public/avatar.jpg` and project/creative thumbnails, then set the `avatar` / `image` paths in the data file. Until you do, tasteful placeholders render automatically.
- **Social preview** — add `public/og-image.png` (1200×630) for link previews.

### Wire up the contact form

The form works out of the box in "demo" mode (it simulates a submit). To actually
receive messages, open **`src/sections/Contact.tsx`** and set `FORMSPREE_ENDPOINT`:

1. **Formspree (easiest):** create a form at [formspree.io](https://formspree.io), copy your endpoint (e.g. `https://formspree.io/f/xxxxxx`), and paste it into `FORMSPREE_ENDPOINT`. Done.
2. **EmailJS:** `npm i @emailjs/browser` and swap the submit handler for an `emailjs.send(...)` call.
3. **Your own API:** point `FORMSPREE_ENDPOINT` at any endpoint that accepts a `POST`.

---

## Deploy to GitHub Pages

This repo includes a ready-to-go GitHub Actions workflow
(`.github/workflows/deploy.yml`). After you push to `main`:

1. Go to your repo → **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push to `main` (or run the workflow manually). Your site publishes to
   `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/`.

**Base path:** the workflow automatically sets Vite's `base` to `/YOUR_REPOSITORY/`
for project sites. If you deploy to a **user/org site** (`YOUR_USERNAME.github.io`)
or a **custom domain**, change `BASE_PATH` in the workflow to `"/"`.

### Git workflow (copy/paste)

```bash
# Initialize and make the first commit
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main

# Connect to your GitHub repo (create an empty repo on github.com first)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git

# Push — this triggers the deploy workflow
git push -u origin main
```

### Updating later

```bash
git add .
git commit -m "Update portfolio content"
git push
```

Every push to `main` rebuilds and redeploys automatically.

---

## Before you go public — checklist

- [ ] Replaced all `YOUR_NAME`, `YOUR_*` placeholders in `src/data/portfolio.ts`
- [ ] Replaced `[PLACEHOLDER]` projects, experience, education, certs
- [ ] Replaced `[PLACEHOLDER TESTIMONIAL]` quotes (or removed the section)
- [ ] Updated `index.html` title, meta description, OG tags, JSON-LD, canonical URL
- [ ] Added `public/resume.pdf`
- [ ] Added `public/avatar.jpg` and project/creative images (optional)
- [ ] Added `public/og-image.png` and `public/favicon.svg`
- [ ] Set the real URL in `robots.txt` and `sitemap.xml`
- [ ] Configured the contact form (`FORMSPREE_ENDPOINT`) or removed it
- [ ] Set `BASE_PATH` correctly for your Pages type
- [ ] Ran `npm run build` with no errors
- [ ] Checked responsive layout on mobile, tablet, desktop
- [ ] Checked dark mode and keyboard navigation

---

## License

MIT — use it freely for your own portfolio.
