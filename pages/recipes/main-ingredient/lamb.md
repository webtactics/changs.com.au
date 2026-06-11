---
layout: layouts/grid-nohero.njk
title: Chang's Lamb Recipes
class: recipes
description: "Australian’s love lamb, and our recipes, noodles and sauces let you try lamb dishes from updates to tradition to completely new ways of looking at lamb."
date: 2023-01-04
permalink: "recipes/main-ingredient/lamb/"
eleventyNavigation:
  key: Lamb
  parent: Main Ingredient
  order: 2

subtitle: "Australian’s love lamb, and our recipes, noodles and sauces let you try lamb dishes from updates to tradition to completely new ways of looking at lamb."
  
---
{% set postslist = collections['Lamb'] | reverse  %} 
{% include "components/postlist/postslist-recipes-4-wide.njk" %}