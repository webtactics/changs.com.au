---
layout: layouts/grid-default.njk
title: Changs Noodle Products
class: products
metaDescription: All the noodles you will ever need or want to create authentic Asian cuisine to serve up in so many ways.
date: 2023-01-01
permalink: "/products/noodles/"
eleventyNavigation:
  key: Noodles
  parent: Products
  order: 1
---
All the noodles you will ever need or want to create authentic Asian cuisine to serve up in so many ways.

{% set postslist = collections['Products'] | intersection(collections['Noodles']) %}
{% include "components/postslist-products-4-wide.njk" %}




