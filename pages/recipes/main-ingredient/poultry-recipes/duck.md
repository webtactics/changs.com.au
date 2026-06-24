---
layout: layouts/grid-nohero.njk
title: Duck Recipes
class: recipes
description: "Duck offers a succulent taste experience, rich in flavor and nutrients. Indulge in its tender texture and versatility for a gourmet dining affair."
date: 2023-01-04
permalink: "recipes/main-ingredient/poultry-recipes/duck/"

subtitle: "Duck offers a succulent taste experience, rich in flavor and nutrients. Indulge in its tender texture and versatility for a gourmet dining affair."

eleventyNavigation:
  key: Duck
  parent: Poultry
  order: 2
---

{% set postslist = collections['Duck'] | intersection(collections['Recipes']) | reverse %}
{% include "components/postlist/postslist-recipes-4-wide.njk" %}
