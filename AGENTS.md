# jorgecostamacia.github.io — working in this repo

The personal site of Jorge Costa Maciá: one static page built with Astro and published to GitHub Pages at `https://jorgecostamacia.github.io`. It says who he is, what he works with, and links his open-source libraries and tools.

## What never goes on the site

- **No employer, client or past company is named**, nor anything that hints at one (a product, a domain, a data type they handle). The site speaks of skills and of his own open-source work only.
- No personal data beyond the name and the public profiles already linked (GitHub, LinkedIn, NuGet, the VS Code Marketplace).

## Layout

- `src/data/site.ts` — everything the site says: `person`, `profiles`, `stack`, `libraries`, `tools`. Adding a library is one entry there, not new markup.
- `src/pages/` — `index.astro` composes the components; `404.astro` is the not-found page (`noindex`, which GitHub Pages serves with status 404).
- `src/layouts/Base.astro` — the document: the head (title, description, canonical, Open Graph and Twitter metadata with the preview image, the `Person` JSON-LD), the skip link, the global styles.
- `src/components/` — `Hero`, `Section`, `StackList`, `ProjectList`, `ProjectCard`, `SiteFooter`, each with its own scoped `<style>`.
- `src/styles/` — `tokens.css` (every colour and size as a custom property, with the dark values under `prefers-color-scheme: dark`) and `base.css` (the reset and base styles, inside `:where()`).
- `src/assets/projects/` — each project's icon, copied from its own repository, reached through `src/lib/project-icon.ts`: an eager `import.meta.glob`, so an unknown name fails the build.
- `assets/` — `social-preview.svg` and its `social-preview.png` render: the README's banner, and the link-card image the layout builds with `getImage`.
- `public/` — only what needs a fixed URL: `favicon.svg`, `robots.txt`.
- `scripts/llms.mjs` — run by `pnpm build` after `astro build`: writes `llms.txt` and `llms-full.txt` from the built HTML, skipping `noindex` pages.
- `astro.config.mjs` — `site` (every absolute URL comes from it), the output shape, the CSP and the sitemap.

## How it is built — the `astro` skill

The site follows the **`astro` skill**; what it applies here, and what it does not:

- Static output, `trailingSlash: 'never'`, `build.format: 'file'`: every page is `route.html`, which GitHub Pages serves at `/route`. The canonical URL strips `(/index)?.html`.
- Scoped CSS with `scopedStyleStrategy: 'where'`, stylesheets as files (`inlineStylesheets: 'never'`), no `define:vars`, no inline style.
- No client script and no inline code: the only `is:inline` is the JSON-LD block, with `<` escaped.
- A strict CSP from `security.csp`, every directive `'self'`: the site loads nothing from another origin. A third party would come with its origins behind an environment variable, as the skill describes.
- No web fonts: the system font stack. Images through `astro:assets`, with `width` and `height`, lazy below the fold; a raster icon generated at 1x and 2x of its 48px box.
- SEO: title, description, canonical, Open Graph and Twitter with the preview image, `Person` JSON-LD with the public profiles (no address, no phone: a person, not a business), `@astrojs/sitemap`, `robots.txt`, a `noindex` 404, `llms.txt`.
- Accessibility: one `h1`, headings in order, the landmarks, a skip link, a visible `:focus-visible`.
- **Not applicable**: redirects and the server's headers (GitHub Pages sets its own, and a site cannot add `frame-ancestors` or HSTS there), configuration variables and the hidden review build (nothing to configure, no review host), languages (English only), content collections (no posts).
- **Not done yet**: the axe audit and the content link tests, both worth adding if the site grows beyond one page. After a change, check the built site, not the dev server, which applies no CSP: `pnpm build && pnpm preview`, then the browser console.

## The colours

The family's palette, the same as the libraries' icons and social previews: navy `#2A3850` → `#1A2433`, gold `#E0A22B`, dark `#0B0F17`, light `#F3F7FC`. A new colour is a new token in `tokens.css`, never a literal in a rule.

## The social preview

`assets/social-preview.svg` is the source. After changing it, render the PNG at 1280×640: the README shows it and the build turns it into the link-card image.

```sh
chrome --headless=new --hide-scrollbars --window-size=1280,640 --screenshot=assets/social-preview.png assets/social-preview.svg
```

The same PNG is the repository's social preview on GitHub (Settings > General > Social preview), uploaded by hand.

## Toolchain

- **pnpm 12** with the supply-chain baseline (`pnpm-workspace.yaml`: a three-day `minimumReleaseAge`, `allowBuilds`, no exotic sub-dependencies), `packageManager` pinned, Node 26 through `devEngines`.
- Prettier at 120 columns, single quotes, `proseWrap: never`, with the Astro plugin. `pnpm format` before committing; `pnpm format:check` is in the gate.
- `pnpm check` (`astro check`, strict TypeScript) and `pnpm build`.

## CI / publishing

One workflow, `.github/workflows/deploy.yml`. On `develop`, on a pull request and on `main` it runs install (frozen lockfile), `format:check`, `check` and `build`; on a push to `main` it also uploads `dist` and deploys it in the `github-pages` environment, so the repository's Deployments list every version linked to the site. Pages is set to build from GitHub Actions. There are no versions or releases: a push to `main` is a publish.

## Branching — GitFlow

Use the **`gitflow` skill** for any branch work. Work goes to `develop` through feature/bugfix branches (`--no-ff --no-edit`); `main` only receives finished work, and every push to it publishes the site.

## Git etiquette

- Commit under **your own identity** — don't hardcode anyone's name/email.
- **No** `Co-Authored-By` / AI-assistant trailers in commits or messages.
- Never `git push`: give the user the command.

## Relevant skills

From `jorgecostamacia-agent-skills`:

- **`astro`** — how a static Astro site is built and served: configuration, URLs, styles, metadata, images and fonts.
- **`pnpm`** — the toolchain and its supply-chain baseline, and the Prettier options every Node repo shares.
- **`gitflow`** — all branch work.
- **`code-style-md`** — how every `.md` here is written: one paragraph per line, never wrapped by hand.
- **`solid`** — when the page grows into components.

## Build

```sh
pnpm install
pnpm dev            # http://localhost:4321
pnpm format:check
pnpm check
pnpm build          # into dist/
```
