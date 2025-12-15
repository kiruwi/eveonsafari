#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const LINKS = Array.from(new Set([
  "https://eveonsafari.com/fly-in-out-safari/",
  "https://eveonsafari.com/tanzania-big-5-safari/",
  "https://eveonsafari.com/honeymoon-safari/",
  "https://eveonsafari.com/mountain-gorilla-trekking/",
  "https://eveonsafari.com/tanzania-walking-safaris/",
  "https://eveonsafari.com/the-great-migration-safari/",
  "https://eveonsafari.com/birthday-party-experience/",
  "https://eveonsafari.com/tanzania-photographic-safaris/",
  "https://eveonsafari.com/tanzania-bird-watching-safari/",
  "https://eveonsafari.com/beach-and-holiday-in-africa/",
]));

const strip = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const textBlocks = (html) => {
  const blocks = [];
  const regex = /<(h1|h2|h3|p|li)[^>]*>([\s\S]*?)<\/\1>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const tag = match[1].toLowerCase();
    const text = strip(match[2]);
    if (text.length > 25) blocks.push({ tag, text });
  }
  return blocks;
};

const findBetweenHeadings = (blocks, headingText) => {
  const idx = blocks.findIndex((b) => b.tag.startsWith('h') && b.text.toLowerCase().includes(headingText));
  if (idx === -1) return [];
  const nextHeading = blocks.findIndex((b, i) => i > idx && b.tag.startsWith('h'));
  return blocks.slice(idx + 1, nextHeading === -1 ? undefined : nextHeading).filter((b) => b.tag === 'p' || b.tag === 'li');
};

const firstMatch = (blocks, includes) => {
  const item = blocks.find((b) => b.text.toLowerCase().includes(includes));
  return item ? item.text : null;
};

async function scrape(url) {
  const res = await fetch(url);
  const html = await res.text();
  const blocks = textBlocks(html);

  const titleBlock = blocks.find((b) => b.tag === 'h1') || blocks.find((b) => b.tag === 'h2');
  const title = titleBlock ? titleBlock.text : null;
  const heroIntro = blocks.find((b) => b.tag === 'p')?.text || null;

  const metaSafari = firstMatch(blocks, 'safari type');
  const metaBest = firstMatch(blocks, 'best for');

  const overviewBlocks = findBetweenHeadings(blocks, 'overview').length
    ? findBetweenHeadings(blocks, 'overview')
    : blocks.slice(1, 4);
  const overview = overviewBlocks.map((b) => b.text).join(' ');

  const reasons = findBetweenHeadings(blocks, 'why choose').map((b) => b.text);

  const destinationBlocks = findBetweenHeadings(blocks, 'top');
  const top_destinations = destinationBlocks.map((b) => {
    const parts = b.text.split(/ - |: /);
    return { name: parts[0], summary: parts.slice(1).join(' ') || b.text };
  });

  const addonsBlocks = findBetweenHeadings(blocks, 'optional');
  const optional_addons = addonsBlocks.map((b) => b.text);

  const tipsBlocks = findBetweenHeadings(blocks, 'tips');
  const tips = tipsBlocks.map((b) => b.text);

  const cta_text = blocks.reverse().find((b) => b.tag === 'p')?.text || null;

  const slug = url.replace(/https?:\/\/[^/]+\//, '').replace(/\/$/, '');

  return {
    slug,
    title,
    hero_intro: heroIntro,
    meta: { safari_type: metaSafari, best_for: metaBest },
    overview: overview || null,
    reasons,
    top_destinations,
    optional_addons,
    tips,
    cta_text,
  };
}

(async () => {
  const packages = [];
  for (const link of LINKS) {
    console.log('Scraping', link);
    try {
      packages.push(await scrape(link));
    } catch (err) {
      console.error('Failed', link, err);
    }
  }
  const outPath = path.join(process.cwd(), 'packages.json');
  fs.writeFileSync(outPath, JSON.stringify({ packages }, null, 2));
  console.log('Wrote', outPath);
})();
