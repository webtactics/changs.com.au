---
layout: layouts/grid-nohero.njk
title: Healthy Meals
class: recipes
description: "Nourish your body with wholesome, balanced meals packed with nutrients and flavor. Explore our array of healthy recipes designed to fuel your well-being and satisfy your palate."
date: 2023-01-04
permalink: "recipes/dish-type/healthy-meals/"

subtitle: "Nourish your body with wholesome, balanced meals packed with nutrients and flavor. Explore our array of healthy recipes designed to fuel your well-being and satisfy your palate."

eleventyNavigation:
  key: Healthy Meals
  parent: Dish Type
  order: 4
---

{% set postslist = collections['Healthy Meals'] | reverse  %} 
{% include "components/postlist/postslist-recipes-4-wide.njk" %}