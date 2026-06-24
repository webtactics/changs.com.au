---
layout: layouts/grid-nohero.njk
title: Summer Sizzlers
class: recipes
description: "Beat the heat (or bring it on!), with our summer sizzlers! Explore a sizzling array of seasonal recipes perfect for grilling, chilling, and enjoying under the sun."
date: 2023-01-04
permalink: "recipes/seasonal/summer/"

subtitle: "Beat the heat (or bring it on!), with our summer sizzlers! Explore a sizzling array of seasonal recipes perfect for grilling, chilling, and enjoying under the sun."


---

{% set postslist = collections['Summer'] | intersection(collections['Recipes']) | reverse %} 
{% include "components/postlist/postslist-recipes-4-wide.njk" %}
