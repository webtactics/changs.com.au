---
layout: layouts/grid-nohero.njk
title: Chang's Stir Fry Recipes
class: recipes
description: Tamari is a Japanese sauce made from fermented soybeans. Use ours to create authentic Asian cuisine to serve up in so many ways!
date: 2023-01-04
permalink: "/recipes/stir-fry/"
eleventyNavigation:
  key: Stir Fry
  parent: Recipes

subtitle: "Whip up tantalising stir-fry dishes effortlessly! Explore our collection of Stir-fry Recipes for delicious meals in no time."
---
{% set postslist = collections['Stir-Fry'] | reverse  %} 
{% include "components/postslist-recipes-4-wide.njk" %}
