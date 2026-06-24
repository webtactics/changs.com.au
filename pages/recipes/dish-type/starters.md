---
layout: layouts/grid-nohero.njk
title: Starters Recipes
class: recipes
description: "Appetizers, Hors d'oeuvres, Entrées, Antipasti, Starters, Small plates, Tapas, Snacks, Amuse-bouche, Finger foods, Canapés, call them what you will, but start here!"
date: 2023-01-04
permalink: "recipes/dish-type/starters/"

subtitle: "Appetizers, Hors d'oeuvres, Entrées, Antipasti, Starters, Small plates, Tapas, Snacks, Amuse-bouche, Finger foods, Canapés, call them what you will, but start here!"

eleventyNavigation:
  key: Starters
  parent: Dish Type
  order: 1
---

{% set postslist = collections['Starters'] | intersection(collections['Recipes']) | reverse %}
{% include "components/postlist/postslist-recipes-4-wide.njk" %}