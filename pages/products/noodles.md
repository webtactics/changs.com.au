---
layout: layouts/grid-default.njk
title: Delicious Noodles!
class: products
description: All the noodles you will ever need or want to create authentic Asian cuisine to serve up in so many ways.
date: 2023-01-01
permalink: "/products/noodles/"
eleventyNavigation:
  key: Noodles
  parent: Products
  order: 1

subtitle: "All the noodles you will ever need or want to create authentic Asian and modern Australian cuisine to delight family and friends."
---
{% set postslist = collections['Noodles'] | intersection(collections['Products']) | sortAlphabetically("title") %}
{% include "components/postlist/postslist-products-4-wide.njk" %}
