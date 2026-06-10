---
layout: layouts/grid-nohero.njk
title: Chang's Main Ingredients Recipes
class: recipes
description: All the noodles you will ever need or want to create authentic Asian cuisine to serve up in so many ways.
date: 2023-01-01
permalink: "/recipes/main-ingredient/"
eleventyNavigation:
  key: Main Ingredient
  parent: Recipes

subtitle: "Our Main Ingredient section highlights key components, helping to guide you towards recipes containing available or desired ingredients."
---

{% set postslist = collections['Recipes'] | reverse  %} 
{% include "components/postslist-recipes-4-wide.njk" %}