// Writes dist/llms.txt and dist/llms-full.txt from the built HTML, after `astro build`: what the site says, as
// Markdown, for language models. Pages marked noindex are left out.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

const entities = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", '#x27': "'", nbsp: ' ' };
const decode = (s) => s.replace(/&(amp|lt|gt|quot|#39|#x27|nbsp);/g, (_, e) => entities[e]);
const strip = (s) =>
  decode(s.replace(/<[^>]+>/g, ''))
    .replace(/\s+/g, ' ')
    .trim();
const attr = (html, pattern) => decode(html.match(pattern)?.[1] ?? '');

function toMarkdown(html) {
  return decode(
    html
      .replace(/<(script|style)[\s\S]*?<\/\1>/g, '')
      // A list item that holds a card is a section of its own, under its heading, not a bullet.
      .replace(/<li[^>]*>\s*(?=<article)/g, '\n')
      .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/g, (_, level, text) => `\n\n${'#'.repeat(+level)} ${strip(text)}\n\n`)
      .replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, (_, href, text) => `[${strip(text)}](${href})`)
      .replace(/\)\s*\[/g, ') · [')
      .replace(/<(li|dt)[^>]*>/g, '\n- ')
      .replace(/<dd[^>]*>/g, ': ')
      .replace(/<\/(p|ul|dl|section|article|header)>/g, '\n')
      .replace(/<[^>]+>/g, ''),
  )
    .split('\n')
    .map((line) => line.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const files = (await readdir(dist, { recursive: true })).filter((f) => f.endsWith('.html')).sort();

const pages = [];
for (const file of files) {
  const html = await readFile(join(dist, file), 'utf8');
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) {
    continue;
  }

  const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/)?.[1] ?? '';
  pages.push({
    title: strip(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? file),
    description: attr(html, /<meta name="description" content="([^"]*)"/),
    url: attr(html, /<link rel="canonical" href="([^"]*)"/),
    text: toMarkdown(body.replace(/<a class="skip-link"[\s\S]*?<\/a>/, '').replace(/<footer[\s\S]*?<\/footer>/, '')),
  });
}

const [home] = pages;
const index = [
  `# ${home.title}`,
  `> ${home.description}`,
  '## Pages',
  pages.map((p) => `- [${p.title}](${p.url}): ${p.description}`).join('\n'),
].join('\n\n');
const full = pages.map((p) => `${p.text}\n\nSource: ${p.url}`).join('\n\n---\n\n');

await writeFile(join(dist, 'llms.txt'), `${index}\n`);
await writeFile(join(dist, 'llms-full.txt'), `${full}\n`);
console.log(`llms.txt: ${pages.length} page(s)`);
