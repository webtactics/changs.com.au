---
layout: layouts/grid-nohero.njk
title: Gorgeous Autumn Recipes
class: recipes
description: "Capture the essence of autumn with our Asian-inspired recipes. From cozy noodle soups to aromatic stir-fries, savour the rich flavours, and moods of autumn."
date: 2023-01-04
permalink: "recipes/seasonal/autumn/"

subtitle: "Capture the essence of autumn with our Asian-inspired recipes. From cozy noodle soups to aromatic stir-fries, savour the rich flavours, and moods of autumn."


---

{% set postslist = collections['Autumn'] | intersection(collections['Recipes']) | reverse %}
{% include "components/postlist/postslist-recipes-4-wide.njk" %}
