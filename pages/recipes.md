---
layout: layouts/grid-nohero.njk
title: Chang's Recipes Section
description: Chang’s Authentic Big Cookbook (Chang’s ABC!) has heaps of easy Asian meal ideas to try at home. Our Authentic Big Cookbook is bursting at the spine – just like you’d be if you were full of that many tasty Chang’s dishes!
date: 2026-06-10
class: recipes
permalink: /recipes/
eleventyNavigation:
  key: Recipes
  order: 2


subtitle: We have literally hundreds of authentic Asian and modern Australian meal ideas to try at home. Make sure you bring your appetite!
---

{% set postslist = collections['Recipes'] | reverse  %} 
{% include "components/postlist/postslist-recipes-4-wide.njk" %}