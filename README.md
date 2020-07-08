# baggy

baggy is a proof of concept Google Chrome extension that detects online store promo code areas and applies coupons without using selectors.

## Context

Whether one is looking for product information, order injection, or applying coupons, integrations into eCommerce sites is handled via scraping and "selectors".

Humans usually have to identify elements on a page, build a unique identifier (a selector) that points to that element, and then a piece of code takes those elements and retrieves information or performs an action.

The problem is that building selectors is complicated and that these integrations can silently break. Companies lose millions of dollars per year due to outdated scrapers.

## Solution

baggy is OPTICS clustering + cosine similarity + rules based approach that at its core does three things:

1) identifies that it's on a page where coupon codes can be applied
2) applies coupons
3) identifies the "total due price" and uses it to figure out whether the coupon worked or not by diffing before and after

At 1) it uses cosine sentence similarity and proximity to certain cluster of elements.

At 2) it uses information from the previous step to surface the promo input fields, enter a coupon, and apply the changes.

At 3) it uses OPTICS clustering together with a bunch of assumptions to identify the right node.

This is all supported by a number of features like improved visible text detection and more.

## What it doesn't do

baggy is not a consumer extension, it's a proof of concept. This means it doesn't address a number of things that have been solved or are easily solvable, like:

* page mutations for retailers that have inline cart pages
* trying out multiple coupons
* ensuring that it runs only once per session

Also, while the underlying logic is fast, there are some strong sleep()s after tapping the apply coupon buttons.

## Success rate & Performance

baggy was tested on around 100 stores, with a success rate of around 80%. See TODO for stores with known issues, and ideas on how to fix them (some values could be configurable).

Lastly, while in production there would be a whitelist of domains where baggy runs, during testing it was allowed to run on everywhere for a regular browsing experience with no performance issues. That being said, it's been discovered that for at least two sites, ralphlauren.com and malingoetz.com, there seems to be a bug that causes baggy to freeze the session.

## How to run it

Clone the repo and load the unpacked extension in src/. Try going to macys.com or another online store and the extension should pop up on the cart page.


## Tests

Modifying the code means running tests.

```
node tests/run_tests.js # runs all tests
node tests/run_tests.js tests/stores/oscardelarenta.com-before.json  # runs a specific test
```

To save new test cases use these steps.

If the promo code fields are visible use an extension like 'Save Page WE' or 'SingleFile' to save one html. Otherwise, if a click needs to be issued to make the fields visible, use the 'Save as' functionality of Chrome.

Save that file or files under `tests/stores/` with a format like `websiteurl.com-before.html` (you might need to rename from htm to html).

Then create an empty `websiteurl.com-before.json` file and run `node tests/run_tests.js tests/stores/websiteurl.com-before.json`.

Open the console and find where it says `Test coordinates have been saved in window.baggyCoords, also below.` Take those coords and put them in the .json file. Run `node tests/run_tests.js tests/stores/websiteurl.com-before.json` to make sure it's OK.

Getting coordinates from the puppeteer Chromium ensures things like fonts or other differences won't affect positioning.

## TODOs

See the TODO file for known issues and how to address them.
