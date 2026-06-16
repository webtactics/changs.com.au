---
layout: layouts/grid-default.njk
title: Gluten Free Products
class: products
description: Whether you choose to avoid gluten for lifestyle or health reasons, going gluten-free doesn’t mean missing out. Chang’s has a great range of gluten free and wheat free (tamari) products options just for you!
date: 2023-01-03
permalink: "/products/gluten-free-products/"
eleventyNavigation:
  key: Gluten Free
  parent: Products
  order: 3

subtitle: "All our Gluten Free products are independently tested – and don’t worry, even if you see ‘Wheat Starch’ listed as an ingredient, the gluten has been extracted from it. If the label says, ‘Gluten Free’, you can be worry free!"
---
{% set postslist = collections['Products'] | intersection(collections['Gluten Free Product']) | sortAlphabetically("title") %}
{% include "components/postlist/postslist-products-4-wide.njk" %}


