---
layout: layouts/grid-nohero.njk
title: Chang's Main Meal Recipes
class: recipes
description: Tamari is a Japanese sauce made from fermented soybeans. Use ours to create authentic Asian cuisine to serve up in so many ways!
date: 2023-01-04
permalink: "/recipes/main-meals/"
eleventyNavigation:
  key: Main Meals
  parent: Recipes
  order: 5

subtitle: "Create memorable main meals in a snap! Explore our collection of satisfying recipes for delicious Asian-inspired dishes."
---
{% set postslist = collections['Main Meals'] | reverse  %} 
{% include "components/postslist-recipes-4-wide.njk" %}
