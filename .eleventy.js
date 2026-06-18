const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");
const UglifyJS = require("uglify-js");
const htmlmin = require("html-minifier");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const redirectsPlugin = require('eleventy-plugin-redirects');

module.exports = function (eleventyConfig) {
  // Eleventy Navigation Plugin
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);


// 👇 The custom filter goes here 👇
    eleventyConfig.addFilter("intersection", (arr1, arr2) => {
        // Check if both arrays exist and are non-empty before trying to map/filter
        if (!arr1 || !arr2 || arr1.length === 0 || arr2.length === 0) {
            return [];
        }
        
        // 1. Get the URLs/IDs from the second array
        const arr2_ids = arr2.map(item => item.url);

        // 2. Filter the first array
        return arr1.filter(item => arr2_ids.includes(item.url));
    });

    // Find products whose title matches one of the given tags (e.g. a recipe's product tags).
    // All product tags now start with "Chang's" so we use word-set matching for those:
    // every word in the tag must appear in the product title (e.g. "Chang's Hoisin Sauce"
    // matches "Chang's Original Hoisin Sauce" and "Chang's Tamari Hoisin Sauce").
    // Non-Chang's tags fall back to exact or substring matching (length-gated to prevent
    // short generic tags like "Style" from accidentally matching product titles).
    eleventyConfig.addFilter("productsFromTags", (products, tags) => {
        if (!products || !tags || tags.length === 0) {
            return [];
        }

        const MIN_SUBSTRING_LENGTH = 8;

        return products.filter(product => {
            const titleLower = product.data.title.toLowerCase();
            const titleWords = new Set(titleLower.split(/\s+/));

            return tags.some(tag => {
                const tagLower = tag.toLowerCase();

                // For "Chang's ..." tags use word-set matching: every tag word in title
                if (tagLower.startsWith("chang’s ")) {
                    return tagLower.split(/\s+/).every(word => titleWords.has(word));
                }

                // Exact match
                if (tagLower === titleLower) return true;

                // Substring match for longer specific phrases (avoids single-word false positives)
                if (tagLower.length >= MIN_SUBSTRING_LENGTH && titleLower.length >= MIN_SUBSTRING_LENGTH) {
                    return titleLower.includes(tagLower) || tagLower.includes(titleLower);
                }

                return false;
            });
        });
    });

    // Combine two collections, removing duplicates and sorting by date (newest first)
    eleventyConfig.addFilter("union", (arr1, arr2) => {
        arr1 = arr1 || [];
        arr2 = arr2 || [];

        const seen = new Set();
        return [...arr1, ...arr2]
            .filter(item => {
                if (seen.has(item.url)) return false;
                seen.add(item.url);
                return true;
            })
            .sort((a, b) => b.date - a.date);
    });


  // Add support for maintenance-free post authors
  eleventyConfig.addCollection("authors", (collection) => {
    const blogs = collection.getFilteredByGlob("posts/*.md");
    return blogs.reduce((coll, post) => {
      const author = post.data.author;
      if (!author) {
        return coll;
      }
      if (!coll.hasOwnProperty(author)) {
        coll[author] = [];
      }
      coll[author].push(post.data);
      return coll;
    }, {});
  });

  // Date formatting filters
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  eleventyConfig.addFilter("machineDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  });

  // Minify CSS
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Minify JS
  eleventyConfig.addFilter("jsmin", function (code) {
    let minified = UglifyJS.minify(code);
    if (minified.error) {
      console.log("UglifyJS error: ", minified.error);
      return code;
    }
    return minified.code;
  });


  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);



  // Redirects
  eleventyConfig.addPlugin(redirectsPlugin, {
    template: 'netlify', // netlify, vercel or clientSide
  });

      // limit filter for arrays
eleventyConfig.addFilter("safeSlug", (str) => {
  if (!str) return '';
  return str.replace(/['"]/g, '').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
});

eleventyConfig.addFilter("skip", function (arr, n) {
  if (!Array.isArray(arr)) return [];
  return arr.slice(n);
});

eleventyConfig.addFilter("limit", function (arr, limit) {
  if (!Array.isArray(arr)) {
    return [];
  }
  return arr.slice(0, limit);
});


eleventyConfig.addFilter("exclude", (arr, exclude) => arr.filter(el => el !== exclude));

eleventyConfig.addFilter("sortAlphabetically", (arr, key) => {
  if (!Array.isArray(arr)) return arr;
  return arr.slice().sort((a, b) => {
    const valA = (key ? (a.data?.[key] ?? a[key]) : a) ?? '';
    const valB = (key ? (b.data?.[key] ?? b[key]) : b) ?? '';
    return String(valA).localeCompare(String(valB));
  });
});


eleventyConfig.addFilter("randomLimit", (arr, limit, currPage) => {
  // Filters out current page
  const pageArr = arr.filter((page) => page.url !== currPage);

  // Randomizes remaining items
  pageArr.sort(() => {
    return 0.5 - Math.random();
  });

  // Returns array items up to limit
  return pageArr.slice(0, limit);
});


    // Minify HTML output
    eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
      if (outputPath.indexOf(".html") > -1) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true
        });
        return minified;
      }
      return content;
    });

  // Shuffle / randomize array 
  eleventyConfig.addFilter("shuffle", function(array) {
      // Create a copy of the array to avoid modifying the original
      let shuffledArray = array.slice();

      // Fisher-Yates shuffle algorithm
      for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }

      return shuffledArray;
  });


  // Return sorted image file paths from a local folder (relative to project root)
  eleventyConfig.addFilter("getImagesFromFolder", function(folderPath) {
    const fs = require("fs");
    const path = require("path");
    if (!folderPath) return [];
    const fullPath = path.join(__dirname, folderPath);
    if (!fs.existsSync(fullPath)) return [];
    const cleanFolder = folderPath.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
    // Path relative to static/img/ — mirrors the ImageKit "changs/img/" bucket structure
    const cdnFolder = cleanFolder.replace(/^static\/img\//, "");
    return fs.readdirSync(fullPath)
      .filter(f => /\.(jpe?g|png|webp|gif)$/i.test(f))
      .sort()
      .map(f => ({ url: "/" + cleanFolder + "/" + f, cdn: cdnFolder + "/" + f, name: f }));
  });

  // Layout aliases
  eleventyConfig.addLayoutAlias("default", "layouts/grid-default.njk");
  eleventyConfig.addWatchTarget("./_includes/");

  // Passthrough copies
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("static/img");
  eleventyConfig.addPassthroughCopy("static/fonts");
  eleventyConfig.addPassthroughCopy("static/assets");
  eleventyConfig.addPassthroughCopy("static/results");
  eleventyConfig.addPassthroughCopy("static");
  eleventyConfig.addPassthroughCopy("admin/");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("_includes/assets/css/changs-grid.css");
  eleventyConfig.addPassthroughCopy("_includes/assets/js/script.js");
  eleventyConfig.addPassthroughCopy("lightbox.js");
  eleventyConfig.addPassthroughCopy("slick.min.js");
  eleventyConfig.addPassthroughCopy("assets/js/lightbox.js");
  eleventyConfig.addPassthroughCopy("assets/js/slick.min.js");
  eleventyConfig.addPassthroughCopy("script.js");
  eleventyConfig.addPassthroughCopy("**/*.jpg");



  // Copy any .pdf file to `_site`, via Glob pattern
  // Keeps the same directory structure.
  eleventyConfig.addPassthroughCopy("**/*.pdf");

  // Markdown plugins
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
  };
  let opts = {
    permalink: false,
  };

  eleventyConfig.setLibrary("md", markdownIt(options).use(markdownItAnchor, opts));

  return {
    templateFormats: ["md", "njk", "liquid"],
    pathPrefix: "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
