---
layout: layouts/grid-nohero.njk
title: Soup & Salad Recipes
class: recipes
description: "Explore our soup & salad section: a medley of vibrant flavours & textures, offering nourishing recipes for every palate!"
date: 2023-01-02
permalink: "/recipes/soup-salad/"
eleventyNavigation:
  key: Soup & Salad
  parent: Recipes
  order: 2

subtitle: "Explore our soup & salad section: a medley of vibrant flavours & textures, offering nourishing recipes for every palate!"
---
{% set postslist = collections['Soup and Salad'] | reverse  %} 
{% include "components/postslist-recipes-4-wide.njk" %}
