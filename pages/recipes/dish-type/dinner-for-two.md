---
layout: layouts/grid-nohero.njk
title: Dinner for two
class: recipes
description: "Create an intimate dining experience with our delectable dinner for two recipes. From romantic classics to adventurous dishes, savour every moment together. Or don’t and just make something simple – we have you covered either way!"
date: 2023-01-04
permalink: "recipes/dish-type/dinner-for-two/"

subtitle: "Create an intimate dining experience with our delectable dinner for two recipes. From romantic classics to adventurous dishes, savour every moment together. Or don’t and just make something simple – we have you covered either way!"

eleventyNavigation:
  key: Dinner for Two
  parent: Dish Type
  order: 2
---

{% set postslist = collections['Dinner for Two'] | reverse  %} 
{% include "components/postlist/postslist-recipes-4-wide.njk" %}