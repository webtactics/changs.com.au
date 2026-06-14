---
layout: layouts/grid-nohero.njk
title: Poultry Recipes
class: recipes
description: "Who doesn’t love chicken, turkey, or duck? We certainly do, and our Poultry Recipes section offers something for every occasion, whether you're cooking for a family dinner or entertaining guests."
date: 2023-01-04
permalink: "recipes/main-ingredient/poultry/"
eleventyNavigation:
  key: Poultry
  parent: Main Ingredient
  order: 4

subtitle: "Who doesn’t love chicken, turkey, or duck? We certainly do, and our Poultry Recipes section offers something for every occasion, whether you're cooking for a family dinner or entertaining guests."
  
---
{% set postslist = collections['Poultry'] | reverse  %} 
{% include "components/postlist/postslist-recipes-4-wide.njk" %}