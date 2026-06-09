#!/usr/bin/env node
// Add product tags to recipe markdown files based on Chang's product links in ingredients.

const fs = require('fs');
const path = require('path');

const RECIPES_DIR = path.join(__dirname, 'recipes');

function extractProductTags(content) {
  const tags = new Set();

  // Match <a ... href="/products/..." ... title="Chang's ..."> in any attribute order.
  // We need to find anchors whose href is a /products/ path AND has a Chang's title.
  const anchorRe = /<a\s+[^>]*href="\/products\/[^"]*"[^>]*>/gi;
  let anchor;
  while ((anchor = anchorRe.exec(content)) !== null) {
    const titleMatch = /title="(Chang's [^"]+)"/.exec(anchor[0]);
    if (!titleMatch) continue;

    let tag = titleMatch[1].slice("Chang's ".length).trim();
    // Normalize whitespace
    tag = tag.replace(/\s+/g, ' ').trim();
    // Remove size suffixes like "(280ml)"
    tag = tag.replace(/\s*\(\d+ml\)\s*$/, '').trim();
    // Fix known typos
    tag = tag.replace('Soy Sauce Lighte', 'Soy Sauce Light');
    if (tag) tags.add(tag);
  }

  // Also handle reversed attribute order: title first, then href
  const anchorRe2 = /<a\s+[^>]*title="(Chang's [^"]+)"[^>]*href="\/products\/[^"]*"[^>]*>/gi;
  while ((anchor = anchorRe2.exec(content)) !== null) {
    let tag = anchor[1].slice("Chang's ".length).trim();
    tag = tag.replace(/\s+/g, ' ').trim();
    tag = tag.replace(/\s*\(\d+ml\)\s*$/, '').trim();
    tag = tag.replace('Soy Sauce Lighte', 'Soy Sauce Light');
    if (tag) tags.add(tag);
  }

  return tags;
}

function getExistingTags(content) {
  const existing = new Set();
  // Match the full tags section, allowing for blank lines within it
  const tagsRe = /^tags:\s*\n([\s\S]*?)^---/m;
  const match = tagsRe.exec(content);
  if (!match) return existing;

  const lineRe = /^\s+-\s+"([^"]+)"/gm;
  let m;
  while ((m = lineRe.exec(match[1])) !== null) {
    existing.add(m[1]);
  }
  return existing;
}

function addTagsToFile(filepath, productTags) {
  const content = fs.readFileSync(filepath, 'utf8');
  const existing = getExistingTags(content);
  const missing = [...productTags].filter(t => !existing.has(t)).sort();

  if (missing.length === 0) return false;

  // Find the last tag line in the tags section and insert after it.
  // Use a regex that stops at the closing --- to find the last tag line.
  const tagsBlockRe = /^tags:\s*\n([\s\S]*?)^---/m;
  const blockMatch = tagsBlockRe.exec(content);
  if (!blockMatch) {
    console.log(`  WARNING: no tags section in ${path.basename(filepath)}`);
    return false;
  }

  // Find the position of the last tag line within the block
  const blockStart = blockMatch.index + 'tags:\n'.length;
  const blockContent = blockMatch[1];

  // Find the last tag entry in the block
  const lastTagRe = /^\s+-\s+"[^"]*"\s*\n/gm;
  let lastTagMatch = null;
  let m;
  while ((m = lastTagRe.exec(blockContent)) !== null) {
    lastTagMatch = m;
  }

  if (!lastTagMatch) {
    console.log(`  WARNING: no tag entries found in ${path.basename(filepath)}`);
    return false;
  }

  const insertPos = blockStart + lastTagMatch.index + lastTagMatch[0].length;
  const newLines = missing.map(t => `  - "${t}"\n`).join('');
  const newContent = content.slice(0, insertPos) + newLines + content.slice(insertPos);

  fs.writeFileSync(filepath, newContent, 'utf8');
  return true;
}

const files = fs.readdirSync(RECIPES_DIR)
  .filter(f => f.endsWith('.md'))
  .sort()
  .map(f => path.join(RECIPES_DIR, f));

let updated = 0, skipped = 0;

for (const filepath of files) {
  const name = path.basename(filepath);
  const content = fs.readFileSync(filepath, 'utf8');
  const productTags = extractProductTags(content);

  if (productTags.size === 0) {
    skipped++;
    continue;
  }

  const existing = getExistingTags(content);
  const missing = [...productTags].filter(t => !existing.has(t));

  if (missing.length === 0) {
    skipped++;
    continue;
  }

  console.log(`${name}: adding [${missing.sort().join(', ')}]`);
  if (addTagsToFile(filepath, productTags)) updated++;
}

console.log(`\nDone: ${updated} files updated, ${skipped} files unchanged.`);
