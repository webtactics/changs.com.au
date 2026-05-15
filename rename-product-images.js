#!/usr/bin/env node
/**
 * Rename static/img/products/product_{id}/ folders to static/img/products/{slug}/
 * Run: node rename-product-images.js
 */

const fs   = require('fs');
const path = require('path');

const products = require('./_data/products.json');
const IMG_DIR  = path.join(__dirname, 'static', 'img', 'products');

function titleCase(s) {
  return s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('-');
}
function normSlug(s) {
  const tc = titleCase(s);
  return /^changs-/i.test(s) ? tc : 'Changs-' + tc;
}

// Build id → slug map
const idToSlug = new Map();
for (const p of products) {
  if (p.id && p.slug) idToSlug.set(String(p.id), normSlug(p.slug));
}

let moved = 0, skipped = 0;

for (const entry of fs.readdirSync(IMG_DIR)) {
  const match = entry.match(/^product_(\d+)$/);
  if (!match) continue;

  const id   = match[1];
  const slug = idToSlug.get(id);

  if (!slug) {
    console.log('  skip product_' + id + ' — no matching product');
    skipped++;
    continue;
  }

  const srcPath  = path.join(IMG_DIR, entry);
  const destPath = path.join(IMG_DIR, slug);
  fs.mkdirSync(destPath, { recursive: true });

  for (const file of fs.readdirSync(srcPath)) {
    const srcFile  = path.join(srcPath, file);
    const destFile = path.join(destPath, file);
    if (fs.statSync(srcFile).isFile()) {
      fs.copyFileSync(srcFile, destFile);
    }
  }

  console.log('  product_' + id + ' → ' + slug);
  moved++;
}

console.log('\n✓ ' + moved + ' folders moved to static/img/products/{slug}/');
if (skipped) console.log('  ' + skipped + ' product_ folders had no matching product');
