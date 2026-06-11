---
layout: layouts/grid-nohero.njk
title: Chang's Seafood Recipes
class: recipes
description: "Thinking seafood recipes, think, Chang’s Seafood Recipes, with all you need to create authentic Asian cuisine."
date: 2023-01-04
permalink: "recipes/main-ingredient/seafood/"
eleventyNavigation:
  key: Seafood
  parent: Main Ingredient
  order: 5

subtitle: "Thinking seafood recipes, think, Chang’s Seafood Recipes, with all you need to create authentic Asian cuisine."
  
---
{% set postslist = collections['Seafood'] | reverse  %} 
{% include "components/postlist/postslist-recipes-4-wide.njk" %}