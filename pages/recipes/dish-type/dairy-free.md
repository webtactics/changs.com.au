---
layout: layouts/grid-nohero.njk
title: Dairy free recipes
class: recipes
description: "Explore our dairy-free recipes for delicious alternatives without compromising taste. Dairy free does not mean dull!."
date: 2023-01-04
permalink: "recipes/dish-type/dairy-free/"

subtitle: "Explore our dairy-free recipes for delicious alternatives without compromising taste. Dairy free does not mean dull!"

eleventyNavigation:
  key: Dairy-Free
  parent: Dish Type
  order: 5
---

{% set postslist = collections['Dairy Free'] | reverse  %} 
{% include "components/postlist/postslist-recipes-4-wide.njk" %}