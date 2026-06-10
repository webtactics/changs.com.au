---
layout: layouts/grid-nohero.njk
title: Chang's Sweet Treats
class: recipes
description: "It’s not just kids who love Sweet Treats! Explore our collection of desserts, perfect for satisfying cravings and adding a touch of sweetness to any occasion."
date: 2023-01-04
permalink: "recipes/dish-type/sweet-treats/"

subtitle: "It’s not just kids who love Sweet Treats! Explore our collection of desserts, perfect for satisfying cravings and adding a touch of sweetness to any occasion."

eleventyNavigation:
  key: Sweet Treats
  parent: Dish Type
  order: 7
---

{% set postslist = collections['Sweet Treats'] | reverse  %} 
{% include "components/postslist-recipes-4-wide.njk" %}