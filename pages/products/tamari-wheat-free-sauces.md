---
layout: layouts/grid-default.njk
title: Chang's Tamari - Wheat Free Products
class: products
metaDescription: Tamari is a Japanese sauce made from fermented soybeans. Use ours to create authentic Asian cuisine to serve up in so many ways!
date: 2023-01-04
permalink: "/products/tamari-wheat-free-sauces/"
eleventyNavigation:
  key: Tamari
  parent: Products
  order: 4
---
{% set postslist = collections['Products'] | intersection(collections['Tamari']) %}
{% include "components/postslist-products-4-wide.njk" %}


