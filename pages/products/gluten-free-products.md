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
<div class="glutenbox text-center blackh2">
<h2>Chang's has a great range of gluten free and <a href="/products/tamari-wheat-free-sauces/">wheat free (tamari) products</a> options just for you!</h2>

<p class="text-center">If you would like more information about Chang’s Gluten Free products and <a title="Gluten Free recipes" href="/recipes/gluten-free-recipes/">recipes</a>, please see our <a title="Gluten Free information page" href="/gluten-free/">Gluten Free information page</a> for more details.</p>
</div>


{% set postslist = collections['Products'] | intersection(collections['Gluten Free Product']) | sortAlphabetically("title") %}
{% include "components/postlist/postslist-products-4-wide.njk" %}


