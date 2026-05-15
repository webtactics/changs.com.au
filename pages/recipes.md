---
layout: layouts/grid-default.njk
title: Recipes - Chang's Authentic Asian Cooking
description: Chang’s Authentic Big Cookbook (Chang’s ABC!) has heaps of easy Asian meal ideas to try at home. Our Authentic Big Cookbook is bursting at the spine – just like you’d be if you were full of that many tasty Chang’s dishes!
date: 2023-04-19
permalink: /recipes/
eleventyNavigation:
  key: Recipes
  order: 3
---

{% set postslist = collections['Recipes']  %} 
{% include "components/postslist-products-4-wide.njk" %}