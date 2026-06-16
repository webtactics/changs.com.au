---
layout: layouts/grid-default.njk
title: Japanese Tamari Sauces
class: products
description: Tamari is a Japanese sauce made from fermented soybeans. Use ours to create authentic Asian cuisine to serve up in so many ways!
date: 2023-01-04
permalink: "/products/tamari-wheat-free-sauces/"
eleventyNavigation:
  key: Tamari
  parent: Products
  order: 4

subtitle: "Traditional soy sauce typically contains wheat, whilst Tamari is a wider class of soy sauce and is made from fermented soybeans and no (or very little) wheat."
---
{% set postslist = collections['Products'] | intersection(collections['Tamari']) | sortAlphabetically("title") %}
{% include "components/postlist/postslist-products-4-wide.njk" %}


