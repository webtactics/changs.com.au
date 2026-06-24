---
layout: layouts/grid-nohero.njk
title: Spring Favourites
class: recipes
description: "Embrace the freshness of spring with our favourite seasonal recipes. From vibrant salads to spectacular stir-fry, discover dishes that capture the essence of the season."
date: 2023-01-04
permalink: "recipes/seasonal/spring/"

subtitle: "Embrace the freshness of spring with our favourite seasonal recipes. From vibrant salads to spectacular stir-fry, discover dishes that capture the essence of the season."


---

{% set postslist = collections['Spring'] | intersection(collections['Recipes']) | reverse %}
{% include "components/postlist/postslist-recipes-4-wide.njk" %}
