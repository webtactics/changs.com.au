---
layout: layouts/grid-nohero.njk
title: Noodles Recipes
class: recipes
description: "All the noodles you will ever need or want to create authentic Asian and modern Australian cuisine to delight family and friends."
date: 2023-01-04
permalink: "recipes/main-ingredient/noodles/"
eleventyNavigation:
  key: Noodles
  parent: Main Ingredient
  order: 6

subtitle: "All the noodles you will ever need or want to create authentic Asian and modern Australian cuisine to delight family and friends."
  
---
{% set postslist = collections['Noodles Ingredient'] | intersection(collections['Recipes']) | reverse %}
{% include "components/postlist/postslist-recipes-4-wide.njk" %}