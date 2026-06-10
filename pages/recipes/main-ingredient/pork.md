---
layout: layouts/grid-nohero.njk
title: Chang's Pork Recipes
class: recipes
description: "We love pork! We also love our pork recipes, that encourage you to explore the savory world of pork recipes. From spicy stir-fries to tender roasts, delight your taste buds with Chang’s creations."
date: 2023-01-04
permalink: "recipes/main-ingredient/pork/"
eleventyNavigation:
  key: Pork
  parent: Main Ingredient
  order: 3

subtitle: "We love pork! We also love our pork recipes, that encourage you to explore the savory world of pork recipes. From spicy stir-fries to tender roasts, delight your taste buds with Chang’s creations."
  
---
{% set postslist = collections['Pork'] | reverse  %} 
{% include "components/postslist-recipes-4-wide.njk" %}


