---
layout: layouts/grid-nohero.njk
title: Chang's Beef Recipes
class: recipes
description: "Savor the rich flavours of Asia with our tantalising beef recipes. From stir-fries to noodle bowls, elevate your meals with Chang’s."
date: 2023-01-04
permalink: "recipes/main-ingredient/beef/"


subtitle: "Savor the rich flavours of Asia with our tantalising beef recipes. From stir-fries to noodle bowls, elevate your meals with Chang’s."


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

