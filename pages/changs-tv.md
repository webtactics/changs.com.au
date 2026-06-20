---
layout: layouts/grid-nohero.njk
title: Great Asian Anyone Can Understand
metatitle: Great Asian Anyone Can Understand - Chang's Authentic Asian Cooking
description: Need some Chang's cooking inspiration? Try our any of our simple recipes or product ideas below.
section: changs-tv
date: 2023-01-01
permalink: /changs-tv/
eleventyNavigation:
  key: Chang's TV
  order: 3

subtitle: "Need some Chang’s cooking inspiration? Try our any of our simple recipes or product ideas below."
---

{% set postslist = collections['Video'] | intersection(collections['Video'])  %}
{% include "components/postlist/postslist-video-3-wide.njk" %}