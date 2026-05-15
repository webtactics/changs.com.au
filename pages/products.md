---
layout: layouts/grid-products.njk
title: Range of Products.
subtitle: Supplying to the catering and food service industries.

description: Discover our wide range of delicious, fresh, conveniently prepared foods - Primo Moraitis Fresh
image: https://ik.imagekit.io/webtactics/pmfresh/img/1920x953/our-products-banner-1920x953_of7owdzm3.jpg

rightimage: https://ik.imagekit.io/webtactics/pmfresh/img/products/categories/our-suppliers-bg-1920x953_Nbap_qtFC.jpg

products: products

ctatitle: What’s in Season.
ctatext: We have long standing relationships with many of our growers. We bring the best in freshest quality Australian produce.
ctalink: /products/whats-in-season/
ctaimage: https://ik.imagekit.io/webtactics/pmfresh/img/products/categories/green-leaves-on-black-1920x953_24XsCLUFf.jpg

section: products
class: products
date: 2025-11-07
permalink: /products/
metadata:
  title: Our Range of Products.
eleventyNavigation:
  key: Products
  order: 1
---

{% set postslist = collections['Products']  %} 
{% include "components/postslist-products-4-wide.njk" %}

