---
layout: layouts/grid-nohero.njk
title: Chicken Recipes
class: recipes
description: "Discover why chicken recipes reign supreme! From family to feast! Versatile, nutritious, and loved worldwide, explore our popular dishes for a delicious culinary adventure."
date: 2023-01-04
permalink: "recipes/main-ingredient/poultry-recipes/chicken/"

subtitle: "Discover why chicken recipes reign supreme! From family to feast! Versatile, nutritious, and loved worldwide, explore our popular dishes for a delicious culinary adventure."

eleventyNavigation:
  key: Chicken
  parent: Poultry
  order: 1
---

{% set postslist = collections['Chicken'] | intersection(collections['Recipes']) | reverse %}
{% include "components/postlist/postslist-recipes-4-wide.njk" %}
