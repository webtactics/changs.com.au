---
layout: layouts/grid-nohero.njk
title: Chang's Desserts & Sweet Treats!
class: recipes
description: "Oh, come on, a little fun won’t hurt. Not just for the kids."
date: 2023-01-04
permalink: "/recipes/desserts/"
eleventyNavigation:
  key: Desserts
  parent: Recipes

subtitle: "Oh, come on, a little fun won’t hurt. Not just for the kids."
---

{% set postslist = collections['Sweet treats'] | union(collections['Scary Sweets']) %}
{% include "components/postslist-recipes-4-wide.njk" %}

Sweet treats
