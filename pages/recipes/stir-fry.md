---
layout: layouts/grid-nohero.njk
title: Stir-fry Recipes
class: recipes
description: "Whip up tantalising stir-fry dishes effortlessly! Explore our collection of Stir-fry Recipes for delicious meals in no time."
date: 2023-01-04
permalink: "/recipes/stir-fry/"
eleventyNavigation:
  key: Stir Fry
  parent: Recipes
  order: 5

subtitle: "Whip up tantalising stir-fry dishes effortlessly! Explore our collection of Stir-fry Recipes for delicious meals in no time."
---
{% set postslist = collections['Stir-Fry'] | reverse  %} 
{% include "components/postlist/postslist-recipes-4-wide.njk" %}
