---
layout: layouts/grid-nohero.njk
title: Scary Sweet Treats
class: recipes
description: "Whip up some frightfully fun desserts with our collection of scary sweet treat recipes. Perfect for Halloween, parties, or just a deliciously creepy snack!"
date: 2023-01-04
permalink: "/recipes/scary-sweet-treats/"

subtitle: "Whip up some frightfully fun desserts with our collection of scary sweet treat recipes. Perfect for Halloween, parties, or just a deliciously creepy snack!"
eleventyExcludeFromCollections: true
---

{% set postslist = collections['Scary Sweets'] | intersection(collections['Recipes']) | reverse %}
{% include "components/postlist/postslist-recipes-4-wide.njk" %}
