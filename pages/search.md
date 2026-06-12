---
layout: layouts/grid-nohero.njk
title: Search Results
metatitle: Search - Chang's Authentic Asian Cooking
description: "We hope you enjoy exploring our collection of authentic Asian products and recipes. If you have any questions or need assistance, please don't hesitate to contact us. Happy cooking!"
date: 2026-06-12
class: search
permalink: /search/
eleventyExcludeFromCollections: true


subtitle: "We hope you enjoy exploring our collection of authentic Asian products and recipes. If you have any questions or need assistance, please don't hesitate to contact us. Happy cooking!"
---
<div id="search"></div>

<link href="/pagefind/pagefind-ui.css" rel="stylesheet">
<script src="/pagefind/pagefind-ui.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    new PagefindUI({ element: "#search", showSubResults: true, showImages: false, pageSize: 15 });
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
