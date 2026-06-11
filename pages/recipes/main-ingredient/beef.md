---
layout: layouts/grid-nohero.njk
title: Chang's Beef Recipes
class: recipes
description: Tamari is a Japanese sauce made from fermented soybeans. Use ours to create authentic Asian cuisine to serve up in so many ways!
date: 2023-01-04
permalink: "recipes/main-ingredient/beef/"


subtitle: "Discover the rich and savory world of beef with our collection of delicious recipes. From hearty stews to sizzling stir-fries, explore a variety of dishes that showcase the versatility of beef in every bite."


eleventyNavigation:
  key: Beef
  parent: Main Ingredient
  order: 1
  
---
{% set postslist = collections['Beef'] | reverse  %} 
{% include "components/postlist/postslist-recipes-4-wide.njk" %}


{% for post in collections.Beef %}
<h3>Beef</h3>
    <a href="{{ page.url }}">{{ post.data.title }}</a>
{% endfor %}

