---
layout: layouts/grid-nohero.njk
title: Chang's Quick and Easy Recipes
class: recipes
description: Our Quick and Easy Recipes section has heaps of easy Asian meal ideas to try at home!
date: 2023-01-04
permalink: "/recipes/quick-and-easy/"
eleventyNavigation:
  key: Quick and Easy
  parent: Recipes

subtitle: "Don’t we all want it quick and easy? Here you can discover delectable Asian flavours with our collection of Quick and Easy Recipes. Perfect for every day!"
---
{% set postslist = collections['Quick and Easy'] | reverse  %} 
{% include "components/postslist-recipes-4-wide.njk" %}
