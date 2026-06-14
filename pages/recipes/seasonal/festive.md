---
layout: layouts/grid-nohero.njk
title: Festive Recipes
class: recipes
description: "Infuse your festivities with Chang’s Asian flair! Explore our vibrant collection of festive recipes inspired by Asian cuisine, adding exotic flavours to your celebrations."
date: 2023-01-04
permalink: "recipes/seasonal/festive/"

subtitle: "Infuse your festivities with Chang’s Asian flair! Explore our vibrant collection of festive recipes inspired by Asian cuisine, adding exotic flavours to your celebrations."

eleventyNavigation:
  key: Festive
  parent: Seasonal
  order: 1
---

{% set postslist = collections['Festive'] | union(collections['Christmas']) | union(collections['Chinese New Year']) | reverse  %} 
{% include "components/postlist/postslist-recipes-4-wide.njk" %}
