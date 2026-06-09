#!/usr/bin/env python3
"""Add product tags to recipe markdown files based on Chang's product links in ingredients."""

import os
import re
import glob

RECIPES_DIR = os.path.join(os.path.dirname(__file__), "recipes")

def extract_product_tags_from_content(content):
    """Extract Chang's product tag names from product links in the recipe content."""
    # Find all title attributes from Chang's product links
    titles = re.findall(r'href="/products/[^"]+"\s*(?:target="[^"]*"\s*)?(?:rel="[^"]*"\s*)?>([^<]+)</a>', content)
    # Also try the other order: title first
    titles += re.findall(r'title="(Chang\'s [^"]+)"', content)

    tags = set()
    for title in titles:
        title = title.strip()
        if not title.startswith("Chang's "):
            continue
        # Strip "Chang's " prefix
        tag = title[len("Chang's "):]
        # Normalize whitespace
        tag = " ".join(tag.split())
        # Remove size suffixes like "(280ml)", "(150ml)" etc.
        tag = re.sub(r'\s*\(\d+ml\)\s*$', '', tag).strip()
        # Fix known typo
        tag = tag.replace("Soy Sauce Lighte", "Soy Sauce Light")
        if tag:
            tags.add(tag)
    return tags


def get_existing_tags(content):
    """Extract existing tags from the YAML frontmatter."""
    # Match the tags section
    tags_match = re.search(r'^tags:\s*\n((?:\s+-\s+"[^"]*"\s*\n)*)', content, re.MULTILINE)
    if not tags_match:
        return set()
    tags_block = tags_match.group(1)
    tags = re.findall(r'^\s+-\s+"([^"]+)"', tags_block, re.MULTILINE)
    return set(tags)


def add_tags_to_file(filepath, new_tags):
    """Add missing product tags to the end of the tags section."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    existing = get_existing_tags(content)
    missing = sorted(new_tags - existing)

    if not missing:
        return False

    # Find the end of the tags section (just before closing ---)
    # The tags section ends either at a blank line followed by --- or at ---
    # We need to insert after the last tag entry

    # Find the tags block and append to it
    # Pattern: find last tag line and insert after it
    tags_section = re.search(r'(^tags:\s*\n(?:\s+-\s+"[^"]*"\s*\n)*)', content, re.MULTILINE)
    if not tags_section:
        print(f"  WARNING: no tags section found in {os.path.basename(filepath)}")
        return False

    tags_block = tags_section.group(1)
    new_lines = "".join(f'  - "{t}"\n' for t in missing)
    new_tags_block = tags_block + new_lines

    new_content = content[:tags_section.start()] + new_tags_block + content[tags_section.end():]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    return True


def process_recipes():
    files = sorted(glob.glob(os.path.join(RECIPES_DIR, "*.md")))
    updated = 0
    skipped = 0

    for filepath in files:
        name = os.path.basename(filepath)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        product_tags = extract_product_tags_from_content(content)
        if not product_tags:
            skipped += 1
            continue

        existing = get_existing_tags(content)
        missing = product_tags - existing
        if not missing:
            skipped += 1
            continue

        print(f"{name}: adding {sorted(missing)}")
        if add_tags_to_file(filepath, product_tags):
            updated += 1

    print(f"\nDone: {updated} files updated, {skipped} files unchanged.")


if __name__ == "__main__":
    process_recipes()
