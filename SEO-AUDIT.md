# SEO Audit — gmmohit.com

**Auditor:** Claude (seo-audit skill v2.0.0)
**Date:** 6 September 2026
**Target:** https://www.gmmohit.com
**Stack:** Next.js 16.1.6 (App Router, Turbopack), React 19.2.3, fully static export (all 8 routes prerendered)
**Method:** Static analysis of `src/`, inspection of the prerendered HTML from a clean production build (`.next/server/app/*.html`), and live HTTP verification against production (`curl` against www + apex, headers, robots, sitemap).

---

## Executive Summary

**Overall health: 4/10 — one critical defect is currently suppressing 75% of the site from search.**

The site is technically well-built in most respects: it is fully statically prerendered, Brotli-compressed, served over HTTPS with HSTS, has a valid `robots.txt` and XML sitemap, ships `Person` + `ProfessionalService` JSON-LD in the static HTML, has a valid `llms.txt` for AI crawlers, and all body copy is server-rendered (not client-only). Those are real strengths and rule out the most common Next.js SEO failure modes.

However, a single line in the root layout is telling Google that every page on the site is a duplicate of the homepage. Combined with an orphaned case study and roughly 12–32 MB of uncached autoplaying video per page, the site is effectively a one-page site in Google's eyes, and a slow one.

### Top 5 priority issues

| # | Issue | Impact |
|---|---|---|
| 1 | **Every page canonicalises to the homepage** — `/works/teaure`, `/works/creative-ants` and `/privacy-policy` all emit `<link rel="canonical" href="https://www.gmmohit.com"/>` | **Critical** — case studies will be dropped from the index |
| 2 | **`/works/creative-ants` is an orphan page** — zero internal links point to it; it is reachable only via the sitemap | High |
| 3 | **11.6 MB of video autoplays on the homepage; 32 MB on the Teaure page** — no `poster`, no `preload="none"` | High (LCP/INP) |
| 4 | **All `/public` assets are served `Cache-Control: max-age=0, must-revalidate`** — fonts, images and videos are re-validated on every navigation | High (repeat-visit CWV) |
| 5 | **The preloader gates the LCP element** — the hero image is held at `opacity: 0` until the loader finishes, then animates in with `delay: 2` | High (LCP guaranteed > 2.5 s) |

### Quick wins (under 30 minutes each, high payoff)

- Add `alternates: { canonical: '...' }` to the three child pages (fixes #1 — the single highest-value change on this list).
- Pass `link="/works/creative-ants"` to the second `ProjectCard` (fixes #2).
- Add a `headers()` block to `next.config.ts` for `/public` caching (fixes #4).
- Add `poster` + `preload="none"` to the homepage project videos (large part of #3).
- Add `/privacy-policy` to `sitemap.ts`.
- Fix the `sameAs` URLs in the JSON-LD — two of the three currently point at profiles that are not the ones linked from the site.

### Evidence of live impact

A web search for the site returns the title **"GM MOHIT | Designer. Strategist. Creator."** The title currently deployed is **"GM MOHIT | Creative. Designer. Developer."** — verified live:

```
$ curl -sS https://www.gmmohit.com | grep -oE '<title>[^<]*</title>'
<title>GM MOHIT | Creative. Designer. Developer.</title>
```

The index is serving stale metadata, and only the homepage surfaces at all. No case study URL appears in results. This is the expected symptom of the canonical defect below.

---

## Technical SEO Findings

### T1. Every page declares the homepage as its canonical URL

- **Impact:** **Critical (P0)**
- **Evidence:** [src/app/layout.tsx:12-14](src/app/layout.tsx#L12-L14) sets `alternates: { canonical: "/" }` on the **root layout**. In the Next.js App Router, metadata fields are inherited by child segments unless the child overrides that specific field. None of the three child pages define `alternates`, so all of them inherit the homepage canonical. Confirmed in the prerendered build **and** on live production:

  ```
  $ curl -sS https://www.gmmohit.com/works/creative-ants | grep -oE '<title>[^<]*</title>|<link rel="canonical"[^>]*>'
  <title>Creative Ants Case Study | GM Mohit</title>
  <link rel="canonical" href="https://www.gmmohit.com"/>
  ```

  Same result for `/works/teaure` and `/privacy-policy`. All four pages emit an identical canonical.
- **Why this is severe:** A canonical tag is a strong consolidation signal. Google is being told that the Teaure case study, the Creative Ants case study and the privacy policy are all duplicates of the homepage. The standard outcome is `Duplicate, Google chose different canonical than user` in Search Console, the pages dropping out of the index, and all of their link equity and content relevance folding into `/`. The case studies are the only substantial content on the site (647 and 226 words respectively) — this defect removes the site's entire content surface from search.
- **Fix:** Give every page a self-referencing canonical. Either remove `alternates` from the root layout and declare it per-page, or (better) add it explicitly to each child:

  ```ts
  // src/app/works/teaure/layout.tsx
  export const metadata: Metadata = {
    title: "Teaure Case Study | GM Mohit",
    description: "...",
    alternates: { canonical: "/works/teaure" },   // <-- add
    openGraph: { /* ... */ },
  };
  ```

  Repeat with `/works/creative-ants` and `/privacy-policy`. Keep `metadataBase` in the root layout so the relative paths resolve. Verify after deploy by re-running the `curl` above on all four URLs and confirming four distinct canonicals.

---

### T2. `/works/creative-ants` has no internal links pointing to it

- **Impact:** **High (P1)**
- **Evidence:** The homepage prerendered HTML contains exactly one anchor into `/works/`:

  ```
  $ grep -oE 'href="/works[^"]*"' .next/server/app/index.html
  href="/works/teaure"
  ```

  In [src/components/FeaturedWorksSection.tsx:215-238](src/components/FeaturedWorksSection.tsx#L215-L238), the Teaure card receives `link="/works/teaure"` (which renders a crawlable `sr-only` anchor at [line 57](src/components/FeaturedWorksSection.tsx#L57)), but the Creative Ants card receives `onCustomClick={() => setShowWIP(true)}` and **no `link` prop** — so no anchor is rendered. The page is nonetheless prerendered, indexable, and listed in `sitemap.ts` with `priority: 0.8`.
- **Why it matters:** A sitemap tells Google a URL exists; internal links tell Google it matters. An orphan page receives no internal PageRank and is crawled infrequently. Compounding this: the UI presents the project as "work in progress" via a popup, yet the page it hides is fully indexable with only 226 words of content — the worst of both worlds (thin content indexed, no link equity).
- **Fix:** Decide which it is, then be consistent.
  - **If the case study is ready:** pass `link="/works/creative-ants"` to the second `ProjectCard` and remove the WIP popup.
  - **If it is not ready:** remove the URL from `sitemap.ts` and add `robots: { index: false, follow: false }` to `src/app/works/creative-ants/layout.tsx` until it ships. Do not leave a thin, unlinked page indexable — Google's site-wide quality signals are evaluated across the whole domain, so a thin page can drag down the pages that are strong.

---

### T3. Very large autoplaying video payloads with no `poster` or `preload` control

- **Impact:** **High (P1)** — Core Web Vitals (LCP, INP), mobile bounce, crawl budget
- **Evidence:** Every `<video>` in the codebase uses `autoPlay muted loop playsInline` with no `poster` and no `preload` attribute. Verified across [FeaturedWorksSection.tsx:84](src/components/FeaturedWorksSection.tsx#L84), [works/teaure/page.tsx:116](src/app/works/teaure/page.tsx#L116), [works/teaure/page.tsx:312](src/app/works/teaure/page.tsx#L312), [works/creative-ants/page.tsx:45](src/app/works/creative-ants/page.tsx#L45), [04-SolutionSection.tsx:47](src/components/case-study/04-SolutionSection.tsx#L47), [06-FeatureBreakdownSection.tsx:49](src/components/case-study/06-FeatureBreakdownSection.tsx#L49).

  Measured file sizes served from `/public`:

  | Page | Videos autoplayed | Bytes |
  |---|---|---|
  | `/` | `Teaure.mp4` (7.61 MB) + `CreativeAnts.mp4` (4.03 MB) | **11.6 MB** |
  | `/works/teaure` | `teaure-scroll v2.mp4` (26.39 MB) + `Showreel.mp4` (5.87 MB) | **32.3 MB** |

  Confirmed live: `Content-Length: 7982944` for `Teaure.mp4`.
- **Why it matters:** With `autoPlay` and no `preload="none"`, browsers begin buffering immediately, competing with the LCP image for bandwidth and with the main thread for decode time. On a 4G connection, 11.6 MB is roughly 10–15 s of download. This will fail LCP and degrade INP, and Google's page experience signals apply site-wide.
- **Fix:**
  1. Add a `poster` image (a compressed WebP/AVIF first frame, ~30–60 KB) to every `<video>` — this becomes the paint target so LCP no longer waits on video bytes.
  2. Add `preload="none"` and start playback on intersection (`IntersectionObserver`) rather than on load.
  3. Re-encode. 26 MB for a scroll loop is 10–20× larger than necessary. Target H.264 ~1.5 Mbps plus a WebM/AV1 alternate; aim for < 2 MB per loop:
     ```
     ffmpeg -i "teaure-scroll v2.mp4" -vf "scale=1280:-2" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart teaure-scroll.mp4
     ```
  4. Always strip the audio track (`-an`) on muted decorative loops, and set `+faststart` so the moov atom is at the front.
  5. Consider serving these through a video CDN / Mux rather than `/public`.

---

### T4. Static assets are served with no browser caching

- **Impact:** **High (P1)**
- **Evidence:** Live headers on production for every file under `/public`:

  ```
  $ curl -sSI https://www.gmmohit.com/fonts/MonumentExtended-Regular.woff2 | grep -i cache-control
  Cache-Control: public, max-age=0, must-revalidate

  $ curl -sSI https://www.gmmohit.com/works/teaure/Teaure.mp4 | grep -i cache-control
  Cache-Control: public, max-age=0, must-revalidate
  ```

  This is Vercel's default for `/public` and applies to both webfonts, all images, and all videos. (Files under `/_next/static/` are correctly immutable — this affects only `/public`.)
- **Why it matters:** Every navigation and every repeat visit re-validates the fonts and the hero image. Because both `@font-face` rules use `font-display: swap` ([globals.css:3-17](src/app/globals.css#L3-L17)), a revalidation round-trip means a visible font swap on repeat views, which is both a CWV and a CLS concern. For the 8 MB video it means a conditional request on an asset that never changes.
- **Fix:** Add a `headers()` block to [next.config.ts](next.config.ts). Because these filenames are not content-hashed, use a moderate max-age with `stale-while-revalidate`, and version filenames when you replace an asset:

  ```ts
  const nextConfig: NextConfig = {
    productionBrowserSourceMaps: false,
    async headers() {
      return [
        {
          source: "/fonts/:path*",
          headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
        },
        {
          source: "/:all*(mp4|webm|png|jpg|jpeg|webp|avif|svg)",
          headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
        },
      ];
    },
  };
  ```

---

### T5. The preloader delays the LCP element past the CWV threshold

- **Impact:** **High (P1)**
- **Evidence:** [PreloaderWrapper.tsx](src/components/PreloaderWrapper.tsx) wraps all page content and, until `isExitComplete` is true, applies `h-screen overflow-hidden pointer-events-none` to the content container. The hero image in [HeroSection.tsx:52-66](src/components/HeroSection.tsx#L52-L66) is wrapped in a `motion.div` whose `animate` is `isExitComplete ? "show" : "hidden"`, and the `imageVariants` show transition carries `duration: 1.5` with **`delay: 2`** ([HeroSection.tsx:25](src/components/HeroSection.tsx#L25)). The prerendered homepage contains **45 elements with inline `opacity:0`**.

  The image correctly carries `priority` and `sizes`, so it is preloaded — but it is not *painted* until the loader animation completes and the 2-second delay elapses.
- **Why it matters:** LCP measures when the largest element is **rendered**, not when it is fetched. A `priority` preload does not help if the element is held at `opacity: 0`. A 2 s delay on top of the loader's own duration puts first-visit LCP well beyond the 2.5 s "good" threshold, regardless of network speed. Note the preloader is skipped on subsequent client-side navigations (`hasPlayedThisSession`), so this is a first-impression / cold-visit problem — which is exactly the traffic that arrives from search.
- **Fix (in order of preference):**
  1. Paint the hero image immediately and let the loader overlay sit *on top* of it as a fixed-position layer, rather than gating the content behind it. The LCP element then paints at first frame.
  2. Reduce `delay: 2` to `0`–`0.2` and shorten the loader.
  3. Show the preloader only on the first-ever visit (persist a flag in `sessionStorage`) rather than per module-instance.
  4. Gate the animation on `prefers-reduced-motion` as well, which is good practice independently.

---

### T6. `apex → www` redirect is a 307 (temporary), not a 308/301

- **Impact:** Low–Medium (P3)
- **Evidence:**
  ```
  $ curl -sSI https://gmmohit.com
  HTTP/1.1 307 Temporary Redirect
  Location: https://www.gmmohit.com/
  ```
  (`http://` → `https://` is correctly a **308 Permanent**, and HSTS is present: `Strict-Transport-Security: max-age=63072000`.)
- **Why it matters:** A 307 signals the redirect may be reversed, so it is a weaker consolidation signal than a 301/308 for host canonicalisation. In practice Google handles this well and the canonical tags reinforce www — so this is a correctness issue rather than an active problem.
- **Fix:** In the Vercel dashboard, set the apex domain's redirect to **Permanent (308)**. Also consider adding `includeSubDomains` to the HSTS header.

---

### T7. Sitemap issues

- **Impact:** Medium (P2)
- **Evidence:** [src/app/sitemap.ts](src/app/sitemap.ts), verified against the live `sitemap.xml`:
  - `/privacy-policy` is **missing** from the sitemap despite being a real, linked, indexable page.
  - `lastModified: new Date()` evaluates at **build time**, so every URL's `lastmod` changes on every deploy regardless of whether the content changed. Live output showed all three URLs stamped with the identical build timestamp.
  - `changeFrequency` and `priority` are ignored by Google (harmless, but noise).
- **Why it matters:** A `lastmod` that always changes is a false freshness signal. Google explicitly states it will begin ignoring `lastmod` values it finds unreliable, which costs you the one field in the sitemap that genuinely influences recrawl scheduling.
- **Fix:** Add the privacy policy, and hardcode real per-page modification dates (or derive them from git/frontmatter):

  ```ts
  export default function sitemap(): MetadataRoute.Sitemap {
    return [
      { url: 'https://www.gmmohit.com',                     lastModified: new Date('2026-09-06') },
      { url: 'https://www.gmmohit.com/works/teaure',        lastModified: new Date('2026-08-30') },
      { url: 'https://www.gmmohit.com/works/creative-ants', lastModified: new Date('2026-08-30') },
      { url: 'https://www.gmmohit.com/privacy-policy',      lastModified: new Date('2026-08-01') },
    ]
  }
  ```

---

### T8. Homepage ships ~869 KB of uncompressed JavaScript

- **Impact:** Medium (P2) — INP / TBT
- **Evidence:** Summing the chunks referenced by the prerendered homepage: **868.7 KB uncompressed** across 13 chunks (largest single chunk 219.2 KB). The homepage loads GSAP, Framer Motion **and** Lenis simultaneously, plus two independent `requestAnimationFrame` loops ([AsciiTorus.tsx](src/components/AsciiTorus.tsx), [CursorTrail.tsx](src/components/CursorTrail.tsx)). Every single component in `src/components/` is a client component (34 of 34 files carry `"use client"`).
- **Why it matters:** Two rAF loops plus Lenis's scroll hijack plus Framer Motion's layout animations all contend for the main thread, which is the classic INP-failure profile. The `dynamic()` imports in [src/app/page.tsx](src/app/page.tsx#L5-L8) do not currently set `ssr: false` and are not lazily gated on viewport, so they contribute to the initial bundle rather than deferring it.
- **Fix:**
  1. GSAP and Framer Motion overlap heavily — consolidate on one. Removing GSAP would be the largest single win.
  2. Lazy-load `AsciiTorus` and `CursorTrail` behind an `IntersectionObserver` / idle callback, and disable both under `prefers-reduced-motion` and on coarse-pointer (touch) devices where the cursor trail is dead weight.
  3. Run `npx @next/bundle-analyzer` to confirm what the 219 KB chunk contains before cutting.

---

### T9. Missing security/quality headers

- **Impact:** Low (P3) — trust signals, not ranking factors
- **Evidence:** Live response headers include `Strict-Transport-Security` but no `X-Content-Type-Options`, `Referrer-Policy`, or `X-Frame-Options`. Also `Access-Control-Allow-Origin: *` is set on the HTML document.
- **Fix:** Add `X-Content-Type-Options: nosniff` and `Referrer-Policy: strict-origin-when-cross-origin` to the same `headers()` block from T4.

---

### T10. Confirmed correct (no action needed)

Recording these so they are not re-investigated:

- HTTPS everywhere, valid cert, HSTS present, `http→https` is a 308.
- `robots.txt` is valid, allows all, and correctly references the sitemap.
- No accidental `noindex` anywhere in the codebase.
- All 8 routes prerender as static — no client-only content, no rendering dependency for crawlers.
- Brotli compression is active on HTML (`Content-Encoding: br`).
- `<html lang="en">`, `charSet=utf-8` and the responsive viewport meta are all present.
- JSON-LD is in the **static** HTML (not JS-injected), so it is reliably crawlable — verified by reading the prerendered files directly rather than via `web_fetch`, per this skill's schema-detection guidance.
- Both webfonts use `font-display: swap`.
- Single-locale site — hreflang is correctly absent and not required.
- `llms.txt` is present and well-formed for AI crawlers (a genuine differentiator; see C5 for a correction).
- All external links carry `rel="noopener noreferrer"` and descriptive `aria-label`s.
- Custom 404 exists and returns a real 404 status.

---

## On-Page SEO Findings

### O1. Twitter Card metadata on case studies shows the wrong content

- **Impact:** Medium (P2) — CTR from social/X shares
- **Evidence:** Extracted from the prerendered `/works/teaure`:

  ```
  <meta property="og:title"     content="Teaure Case Study | GM Mohit"/>
  <meta property="og:image"     content="https://www.gmmohit.com/works/teaure/teaure_webshowcase.png"/>
  <meta name="twitter:title"    content="GM MOHIT | Creative. Designer. Developer."/>   <-- homepage
  <meta name="twitter:image"    content="https://www.gmmohit.com/opengraph-image.png"/>  <-- homepage
  ```

  The child layouts override `openGraph` but never `twitter`, so the root layout's Twitter block is inherited verbatim. The same inheritance bug class as T1.
- **Fix:** Either add a matching `twitter` block to each child layout, or remove the hardcoded `title`/`description`/`images` from the root `twitter` object and keep only `card: "summary_large_image"` — Next.js will then fall back to the page's own `openGraph` values automatically.

### O2. Case study pages lose `og:site_name`, `og:locale` and `og:type`

- **Impact:** Low–Medium (P3)
- **Evidence:** The homepage emits `og:site_name`, `og:locale` and `og:type`; `/works/teaure` and `/works/creative-ants` emit none of them. Defining an `openGraph` object in a child segment replaces the parent's object rather than merging field-by-field.
- **Fix:** Repeat `siteName`, `locale` and `type` in each child's `openGraph` block. For case studies, `type: "article"` is more accurate than `website`.

### O3. Teaure OG image is the wrong aspect ratio and oversized

- **Impact:** Medium (P2)
- **Evidence:** [works/teaure/layout.tsx:11-16](src/app/works/teaure/layout.tsx#L11-L16) declares `width: 1200, height: 630`. Reading the actual PNG header, `public/works/teaure/teaure_webshowcase.png` is **1620 × 1620** (a square) and **1.09 MB**.
- **Why it matters:** The declared dimensions are a lie, so LinkedIn/X/Slack will letterbox or centre-crop a square into a 1.91:1 frame, usually cutting the subject. The homepage's `opengraph-image.png` is correctly 1200×630 — use it as the template.
- **Fix:** Export a dedicated 1200×630 OG image for Teaure (and one for Creative Ants, which currently falls back to the generic homepage image per the comment at [creative-ants/layout.tsx:13](src/app/works/creative-ants/layout.tsx#L13)). Compress to under 300 KB.

### O4. Heading hierarchy is broken on every page

- **Impact:** Medium (P2)
- **Evidence:** Heading order extracted from the prerendered HTML in document order:

  | Page | Order |
  |---|---|
  | `/` | **h2: GMMOHIT** → h1 → h2 → h3 → h3 → h2 → h3 ×3 → h2 → h3 ×4 |
  | `/works/teaure` | **h2: GMMOHIT** → h1: "Teaure." → h2 → h2 → h3 → h4 ×3 → … |
  | `/works/creative-ants` | **h2: GMMOHIT** → h1 → **h3** (h2 skipped) → h3 → h3 → h2 → h2 |

  Three separate problems:
  1. An `h2` containing the brand name **precedes the `h1` on every page**. Source: [PageTransition.tsx:101](src/components/PageTransition.tsx#L101) — a page-transition overlay using a heading element purely for visual styling.
  2. `/works/creative-ants` jumps **h1 → h3**, skipping h2 entirely.
  3. [ServicesSection.tsx:131](src/components/ServicesSection.tsx#L131) and the closing tagline "Crafting digital legacies through intentional design." use heading tags for decorative copy rather than document structure.
- **Fix:** Change the `PageTransition` heading to a `<div>` or `<span>` with `aria-hidden="true"` — it is a transition artifact, not document structure. Promote the Creative Ants section headings from `h3` to `h2`. Reserve heading tags for actual section titles.

### O5. The homepage `h1` is visually hidden; the visible headline is `aria-hidden`

- **Impact:** Medium (P2)
- **Evidence:** [HeroSection.tsx:35](src/components/HeroSection.tsx#L35):
  ```tsx
  <h1 id="hero-heading" className="sr-only">GM Mohit - Creative Designer and Developer Portfolio</h1>
  <AnimatedText el="div" aria-hidden="true" text={["Creative.", "Designer.", "Developer."]} splitLevel="char" />
  ```
- **Why it matters:** This is a deliberate and *reasonable* pattern — the visible headline is split into per-character `inline-block` spans for animation (which renders as `C r e a t i v e .` to a text extractor), so routing the clean text through an `sr-only` h1 is the right instinct and is not cloaking. But Google does discount text that is not visually rendered, so the site's single most important on-page signal is running at reduced weight.
- **Fix:** Keep the `sr-only` h1 but make the *visible* headline the h1 instead, wrapping the animated character spans inside it and keeping the accessible text available via `aria-label` on the h1:
  ```tsx
  <h1 id="hero-heading" aria-label="GM Mohit — Creative Designer and Developer">
    <AnimatedText el="span" aria-hidden="true" text={["Creative.","Designer.","Developer."]} splitLevel="char" />
  </h1>
  ```
  This gives you a visible, keyword-bearing h1 with no visual change.

### O6. `/works/teaure` h1 is a bare brand name

- **Impact:** Medium (P2)
- **Evidence:** The h1 is `Teaure.` while the `<title>` is `Teaure Case Study | GM Mohit`. "Teaure" is a fictional/concept brand with no search volume, so this h1 targets nothing.
- **Fix:** Make the h1 descriptive of the work, e.g. `Teaure — E-Commerce UX & Motion Design Case Study`. Keep the display treatment; extend the text.

### O7. Raw `<img>` tags on the Teaure page bypass image optimisation

- **Impact:** Medium (P2) — LCP, CLS, bandwidth
- **Evidence:** Five raw `<img>` elements at [works/teaure/page.tsx:329, 338, 419, 422, 425](src/app/works/teaure/page.tsx#L329) with no `width`/`height`, no `loading="lazy"`, and no `srcset`. They point at `UIcard3.png` (**3.12 MB**), `UIcard4.png` (1.43 MB) and `UIcard2.png` (0.17 MB). The rest of the codebase correctly uses `next/image`.
- **Why it matters:** Missing intrinsic dimensions cause layout shift (CLS). Serving a 3.12 MB PNG where an ~80 KB WebP would do is pure waste. Every other component in the project already does this correctly, so this is an inconsistency rather than a design decision.
- **Fix:** Convert all five to `next/image` with explicit `width`/`height` (or `fill` + `sizes`), which gives you automatic AVIF/WebP, `srcset` and lazy loading for free.

### O8. Generic, non-descriptive alt text

- **Impact:** Low–Medium (P3) — image search, accessibility
- **Evidence:**
  - `alt="System Component"` — used on **three different images** ([works/teaure/page.tsx:419, 422, 425](src/app/works/teaure/page.tsx#L419)).
  - `alt="Atmospheric Background"`, `alt="Main UI Mockup"` ([01-HeroSection.tsx:50, 116](src/components/case-study/01-HeroSection.tsx#L50)).
  - `alt="Solution Overview"`, `alt="UI Detail"`, `alt="Typography Scale"`, `alt="UI Components"`.

  (The dynamic `alt={step.title}` / `alt={feature.title}` usages in `04b-ProcessSection` and `06-FeatureBreakdownSection` are correct — no change needed there.)
- **Fix:** Describe the actual image content and include relevant context: `alt="Teaure product detail page showing minimal grid layout and typographic hierarchy"`.

### O9. Media filenames contain spaces and are non-descriptive

- **Impact:** Low (P3)
- **Evidence:** `public/assets/Image - Home.jpeg` (the LCP image — served as `/assets/Image%20-%20Home.jpeg`), `public/works/teaure/teaure-scroll v2.mp4`, `public/works/teaure/floatingUI Element(left).png`, `public/works/teaure/Homepage UI.png`, `public/assets/Image - About.jpg`.
- **Why it matters:** Filenames are a (weak) image-search ranking signal, and `Image - Home.jpeg` conveys nothing. Spaces and parentheses require percent-encoding and are a recurring source of broken-path bugs.
- **Fix:** Rename to lowercase, hyphenated, descriptive slugs: `gm-mohit-portrait.jpg`, `teaure-scroll-loop.mp4`, `teaure-homepage-ui.png`.

### O10. Duplicate `<main>` element on every page

- **Impact:** Low (P3) — semantics/accessibility, not ranking
- **Evidence:** Every prerendered page contains **two** `<main>` elements. [layout.tsx:84](src/app/layout.tsx#L84) wraps children in `<main>`, and each page component ([page.tsx](src/app/page.tsx#L13), [privacy-policy/page.tsx](src/app/privacy-policy/page.tsx#L14), [not-found.tsx](src/app/not-found.tsx#L12)) renders its own `<main>`.
- **Fix:** Remove the `<main>` from the root layout and keep the per-page one (which is the more flexible arrangement), or vice versa. There must be exactly one per document.

---

## Content Findings

### C1. The site has no content surface to rank for anything but its own brand name

- **Impact:** **High (P1)** — this is the strategic ceiling on the whole site
- **Evidence:** Server-rendered word counts across the entire site:

  | Page | Words |
  |---|---|
  | `/` | 394 |
  | `/works/teaure` | 647 |
  | `/works/creative-ants` | 226 |
  | `/privacy-policy` | 517 |

  Four pages, ~1,780 words total, of which the privacy policy is boilerplate. There is no blog, no services detail page, no `/works` index, and no location page.
- **Why it matters:** Even with every technical issue on this list fixed, the site can only realistically rank for `gm mohit` and near-variants — queries that already convert and have negligible volume. There is no page targeting any query a prospective client would actually type.
- **Fix — highest-leverage structural work:**
  1. **Add a `/works` index page.** Currently `/works/teaure` and `/works/creative-ants` are children of a route segment that does not exist as a page. A `/works` hub gives you a category page to rank, a natural internal-linking hub, and a place for a `BreadcrumbList`.
  2. **Split the three services into real pages** — `/services/creative-development`, `/services/ui-ux-design`, `/services/strategy-direction`. Each currently gets one sentence in [ServicesSection.tsx](src/components/ServicesSection.tsx).
  3. **Add 3–5 process/opinion articles.** The copy already demonstrates a genuine point of view ("Most designers make things look good. I make things feel inevitable"). That is real E-E-A-T material — first-hand practitioner experience — and it is currently confined to a single decorative line.

### C2. No local/geographic targeting despite being a location-relevant business

- **Impact:** **High (P1)** — largest untapped opportunity
- **Evidence:** The footer renders `Bengaluru, IN` and `GMT +5:30` ([Footer.tsx](src/components/Footer.tsx)), and the JSON-LD declares `@type: "ProfessionalService"` — a `LocalBusiness` subtype. But: no `address`, no `areaServed`, no `geo`, no location keyword in any title, description, h1, or URL.
- **Why it matters:** `ProfessionalService` without an address is a significantly weaker entity than one with it. Queries like *"freelance UI UX designer Bangalore"*, *"creative developer Bengaluru"*, *"webgl developer India"* have genuine commercial intent and far less competition than the generic terms the site is implicitly targeting.
- **Fix:** Add address and service-area properties to the existing `ProfessionalService` node, and work the location into the homepage copy and the meta description naturally:

  ```jsonc
  {
    "@type": "ProfessionalService",
    "@id": "https://www.gmmohit.com/#business",
    "address": { "@type": "PostalAddress", "addressLocality": "Bengaluru", "addressRegion": "Karnataka", "addressCountry": "IN" },
    "areaServed": [{ "@type": "Country", "name": "India" }, { "@type": "Place", "name": "Worldwide" }],
    "priceRange": "$$$",
    "email": "hello@gmmohit.com"
  }
  ```

### C3. Structured data is thin and two `sameAs` URLs are wrong

- **Impact:** Medium (P2) — knowledge-panel eligibility, entity resolution
- **Evidence:** [layout.tsx:44-71](src/app/layout.tsx#L44-L71) declares a `@graph` with `Person` + `ProfessionalService`. Comparing the declared `sameAs` against the profiles actually linked from the site:

  | Declared in `sameAs` | Actually linked on the site | Status |
  |---|---|---|
  | `https://twitter.com/gmmohit` | `https://x.com/G_M_Mohit` | **Mismatch** |
  | `https://github.com/gmmohit` | *not linked anywhere on the site* | Unverified |
  | `https://linkedin.com/in/gmmohit` | `https://www.linkedin.com/in/gmmohit/` | Matches |
  | — | `https://www.behance.net/gmmohit` | **Missing** |
  | — | `https://www.instagram.com/noblessedesigns/` | **Missing** |

- **Why it matters:** `sameAs` is how Google reconciles your site with your identity across the web. Pointing at a handle that does not match the one you actually link to actively weakens entity resolution rather than strengthening it. Behance in particular is a high-authority corroborating profile for a designer and its omission is a real loss.
- **Fix:** Correct `sameAs` to the exact URLs the site links to, add Behance and Instagram, and drop the GitHub URL unless it is verified. Then add the missing schema types:
  - `WebSite` node (with `@id`, `name`, `publisher` → the Person).
  - `BreadcrumbList` on each case study (`Home → Works → Teaure`).
  - `CreativeWork` or `Article` per case study, with `author` → the Person `@id`, plus `datePublished` and `image`.
  - `knowsAbout` on the `Person` node, listing the actual skills already enumerated in [AboutSection.tsx](src/components/AboutSection.tsx) (UI design, UX research, React, Next.js, WebGL, Three.js, Framer Motion).

### C4. Creative Ants is thin content, indexable, and flagged as unfinished

- **Impact:** Medium (P2)
- **Evidence:** 226 server-rendered words. The homepage refuses to link to it and shows a "work in progress" popup instead ([FeaturedWorksSection.tsx:236](src/components/FeaturedWorksSection.tsx#L236)), yet it is prerendered, indexable, and in the sitemap at `priority: 0.8`.
- **Why it matters:** Google's helpful-content assessment is **site-wide**. On a four-page site, one thin page is 25% of the domain. It can suppress the pages that are genuinely strong.
- **Fix:** As in T2 — either finish it (target 600+ words, matching the Teaure depth) and link to it, or `noindex` it and pull it from the sitemap until it ships. The current middle state is the worst option.

### C5. `llms.txt` carries the same incorrect social URLs

- **Impact:** Low (P3) — AI search / LLM citation accuracy
- **Evidence:** [public/llms.txt](public/llms.txt) is genuinely well-constructed and is an advantage most portfolio sites do not have. But its "Connect" section repeats `github.com/gmmohit`, `linkedin.com/in/gmmohit` and `twitter.com/gmmohit` — the same set as the JSON-LD, including the two incorrect entries from C3.
- **Fix:** Correct the URLs in lockstep with the `sameAs` fix, and add the two case study URLs so AI crawlers can find the actual work. Also add the Bengaluru location, since LLM-driven "find me a designer in X" queries are a growing referral channel.

### C6. Minor AI-writing tells in the primary hero copy

- **Impact:** Low (P3)
- **Evidence:** Per this skill's [AI writing detection reference](.agents/skills/seo-audit/references/ai-writing-detection.md), the em dash is the single most reliable AI marker. The hero paragraph — the most-read sentence on the site, duplicated verbatim into the meta description, the OG description and `llms.txt` — reads:

  > "…design that doesn't just look stunning**—**it performs."

  It stacks two tells at once: an em dash and the `doesn't just X — it Y` construction (which appears twice more in the copy, plus one `isn't just`). Scan across all copy: 18 em dashes, `seamless/seamlessly` ×3, `elevate` ×2, `unlock` ×1.

  Most of those 18 em dashes are fine — they are used as decorative list bullets and separators (`— Emotion requires restraint`, `TEAURE — CONCEPT`), which is a legitimate typographic choice, not a prose tell. The concern is specifically the two in running prose.
- **Fix:** Rewrite the two prose instances. For example: `"…design that performs as well as it looks."` This matters more than usual here because that exact sentence is what Google and LLMs quote as your description.

---

## Prioritised Action Plan

### 1 — Critical: fixes blocking indexation (do today)

| # | Action | File | Effort |
|---|---|---|---|
| 1 | Add self-referencing `alternates.canonical` to all three child pages | `works/teaure/layout.tsx`, `works/creative-ants/layout.tsx`, `privacy-policy/page.tsx` | 10 min |
| 2 | Decide Creative Ants: link it, or `noindex` + remove from sitemap | `FeaturedWorksSection.tsx`, `sitemap.ts` | 15 min |
| 3 | Add `/privacy-policy` to the sitemap; hardcode real `lastmod` dates | `sitemap.ts` | 10 min |

**Verify after deploy** — all four should return distinct canonicals:
```bash
for u in / /works/teaure /works/creative-ants /privacy-policy; do
  echo "-- $u"; curl -sS "https://www.gmmohit.com$u" | grep -oE '<link rel="canonical"[^>]*>'
done
```
Then request re-indexing for all four URLs in Search Console.

### 2 — High impact: Core Web Vitals (this week)

| # | Action | Effort |
|---|---|---|
| 4 | Add `Cache-Control` headers for `/public` in `next.config.ts` (T4) | 20 min |
| 5 | Add `poster` + `preload="none"` to every `<video>` (T3) | 1 hr |
| 6 | Re-encode all videos; 38 MB → under 2 MB each (T3) | 2 hr |
| 7 | Un-gate the LCP hero image from the preloader; drop `delay: 2` (T5) | 1–2 hr |
| 8 | Convert the five raw `<img>` on the Teaure page to `next/image` (O7) | 30 min |

Re-measure with PageSpeed Insights (mobile) before and after — target LCP < 2.5 s, INP < 200 ms, CLS < 0.1.

### 3 — Quick wins (this week)

| # | Action | Effort |
|---|---|---|
| 9 | Fix Twitter Card inheritance on case studies (O1) | 15 min |
| 10 | Correct `sameAs` URLs in JSON-LD **and** `llms.txt` (C3, C5) | 15 min |
| 11 | Add `address` + `areaServed` to the `ProfessionalService` node (C2) | 15 min |
| 12 | Change the `PageTransition` `h2` to a non-heading element (O4) | 5 min |
| 13 | Remove the duplicate `<main>` (O10) | 5 min |
| 14 | Export a proper 1200×630 OG image for each case study (O3) | 30 min |
| 15 | Rewrite the two em-dash prose instances in the hero copy (C6) | 10 min |
| 16 | Delete ~50 MB of unreferenced assets from `/public` (see appendix) | 10 min |
| 17 | Set the apex→www redirect to Permanent 308 in Vercel (T6) | 5 min |

### 4 — Structural: unlock non-brand traffic (next 4–8 weeks)

| # | Action | Effort |
|---|---|---|
| 18 | Build a `/works` index page with `BreadcrumbList` schema (C1) | 1 day |
| 19 | Add `WebSite`, `BreadcrumbList` and per-case-study `CreativeWork` schema (C3) | 3 hr |
| 20 | Make the visible hero headline the `h1` (O5); make the Teaure `h1` descriptive (O6) | 1 hr |
| 21 | Split services into three dedicated pages (C1) | 2 days |
| 22 | Finish the Creative Ants case study to Teaure depth (C4) | 2 days |
| 23 | Publish 3–5 process/opinion articles (C1) | ongoing |
| 24 | Consolidate GSAP + Framer Motion; lazy-load `AsciiTorus` / `CursorTrail` (T8) | 1 day |
| 25 | Rewrite all generic alt text; rename media files to descriptive slugs (O8, O9) | 2 hr |

### 5 — Measurement (set up first, so the work above is attributable)

- **Verify the property in Google Search Console** (both `www` and apex) and submit the sitemap. Nothing in this report can be confirmed as fixed without it — Coverage will show exactly how many URLs are currently sitting in *"Duplicate, Google chose different canonical"* from T1.
- **Add Bing Webmaster Tools** — cheap, and Bing now feeds ChatGPT/Copilot search.
- **Add privacy-first analytics** (Plausible or Vercel Analytics). The privacy policy already discloses analytics use, but none is currently installed.
- **Baseline now:** record impressions, clicks and average position before shipping, so the canonical fix's effect is measurable. Expect indexation recovery to take 2–4 weeks after the fix.

---

## Appendix A — Unreferenced assets in `/public`

Roughly **50 MB** of media is committed but referenced nowhere in `src/`. These do not slow page loads (they are never requested), but they bloat the repository and every deployment.

```
 38.66 MB  public/works/teaure/teaure-scroll.mp4      <-- superseded by "teaure-scroll v2.mp4"
  3.02 MB  public/works/teaure/referencevideo.mp4
  2.69 MB  public/assets/Image - About.jpg
  2.54 MB  public/works/teaure/Insights3.png
  0.78 MB  public/works/teaure/teaure_brand_texture.png
  0.78 MB  public/assets/teaure_brand_texture.png     <-- duplicate of the above
  0.74 MB  public/works/teaure/teaure_hero_macro.png
  0.59 MB  public/works/teaure/floatingUI Element(left).png
  0.52 MB  public/works/teaure/Homepage UI.png
  0.15 MB  public/assets/behance-header-cover-tall.png
  0.09 MB  public/assets/behance-header-cover.png
  0.06 MB  public/assets/x-header-cover.png
  0.06 MB  public/assets/linkedin-header-cover.png
```

The four `*-header-cover*.png` files are social profile banners rather than site assets — they belong in a design archive, not in `/public` where they are publicly served and crawlable.

## Appendix B — Audit method and coverage

- **Static analysis:** all 34 components and 8 route files in `src/`.
- **Build verification:** clean `npx next build` (exit 0, 9/9 static pages), then direct inspection of `.next/server/app/*.html`. Reading the prerendered HTML rather than a `web_fetch` conversion is what allowed the JSON-LD, canonical tags and heading order to be verified reliably — per this skill's schema-detection guidance, `web_fetch`/`curl`-to-markdown strips `<script>` tags and cannot see structured data.
- **Live verification:** `curl` against production for status codes, redirect chains, response headers, compression, `robots.txt`, `sitemap.xml`, and the deployed canonical tags. Local build output and the live homepage were byte-identical (71,298 bytes), confirming the audited build matches production.
- **Index check:** web search for brand and site terms.

**Not covered — requires access this audit did not have:**

- **Google Search Console data** — actual index coverage, the precise count of URLs affected by T1, query/impression data, and the Core Web Vitals field report. This is the single most valuable missing input; grant access and the T1 damage can be quantified exactly.
- **Field Core Web Vitals (CrUX)** — all performance findings here are derived from measured asset sizes and render-blocking logic, not from lab or field measurement. Run PageSpeed Insights on mobile for `/` and `/works/teaure` to get numbers.
- **Backlink profile** — no Ahrefs/Semrush access, so authority and referring domains are unassessed.
- **Competitor gap analysis** — not performed; would need agreed target keywords first.
