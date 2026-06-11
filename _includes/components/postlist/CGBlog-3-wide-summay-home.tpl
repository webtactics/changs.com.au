<!-- Start CGBlog Display Template -->
{if isset($error)}{cgerror}{$error}{/cgerror}{/if}
  <div class="grid-3-recipes-home recipessummary">

{foreach from=$items item=entry}
<div class="recipesummarypage">
<div class="CGBlogSummary">

<div class="CGBlogSummaryField">
<a href="{$entry->detail_url}" title="{$entry->title|escape:htmlall}">
{if $entry->fields.summaryimage->value}
<img src="https://ik.imagekit.io/webtactics/changs/tr:w-500,h-333/{$entry->fields.summaryimage->value}" alt="{$entry->title|escape:htmlall} recipe from Changs" title="{$entry->title|escape:htmlall} recipe from Changs" width="500px" height="333px" class="postlistimg"/>{else}
<img src="https://ik.imagekit.io/webtactics/changs-media/tr:w-500,h-333/recipes/cgblog/id{$entry->id}/{$entry->fields.image->value}" alt="{$entry->title|escape:htmlall} recipe from Changs" title="{$entry->title|escape:htmlall} recipe from Changs" width="500px" height="333px" class="postlistimg"/>{/if}<span class="image-overlay">
<span class="overlay-home">
{if $entry->fields.metadescription->value}
<div class="sumdescription">
<p>{eval var=$entry->fields.metadescription->value}</p>
</div>
{/if}
{if $entry->fields.Serves->value}
<div class="servesprepdif">
<p><span class="blogsumhomered">Serves: </span>{eval var=$entry->fields.Serves->value}</p>
</div>
{/if}
{if $entry->fields.Makes->value}
<div class="servesprepdif">
<p><span class="blogsumhomered">Makes: </span>{eval var=$entry->fields.Makes->value}</p>
</div>
{/if}
{if $entry->fields.Prep->value}
<div class="servesprepdif">
<p><span class="blogsumhomered">Prep time: </span>{eval var=$entry->fields.Prep->value}</p>
</div>
{/if}
{if $entry->fields.Cooking->value}
    <div class="servesprepdif">
    <p><span class="blogsumhomered">Cooking time: </span>{eval var=$entry->fields.Cooking->value}</p>
    </div>
    {/if}
{if $entry->fields.Marinating->value}
<div class="servesprepdif">
<p><span class="blogsumhomered">Marinating time: </span>{eval var=$entry->fields.Marinating->value}</p>
</div>
{/if}
{if $entry->fields.Difficulty->value}
<div class="servesprepdif">
<p><span class="blogsumhomered">Difficulty: </span>{eval var=$entry->fields.Difficulty->value}</p>
</div>
{/if}
</span>
</span>     
        </a>
        
     </div>
  


<div class="CGBlogSummaryLink">
<h3><a href="{$entry->detail_url}" title="{$entry->title|escape:htmlall}">{$entry->title|escape}</a></h3>
</div>

</div>
</div>
{/foreach}
  </div>



<!-- End CGBlog Display Template -->