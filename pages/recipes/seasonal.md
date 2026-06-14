---
layout: layouts/grid-nohero.njk
title: Seasonal Favourites
class: recipes
description: "Get into our summer recipes, full of colour, flavour, and spice! The perfect way to cool down or heat up any day!"
date: 2023-01-01
permalink: "/recipes/seasonal/"

subtitle: "Get into our summer recipes, full of colour, flavour, and spice! The perfect way to cool down or heat up any day!"

eleventyNavigation:
  key: Seasonal
  parent: Recipes
  noLink: true
  order: 8
---

{% set postslist = collections['Summer'] | reverse  %} 
{% include "components/postlist/postslist-recipes-4-wide.njk" %}
