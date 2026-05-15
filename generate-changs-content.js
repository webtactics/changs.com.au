#!/usr/bin/env node
/**
 * Generate Eleventy markdown files from CMSMS-exported JSON data.
 *
 * Run:  node generate-changs-content.js
 *
 * Output:
 *   recipes/{slug}.md         — all published recipes
 *   products/noodles/*.md
 *   products/sauces/*.md
 *   products/tamari/*.md
 *   products/gluten-free/*.md
 *   products/range/*.md       — anything uncategorised
 */

const fs   = require('fs');
const path = require('path');

// Base URLs for images on the live CMSMS site.
// Replace with ImageKit URLs once images are migrated.
// Recipe images: uploads/cgblog/id{id}/{filename}  — built per-recipe using r.id
const PRODUCT_IMAGE_BASE = '/static/img/products/';

// ─── product lookup (used to link product names in recipe ingredients) ───────

const _prodData = JSON.parse(fs.readFileSync('_data/products.json', 'utf8'));

function _titleCase(s) {
  return s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('-');
}
function _normSlug(s) {
  const tc = _titleCase(s);
  return /^changs-/i.test(s) ? tc : `Changs-${tc}`;
}
function _stripSize(s) {
  return s.replace(/-\d+\s*(ml|g|l|kg)$/i, '');
}
function _escAttr(s) {
  return s.replace(/"/g, '&quot;');
}

const _bySlug = new Map();
const _prodList = [];
// Patterns for plain-text product name matching (longest title first)
const _textPatterns = [];

for (const p of _prodData) {
  if (!p.slug) continue;
  const slug  = _normSlug(p.slug);
  const entry = { title: p.title, slug };
  _bySlug.set(slug.toLowerCase(), entry);
  _bySlug.set(p.slug.toLowerCase(), entry);
  const words = new Set(slug.toLowerCase().split('-').filter(w => w && w !== 'changs'));
  _prodList.push({ ...entry, words });

  // Product titles are plain words — spaces made optional so "Long Life" matches "Longlife"
  const titlePat = p.title.split(" ").join("\\s*");
  const changsRe = "Chang(?:&rsquo;|[\\u2018\\u2019’])?s\\s+";
  const re = new RegExp(changsRe + titlePat, "gi");
  _textPatterns.push({ re, title: p.title, slug });
}
_textPatterns.sort((a, b) => b.title.length - a.title.length); // longest first

// Aliases: old or alternative product names → current slug + canonical title
const ALIASES = [
  { pattern: "Oriental\\s*Asian\\s*Salad\\s*Dressing", title: "Crispy Noodle Salad Dressing",      slug: "Changs-Crispy-Noodle-Salad-Dressing" },
  { pattern: "Oriental\\s*Salad\\s*Dressing",          title: "Crispy Noodle Salad Dressing",      slug: "Changs-Crispy-Noodle-Salad-Dressing" },
  { pattern: "Pure\\s*Sesame\\s*Oil",                  title: "Sesame Oil",                         slug: "Changs-Sesame-Oil" },
  { pattern: "Light\\s*Soy\\s*Sauce",                  title: "Gluten Free Tamari Light Soy Sauce", slug: "Changs-Tamari-Light-Soy-Sauce" },
  { pattern: "Rice\\s*Vermicelli\\s*Noodles",          title: "Vermicelli Rice Noodles",            slug: "Changs-Vermicelli-Rice-Noodles" },
  { pattern: "Hokkien\\s*Noodles",                     title: "Hokkien Noodles",                    slug: "Changs-Shelf-Fresh-Noodles-Hokkien-Style" },
  { pattern: "Egg\\s*Noodles",                         title: "Egg Noodles",                        slug: "Changs-Egg-Noodles" },
  { pattern: "Chinese\\s*Master\\s*Stock",             title: "Master Stock",                       slug: "Changs-Master-Stock" },
  { pattern: "Chinese\\s*Masterstock",                 title: "Master Stock",                       slug: "Changs-Master-Stock" },
  { pattern: "Masterstock",                            title: "Master Stock",                       slug: "Changs-Master-Stock" },
];
const changsPrefix = "Chang(?:&rsquo;|[\\u2018\\u2019'])?s\\s+";
for (const a of ALIASES) {
  _textPatterns.push({
    re:    new RegExp(changsPrefix + a.pattern, "gi"),
    title: a.title,
    slug:  a.slug,
  });
}

/** Replace plain-text "Chang's X" mentions with links, skipping existing <a> tags */
function linkPlainText(html) {
  if (!html) return html;
  // Split into linked / unlinked segments
  const segments = [];
  let last = 0;
  const aTag = /<a\b[^>]*>[\s\S]*?<\/a>/gi;
  let m;
  while ((m = aTag.exec(html)) !== null) {
    segments.push({ t: html.slice(last, m.index), linked: false });
    segments.push({ t: m[0], linked: true });
    last = m.index + m[0].length;
  }
  segments.push({ t: html.slice(last), linked: false });

  return segments.map(seg => {
    if (seg.linked) return seg.t;
    let text = seg.t;
    for (const { re, title, slug } of _textPatterns) {
      text = text.replace(re, () => {
        const label = `Chang's ${title}`;
        const t = _escAttr(label);
        return `<a href="/products/${slug}/" title="${t}" alt="${t}">${label}</a>`;
      });
    }
    return text;
  }).join('');
}

function findProduct(templateName) {
  const variants = [
    templateName,
    _stripSize(templateName),
    `Changs-${templateName}`,
    `Changs-${_stripSize(templateName)}`,
  ];
  for (const v of variants) {
    const hit = _bySlug.get(v.toLowerCase());
    if (hit) return hit;
  }
  // Word-overlap fallback: ≥75% of product's words must appear in template name
  const tWords = new Set(templateName.toLowerCase().split('-').filter(w => w && w !== 'changs'));
  let best = null, bestScore = 0;
  for (const p of _prodList) {
    const overlap = [...p.words].filter(w => tWords.has(w)).length;
    const score   = overlap / p.words.size;
    if (score > bestScore && score >= 0.75) { bestScore = score; best = p; }
  }
  return best;
}

// ─── helpers ────────────────────────────────────────────────────────────────

/** Replace CMSMS Smarty tags with product links, then link plain-text mentions */
function stripSmarty(html) {
  if (!html) return '';
  const result = html
    .replace(/\{include file='cms_template:([^']+)'\}/g, (_, name) => {
      const prod = findProduct(name);
      if (prod) {
        const label = `Chang's ${prod.title}`;
        const t = _escAttr(label);
        return `<a href="/products/${prod.slug}/" title="${t}" alt="${t}">${label}</a>`;
      }
      return `<em>${name.replace(/-/g, ' ')}</em>`;
    })
    .replace(/\{[^}]+\}/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/ +/g, ' ')
    .trim();
  return linkPlainText(result);
}

/** Always double-quote strings so any character is safe in YAML */
function yamlVal(v) {
  if (v === null || v === undefined || v === '') return '""';
  if (typeof v === 'boolean' || typeof v === 'number') return String(v);
  return JSON.stringify(String(v));
}

/** Strip <p> tags and &nbsp; from plain-text frontmatter fields */
function cleanHtml(s) {
  if (!s) return '';
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/<\/?(p|div|br|h[1-6])[^>]*>/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(filePath, content) {
  mkdirp(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('  wrote', filePath);
}

// ─── RECIPES ────────────────────────────────────────────────────────────────

const recipes = JSON.parse(fs.readFileSync('_data/recipes.json', 'utf8'));
let recipeCount = 0;

for (const r of recipes) {
  if (!r.slug) continue;

  const recipeImgBase = "/static/img/recipes/" + r.slug + "/";
  const image        = r.image        ? recipeImgBase + r.image        : '';
  const summaryimage = r.summaryimage ? recipeImgBase + r.summaryimage : '';

  // Extra category tags (on top of the "Recipes" tag from recipes.json)
  const extraTags = r.categories.filter(Boolean);

  const ingredients = stripSmarty(r.ingredients);
  const method      = stripSmarty(r.method);

  // Indent a multiline HTML string for a YAML block scalar (|)
  const yamlBlock = (html) => html.split('\n').map(l => '  ' + l).join('\n');

  let fm = '---\n';
  fm += `title: ${yamlVal(r.title)}\n`;
  fm += `status: published\n`;
  fm += `date: ${r.date.split(' ')[0]}\n`;
  fm += `description: ${yamlVal(r.metadescription || r.summary || r.title)}\n`;
  fm += `permalink: "/recipes/${r.slug}/"\n`;
  fm += `image: ${yamlVal(image)}\n`;
  if (summaryimage) fm += `summaryimage: ${yamlVal(summaryimage)}\n`;
  if (r.serves)     fm += `serves: ${yamlVal(r.serves)}\n`;
  if (r.makes)      fm += `makes: ${yamlVal(r.makes)}\n`;
  if (r.prep)       fm += `preptime: ${yamlVal(r.prep)}\n`;
  if (r.cooking)    fm += `cookingtime: ${yamlVal(r.cooking)}\n`;
  if (r.marinating) fm += `marinating: ${yamlVal(r.marinating)}\n`;
  if (r.difficulty) fm += `difficulty: ${yamlVal(r.difficulty)}\n`;
  if (r.allergen)   fm += `allergen: ${yamlVal(r.allergen)}\n`;
  if (r.author)     fm += `author: ${yamlVal(r.author)}\n`;
  if (r.youtube)    fm += `youtube: ${yamlVal(r.youtube)}\n`;
  if (r.gallery)    fm += `gallery: ${yamlVal(r.gallery)}\n`;
  if (ingredients)  fm += `ingredients: |\n${yamlBlock(ingredients)}\n`;
  if (method)       fm += `method: |\n${yamlBlock(method)}\n`;
  if (extraTags.length) {
    fm += `tags:\n${extraTags.map(t => `  - ${yamlVal(t)}`).join('\n')}\n`;
  }
  fm += '---\n';

  writeFile(path.join('recipes', `${r.slug}.md`), fm);
  recipeCount++;
}

console.log(`\n✓ ${recipeCount} recipes generated\n`);

// ─── PRODUCTS ───────────────────────────────────────────────────────────────

const products = JSON.parse(fs.readFileSync('_data/products.json', 'utf8'));
let productCount = 0;

// Map CMSMS product categories to a subfolder.
// Only 'Noodles' and 'Sauces'-type categories determine the folder;
// 'Gluten Free', retailer tags etc. are tags only — not folder selectors.
const FOLDER_MAP = {
  'Noodles':      'noodles',
  'Sauces':       'sauces',
  'Tamari':       'sauces',
  'Master Stock': 'sauces',
};

// Fallback: guess from product name if no category matched
function folderFromName(name) {
  return /noodle|vermicelli|ramen|soba|hokkien|lo-cal/i.test(name) ? 'noodles' : 'sauces';
}

for (const prod of products) {
  if (!prod.slug) continue;

  // Ensure filename and permalink always start with Changs- with each word capitalised
  const titleCase = s => s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('-');
  const slug = /^changs-/i.test(prod.slug)
    ? titleCase(prod.slug)
    : `Changs-${titleCase(prod.slug)}`;

  const prodImgBase = "/static/img/products/" + slug + "/";
  const image    = prod.image    ? prodImgBase + prod.image    : '';
  const sumimage = prod.sumimage ? prodImgBase + prod.sumimage : '';

  // Pick subfolder from explicit category map; fall back to name-based guess
  let subfolder = '';
  for (const cat of prod.categories) {
    if (FOLDER_MAP[cat]) { subfolder = FOLDER_MAP[cat]; break; }
  }
  if (!subfolder) subfolder = folderFromName(prod.title);

  // Map exported nutrition keys → names the existing post-products.njk template expects
  const n  = prod.nutrition;
  const nu = {};
  if (n.serving_size)    nu.servingsize                         = n.serving_size;
  if (n.servings)        nu.servingsperpackage                   = n.servings;
  if (n.energy_serving)  nu.EnergyAvgQuantityPerServing          = n.energy_serving;
  if (n.energy_100g)     nu.EnergyAvgQuantityPer100g             = n.energy_100g;
  if (n.protein_serving) nu.ProteinAvgQuantityPerServing         = n.protein_serving;
  if (n.protein_100g)    nu.ProteinAvgQuantityPer100g            = n.protein_100g;
  if (n.fat_serving)     nu.FatAvgQuantityPerServing             = n.fat_serving;
  if (n.fat_100g)        nu.FatAvgQuantityPer100g                = n.fat_100g;
  if (n.sat_serving)     nu.FatSaturatedAvgQuantityPerServing    = n.sat_serving;
  if (n.sat_100g)        nu.FatSaturatedAvgQuantityPer100g       = n.sat_100g;
  if (n.carb_serving)    nu.CarbohydratesAvgQuantityPerServing   = n.carb_serving;
  if (n.carb_100g)       nu.CarbohydratesAvgQuantityPer100g      = n.carb_100g;
  if (n.sugar_serving)   nu.SugarsAvgQuantityPerServing          = n.sugar_serving;
  if (n.sugar_100g)      nu.SugarsAvgQuantityPer100g             = n.sugar_100g;
  if (n.sodium_serving)  nu.SodiumAvgQuantityPerServing          = n.sodium_serving;
  if (n.sodium_100g)     nu.SodiumAvgQuantityPer100g             = n.sodium_100g;

  const extraTags = prod.categories.filter(Boolean);

  let fm = '---\n';
  fm += `title: ${yamlVal(prod.title)}\n`;
  fm += `status: published\n`;
  fm += `date: ${new Date().toISOString().split('T')[0]}\n`;
  fm += `description: ${yamlVal(cleanHtml(prod.summary || prod.title))}\n`;
  fm += `permalink: "/products/${slug}/"\n`;
  fm += `image: ${yamlVal(image)}\n`;
  if (sumimage)           fm += `sumimage: ${yamlVal(sumimage)}\n`;
  if (prod.prodsize)      fm += `prodsize: ${yamlVal(prod.prodsize)}\n`;
  if (prod.packsizes)     fm += `packsizes: ${yamlVal(prod.packsizes)}\n`;
  if (prod.gluten_free)   fm += `gluten_free: true\n`;
  if (prod.gtin)          fm += `gtin: ${yamlVal(prod.gtin)}\n`;
  if (prod.allergen)      fm += `allergen: ${yamlVal(cleanHtml(prod.allergen))}\n`;
  if (prod.ingredients)   fm += `ingredients: ${yamlVal(cleanHtml(prod.ingredients))}\n`;
  if (prod.halal)         fm += `halal: ${yamlVal(prod.halal)}\n`;
  if (prod.kosher)        fm += `kosher: ${yamlVal(prod.kosher)}\n`;
  if (prod.origin)        fm += `origin: ${yamlVal(prod.origin)}\n`;
  if (prod.stockists.coles_link)      fm += `coleslink: ${yamlVal(prod.stockists.coles_link)}\n`;
  if (prod.stockists.woolworths_link) fm += `woolworthslink: ${yamlVal(prod.stockists.woolworths_link)}\n`;
  if (prod.stockists.iga_link)        fm += `igalink: ${yamlVal(prod.stockists.iga_link)}\n`;

  if (Object.keys(nu).length) {
    fm += 'nutrition:\n';
    for (const [k, v] of Object.entries(nu)) {
      fm += `  ${k}: ${yamlVal(v)}\n`;
    }
  }

  if (extraTags.length) {
    fm += `tags:\n${extraTags.map(t => `  - ${yamlVal(t)}`).join('\n')}\n`;
  }
  fm += '---\n\n';

  const body = cleanHtml(prod.description || '');
  writeFile(path.join('products', subfolder, `${slug}.md`), fm + body);
  productCount++;
}

console.log(`\n✓ ${productCount} products generated\n`);
console.log('Done. Next steps:');
console.log('  1. Update RECIPE_IMAGE_BASE / PRODUCT_IMAGE_BASE once images are on ImageKit');
console.log('  2. Update post-recipes.njk title line (currently says "PMFresh\'s...")');
console.log('  3. Run: npx @11ty/eleventy --serve to preview');
