/*!
 * Inspired from:
 * https://github.com/casperjs/casperjs/blob/master/modules/clientutils.js
 */

((exports) => {
  "use strict";

  exports.create = function create(options) {
    return new this.ClientUtils(options);
  };

  /**
   * Casper client-side helpers.
   */
  exports.ClientUtils = function ClientUtils(options) {
    // private members
    const SUPPORTED_SELECTOR_TYPES = ['css', 'xpath'];

    // public members
    this.options = options || {};
    this.options.scope = this.options.scope || document;

    /**
     * Clicks on the DOM element behind the provided selector.
     *
     * @param  String  selector  A CSS3 selector to the element to click
     * @param  {Number} x         X position
     * @param  {Number} y         Y position
     * @return Boolean
     */
    this.click = function click(selector, x, y) {
      return this.mouseEvent('click', selector, x, y);
    };

    /**
     * Echoes something to casper console.
     *
     * @param  String  message
     * @return
     */
    this.echo = function echo(message) {
      console.log(`[chrome.echo] ${message}`);
    };

    /**
     * Checks if a given DOM element is visible in remove page.
     *
     * @param  Object   element  DOM element
     * @return Boolean
     */
    this.elementVisible = function elementVisible(elem) {
      if (elem.nodeName == '#text') {
        return true;
      }

      let style = null;
      try {
        style = window.getComputedStyle(elem, null);
      } catch (e) {
        return false;
      }

      if (!style) {
        return false;
      }

      if (style.visibility === 'hidden' || style.display === 'none') {
        return false;
      }

      const cr = elem.getBoundingClientRect();
      return cr.width > 0 &&
             cr.height > 0 &&
             cr.right <= (window.innerWidth || document.documentElement.clientWidth);
    };

    /**
     * Checks if a given DOM element exists in remote page.
     *
     * @param  String  selector  CSS3 selector
     * @return Boolean
     */
    this.exists = function exists(selector) {
      try {
        return this.findAll(selector).length > 0;
      } catch (e) {
        return false;
      }
    };

    /**
     * Finds all DOM elements matching by the provided selector.
     *
     * @param  String            selector  CSS3 selector
     * @param  HTMLElement|null  scope     Element to search child elements within
     * @param  Boolean checkIfVisible  If returned elements have to be visible
     * @return Array|undefined
     */
    this.findAll = function findAll(selector, scope, checkIfVisible) {
      if (Object.prototype.toString.call(selector) === '[object Array]') {
        return selector;
      }

      if (typeof selector != 'string' && (!selector.type || selector.type != 'xpath')) {
        return [ selector ];
      }

      let foundEls = [];
      const validEls = [];
      const cameWithScope = (scope && scope != document.body);

      scope = scope || this.options.scope;

      try {
        const pSelector = this.processSelector(selector);
        if (pSelector.path.indexOf('//') === 0 || pSelector.path.indexOf('substring') === 0) {
          foundEls = this.getElementsByXPath(pSelector.path, scope);
        } else if (pSelector.type === 'xpath') {
          foundEls = this.getElementsByXPath(pSelector.path, scope);
        } else {
          if (cameWithScope && pSelector.path.indexOf(':scope') == -1) {
            pSelector.path = pSelector.path.split(',').map((s) => { return `:scope ${s.trim()}`; }).join(', ');
          }
          if (pSelector.path) {
            foundEls = scope.querySelectorAll(pSelector.path);
          }
        }
      } catch (e) {
        this.log(`findAll(): invalid selector provided ${selector}: ${e}.`, 'error');
        return [];
      }

      for (const el of foundEls) {
        let add = true;

        if (checkIfVisible && checkIfVisible === true && this.visible(el) === false) {
          add = false;
        }

        if (add) {
          validEls.push(el);
        }
      }

      return validEls;
    };

    /**
     * Finds a DOM element by the provided selector.
     *
     * @param  String            selector  CSS3 selector
     * @param  HTMLElement|null  scope     Element to search child elements within
     * @param  Boolean checkIfVisible  If returned elements have to be visible
     * @return HTMLElement|undefined
     */
    this.findOne = function findOne(selector, scope, checkIfVisible) {
      if (typeof selector != 'string' && (!selector.type || selector.type != 'xpath')) {
        return selector;
      }

      const els = this.findAll(selector, scope, checkIfVisible);

      return (els ? els[0] : null);
    };

    /**
     * Retrieves a single DOM element matching a given XPath expression.
     *
     * @param  String            expression  The XPath expression
     * @param  HTMLElement|null  scope       Element to search child elements within
     * @return HTMLElement or null
     */
    this.getElementByXPath = function getElementByXPath(expression, scope) {
      if (scope && expression.indexOf('.') !== 0) {
        expression = `.${expression}`;
      }

      scope = scope || this.options.scope;
      const a = document.evaluate(expression, scope, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      if (a.snapshotLength > 0) {
        return a.snapshotItem(0);
      }

      return null;
    };

    /**
     * Retrieves all DOM elements matching a given XPath expression.
     *
     * @param  String            expression  The XPath expression
     * @param  HTMLElement|null  scope       Element to search child elements within
     * @return Array
     */
    this.getElementsByXPath = function getElementsByXPath(expression, scope) {
      if (scope) {
        expression = `.${expression}`;
        expression = expression.replace(/^\.{2}/, '.').replace(/\|\s*\//g, '| ./');
      }

      scope = scope || this.options.scope;
      const nodes = [];

      let a = null;
      if (expression.indexOf('substring') === 0) {
        a = document.evaluate(expression, scope, null, XPathResult.STRING_TYPE, null);
        nodes.push(a.stringValue);
      } else {
        a = document.evaluate(expression, scope, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (let i=0; i<a.snapshotLength; i++) {
          nodes.push(a.snapshotItem(i));
        }
      }

      return nodes;
    };


    /**
     * Logs a message. Will format the message a way CasperJS will be able
     * to log phantomjs side.
     *
     * @param  String  message  The message to log
     * @param  String  level    The log level
     */
    this.log = function log(message, level) {
      console.log(`[chome: ${level || 'debug'}] ${message}`);
    };

    /**
     * Dispatches a mouse event to the DOM element behind the provided selector.
     *
     * @param  String   type      Type of event to dispatch
     * @param  String   selector  A CSS3 selector to the element to click
     * @param  {Number} x         X position
     * @param  {Number} y         Y position
     * @return Boolean
     */
    this.mouseEvent = function mouseEvent(type, selector, x, y) {
      const elem = this.findOne(selector);
      if (!elem) {
        this.log(`mouseEvent(): Couldn't find any element matching ${selector}.`, 'error');
        return false;
      }

      const convertNumberToIntAndPercentToFloat = (a, def) => {
        return !!a && !isNaN(a) && parseInt(a, 10) ||
               !!a && !isNaN(parseFloat(a)) && parseFloat(a) >= 0 &&
               parseFloat(a) <= 100 && parseFloat(a) / 100 ||
               def;
      };

      try {
        const evt = document.createEvent('MouseEvents');
        let px = convertNumberToIntAndPercentToFloat(x, 0.5);
        let py = convertNumberToIntAndPercentToFloat(y, 0.5);
        try {
          const bounds = elem.getBoundingClientRect();
          px = Math.floor(bounds.width  * (px - (px ^ 0)).toFixed(10)) + (px ^ 0) + bounds.left;
          py = Math.floor(bounds.height * (py - (py ^ 0)).toFixed(10)) + (py ^ 0) + bounds.top;
        } catch (e) {
          px = 1; py = 1;
        }

        evt.initMouseEvent(type, true, true, window, 1, 1, 1, px, py, false, false, false, false,
          type !== 'contextmenu' ? 0 : 2, elem);
        // dispatchEvent return value is false if at least one of the event
        // handlers which handled this event called preventDefault;
        // so we cannot returns this results as it cannot accurately informs on the status
        // of the operation
        // let's assume the event has been sent ok it didn't raise any error
        elem.dispatchEvent(evt, { bubbles: true });
        return true;
      } catch (e) {
        this.log(`Failed dispatching ${type} mouse event on ${selector}: ${e}`, 'error');
        return false;
      }
    };

    /**
     * Processes a selector input, either as a string or an object.
     *
     * If passed an object, if must be of the form:
     *
     *     selectorObject = {
     *         type: <'css' or 'xpath'>,
     *         path: <a string>
     *     }
     *
     * @param  String|Object  selector  The selector string or object
     *
     * @return an object containing 'type' and 'path' keys
     */
    this.processSelector = function processSelector(selector) {
      const selectorObject = {
        toString: function toString() {
          return this.type + ' selector: ' + this.path;
        },
      };
      if (typeof selector === 'string') {
        // defaults to CSS selector
        selectorObject.type = 'css';
        selectorObject.path = selector;
        return selectorObject;
      } else if (typeof selector === 'object') {
        // validation
        if (!selector.hasOwnProperty('type') || !selector.hasOwnProperty('path')) {
          throw new Error('Incomplete selector object');
        } else if (SUPPORTED_SELECTOR_TYPES.indexOf(selector.type) === -1) {
          throw new Error(`Unsupported selector type: ${selector.type}.`);
        }
        if (!selector.hasOwnProperty('toString')) {
          selector.toString = selectorObject.toString;
        }
        return selector;
      }
      throw new Error(`Unsupported selector type: ${typeof selector}.`);
    };

    /**
     * Checks if any element matching a given selector is visible in remote page.
     *
     * @param  String  selector  CSS3 selector
     * @return Boolean
     */
    this.visible = function visible(selector) {
      const els = this.findAll(selector);

      for (let i=0; i<els.length; i++) {
        if (this.elementVisible(els[i])) {
          return true;
        }
      }
      return false;
    };


    /**
     * Recursively returns texts that are visible above the fold.
     *
     * @param  Object  HTML element where to start looking for nodes, usually document.body
     * @param  Array  Array to hold the visible strings
     * @return  Array Array of visible strings
     */
    this.visibleTexts = function visibleTexts(el, texts) {
      if (!el) {
        el = document.body;
      }

      const parentIsVibile = this.visible(el) && el.offsetHeight > 1 && el.offsetWidth > 1;

      const childNodes = el.childNodes;

      if (childNodes) {
        for (const node of childNodes) {
          const nodeIsVisible = (node.nodeType == 3 || (this.visible(node) && node.offsetHeight > 1 && node.offsetWidth > 1));

          const nodeParent = (node.nodeType == 3 ? node.parentElement : null);
          const nodeParentClass = ((nodeParent && nodeParent.getAttribute('class')) ? nodeParent.getAttribute('class') : '');

          if (node.nodeType == 3 &&
              parentIsVibile &&
              nodeParent &&
              nodeParent.tagName != 'SCRIPT' &&
              nodeParentClass.indexOf('disabled') == -1 &&
              nodeParentClass.indexOf('inactive') == -1 &&
              nodeParent.getAttribute('disabled') == null) {
            let text = node.nodeValue;

            text = text.replace(/\s/g, ' ').replace(/\s{2,}/g, ' ').trim();
            if (text &&
                text.indexOf('function') == -1 &&
                text.indexOf('</') == -1) {
              texts.push({ t: text, n: node });
            }
          } else if (node.nodeType == 1 &&
                    nodeIsVisible &&
                    node.tagName == 'INPUT' &&
                    node.type != 'hidden' &&
                    !node.disabled) {
            texts.push({ t: (node.value || node.placeholder), n: node });
          }
        }

        for (const node of childNodes) {
          if (node.nodeType != 3) {
            this.visibleTexts(node, texts);
          }
        }
      }

      return texts;
    };
  };
})(typeof exports === 'object' && !(exports instanceof Element) ? exports : window);

window.__utils__ = new window.ClientUtils();
