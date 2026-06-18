const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'recipes');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

// Logical order: main ingredient (nav order) -> dish type (nav order) -> lifestyle/occasion -> season -> Chang's products (alpha, always last)
const order = [
  // Main ingredient
  'Beef', 'Lamb', 'Pork', 'Poultry', 'Chicken', 'Duck', 'Turkey', 'Seafood', 'Noodles', 'Vegetarian', 'Vegetables',
  // Dish type
  'Starters', 'Dinner for One', 'Dinner for Two', 'Light Bites', 'Light Meals', 'Main Meals',
  'Soup and Salad', 'Soups', 'Salad', 'Sides', 'Noodles Style', 'Noodles Ingredient', 'Stir-Fry',
  'Finger Food', 'BBQ', 'Summer BBQ', 'Sweet Treats', 'Scary Sweets',
  // Lifestyle / occasion
  'Healthy Meals', 'Quick and Easy', 'Slow Cooking', 'Entertaining', 'Family Dinners',
  'Kid Friendly', 'Kids', 'Lunch', 'Occasions', 'Special Occasion', 'Sunday Feasts',
  'Festive', 'Christmas', 'Chinese New Year', 'Easter',
  'Dairy Free', 'Gluten-Free', 'Gluten Free Variation', 'Wheat Free', 'Nut Free', 'Protein',
  // Season
  'Spring', 'Summer', 'Autumn', 'Winter',
];

const rankOf = (tag) => {
  const idx = order.indexOf(tag);
  if (idx !== -1) return idx;
  if (/^chang/i.test(tag)) return 10000; // Chang's products bucket, always last
  return 5000; // unknown tag -> placed after lifestyle/season, before products
};

function stripQuotes(val) {
  let s = val.trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1);
  }
  return s;
}

let changedFiles = [];
let unknownTags = new Set();
let skipped = [];

for (const file of files) {
  const filePath = path.join(dir, file);
  const text = fs.readFileSync(filePath, 'utf8');
  const eol = text.includes('\r\n') ? '\r\n' : '\n';

  const fmEndMatch = text.match(/^---\r?\n[\s\S]*?\r?\n---/);
  if (!fmEndMatch) { skipped.push(file + ' (no frontmatter)'); continue; }

  const lines = text.split(/\r?\n/);

  // find closing '---' line index (second occurrence of a line that is exactly '---')
  let fmCloseIdx = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') { fmCloseIdx = i; break; }
  }
  if (fmCloseIdx === -1) { skipped.push(file + ' (no fm close)'); continue; }

  let tagsLineIdx = -1;
  for (let i = 1; i < fmCloseIdx; i++) {
    if (/^tags:\s*$/.test(lines[i])) { tagsLineIdx = i; break; }
  }
  if (tagsLineIdx === -1) { skipped.push(file + ' (no tags key)'); continue; }

  let end = tagsLineIdx + 1;
  const itemLineIdxs = [];
  while (end < fmCloseIdx) {
    const l = lines[end];
    if (/^[ \t]*-[ \t]+.+$/.test(l)) {
      itemLineIdxs.push(end);
      end++;
    } else if (l.trim() === '') {
      end++; // skip blank line, but don't count as item
    } else {
      break;
    }
  }

  if (itemLineIdxs.length === 0) { skipped.push(file + ' (empty tags block)'); continue; }

  const items = itemLineIdxs.map(idx => {
    const line = lines[idx];
    const m = line.match(/^([ \t]*-[ \t]+)(.*)$/);
    const value = stripQuotes(m[2]);
    return { line, value };
  });

  const sorted = items
    .map((item, i) => ({ item, i, rank: rankOf(item.value) }))
    .sort((a, b) => {
      if (a.rank !== b.rank) return a.rank - b.rank;
      if (a.rank === 10000) return a.item.value.localeCompare(b.item.value);
      return a.i - b.i;
    })
    .map(x => x.item);

  items.forEach(it => { if (rankOf(it.value) === 5000) unknownTags.add(it.value); });

  const originalOrderLines = itemLineIdxs.map(idx => lines[idx]);
  const newOrderLines = sorted.map(x => x.line);

  const sameOrder = originalOrderLines.length === newOrderLines.length &&
    originalOrderLines.every((l, i) => l === newOrderLines[i]);

  // Rebuild the region [tagsLineIdx+1, end) with new order, no blank lines
  const newLines = lines.slice();
  newLines.splice(tagsLineIdx + 1, end - (tagsLineIdx + 1), ...newOrderLines);

  const hadBlankLines = (end - (tagsLineIdx + 1)) !== itemLineIdxs.length;

  if (sameOrder && !hadBlankLines) continue;

  const newText = newLines.join(eol);
  fs.writeFileSync(filePath, newText, 'utf8');
  changedFiles.push(file);
}

console.log('Total files:', files.length);
console.log('Changed files:', changedFiles.length);
console.log('Skipped:', skipped);
console.log('Unknown tags encountered (placed before products, kept relative order):', [...unknownTags].sort());
