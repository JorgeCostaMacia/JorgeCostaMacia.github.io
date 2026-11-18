<p align="center">
  <img src="https://raw.githubusercontent.com/JorgeCostaMacia/JorgeCostaMacia.github.io/main/assets/social-preview.png" width="100%" alt="Jorge Costa Maciá" />
</p>

# jorgecostamacia.github.io

> The personal site of Jorge Costa Maciá, published at [jorgecostamacia.github.io](https://jorgecostamacia.github.io): who I am, what I work with, and my open-source libraries and tools.

[![License](https://img.shields.io/badge/license-MIT%20code%20%C2%B7%20content%20reserved-blue.svg)](LICENSE.txt) [![Deploy](https://github.com/JorgeCostaMacia/JorgeCostaMacia.github.io/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/JorgeCostaMacia/JorgeCostaMacia.github.io/actions/workflows/deploy.yml)

A single static page built with [Astro](https://astro.build), installed with pnpm, and published to GitHub Pages by [`deploy.yml`](.github/workflows/deploy.yml) on every push to `main`.

## Requirements

**pnpm 12**. Node 26 is pinned in `package.json`, and pnpm downloads it when it is missing.

## Working on it

```sh
pnpm install
pnpm dev
```

`pnpm format:check`, `pnpm check` and `pnpm build` are what the workflow runs before it publishes. What the site says is in [`src/data/site.ts`](src/data/site.ts), and the projects' icons are in [`src/assets/projects`](src/assets/projects).

Branches follow GitFlow: work goes to `develop`, and a release merged to `main` publishes the site. See [AGENTS.md](AGENTS.md) for how the repository is put together.

## License

The code is MIT; the content (the text, the name and personal details, the images) is all rights reserved. See [LICENSE.txt](LICENSE.txt).

## Contact

- [LinkedIn](https://www.linkedin.com/in/jorge-costa-macia-842817164/)
- [GitHub](https://github.com/JorgeCostaMacia/)
