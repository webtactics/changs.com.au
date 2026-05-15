---
layout: layouts/recipes/recipes-list.njk
title: Chang's Beef Recipes
class: recipes
metaDescription: Tamari is a Japanese sauce made from fermented soybeans. Use ours to create authentic Asian cuisine to serve up in so many ways!
date: 2023-01-04
permalink: "recipes/main-ingredient/beef/"
---



{% for post in collections.Beef %}
<h3>Beef</h3>
    <a href="{{ page.url }}">{{ post.data.title }}</a>
{% endfor %}




