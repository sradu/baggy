window.Baggy = function Baggy(options) {
  this.options = options || {};
  this.options.disableShadowDOM = this.options.disableShadowDOM || false;

  const couponSentences = [
    'promo code',
    'promotion code',
    'promotional code',
    'enter promo code',
    'apply promo code',
    'appy coupon code',
    'enter coupon code',
    'enter discount code',
    'apply discount code',
    'invalid promo code',
    'add coupon',
    'enter code',
    'apply coupons',
    'apply promo code',
    'apply coupon code',
    'add offer code',
    'add promo code',
    'add promo or gift card',
    'discount code or gift card',
    'promo code our vouchers',
    'discount code',
    'have a promo code',
    'have a promotion code',
    'redeem coupon code',
    'redeem promo code',
    'got a coupon code',
    'use a promo code',
    'use a discount code',
    'use a coupon code'
  ];
  
  const couponStatusSentences = [
    'coupon you entered is invalid',
    'coupon you entered could not be applied',
    'promo code does not apply to any items in your cart',
    'promotion does not apply to any items in your cart',
    'coupon does not apply to any items in your cart',
    'promo code you entered is invalid',
    'coupon does not have valid offers',
    'coupon cannot be added',
    'code you have entered for is invalid',
    'invalid promo code',
    'coupon you entered could not be applied',
    'promotion code you have entered is invalid',
    'promo code cannot be added to your bag',
    'offer code is not valid',
    'is not a valid offer code',
    'promotional code is unknown',
    'coupon code is unknown',
  ]

  const toastOpts = {
    position: 'mid-center',
    hideAfter: 15000,
  }

  const localforageStore = localforage.createInstance({
    driver: localforage.LOCALSTORAGE,
  });  


  function sleep(ms) {
    console.log(`[Baggy] Sleeping for ${ms}ms.`);
    $.toast(`Sleeping for ${ms}ms. You could improve this.`, toastOpts);
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function highlight(node, color) {
    if (node.nodeType == 3) {
      node = node.parentNode;
    }

    $(node).css('border', `8px solid ${color}`);
  }

  // These functions deal with the state of the extension
  // as it's trying out coupons.
  async function getStateFromStorage() {
    return await localforageStore.getItem('coupon_state');
  }

  async function setStateInStorage(state) {
    return await localforageStore.setItem('coupon_state', state);
  }

  // These function are used for testing (tests/run_tests.js).
  async function setTestNodeCoordsInStorage(key, node) {
    let testData = await localforageStore.getItem('node_coords');

    if (!testData) {
      testData = {};
    }

    testData[key] = getPositions(node)[0];

    await localforageStore.setItem('node_coords', testData);
  }

  async function clearTestNodeCoordsInStorage() {
    await localforageStore.setItem('node_coords', '');
  }

  async function logTestNodeCoords() {
    const testData = await localforageStore.getItem('node_coords');

    if (testData) {
      console.log('[Baggy] Test coordinates have been saved in window.baggyCoords, also below.');

      testData.viewport = {
        w: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
        h: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
      }

      console.log(JSON.stringify(testData));
      window.baggyCoords = testData;
    }
  }

  // Handles coupons to try out.
  async function setCouponsToTryInStorage(couponCodes) {
    await localforageStore.setItem('coupons_to_try', couponCodes);
  }

  async function popCouponToTryFromStorage() {
    let coupons = await localforageStore.getItem('coupons_to_try');

    if (!coupons || coupons.length == 0) {
      return null;
    }

    const couponToTry = coupons.shift();

    await setCouponsToTryInStorage(coupons);

    return couponToTry;
  }

  async function setActiveCouponInStorage(couponCode) {
    await localforageStore.setItem('active_coupon', couponCode);
  }

  async function getActiveCouponFromStorage() {
    return await localforageStore.getItem('active_coupon');
  }

  async function updateCouponValueInStorage(couponCode, value) {
    let coupons = await localforageStore.getItem('coupon_values');

    if (!coupons) {
      coupons = {};
    }

    coupons[couponCode] = value;

    await localforageStore.setItem('coupon_values', coupons);
  }

  async function getCouponValuesFromStorage() {
    return await localforageStore.getItem('coupon_values');
  }

  async function clearCouponValuesFromStorage() {
    await localforageStore.setItem('coupon_values', null);
  }

  // Returns the center and edges of the element.
  function getPositions(element) {
    let range = null;

    if (element.nodeType == 3) {
      range = document.createRange();
      range.selectNode(element);
    }

    let { top, left, width, height } = range ? range.getBoundingClientRect() : element.getBoundingClientRect();

    top = top + window.scrollY;
    left = left + window.scrollX;
    let right = left + width;
    let bottom = top + height;

    return [ 
      {
        x: left + width / 2,
        y: top + height / 2,
      },
      {
        x: left,
        y: top,
      },
      {
        x: right,
        y: bottom,
      },
      {
        x: left,
        y: bottom,
      },
      {
        x: right,
        y: top,
      },
    ]
  }

  function ptsExtremes(pts) {
    let rightMostPoint = 0;
    let leftMostPoint = 9999999;
    let bottomMostPoint = 0;
    let topMostPoint = 9999999;

    for (const pt of pts) {
      if (pt.x > rightMostPoint) {
        rightMostPoint = pt.x;
      }

      if (pt.x < leftMostPoint) {
        leftMostPoint = pt.x
      }

      if (pt.y > bottomMostPoint) {
        bottomMostPoint = pt.y;
      }

      if (pt.y < topMostPoint) {
        topMostPoint = pt.y;
      }
    }
    return { rightMostPoint, leftMostPoint, bottomMostPoint, topMostPoint };
  }

  // Calculates the center of a series of points.
  function centerLocation(pts) {
    const count = pts.length;
    if (count == 1) {
      return pts[0];
    }

    const { rightMostPoint, leftMostPoint, bottomMostPoint, topMostPoint } = ptsExtremes(pts);

    const xCenter = leftMostPoint + ((rightMostPoint - leftMostPoint) / 2);
    const yCenter = topMostPoint + ((bottomMostPoint - topMostPoint) / 2);

    return { x: xCenter, y: yCenter };
  }
  
  function getDistanceBetweenElements(a, b, tilt) {
    const aPosition = getPositions(a);
    const bPosition = getPositions(b);

    let smallestDistance = 99999;
    for (let i=0; i<4; i++) {
      for (let j=0; j<4; j++) {
        const aCoord = aPosition[i];
        const bCoord = bPosition[j];
        let distance = null;

        if (tilt == 'horizontal') {
          distance = Math.hypot(
            (aCoord.x - bCoord.x) / 2,
            aCoord.y - bCoord.y
          );
        } else {
          distance = Math.hypot(
            aCoord.x - bCoord.x,
            aCoord.y - bCoord.y
          );
        }

        if (distance < smallestDistance) {
          smallestDistance = distance;
        }
      }
    }
  
    return smallestDistance;  
  }

  function elementsCloseEnough(a, b, c) {
    // This can be improved to use edges.
    // Probably could be improved with OPTICS/clusters.
    // But ya know seems to be good enough.
    const distAB = getDistanceBetweenElements(a, b);
    const distAC = getDistanceBetweenElements(a, c);
    const distBC = getDistanceBetweenElements(b, c);

    // Two out of three distances must be close enough.
    const okDistances = [ distAB, distAC, distBC ].filter(dist => dist < 75);

    return okDistances.length >= 2;
  }

  // This is a smart way to fetch visible texts
  // which accounts for nested HTML tags.
  function fetchVisibleTexts() {
    const visibleTexts = [];
    __utils__.visibleTexts(document.body, visibleTexts);

    // Set up the coords and the array indexes
    // to make my life easy.
    for (let i=0; i<visibleTexts.length; i++) {
      visibleTexts[i].p = getPositions(visibleTexts[i].n);
      visibleTexts[i].idx = i;
    }

    // Sort the visible texts by the X axis.
    // This is gonna be confusing based on height.
    const sortedVisibleTextsByX  = [ ...visibleTexts ].sort((a, b) => {
      const aLeft = parseInt(a.p[1].x);
      const bLeft = parseInt(b.p[1].x);
      return aLeft - bLeft;
    })

    // Group these texts based on a 4px Y axis wiggle room.
    const clustersByHeight = {};
    for (const text of sortedVisibleTextsByX) {
      const bottom = parseInt(text.p[3].y / 4); // 4pixel wiggle room.
      if (!clustersByHeight[bottom]) clustersByHeight[bottom] = [];
      clustersByHeight[bottom].push(text);
    }


    // Now let's figure out if the texts are
    // *really* close together.
    const clustersWithSentences = [];
    for (const height in clustersByHeight) {
      const cluster = clustersByHeight[height];
      if (!cluster || cluster.length < 2) {
        continue;
      }

      let currentCluster = [];

      for (let i=0; i<cluster.length; i++) {
        let a = cluster[i];
        let b = cluster[i+1];

        if (!b) {
          currentCluster.push(a);
          if (currentCluster.length > 1) {
            clustersWithSentences.push(currentCluster);
          }
          break;
        }

        if (!currentCluster) {
          currentCluster.push(a);
          continue;
        }

        const aRight = parseInt(a.p[2].x);
        const bLeft = parseInt(b.p[1].x);

        if (Math.abs(bLeft - aRight) < 5) {
          currentCluster.push(a);
        } else {
          if (currentCluster.length > 1) {
            clustersWithSentences.push(currentCluster);
          }
          currentCluster = [];
        }
      }
    }

    // Assign the full text to the first cluster node.
    // Delete the rest.
    const elsToDelete = [];
    for (const cluster of clustersWithSentences) {
      let totalText = '';

      for (let i=0; i<cluster.length; i++) {
        let text = cluster[i];
        totalText += text.t + ' ';
        if (i > 0) {
          elsToDelete.push(text.idx);
        }
      }

      totalText = totalText.trim();
      visibleTexts[cluster[0].idx].t = totalText;
    }

    return visibleTexts.filter(t => elsToDelete.indexOf(t.idx) == -1);
  }

  // This runs OPTICS to find clusters based on coordinates.
  function findClusters(texts, proximity) {
    const goodTexts = [];
    for (const text of texts) {
      text.p = getPositions(text.n);
      goodTexts.push(text);
    }

    const locationData = [];
    for (const text of goodTexts) {
      locationData.push([ parseInt(text.p[0].x), parseInt(text.p[0].y) ]);
    }

    const optics = new OPTICS()
    let clusters = optics.run(locationData, proximity, 2);

    return { clusters, goodTexts };
  }

  // It looks through the visible texts and finds
  // one keyword and one price cluster.
  function findPriceClusters() {
    const visibleTexts = fetchVisibleTexts();

    let priceTexts = visibleTexts.filter((text) => {
      // Just avoid large strings though.
      const textWithoutNumbers = text.t.replace(/[\d$()]/g, '').replace(/(\bsub[- ]*total|total\b)/gi, '').trim();
      if (textWithoutNumbers.length > 10) {
        return false;
      }

      // Avoid prices inside buttons or links.
      const node = (text.n.nodeType == 3 ? text.n.parentNode : text.n);
      if (node.tagName == 'A' || node.tagName == 'BUTTON') {
        return false;
      }

      return (text.t.match(/\$\s?\d+/) ||
              text.t.toLowerCase().match(/\bfree\b/) ||
              text.t.toLowerCase().match(/\bpromo\b/) ||
              text.t.toLowerCase().match(/\bapply\b/) ||
              text.t.toLowerCase().match(/\bcoupon\b/) ||
              text.t.toLowerCase().match(/\btbd\b/) ||
              text.t.toLowerCase().match(/\bN\/?A\b/) ||
              text.t.toLowerCase().match(/^\$?[ .-]+$/));
    });

    let { clusters: priceClusters, goodTexts: priceTextsWithCoords } = findClusters(priceTexts, 150);

    let maxPriceMatches = 0;
    priceClusters = priceClusters.filter((priceCluster) => {
      for (const clusterIdx of priceCluster) {
        const text = priceTextsWithCoords[clusterIdx];
        if (text.t.match(/\$\s?\d+/) &&
            text.t.replace(/[^\d-$.,]/g, '').indexOf('-$') == -1 &&
            text.t.replace(/[^\d-$.,]/g, '').indexOf('$-1') == -1) {
          if (priceCluster.length > maxPriceMatches) {
            maxPriceMatches = priceCluster.length;
          }
          return true;
        }
      }
      return false;
    });

    let keywordTexts = visibleTexts.filter((text) => {
      // Just avoid large strings though.
      if (text.t.length > 30) {
        return false;
      }

      // Try to avoid credit card offers.
      if (text.t.toLowerCase().match(/\bcard\b/)) {
        return false;
      }

      return (text.t.toLowerCase().match(/\bsub[- ]*total\b/) ||
              text.t.toLowerCase().match(/\btotal\b/) ||
              text.t.toLowerCase().match(/\bshipping\b/) ||
              text.t.toLowerCase().match(/\bdelivery\b/) ||
              text.t.toLowerCase().match(/\btax\b/) ||
              text.t.toLowerCase().match(/\btaxes\b/) ||
              text.t.toLowerCase().indexOf('sales tax') > -1);
    });

    let { clusters: keywordClusters, goodTexts: keywordTextsWithCoords } = findClusters(keywordTexts, 150);

    let maxKeywordMatches = 0;
    keywordClusters = keywordClusters.filter((keywordCluster) => {
      for (const clusterIdx of keywordCluster) {
        const text = keywordTextsWithCoords[clusterIdx];
        if (text.t.toLowerCase().match(/\bsub[- ]*total\b/) ||
            text.t.toLowerCase().match(/\btotal\b/)) {
          if (keywordCluster.length > maxKeywordMatches) {
            maxKeywordMatches = keywordCluster.length;
          }
          return true;
        }
      }
      return false;
    });

    if (maxKeywordMatches > 1) {
      keywordClusters = keywordClusters.filter((keywordCluster) => {
        return keywordCluster.length > 1;
      });
    }

    // Find the closest keyword to prices clusters.
    let score = 999999;
    let bestKeywordCluster;
    let bestPriceCluster;

    for (const keywordCluster of keywordClusters) {
      const keywordClusterTexts = [];

      for (const clusterIdx of keywordCluster) {
        const text = keywordTextsWithCoords[clusterIdx];
        keywordClusterTexts.push(text);
      }

      const keywordClusterExtremes = ptsExtremes(keywordClusterTexts.map(t => t.p[0]));
      const keywordClusterCenter = centerLocation(keywordClusterTexts.map(t => t.p[0]));

      for (const priceCluster of priceClusters) {
        const priceClusterTexts = [];

        for (const clusterIdx of priceCluster) {
          const text = priceTextsWithCoords[clusterIdx];
          priceClusterTexts.push(text);
        }

        const priceClusterExtremes = ptsExtremes(priceClusterTexts.map(t => t.p[0]));
        const priceClusterCenter = centerLocation(priceClusterTexts.map(t => t.p[0]));

        // Keywords always have to be before prices.
        if (!_.isEqual(keywordClusterExtremes, priceClusterExtremes) &&
            (parseInt(keywordClusterExtremes.leftMostPoint) >= parseInt(priceClusterExtremes.leftMostPoint) ||
            parseInt(keywordClusterExtremes.rightMostPoint) >= parseInt(priceClusterExtremes.rightMostPoint) ||
            parseInt(keywordClusterCenter.x) >= parseInt(priceClusterCenter.x))) {
          continue;
        }

        // Here the goal is to make the x-axis a bit more sensitive.
        const distanceBetweenClusters = Math.hypot(
          (keywordClusterCenter.x - priceClusterCenter.x) / 1.5,
          (keywordClusterCenter.y - priceClusterCenter.y),
        );

        if (distanceBetweenClusters < score) {
          score = distanceBetweenClusters;
          bestKeywordCluster = keywordClusterTexts;
          bestPriceCluster = priceClusterTexts;
        }
      }
    }

    return { keywordCluster: bestKeywordCluster, priceCluster: bestPriceCluster};
  }

  // Try to find the price closest to total or subtotal.
  function findTotalPrice(keywordCluster, priceCluster) {
    let totalLabelEl = null;

    if (!keywordCluster || !priceCluster) {
      return null;
    }

    // This is out ideal situation.
    for (const el of keywordCluster) {
      if (el.t.toLowerCase().match(/\btotal\b/) ||
          el.t.toLowerCase().match(/\bfinal\b/)) {
        totalLabelEl = el;
        // This could go either way but we assume it's usually the last one.
      }
    }

    // Backup is subtotal.
    if (!totalLabelEl) {
      for (const el of keywordCluster) {
        if (el.t.toLowerCase().match(/\bsub[- ]*total\b/)) {
          totalLabelEl = el;
          // This could go either way but we assume it's usually the last one.
        }
      }  
    }

    if (!totalLabelEl) {
      return null;
    }

    let closestScore = 999999;
    let closestEl = null;
    let leftMostTotalLabelPoint = 99999999;
    for (const coords of totalLabelEl.p) {
      if (coords.x < leftMostTotalLabelPoint) {
        leftMostTotalLabelPoint = coords.x;
      }
    }

    for (const el of priceCluster) {
      if (!el.t.match(/\$\s?\d+/)) {
        continue;
      }

      // Negative prices are bad.
      if (el.t.indexOf('-') > -1) {
        continue;
      }

      let leftMostElPoint = 999999;
      for (const coords of el.p) {
        if (coords.x < leftMostElPoint) {
          leftMostElPoint = coords.x;
        }
      }

      // Proper alignment.
      if (leftMostTotalLabelPoint > leftMostElPoint) {
        continue;
      }

      let score = getDistanceBetweenElements(totalLabelEl.n, el.n, 'horizontal');

      if (score < closestScore) {
        closestScore = score;
        closestEl = el;
      }
    }

    return closestEl;
  }

  function nodeCouldBeLink(node) {
    let nodeToCheck = node.nodeType == 3 ? node.parentNode : node;
    return (nodeToCheck.tagName == 'A' || nodeToCheck.onclick || $(nodeToCheck).css('cursor') == 'pointer');
  }

  function findClickableOpenCouponFieldButton(bestApplyCouponNode) {
    const node = bestApplyCouponNode.n;
    if (nodeCouldBeLink(node)) {
      return node;
    }

    // Let's try to find some nearby button or link.
    let otherNodeButton = findNearest(node.type == 3 ? node.parentNode : node, 'button:visible, input[type="button"]:visible, input[type="submit"]:visible, a:visible');
    const otherNodeButtonPosition = otherNodeButton ? getPositions(otherNodeButton) : null;

    if (otherNodeButton &&
        otherNodeButtonPosition &&
        Math.abs(otherNodeButtonPosition[0].y - bestApplyCouponNode.p[0].y) < 5 &&
        (otherNodeButtonPosition[0].x - bestApplyCouponNode.p[0].x) < 500) {
      return otherNodeButton;
    }

    return null;
  }

  // Tries to find the best match between some visible texts
  // and a hardcoded list of sentences.
  async function findBestKeywordMatch(baselineSentences, foundSentences) {
    if (foundSentences.toString().length > 20000) {
      console.log('[Baggy] Giving up trying to find best match, more than 20000 characters.');
      return null;
    }

    let maxScore = 0;
    let maxText = null;
    let maxIdx = null;

    for (let i=0; i<baselineSentences.length; i++) {
      for (let j=0; j<foundSentences.length; j++) {
        const foundSentence = foundSentences[j].replace(/[:?]/g, '.');
        const splitSenteces = window.tokenizer.sentences(foundSentence).map(s => s.toLowerCase().replace(/\./g, ''));

        for (const sentence of splitSenteces) {
          const score = Cosinesimilarity(baselineSentences[i], sentence);
          if (score > maxScore) {
            maxScore = score;
            maxText = foundSentences[j];
            maxIdx = j;
          }
        }
      }
    }

    return { score: maxScore, text: maxText, idx: maxIdx }
  }

  // Stores data at different stages of the run.
  async function getMarker(scope) {
    return await localforageStore.getItem(scope);
  }

  async function setMarker(scope, testMode) {
    const visibleTexts = fetchVisibleTexts();

    const { keywordCluster, priceCluster } = findPriceClusters();
    
    console.log('[Baggy] Debugging clusters.', keywordCluster, priceCluster);

    const totalPriceEl = findTotalPrice(keywordCluster, priceCluster);

    console.log('[Baggy] I think the total price is.', totalPriceEl);

    if (!testMode && totalPriceEl) {
      highlight(totalPriceEl.n, '#00FFFF');
    }
    
    const marker = { keywordCluster, priceCluster, visibleTexts, totalPriceEl };

    // Clean nodes for storage.
    let cleanMarker = _.cloneDeepWith(marker, (value, key) => {
      if (key == 'n') {
        return 'n';
      }
    });

    await localforageStore.setItem(scope, cleanMarker);

    return marker;
  }
  
  // Prints out the winning coupon.
  async function showWinningCoupon() {
    const couponValues = await getCouponValuesFromStorage();

    if (!couponValues || Object.keys(couponValues).length == 0) {
      $.toast("It seems we couldn't find any good coupons.", toastOpts);
      return;
    }

    let bestCouponCode = null;
    let bestCouponValue = 0.0;

    for (const couponCode in couponValues) {
      const couponValue = couponValues[couponCode];

      if (couponValue > bestCouponValue) {
        bestCouponValue = couponValue;
        bestCouponCode = couponCode;
      }
    }

    if (bestCouponValue > 0) {
      $.toast(`The best coupon code is ${bestCouponCode} which saves you $${bestCouponValue}.`, toastOpts);
    } else {
      $.toast("It seems we couldn't find any good coupons.", toastOpts); 
    }
  }

  // What's changed in the visible text between the two runs?
  function markerVisibleTextDiff(startMarker, endMarker) {
    const startValues = startMarker.visibleTexts.map(obj => obj.t);
    const endValues = endMarker.visibleTexts.map(obj => obj.t);

    const difference = endValues.filter(x => !startValues.includes(x)).map(obj => obj);

    return difference;
  }

  // It tries to figure out if couponing worked.
  async function processMarkers(startMarker, endMarker) {
    const visibleTextDiff = markerVisibleTextDiff(startMarker, endMarker);
    const applyCouponStatus = await checkApplyCouponStatus(visibleTextDiff);

    if (startMarker.totalPriceEl && endMarker.totalPriceEl) {
      const couponCode = await getActiveCouponFromStorage();
      const startPrice = startMarker.totalPriceEl.t;
      const endPrice = endMarker.totalPriceEl.t;
      const parsedStartPrice = Number(startPrice.replace(/[^0-9.-]+/g, ''));
      const parsedEndPrice = Number(endPrice.replace(/[^0-9.-]+/g, ''));
      const couponValue = Math.round((parsedStartPrice - parsedEndPrice) * 10) / 10;

      await updateCouponValueInStorage(couponCode, couponValue);

      $.toast(`Coupon ${couponCode}: $${couponValue}. Prices: ${startMarker.totalPriceEl.t} and then ${endMarker.totalPriceEl.t}.`, toastOpts);
    }

    await postApplyCouponAction(visibleTextDiff, endMarker);

    if (startMarker &&
        endMarker &&
        (startMarker.totalPriceEl && endMarker.totalPriceEl && startMarker.totalPriceEl.t != endMarker.totalPriceEl.t) &&
        applyCouponStatus == 'unknown') {
      return 'ok'
    } else {
      return applyCouponStatus;
    }
  }

  // Tries to determine the status of the run.
  async function checkApplyCouponStatus(visibleTextDiff) {
    const { score, text, idx } = await findBestKeywordMatch(couponStatusSentences, visibleTextDiff, 'status');

    console.log('[Baggy] While looking for error this is what I found.', score, couponStatusSentences[idx]);

    if (score > 0.5) {
      return 'failure';
    }

    return 'unknown';
  }

  async function postApplyCouponAction(visibleTextDiff, endMarker) {
    // Find new links that say 'remove'. Helpful in case we have to remove a coupon.
    const interestingTexts = visibleTextDiff.filter(t => /\bremove\b/i.test(t));
    let bestNode = null;

    for (const visibleText of endMarker.visibleTexts) {
      for (const interestingText of interestingTexts) {
        // Take the last one that matches.
        if (visibleText.t == interestingText && nodeCouldBeLink(visibleText.n)) {
          bestNode = visibleText;
        }
      }
    }

    if (bestNode) {
      $.toast(`Clicking on ${bestNode.t} button.`, toastOpts);
      __utils__.mouseEvent('mousedown', bestNode.n);
      __utils__.mouseEvent('mouseup', bestNode.n);
      __utils__.mouseEvent('click', bestNode.n);
      await sleep(3000);
    }
  }

  function findNearest(el, selector) {
    let node = $(el).nearest(selector);

    let endNode = null;

    try {
      endNode = ((node && node[0] && node[0][0]) ? node[0][0] : node[0]);
    } catch (err) {
      console.log(err);
    };

    return endNode;
  }

  function findNearestCouponFields(bestNode) {
    let node = bestNode.n;
    let input = null;
    let button = null;

    if (node.nodeType == 3) {
      node = node.parentNode;
    }

    if (node.tagName == 'INPUT' && node.type == 'text') {
      input = node;
    } else {
      input = findNearest(node, 'input[type="text"]:visible, input:not([type]):visible');
    }

    button = findNearest(input, 'button:visible, input[type="button"]:visible, input[type="submit"]:visible, a:visible');

    // If you are removing these be careful, this avoid cross origin bullshit.
    try {
      console.log('[Baggy] This is the nearest input.', input);
    } catch (err) {
      input = null;
    }

    try {
      console.log('[Baggy] This is the nearest button.', button);
    } catch (err) {
      button = null;
    }

    return { input, button };
  }

  async function findCouponFields() {
    console.log('[Baggy] Trying to decide whether to run.');

    // Let's find a payments cluster. Without one there's no point.
    const { keywordCluster, priceCluster } = findPriceClusters();
    
    if (!keywordCluster) {
      console.log('[Baggy] Giving up because of no good clusters.');
      return null;
    }

    let bestNode = await findBestApplyCouponKeywordMatch();

    if (!bestNode) {
      console.log('[Baggy] Giving up because of no good node.');
      return null;
    }

    const node = bestNode.n;

    const { input, button } = findNearestCouponFields(bestNode);
    let areCloseEnough = false;

    if (node && input && button) {
      areCloseEnough = elementsCloseEnough(node, input, button);
    }

    if (areCloseEnough) {
      return { node, hasFields: true };
    } else {
      console.log('[Baggy] Elements are not close enough together.');

      const clickableApplyButton = findClickableOpenCouponFieldButton(bestNode);

      if (!clickableApplyButton) {
        console.log('[Baggy] Giving up since this element might not be clickable.');
        return null;
      }
    }

    const keywordClusterCenter = centerLocation(keywordCluster.map(t => t.p[0]));
    const nodeCenter = getPositions(node);

    const distanceToCluster = Math.hypot(
      (nodeCenter[0].x - keywordClusterCenter.x),
      (nodeCenter[0].y - keywordClusterCenter.y),
    );

    const maxDistanceToCluster = (bestNode.s > 0.8 ? 1500 : 500);
    if (distanceToCluster < maxDistanceToCluster) {
      console.log('[Baggy] Coupon field too far away from cluster.');
      return { node: bestNode, hasFields: false };
    }
    return null;
  }

  async function clickOnCouponField(couponFieldInfo) {
    const clickableApplyButtonNode = findClickableOpenCouponFieldButton(couponFieldInfo.node);

    let localNode = clickableApplyButtonNode;

    if (localNode.nodeType == 3) {
      localNode = localNode.parentNode;
    }

    console.log('[Baggy] Clicking on node.', localNode);

    __utils__.mouseEvent('mousedown', localNode);
    __utils__.mouseEvent('mouseup', localNode);
    __utils__.mouseEvent('click', localNode);
  }

  async function findBestApplyCouponKeywordMatch() {
    let visibleTexts = fetchVisibleTexts();

    visibleTexts = visibleTexts.filter((text) => {
      // Avoid vague CTAs.
      if (text.t.trim().split(/\s+/).length < 2) {
        return false;
      }
      // Just avoid large strings though.
      return (text.t.length < 60);
    });


    const visibleTextContent = visibleTexts.map((obj) => obj.t);

    const { score, text, idx } = await findBestKeywordMatch(couponSentences, visibleTextContent, 'coupon');

    let bestNode = visibleTexts[idx];

    console.log('[Baggy] Found this node for applying coupons.', bestNode, score);

    if (!bestNode || score < 0.5) {
      return null;
    }

    bestNode.p = getPositions(bestNode.n);
    bestNode.s = score;

    return bestNode;
  }

  async function runCoupons(couponFieldInfo, couponCode, startMarker, testMode) {
    console.log(`[Baggy] Applying coupon ${couponCode}.`);

    await setActiveCouponInStorage(couponCode);

    // Find the main keyword for applying coupons.
    let bestNode = await findBestApplyCouponKeywordMatch();

    if (!bestNode) {
      return null;
    }

    // Sometimes we need to click something for the coupon to appear.
    if (!couponFieldInfo.hasFields) {
      console.log('[Baggy] Clicking to open coupon field.', bestNode);
      await sleep(1500);
      await clickOnCouponField(couponFieldInfo);
      await sleep(3500);
      // The previous node might have dissapeared.
      bestNode = await findBestApplyCouponKeywordMatch();
      console.log('[Baggy] Refresh node.', bestNode);
    }

    const node = bestNode.n;

    const { input, button } = findNearestCouponFields(bestNode);

    let areCloseEnough = false;
    if (node && input && button) {
      areCloseEnough = elementsCloseEnough(node, input, button);
    }

    if (!areCloseEnough) {
      console.log('[Baggy] Elements are not close enough together. Giving up.');
      return null;
    }

    if (!testMode) {
      // In test mode we don't actually click anything.
      highlight(node, '#FF0000');
      highlight(input, '#FFC000');
      highlight(button, '#FFFC00');

      input.value = couponCode;
      __utils__.mouseEvent('change', input);
      __utils__.mouseEvent('input', input);
      __utils__.mouseEvent('blur', input);

      await sleep(1500);

      __utils__.mouseEvent('click', button);
      __utils__.mouseEvent('mouseup', button);
      __utils__.mouseEvent('mousedown', button);

      await sleep(6000);
    } else {
      // We save this debug data in case we need it for tests.
      await setTestNodeCoordsInStorage('coupon_keyword', bestNode.n);
      await setTestNodeCoordsInStorage('input', input);
      await setTestNodeCoordsInStorage('button', button);
      await setTestNodeCoordsInStorage('final_price', startMarker.totalPriceEl.n);
    }

    const endMarker = await setMarker('end_marker', testMode);

    const status = await processMarkers(startMarker, endMarker);

    console.log(`End status is: ${status ? status : 'unknown'}.`);

    await logTestNodeCoords();
  }

  async function runFromNoState() {
    const couponFieldInfo = await findCouponFields();

    if (couponFieldInfo) {
      console.log('[Baggy] Want to run!');

      let elToAppend = null;

      $(`<div style='left: 22.16%; margin-left: -40px; position: fixed; top: 0px; z-index: 20000;' id='baggy_container'></div>`).appendTo('body');
      
      if (!window.baggy.options.disableShadowDOM) {
        elToAppend = $('#baggy_container')[0].attachShadow({ mode: 'open' });
       } else {
        elToAppend = $('#baggy_container');
       } 

      $(elToAppend).append(`
        <div style='background: blue; padding: 20px'>
          <input style='background: #fff; font-size: 14px; padding: 5px 10px;' type='text' name='coupon_code' id='baggy_input' placeholder='COUPON1, COUPON2' />
          <button style='background: red; font-size: 14px; color: #fff; padding: 5px 10px;' id='baggy_button'>Run Coupons</button>
          <br/>
          <div style='margin-top: 15px; font-size: 14px; color: #fff'>
            <input type='checkbox' style='-webkit-appearance: checkbox; display: inline-block; position: static;' id='baggy_test_mode' name='baggy_test_mode' /> Test mode
          </span>
        </div>
      `);

      const runCouponButton = $(elToAppend).find('#baggy_button');

      $(runCouponButton).click(async () => {
        const couponCodes =  $(elToAppend).find('#baggy_input').val().split(',').map(c => c.trim());
        const testMode = !!$(elToAppend).find('#baggy_test_mode').is(':checked');

        $('#baggy_container').remove();
       
        const startMarker = await setMarker('start_marker', testMode);

        await setStateInStorage('apply_coupons');
        await setCouponsToTryInStorage(couponCodes);
        await clearTestNodeCoordsInStorage();

        while (true) {
          let couponCode = await popCouponToTryFromStorage();

          if (!couponCode) {
            break;
          }

          await runCoupons(couponFieldInfo, couponCode, startMarker, testMode);
        }

        await showWinningCoupon();
        await setStateInStorage('');
      })
    }
  }

  async function runFromApplyCoupon(startMarker) {
    const endMarker = await setMarker('end_marker', false);

    console.log('[Baggy] Resuming from these markers.', startMarker, endMarker);

    const status = await processMarkers(startMarker, endMarker);
    
    console.log('[Baggy] Ending.', status);
  }

  this.start = async function start() {
    const state = await getStateFromStorage();

    console.log(`[Baggy] Status is ${state}.`);

    if (!state) {
      await clearCouponValuesFromStorage();
      await runFromNoState();
    } else if (state == 'apply_coupons') {
      // Site refreshes the page when applying coupons.
      // Resuming previous state.
      const couponFieldInfo = await findCouponFields();
      const startMarker = await getMarker('start_marker');

      await clearTestNodeCoordsInStorage();
      await runFromApplyCoupon(startMarker);

      let couponCode = await popCouponToTryFromStorage();

      if (couponCode) {
        await runCoupons(couponFieldInfo, couponCode, startMarker, false);
      }

      await showWinningCoupon();

      await setStateInStorage(''); 
    }
  }
};
