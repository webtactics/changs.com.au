---
layout: layouts/grid-nohero.njk
title: Chang's Light Bites Recipes
class: recipes
description: "Discover delightful light bites recipes, perfect for snacking or entertaining. Explore our collection of flavourful, yet wholesome dishes to satisfy your cravings without weighing you down."
date: 2023-01-04
permalink: "recipes/dish-type/light-bites/"

subtitle: "Discover delightful light bites recipes, perfect for snacking or entertaining. Explore our collection of flavourful, yet wholesome dishes to satisfy your cravings without weighing you down."

eleventyNavigation:
  key: Light Bites
  parent: Dish Type
  order: 3
---

{% set postslist = collections['Light Meals'] | reverse  %} 
{% include "components/postlist/postslist-recipes-4-wide.njk" %}