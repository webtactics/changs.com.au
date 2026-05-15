#!/usr/bin/env node
/**
 * Rename static/img/cgblog/id{n}/ folders to static/img/recipes/{slug}/
 * Run: node rename-recipe-images.js
 */

const fs   = require('fs');
const path = require('path');

const recipes  = require('./_data/recipes.json');
const SRC_DIR  = path.join(__dirname, 'static', 'img', 'cgblog');
const DEST_DIR = path.join(__dirname, 'static', 'img', 'recipes');

// Build id → slug map
const idToSlug = new Map();
for (const r of recipes) {
  if (r.id && r.slug) idToSlug.set(String(r.id), r.slug);
}

fs.mkdirSync(DEST_DIR, { recursive: true });

let moved = 0, skipped = 0;

for (const entry of fs.readdirSync(SRC_DIR)) {
  const match = entry.match(/^id(\d+)$/);
  if (!match) continue;

  const id   = match[1];
  const slug = idToSlug.get(id);

  if (!slug) {
    console.log(`  skip id${id} — no matching recipe`);
    skipped++;
    continue;
  }

  const srcPath  = path.join(SRC_DIR, entry);
  const destPath = path.join(DEST_DIR, slug);

  fs.mkdirSync(destPath, { recursive: true });

  // Move all files from id folder into slug folder
  for (const file of fs.readdirSync(srcPath)) {
    const srcFile  = path.join(srcPath, file);
    const destFile = path.join(destPath, file);
    if (fs.statSync(srcFile).isFile()) {
      fs.copyFileSync(srcFile, destFile);
    }
  }

  console.log(`  id${id} → ${slug}`);
  moved++;
}

console.log(`\n✓ ${moved} folders moved to static/img/recipes/`);
console.log(`  ${skipped} id folders had no matching recipe (ignored)`);
