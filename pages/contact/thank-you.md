---
title: Thank you for joining Chang's Gang
description: "You’ve just signed up for our (mostly) monthly email newsletter where we share generally easy to make and fun recipe ideas, product news, exclusive competitions and more!"
date: 2017-01-01T00:00:00.000Z


subtitle: "You’ve just signed up for our (mostly) monthly email newsletter where we share generally easy to make and fun recipe ideas, product news, exclusive competitions and more!"

permalink: /contact/thank-you/
parent: Contact
eleventyNavigation:
  hide: true

eleventyExcludeFromCollections: true
---

You’ve just signed up for our (mostly) monthly email newsletter where we share generally easy to make and fun recipe ideas, product news, exclusive competitions and more!

<h3 class="text-center">Latest Recipes</h3>
          
	{% set postslist = collections['Recipes'] | reverse | skip(2) | limit(3) %}
	{% include "components/postlist/postslist-recipes-3-wide-nofadein.njk" %}