---
layout: layouts/grid-nohero.njk
title: "Main Ingredient Section"
class: recipes
description: "Our Main Ingredient section highlights key components, helping to guide you towards recipes containing available or desired ingredients."
date: 2023-01-01
permalink: "/recipes/main-ingredient/"
eleventyNavigation:
  key: Main Ingredient
  parent: Recipes
  noLink: true
  order: 1

subtitle: "Our Main Ingredient section highlights key components, helping to guide you towards recipes containing available or desired ingredients."
---
{% set postslist = collections['Recipes'] | reverse  %} 
{% include "components/postlist/postslist-recipes-4-wide.njk" %}