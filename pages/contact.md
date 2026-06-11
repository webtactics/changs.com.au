---
layout: layouts/grid-nohero.njk
title: We’d love to hear from you!
description: "If you have any questions about our products or stockists, if you are interested in stocking Chang's products or if you have an idea for a new Chang's product, please email or call us."
date: 2026-06-10
class: contact
permalink: /contact/
eleventyNavigation:
  key: Contact
  hide: true


subtitle: "If you have any questions about our products or stockists, if you are interested in stocking Chang's products or if you have an idea for a new Chang's product, please email or call us."
---

{% set postslist = collections['Recipes'] | reverse  %} 
{% include "components/postslist-recipes-4-wide.njk" %}