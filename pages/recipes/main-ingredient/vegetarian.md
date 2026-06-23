---
layout: layouts/grid-nohero.njk
title: Vegetarian Recipes
class: recipes
description: "Vegetarian doesn’t mean missing out when it comes to taste on our Vegetarian Recipes section! Filled with vegetarian recipes that are nutritious, delicious, quick and simple!"
date: 2023-01-04
permalink: "recipes/main-ingredient/vegetarian/"
eleventyNavigation:
  key: Vegetarian
  parent: Main Ingredient
  order: 7

subtitle: "Vegetarian doesn’t mean missing out when it comes to taste on our Vegetarian Recipes section! Filled with vegetarian recipes that are nutritious, delicious, quick and simple!"
  
---
{% set postslist = collections['Vegetarian'] | intersection(collections['Recipes']) | reverse  %}
{% include "components/postlist/postslist-recipes-4-wide.njk" %}