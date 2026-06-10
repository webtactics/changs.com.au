---
layout: layouts/grid-nohero.njk
title: Chang's BBQ Recipes
class: recipes
description: "Fire up the BBQ and savour the flavour with our mouthwatering BBQ recipes. Elevate your outdoor dining experience with our irresistible dishes."
date: 2023-01-04
permalink: "recipes/dish-type/bbq/"

subtitle: "Fire up the BBQ and savour the flavour with our mouthwatering BBQ recipes. Elevate your outdoor dining experience with our irresistible dishes."

eleventyNavigation:
  key: BBQ
  parent: Dish Type
---

{% set postslist = collections['BBQ'] | reverse  %} 
{% include "components/postslist-recipes-4-wide.njk" %}