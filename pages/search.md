---
layout: layouts/grid-nohero.njk
title: Search
metatitle: Search - Chang's Authentic Asian Cooking
description: Search Chang's Flavours of Asia
date: 2026-06-12
class: search
permalink: /search/
eleventyExcludeFromCollections: true
---

<div class="pad8rem"></div>

<div id="search"></div>

<link href="/pagefind/pagefind-ui.css" rel="stylesheet">
<script src="/pagefind/pagefind-ui.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    new PagefindUI({ element: "#search", showSubResults: true, showImages: false });
    const query = new URLSearchParams(window.location.search).get('q');
    if (query) {
      const input = document.querySelector('#search .pagefind-ui__search-input');
      if (input) {
        input.value = query;
        input.dispatchEvent(new Event('input'));
      }
    }
  });
</script>
