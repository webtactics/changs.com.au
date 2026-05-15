#!/usr/bin/env node
/**
 * Download product images from changs.com into static/img/products/{slug}/
 * Run: node download-product-images.js
 */

const fs    = require('fs');
const path  = require('path');
const https = require('https');

const products  = require('./_data/products.json');
const DEST_ROOT = path.join(__dirname, 'static', 'img', 'products');

// Known source paths on changs.com — tries each in order until one returns 200
const SOURCE_BASES = [
  'https://www.changs.com/uploads/images/products/',
  'https://www.changs.com/uploads/images/Products/',
  'https://www.changs.com/uploads/images/',
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, res => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(true); });
      } else {
        file.close();
        fs.unlinkSync(dest);
        resolve(false);
      }
    }).on('error', err => {
      file.close();
      try { fs.unlinkSync(dest); } catch(_) {}
      reject(err);
    });
  });
}

async function run() {
  let ok = 0, failed = [];

  for (const prod of products) {
    if (!prod.image || !prod.slug) continue;

    // Normalise slug to title-case with Changs- prefix (matches generator logic)
    const slug = prod.slug;
    const dir  = path.join(DEST_ROOT, slug);
    fs.mkdirSync(dir, { recursive: true });

    const dest = path.join(dir, prod.image);
    if (fs.existsSync(dest)) {
      console.log('  exists  ', slug + '/' + prod.image);
      ok++;
      continue;
    }

    let downloaded = false;
    for (const base of SOURCE_BASES) {
      try {
        downloaded = await download(base + prod.image, dest);
        if (downloaded) {
          console.log('  ok      ', base + prod.image);
          ok++;
          break;
        }
      } catch (e) { /* try next base */ }
    }

    if (!downloaded) {
      console.log('  MISSING ', prod.image);
      failed.push({ title: prod.title, image: prod.image });
    }

    // Also download summary image if present
    if (prod.sumimage) {
      const sdest = path.join(dir, prod.sumimage);
      if (!fs.existsSync(sdest)) {
        for (const base of SOURCE_BASES) {
          try {
            const got = await download(base + prod.sumimage, sdest);
            if (got) { console.log('  ok sum  ', prod.sumimage); break; }
          } catch (e) {}
        }
      }
    }
  }

  console.log('\n✓ ' + ok + ' images downloaded');
  if (failed.length) {
    console.log('\nFailed (' + failed.length + ') — check paths manually:');
    failed.forEach(f => console.log('  ' + f.title + ': ' + f.image));
  }
}

run();
