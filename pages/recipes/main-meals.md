---
layout: layouts/grid-nohero.njk
title: Main Meals
class: recipes
description: "Create memorable main meals in a snap! Explore our collection of satisfying recipes for delicious Asian-inspired dishes."
date: 2023-01-04
permalink: "/recipes/main-meals/"
eleventyNavigation:
  key: Main Meals
  parent: Recipes
  order: 6

subtitle: "Create memorable main meals in a snap! Explore our collection of satisfying recipes for delicious Asian-inspired dishes."
---
{% set postslist = collections['Main Meals'] | intersection(collections['Recipes']) | reverse %}
{% include "components/postlist/postslist-recipes-4-wide.njk" %}
