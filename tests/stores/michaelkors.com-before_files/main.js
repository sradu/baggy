'use strict';
var g_cntryList = "";
var cntryListObj = {};
var paymentRequestObj = {};
var localeName = $("#nonPrimaryLocale").val();
if (localeName == null) {
	localeName = "";
}
window.KOR = window.KOR || {};
window.KOR.breakpoints = window.KOR.breakpoints || {
  xs: 700,
  md: 1020,
  lg: 1440,
  xl: 10000 // Hack for unslicking
};

window.KOR.util = window.KOR.util || {};
window.KOR.util.dontValidateHiddenField = function(fieldInstance) {
  if (!$(fieldInstance.$element).is(':visible')) {
    var ret = fieldInstance.validationResult = true;
    return ret;
  }
};

$.ajaxSetup({ cache: false });

//var dtmEnabledFlag = "${dtm_enabled_flag}";
//var adobeLaunchEnabledFlag = "${adobeLaunch_enabled_flag}";
var options = {};
var billingAddressOptions = {};
var paymentOptions = {};
var addressFormIds = {
	firstName : "first_name",
	lastName : "last_name",
	address1 : "addr-1",
	address2 : "addr-2",
	city : "locality",
	province : "state",
	state : "state",
	postalCode : "zip-code",
	phoneNumber : "shipping-phone",
	email : "email"
}

var billingAddressFormIds = {
	creditCardNumber : "payment-card-number",
	nameOnCard : "card-name",
	cvv : "creditCardCVV",
	expirationMonth : "payment-card-expiration",
	expirationYear : "payment-card-expiration",
	firstName : "first_name",
	lastName : "last_name",
	address1 : "addr-1",
	address2 : "addr-2",
	city : "locality",
	province : "state",
	state : "state",
	postalCode : "zip-code",
	phoneNumber : "shipping-phone",
	email : "email"
}
var createAccountFormIds = {
	firstName : "first_name",
	lastName : "last_name",
	email : "email",
	postalCode: "postal_code"
};
/*
 * Collection form plugin (used for 'add edit address' and 'add edit credit cards')
 */
'use strict';
(function() {
  function CollectionForm(element, options){
    var that = this;
    this.element = element;
    this.options = options;

    this.populateSelect(this.options.collection);

    $(that.options.selectEl).change(function(event){
      that.onChoiceChange.apply(that, [event]);
    });

    this.onChoiceChange(0);

    $(this.element).find('.' + this.options.name + '-edit-collection-link').click(function(e){
      e.preventDefault();
      var value = parseInt($(that.options.selectEl).val());
      if(value !== 'new'){
        that.editItem.apply(that, [parseInt($(that.options.selectEl).find(":selected").attr("data-index"))]);
      }
    });
    $(this.element).find('.' + this.options.name + '-add-collection-link').click(function(e){
      e.preventDefault();
      that.addNewItem.apply(that, []);
      $(that.options.selectEl).val('new');
    });
  }

  CollectionForm.prototype.onChoiceChange = function(){
    var index = $(this.options.selectEl).find(":selected").attr("data-index");
    if(index === 'new'){
      this.addNewItem();
    }
    else {
      this.displayItem(index);
    }
  };

  CollectionForm.prototype.displayItem = function(index){
    var data = this.options.collection[index];

    if(this.options.onDisplayItemSelect) {
      this.options.onDisplayItemSelect.apply(this, [index]);
    }

    $(this.options.editDisplayForm).collapse('show');
    $(this.options.newForm).collapse('hide');
    for(var key in data){
      var el = $(this.options.editDisplayForm).find('.' + key);
      if(el.length > 0){
        if(key === 'title' && data[key] !=""){
          $(el[0]).text(data[key] + '.');
        }else if(key === 'addr_2' && data[key] !=""){
        	$(el[0]).text(', '+ data[key]);
        }else if(key === 'phone' && data[key] !=""){
        	$(el[0]).text(data[key].replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
        }else {
          $(el[0]).text(data[key]);
        }
      }
    }
    if(this.options.name == "address"){
    	var addrSelected = $("#saved-address-dropdown").val();
			if(addrSelected == '') {
				$("#saved-address-dropdown option:selected").text("Nothing Selected");
			}
    	$("#shippingMethodsContainer").load(localeName+"/checkout/includes/shippingMethod.jsp?selectedAddress="+ addrSelected, function(){
    		var selShipMethod = $("#shipping-form .shipping-method:checked").val();
    		if(selShipMethod == undefined || selShipMethod == ""){
    			$("#shipping-form .shipping-method").first().click();
    		}
    	});
    }

  };

  CollectionForm.prototype.addNewItem = function(){
    $(this.options.editDisplayForm).collapse('hide');
    if(this.options.editForm !== this.options.newForm){
      $(this.options.editForm).collapse('hide');
    }
    $(this.options.newForm).collapse('show');
    $(this.options.newForm).find('.toggle-add-edit').text(this.options.newTitle);
    if(this.options.onNewItemSelect){
      this.options.onNewItemSelect.apply(this, []);
    }
    this.options.populateForm.apply(this, [{}, this.options.newForm]);
    $($(this.options.newForm).closest('form')).parsley().reset();
  };

  CollectionForm.prototype.editItem = function(index){
    $(this.options.newForm).collapse('hide');
    $(this.options.editDisplayForm).collapse('hide');
    $(this.options.editForm).collapse('show');
    if(this.options.onEditableItemSelect) {
      this.options.onEditableItemSelect.apply(this, []);
    }
    $($(this.options.editForm).closest('form')).parsley().reset();
    $(this.options.editForm).find('.toggle-add-edit').text(this.options.editTitle);
    this.options.populateForm.apply(this, [this.options.collection[index], this.options.editForm]);
  };

  CollectionForm.prototype.populateSelect = function(choices){
    var that = this;
    for(var i = 0; i < choices.length; i++){
     var isSelected = that.options.isSelectedValue.apply(that, [i]);
     if(isSelected){
    	 $(that.options.selectEl).append($('<option selected="selected"></option>').attr('data-index', i)
       		  .val(that.options.selectValue.apply(that, [i]))
       		  .text(that.options.selectText.apply(that, [i])));
     }else{
    	 $(that.options.selectEl).append($('<option></option>').attr('data-index', i)
       		  .val(that.options.selectValue.apply(that, [i]))
       		  .text(that.options.selectText.apply(that, [i])));
     }

    }

    $(that.options.selectEl)
      .append($('<option></option>')
      .attr('data-index', 'new')
      .val('new')
      .text(this.options.addNewItemText));
			if(mobileRequest == 'false') {
				$(that.options.selectEl).selectpicker('refresh');
			}
  };

  $(function(){
    $.fn.collectionForm = function(options) {
      if (this.length) {
        return this.each(function(){
          var collectionForm = new CollectionForm(this, options);
          $.data(this, 'collection-form', collectionForm);
        });
      }
    };
  });
})($);

'use strict';

$(function(){
  $.fn.isInViewPort = function(offset) {
    var $window = $(window);
    var docViewTop = $window.scrollTop();
    var elemTop = this.offset() ? this.offset().top : 0;

    return (elemTop <= (docViewTop + $(window).height() + offset));
  };
});

/*!
 * The MIT License
 *
 * Copyright (c) 2012 James Allardice
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

( function ( global ) {

  'use strict';

  //
  // Test for support. We do this as early as possible to optimise for browsers
  // that have native support for the attribute.
  //

  var test = document.createElement('input');
  var nativeSupport = test.placeholder !== void 0;

  global.Placeholders = {
    nativeSupport: nativeSupport,
    disable: nativeSupport ? noop : disablePlaceholders,
    enable: nativeSupport ? noop : enablePlaceholders
  };

  if ( nativeSupport ) {
    return;
  }

  //
  // If we reach this point then the browser does not have native support for
  // the attribute.
  //

  // The list of input element types that support the placeholder attribute.
  var validTypes = [
    'text',
    'search',
    'url',
    'tel',
    'email',
    'password',
    'number',
    'textarea'
  ];

  // The list of keycodes that are not allowed when the polyfill is configured
  // to hide-on-input.
  var badKeys = [

    // The following keys all cause the caret to jump to the end of the input
    // value.

    27, // Escape
    33, // Page up
    34, // Page down
    35, // End
    36, // Home

    // Arrow keys allow you to move the caret manually, which should be
    // prevented when the placeholder is visible.

    37, // Left
    38, // Up
    39, // Right
    40, // Down

    // The following keys allow you to modify the placeholder text by removing
    // characters, which should be prevented when the placeholder is visible.

    8, // Backspace
    46 // Delete
  ];

  // Styling variables.
  var placeholderStyleColor = '#ccc';
  var placeholderClassName = 'placeholdersjs';
  var classNameRegExp = new RegExp('(?:^|\\s)' + placeholderClassName + '(?!\\S)');

  // The various data-* attributes used by the polyfill.
  var ATTR_CURRENT_VAL = 'data-placeholder-value';
  var ATTR_ACTIVE = 'data-placeholder-active';
  var ATTR_INPUT_TYPE = 'data-placeholder-type';
  var ATTR_FORM_HANDLED = 'data-placeholder-submit';
  var ATTR_EVENTS_BOUND = 'data-placeholder-bound';
  var ATTR_OPTION_FOCUS = 'data-placeholder-focus';
  var ATTR_OPTION_LIVE = 'data-placeholder-live';
  var ATTR_MAXLENGTH = 'data-placeholder-maxlength';

  // Various other variables used throughout the rest of the script.
  var UPDATE_INTERVAL = 100;
  var head = document.getElementsByTagName('head')[ 0 ];
  var root = document.documentElement;
  var Placeholders = global.Placeholders;
  var keydownVal;

  // Get references to all the input and textarea elements currently in the DOM
  // (live NodeList objects to we only need to do this once).
  var inputs = document.getElementsByTagName('input');
  var textareas = document.getElementsByTagName('textarea');

  // Get any settings declared as data-* attributes on the root element.
  // Currently the only options are whether to hide the placeholder on focus
  // or input and whether to auto-update.
  var hideOnInput = root.getAttribute(ATTR_OPTION_FOCUS) === 'false';
  var liveUpdates = root.getAttribute(ATTR_OPTION_LIVE) !== 'false';

  // Create style element for placeholder styles (instead of directly setting
  // style properties on elements - allows for better flexibility alongside
  // user-defined styles).
  var styleElem = document.createElement('style');
  styleElem.type = 'text/css';

  // Create style rules as text node.
  var styleRules = document.createTextNode(
    '.' + placeholderClassName + ' {' +
      'color:' + placeholderStyleColor + ';' +
    '}'
  );

  // Append style rules to newly created stylesheet.
  if ( styleElem.styleSheet ) {
    styleElem.styleSheet.cssText = styleRules.nodeValue;
  } else {
    styleElem.appendChild(styleRules);
  }

  // Prepend new style element to the head (before any existing stylesheets,
  // so user-defined rules take precedence).
  head.insertBefore(styleElem, head.firstChild);

  // Set up the placeholders.
  var placeholder;
  var elem;

  for ( var i = 0, len = inputs.length + textareas.length; i < len; i++ ) {

    // Find the next element. If we've already done all the inputs we move on
    // to the textareas.
    elem = i < inputs.length ? inputs[ i ] : textareas[ i - inputs.length ];

    // Get the value of the placeholder attribute, if any. IE10 emulating IE7
    // fails with getAttribute, hence the use of the attributes node.
    placeholder = elem.attributes.placeholder;

    // If the element has a placeholder attribute we need to modify it.
    if ( placeholder ) {

      // IE returns an empty object instead of undefined if the attribute is
      // not present.
      placeholder = placeholder.nodeValue;

      // Only apply the polyfill if this element is of a type that supports
      // placeholders and has a placeholder attribute with a non-empty value.
      if ( placeholder && inArray(validTypes, elem.type) ) {
        newElement(elem);
      }
    }
  }

  // If enabled, the polyfill will repeatedly check for changed/added elements
  // and apply to those as well.
  var timer = setInterval(function () {
    for ( var i = 0, len = inputs.length + textareas.length; i < len; i++ ) {
      elem = i < inputs.length ? inputs[ i ] : textareas[ i - inputs.length ];

      // Only apply the polyfill if this element is of a type that supports
      // placeholders, and has a placeholder attribute with a non-empty value.
      placeholder = elem.attributes.placeholder;

      if ( placeholder ) {

        placeholder = placeholder.nodeValue;

        if ( placeholder && inArray(validTypes, elem.type) ) {

          // If the element hasn't had event handlers bound to it then add
          // them.
          if ( !elem.getAttribute(ATTR_EVENTS_BOUND) ) {
            newElement(elem);
          }

          // If the placeholder value has changed or not been initialised yet
          // we need to update the display.
          if (
            placeholder !== elem.getAttribute(ATTR_CURRENT_VAL) ||
            ( elem.type === 'password' && !elem.getAttribute(ATTR_INPUT_TYPE) )
          ) {

            // Attempt to change the type of password inputs (fails in IE < 9).
            if (
              elem.type === 'password' &&
              !elem.getAttribute(ATTR_INPUT_TYPE) &&
              changeType(elem, 'text')
            ) {
              elem.setAttribute(ATTR_INPUT_TYPE, 'password');
            }

            // If the placeholder value has changed and the placeholder is
            // currently on display we need to change it.
            if ( elem.value === elem.getAttribute(ATTR_CURRENT_VAL) ) {
              elem.value = placeholder;
            }

            // Keep a reference to the current placeholder value in case it
            // changes via another script.
            elem.setAttribute(ATTR_CURRENT_VAL, placeholder);
          }
        }
      } else if ( elem.getAttribute(ATTR_ACTIVE) ) {
        hidePlaceholder(elem);
        elem.removeAttribute(ATTR_CURRENT_VAL);
      }
    }

    // If live updates are not enabled cancel the timer.
    if ( !liveUpdates ) {
      clearInterval(timer);
    }
  }, UPDATE_INTERVAL);

  // Disabling placeholders before unloading the page prevents flash of
  // unstyled placeholders on load if the page was refreshed.
  addEventListener(global, 'beforeunload', function () {
    Placeholders.disable();
  });

  //
  // Utility functions
  //

  // No-op (used in place of public methods when native support is detected).
  function noop() {}

  // Avoid IE9 activeElement of death when an iframe is used.
  //
  // More info:
  //  - http://bugs.jquery.com/ticket/13393
  //  - https://github.com/jquery/jquery/commit/85fc5878b3c6af73f42d61eedf73013e7faae408
  function safeActiveElement() {
    try {
      return document.activeElement;
    } catch ( err ) {
      console.log(err);
    }
  }

  // Check whether an item is in an array. We don't use Array.prototype.indexOf
  // so we don't clobber any existing polyfills. This is a really simple
  // alternative.
  function inArray( arr, item ) {
    for ( var i = 0, len = arr.length; i < len; i++ ) {
      if ( arr[ i ] === item ) {
        return true;
      }
    }
    return false;
  }

  // Cross-browser DOM event binding
  function addEventListener( elem, event, fn ) {
    if ( elem.addEventListener ) {
      return elem.addEventListener(event, fn, false);
    }
    if ( elem.attachEvent ) {
      return elem.attachEvent('on' + event, fn);
    }
  }

  // Move the caret to the index position specified. Assumes that the element
  // has focus.
  function moveCaret( elem, index ) {
    var range;
    if ( elem.createTextRange ) {
      range = elem.createTextRange();
      range.move('character', index);
      range.select();
    } else if ( elem.selectionStart ) {
      elem.focus();
      elem.setSelectionRange(index, index);
    }
  }

  // Attempt to change the type property of an input element.
  function changeType( elem, type ) {
    try {
      elem.type = type;
      return true;
    } catch ( e ) {
      // You can't change input type in IE8 and below.
      return false;
    }
  }

  function handleElem( node, callback ) {

    // Check if the passed in node is an input/textarea (in which case it can't
    // have any affected descendants).
    if ( node && node.getAttribute(ATTR_CURRENT_VAL) ) {
      callback(node);
    } else {

      // If an element was passed in, get all affected descendants. Otherwise,
      // get all affected elements in document.
      var handleInputs = node ? node.getElementsByTagName('input') : inputs;
      var handleTextareas = node ? node.getElementsByTagName('textarea') : textareas;

      var handleInputsLength = handleInputs ? handleInputs.length : 0;
      var handleTextareasLength = handleTextareas ? handleTextareas.length : 0;

      // Run the callback for each element.
      var len = handleInputsLength + handleTextareasLength;
      var elem;
      for ( var i = 0; i < len; i++ ) {

        elem = i < handleInputsLength ?
          handleInputs[ i ] :
          handleTextareas[ i - handleInputsLength ];

        callback(elem);
      }
    }
  }

  // Return all affected elements to their normal state (remove placeholder
  // value if present).
  function disablePlaceholders( node ) {
    handleElem(node, hidePlaceholder);
  }

  // Show the placeholder value on all appropriate elements.
  function enablePlaceholders( node ) {
    handleElem(node, showPlaceholder);
  }

  // Hide the placeholder value on a single element. Returns true if the
  // placeholder was hidden and false if it was not (because it wasn't visible
  // in the first place).
  function hidePlaceholder( elem, keydownValue ) {

    var valueChanged = !!keydownValue && elem.value !== keydownValue;
    var isPlaceholderValue = elem.value === elem.getAttribute(ATTR_CURRENT_VAL);

    if (
      ( valueChanged || isPlaceholderValue ) &&
      elem.getAttribute(ATTR_ACTIVE) === 'true'
    ) {

      elem.removeAttribute(ATTR_ACTIVE);
      elem.value = elem.value.replace(elem.getAttribute(ATTR_CURRENT_VAL), '');
      elem.className = elem.className.replace(classNameRegExp, '');

      // Restore the maxlength value. Old FF returns -1 if attribute not set.
      // See GH-56.
      var maxLength = elem.getAttribute(ATTR_MAXLENGTH);
      if ( parseInt(maxLength, 10) >= 0 ) {
        elem.setAttribute('maxLength', maxLength);
        elem.removeAttribute(ATTR_MAXLENGTH);
      }

      // If the polyfill has changed the type of the element we need to change
      // it back.
      var type = elem.getAttribute(ATTR_INPUT_TYPE);
      if ( type ) {
        elem.type = type;
      }

      return true;
    }

    return false;
  }

  // Show the placeholder value on a single element. Returns true if the
  // placeholder was shown and false if it was not (because it was already
  // visible).
  function showPlaceholder( elem ) {

    var val = elem.getAttribute(ATTR_CURRENT_VAL);

    if ( elem.value === '' && val ) {

      elem.setAttribute(ATTR_ACTIVE, 'true');
      elem.value = val;
      elem.className += ' ' + placeholderClassName;

      // Store and remove the maxlength value.
      var maxLength = elem.getAttribute(ATTR_MAXLENGTH);
      if ( !maxLength ) {
        elem.setAttribute(ATTR_MAXLENGTH, elem.maxLength);
        elem.removeAttribute('maxLength');
      }

      // If the type of element needs to change, change it (e.g. password
      // inputs).
      var type = elem.getAttribute(ATTR_INPUT_TYPE);
      if ( type ) {
        elem.type = 'text';
      } else if ( elem.type === 'password' && changeType(elem, 'text') ) {
        elem.setAttribute(ATTR_INPUT_TYPE, 'password');
      }

      return true;
    }

    return false;
  }

  // Returns a function that is used as a focus event handler.
  function makeFocusHandler( elem ) {
    return function () {

      // Only hide the placeholder value if the (default) hide-on-focus
      // behaviour is enabled.
      if (
        hideOnInput &&
        elem.value === elem.getAttribute(ATTR_CURRENT_VAL) &&
        elem.getAttribute(ATTR_ACTIVE) === 'true'
      ) {

        // Move the caret to the start of the input (this mimics the behaviour
        // of all browsers that do not hide the placeholder on focus).
        moveCaret(elem, 0);
      } else {

        // Remove the placeholder.
        hidePlaceholder(elem);
      }
    };
  }

  // Returns a function that is used as a blur event handler.
  function makeBlurHandler( elem ) {
    return function () {
      showPlaceholder(elem);
    };
  }

  // Returns a function that is used as a submit event handler on form elements
  // that have children affected by this polyfill.
  function makeSubmitHandler( form ) {
    return function () {

        // Turn off placeholders on all appropriate descendant elements.
        disablePlaceholders(form);
    };
  }

  // Functions that are used as a event handlers when the hide-on-input
  // behaviour has been activated - very basic implementation of the 'input'
  // event.
  function makeKeydownHandler( elem ) {
    return function ( e ) {
      keydownVal = elem.value;

      // Prevent the use of the arrow keys (try to keep the cursor before the
      // placeholder).
      if (
        elem.getAttribute(ATTR_ACTIVE) === 'true' &&
        keydownVal === elem.getAttribute(ATTR_CURRENT_VAL) &&
        inArray(badKeys, e.keyCode)
      ) {
        if ( e.preventDefault ) {
            e.preventDefault();
        }
        return false;
      }
    };
  }

  function makeKeyupHandler(elem) {
    return function () {
      hidePlaceholder(elem, keydownVal);

      // If the element is now empty we need to show the placeholder
      if ( elem.value === '' ) {
        elem.blur();
        moveCaret(elem, 0);
      }
    };
  }

  function makeClickHandler(elem) {
    return function () {
      if (
        elem === safeActiveElement() &&
        elem.value === elem.getAttribute(ATTR_CURRENT_VAL) &&
        elem.getAttribute(ATTR_ACTIVE) === 'true'
      ) {
        moveCaret(elem, 0);
      }
    };
  }

  // Bind event handlers to an element that we need to affect with the
  // polyfill.
  function newElement( elem ) {

    // If the element is part of a form, make sure the placeholder string is
    // not submitted as a value.
    var form = elem.form;
    if ( form && typeof form === 'string' ) {

      // Get the real form.
      form = document.getElementById(form);

      // Set a flag on the form so we know it's been handled (forms can contain
      // multiple inputs).
      if ( !form.getAttribute(ATTR_FORM_HANDLED) ) {
        addEventListener(form, 'submit', makeSubmitHandler(form));
        form.setAttribute(ATTR_FORM_HANDLED, 'true');
      }
    }

    // Bind event handlers to the element so we can hide/show the placeholder
    // as appropriate.
    addEventListener(elem, 'focus', makeFocusHandler(elem));
    addEventListener(elem, 'blur', makeBlurHandler(elem));

    // If the placeholder should hide on input rather than on focus we need
    // additional event handlers
    if (hideOnInput) {
      addEventListener(elem, 'keydown', makeKeydownHandler(elem));
      addEventListener(elem, 'keyup', makeKeyupHandler(elem));
      addEventListener(elem, 'click', makeClickHandler(elem));
    }

    // Remember that we've bound event handlers to this element.
    elem.setAttribute(ATTR_EVENTS_BOUND, 'true');
    elem.setAttribute(ATTR_CURRENT_VAL, placeholder);

    // If the element doesn't have a value and is not focussed, set it to the
    // placeholder string.
    if ( hideOnInput || elem !== safeActiveElement() ) {
      showPlaceholder(elem);
    }
  }

}(this) );

( function ( $, global ) {

  'use strict';

  var originalValFn = $.fn.val;
  var originalPropFn = $.fn.prop;

  if ( !global.Placeholders.nativeSupport ) {

    $.fn.val = function ( val ) {
      var originalValue = originalValFn.apply(this, arguments);
      var placeholder = this.eq(0).data('placeholder-value');
      if (
        val === undefined &&
        this.eq(0).data('placeholder-active') &&
        originalValue === placeholder
      ) {
        return '';
      }
      return originalValue;
    };

    $.fn.prop = function ( name, val ) {
      if (
        val === undefined &&
        this.eq(0).data('placeholder-active') &&
        name === 'value'
      ) {
        return '';
      }
      return originalPropFn.apply(this, arguments);
    };
  }
}(jQuery, this) );

/*
* jQuery Simply Countable plugin
* Provides a character counter for any text input or textarea
*
* @version  0.4.2
* @homepage http://github.com/aaronrussell/jquery-simply-countable/
* @author   Aaron Russell (http://www.aaronrussell.co.uk)
*
* Copyright (c) 2009-2010 Aaron Russell (aaron@gc4.co.uk)
* Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
* and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
*/

'use strict';
(function($){

  $.fn.simplyCountable = function(options){
    options = $.extend({
      counter: '#counter',
      countType: 'characters',
      maxCount: 140,
      strictMax: false,
      countDirection: 'down',
      safeClass: 'safe',
      overClass: 'over',
      thousandSeparator: ',',
      onOverCount: function(){},
      onSafeCount: function(){},
      onMaxCount: function(){}
    }, options);

    var navKeys = [33, 34, 35, 36, 37, 38, 39, 40];

    return $(this).each(function(){

      var countable = $(this);
      var counter = $(options.counter);
      if (!counter.length) { return false; }

      var countCheck = function(){

        var count;
        var revCount;

        var reverseCount = function(ct){
          return ct - (ct * 2) + options.maxCount;
        };

        var countInt = function(){
          return (options.countDirection === 'up') ? revCount : count;
        };

        var numberFormat = function(ct){
          var prefix = '';
          if (options.thousandSeparator){
            ct = ct.toString();
            // Handle large negative numbers
            if (ct.match(/^-/)) {
              ct = ct.substr(1);
              prefix = '-';
            }
            for (var i = ct.length - 3; i > 0; i -= 3){
              ct = ct.substr(0, i) + options.thousandSeparator + ct.substr(i);
            }
          }
          return prefix + ct;
        };

        var changeCountableValue = function(val){
          countable.val(val).trigger('change');
        };

        /* Calculates count for either words or characters */
        if (options.countType === 'words'){
          count = options.maxCount - $.trim(countable.val()).split(/\s+/).length;
          if (countable.val() === ''){ count += 1; }
        }
        else { count = options.maxCount - countable.val().length; }
        revCount = reverseCount(count);

        /* If strictMax set restrict further characters */
        if (options.strictMax && count <= 0){
          var content = countable.val();
          if (count < 0) {
            options.onMaxCount(countInt(), countable, counter);
          }
          if (options.countType === 'words'){
            var allowedText = content.match( new RegExp('\\s?(\\S+\\s+){' + options.maxCount + '}') );
            if (allowedText) {
              changeCountableValue(allowedText[0]);
            }
          }
          else { changeCountableValue(content.substring(0, options.maxCount)); }
          count = 0;
          revCount = options.maxCount;
        }

        counter.text(numberFormat(countInt()));

        /* Set CSS class rules and API callbacks */
        if (!counter.hasClass(options.safeClass) && !counter.hasClass(options.overClass)){
          if (count < 0){ counter.addClass(options.overClass); }
          else { counter.addClass(options.safeClass); }
        }
        else if (count < 0 && counter.hasClass(options.safeClass)){
          counter.removeClass(options.safeClass).addClass(options.overClass);
          options.onOverCount(countInt(), countable, counter);
        }
        else if (count >= 0 && counter.hasClass(options.overClass)){
          counter.removeClass(options.overClass).addClass(options.safeClass);
          options.onSafeCount(countInt(), countable, counter);
        }

      };

      countCheck();

      countable.on('keyup blur paste', function(e) {
        switch(e.type) {
          case 'keyup':
            // Skip navigational key presses
            if ($.inArray(e.which, navKeys) < 0) { countCheck(); }
            break;
          case 'paste':
            // Wait a few miliseconds if a paste event
            setTimeout(countCheck, (e.type === 'paste' ? 5 : 0));
            break;
          default:
            countCheck();
            break;
        }
      });

    });
  };
})(jQuery);

/*
 * Tabs Panel plugin
 */
'use strict';
(function() {
  function TabsPanel(element){
    this.element = element;

    /* CSS CLASSES */
    var NAV_ITEM_SELECTOR = '.tabs-panel__nav-item',
    NAV_ITEM_ACTIVE_CLASS = 'tabs-panel__nav-item--active',
    TAB_PANEL_ITEM_SELECTOR = '.tabs-panel__body-item',
    TAB_PANEL_ACTIVE_CLASS = 'tabs-panel__body-item--active';

    /* JS WIDGET ELEMENTS */
    var $tabsPanelNav = $(this.element).find('.js-tabsPanelNav'),
    $tabsPanelBody = $(this.element).find('.js-tabsPanelBody');

    /* Tab click event */
    $tabsPanelNav.children().each(function() {
      $(this).find('a').click(function(e) {
        e.preventDefault();

        if (!$(this).parent(NAV_ITEM_SELECTOR).hasClass(NAV_ITEM_ACTIVE_CLASS)) {

          var target = $(this).attr('href');

          /* update the active states */
          $tabsPanelNav.find(NAV_ITEM_SELECTOR)
                        .removeClass(NAV_ITEM_ACTIVE_CLASS);

          $(this).parent(NAV_ITEM_SELECTOR).addClass(NAV_ITEM_ACTIVE_CLASS);

          $tabsPanelBody.find(TAB_PANEL_ITEM_SELECTOR)
                          .removeClass(TAB_PANEL_ACTIVE_CLASS);

          $tabsPanelBody.find(target).addClass(TAB_PANEL_ACTIVE_CLASS);
        }
      });
    });
  }

  $(function(){
    $.fn.tabsPanel = function() {
      if (this.length) {
        return this.each(function(){
          var tabsPanel = new TabsPanel(this);
          $.data(this, 'tabs-panel', tabsPanel);
        });
      }
    };
  });

})($);

/**
 * Slider and Collapse Wizards for the Checkout process
 *
 * These wizards are exposed to the user via a jQuery extension, and are initialized like this:
 *
 * $('.wizard').wizard(options);
 *
 * Several options are required to make the wizard work.  These are:
 * {
 *   backLink: jQuery select of any dom elements that can trigger a backwards move of the wizard
 *   previousPage: URL of wherer the user should go in the case of a back button click on the first step
 *   steps: An array of the steps the wizard should show.  Each step is further configured like so:
 *     {
 *        form: The jQuery selector of the form in the step.  This will be the form that is
 *              automatically parsley validated on step transition
 *        onStepComplete: A function to be run during a transition from this step to the next step.
 *                        This function *must* return a 'Promise' object (and resolve/reject it based on some criteria)
 *        onStepShown: Simliar to onStepComplete but run right after a transition to a step (thus on its initial display)
 *                     This function also has to return a 'Promise'.
 *     }
 *    slick: JSON object configuring a slick carousel.
 *    onWizardComplete: Function that is run after all steps are complete. This can be used to
 *                    take the user to wherever they need to go after the wizard is done.
 *
 *                    This function *must* return a 'Promise object'
 * }
 */

'use strict';

$(function(){
  $.fn.wizard = function(options) {
    if (this.length) {
      return this.each(function(){
        var wizard;
        if($(window).width() <= window.KOR.breakpoints.xs) {
          wizard = new SliderWizard(this, options);
        }
        else {
          wizard = new CollapseWizard(this, options);
        }
        $.data(this, 'wizard', wizard);
      });
    }
  };
});


//Base class from which the SliderWizard and CollapseWizards inherit
function BaseWizard(element, options){
  var that = this;
  this.element = element;
  this.$element = $(element);

  this.$element.find('.panel').removeClass('current');
  this.$element.find('.panel').removeClass('complete');

  this.$panelGroup = this.$element.find('.panel-group');
  this.$panelCollapse = this.$element.find('.kor-panel-collapse');

  if(this.$panelGroup.hasClass('slick-initialized')) {
    this.$panelGroup.slick('unslick');
  }

  this.options = options;

  if(options && options.steps){
    this.runStepShownHook(options.needToLoadStep);
    this.currentStep = options.needToLoadStep;
  }else{
	  this.currentStep = 0;
  }

  if(options && options.onWizardComplete){
    $('.wizard-complete').unbind('click');
    $('.wizard-complete').click(function(event){
      that.onWizardComplete.apply(that, [event]);
    });
  }

  $('.step-number').click(function(e){
    e.preventDefault();
  });


}

/**
 * Common functionality run during step transitions
 * @param {number} index - The destination step of transition
 * @param {number} target (optional) The dom element that triggered the transition
 *
 * @return {promise} Either successful or rejected promose.
 */

BaseWizard.prototype.beforeShowingStep = function(index, target, isEdit){
  var deferred = $.Deferred();
  var that = this;
  var $destination = $(that.stepElement(index));

  //Going backwards in the wizard is always successful
  if($($(".panel").get(this.currentStep)).attr("data-submitvalidate") == "false"){

  }else if(isEdit || (index < this.currentStep)){
    $($destination.closest('.panel')).removeClass('complete');
    this.currentStep = index;
    this.setStepFocus();
    deferred.resolve();
  }
  else {
    //perform parsley form validation
    var valid = true;
    var currentStep = this.options.steps[this.currentStep];
    if((currentStep.form && document.location.href.indexOf('novalidate') < 0)) {
     // form custom validation
	  var custvalid = $(target).closest('form').find('.parsley-custom_error');
	  if(custvalid.length > 0){
		valid = false;
	  }else{
		valid = $(currentStep.form).parsley().validate();
	  }
    }

    //form validation succesfull
    if(valid){
      var ladda;
      if(target && $(target).hasClass('ladda-button')){
        ladda = Ladda.create(target);
        ladda.start();
      }
      //run any step complete hooks (this would run any supplied ajax requests, etc..)
      currentStep.onStepComplete(target).done(function(result){
        //step transition successful, move on to next step
        that.currentStep = index;
        if(ladda) {
          ladda.stop();
        }
        that.setStepFocus();
        deferred.resolve(result);
      }).fail(function(error){
        //user supplied hook failed
        if(ladda){
          ladda.stop();
        }
        deferred.reject(error);
      });
    }
    //form validation failed
    else {
      deferred.reject({parsley: false});
    }
  }

  return deferred.promise();
};

/**
 * Utiliy method that returns the panel container for a particular step
 * @param {number} index
 * @return {DomElement} a kor-collapse-panel
 */
BaseWizard.prototype.stepElement = function(index){
  return this.$element.find('.kor-panel-collapse').toArray()[index];
};

/**
 * Utility method returns the step identifier that an element points to.  This href is used
 * to update the url during step transitions and also to scroll to the right place after
 * step transitions.
 * @param {clickEvent} event that is triggering a possible step transition
 * @return {String} some href ('payment','shipping', ect..)
 */
BaseWizard.prototype.eventTarget = function(event){
  return $(event.target).attr('href') || $($(event.target).parent()).attr('href');
};

/**
 * Utility method that finds the dom element of a whole step based on a string identifier
 * (the string identifier may come from the 'eventTarget' method)
 * @param {String} string identifier of step
 * @return {DomElement} dom element of step
 */
BaseWizard.prototype.nextStep = function(target){
  return $('.kor-panel-collapse').toArray().indexOf($(target + '-step')[0]);
};

/**
 * This method forwards the wizard to some non initial step.  The use case
 * is when the page is loaded and we want to show the user the 2nd, 3rd, ect.. step
 * in the wizard.  The destination is derived from a hash in the url.
 * @param {Function} The transition function to call when transitioning between steps.  This is usually
 *                   the transition function of the child wizard object (SliderWizard or CollapseWizard).
 */
BaseWizard.prototype.fastForward = function(fn){
  var that = this;
  var goToStep = this.nextStep(window.location.hash);
  function loop(index){
    fn.apply(that, [index]).then(function(){
      if(that.currentStep < goToStep){
        loop.apply(that, [index + 1]);
      }
    });
  }

  if(goToStep && goToStep > 0){
    loop(1);
  }
};

/**
 * Runs any configured hook for an initial load of step.
 * @param {number} index of step
 */
BaseWizard.prototype.runStepShownHook = function(index){
  this.options.steps[index].onStepShown();
};

/**
 * Runs a configured hook when the user has succesfully passed through all the wizard steps.
 *
 * @param {Event} Event that triggered this action (might be a 'proceed somewhere else button')
 */
BaseWizard.prototype.onWizardComplete = function(event){
  var ladda = Ladda.create(event.target);
  ladda.start();
  this.options.onWizardComplete().then(function(){
    /*console.log('success');*/
  }).fail(function(error){
    console.log(error);
    if(ladda){
      ladda.stop();
    }
  });
};

/**
 * Takes the wizard one step back.
 */
BaseWizard.prototype.back = function(){
  if(this.currentStep === 0){
    window.location.href = this.options.previousPage;
  }
};

/**
 * Utility method that animate scrolls the page to a given position.
 * @param {number} position to scroll to
 */
BaseWizard.prototype.scrollToPosition = function(position){
  $('html, body').animate({
    scrollTop: position
  }, 500);
};

/**
 * Utility method that gives us a step identifier hash based on a step index (by doing some dom traversing)
 * @param {number} index of step
 * @return {String} step identifier
 */
BaseWizard.prototype.hashForStep = function(index){
  return $($($('.panel-heading')[index]).find('[data-toggle="wizard"]')[0]).attr('href').substring(1);
};

/**
 * Focuses on an invisible element to perserve tabbing flow on showing of new step
 * without automatically highlighting the first tabable element for users who
 * arent actually tabbing.
 */
BaseWizard.prototype.setStepFocus = function(){
  var $element = $(this.stepElement(this.currentStep)).parent().find('.js-tab-index-focus');
  $element.focus();
};

/**
 * Decides whether a certain event (click of button, click of link, etc...) should initiate a step change.
 * Allows step changes from elements within a step panel (for example, a button at the end of the step to move onto the next step).
 * Does not allow clicking into future steps directly.
 *
 * @param {event} the event that is trying to trigger a step transition.
 * @return {Boolean} whether the transition is allowed to continue.
 */
BaseWizard.prototype.allowStepChange = function(event){
  var nextStep = this.nextStep(this.eventTarget(event));
  var actionFromStepNumber = $('.panel').toArray().indexOf($(event.target).closest('.panel')[0]);
  return (nextStep <= this.currentStep || actionFromStepNumber === this.currentStep);
};

/**
 * This subclass of BaseWizard is for the desktop and tablet checkout process.  Its a collapsable panel view.
 * This object should be initialized by using the jQuery extension
 *
 * $('.wizard').wizard(options);
 *
 * @param {DomElement} the root element for the whole wizard
 * @param {JSON object} options to configure wizard.
 * @return {}
 */
function CollapseWizard(element, options){
  BaseWizard.call(this, element, options);

  this.$panelGroup.unbind('shown.bs.collapse');
  this.$panelGroup.unbind('hidden.bs.collapse');

  var that = this;
  this.$element.find('[data-toggle="wizard"]').unbind('click');
  this.$element.find('[data-toggle="wizard"]').click(function(event){
    if(that.allowStepChange(event)){
    	$($(".panel").get(this.currentStep)).attr("data-submitvalidate", "true");
    	if($(event.target).hasClass("step-link-click")){
    		that.onToggle.apply(that, [that.nextStep(that.eventTarget(event)), event.target, true]);
    	}else{
    		that.onToggle.apply(that, [that.nextStep(that.eventTarget(event)), event.target]);
    	}
      window.location.hash = that.eventTarget(event);
      return false;
    }
    else {
      event.preventDefault();
    }
  });

  this.updateTabHeaders(options.needToLoadStep);
  this.updateStepEditLinks();
  that.updateCompleteStepClickHandlers();
  this.fastForward.apply(this, [that.onToggle]);

  $(this.options.backLink).unbind('click');
  $(this.options.backLink).click(function(event){
    that.onBack.apply(that, [event]);
  });
}

CollapseWizard.prototype = new BaseWizard();

/**
 * Takes the wizard one step back;
 */
CollapseWizard.prototype.onBack = function(){
  this.back();
  this.onToggle(this.currentStep - 1, undefined, true);
};

/**
 * This temporarily disables the user from tabbing on the page and is used during step transition
 * animations to prevent the user from tabbing somewhere illogical on the page before
 * the next set of fields in the next step are ready to be tabbed into.
 */
CollapseWizard.prototype.preventTab = function(){
  $(document).on('keydown', ':not(.selectpicker)', function( e ) {
    if( e.which === 9 ) {
      e.preventDefault();
    }
  });
};

/**
 * Undoes 'preventTab'
 */
CollapseWizard.prototype.enableTab = function(){
  $(document).off('keydown', ':not(.selectpicker)');
};

/**
 * This method preforms a step transition.  It does that by running all the common logic on step transition
 * defined in BaseWizard, and then also by preforming CollapseWizard specific transition logic.
 * @param {number} The next step the wizard is trying to show
 * @return {DomElement} The dom element that triggered the step transition.
 */
CollapseWizard.prototype.onToggle = function(nextStep, target, isEdit){
  var currentStep = this.currentStep;
  var $currentStep = $(this.stepElement(this.currentStep));
  var $destination = $(this.stepElement(nextStep));
  var that = this;

  $('.panel.complete').unbind('click');
  if(isEdit){
  	switch($($destination.closest('.panel')).attr("id")){
		case "shippingContainer" :
		$('#isEdit').val('true');
			var virtualOrder = $("#checkout_type_info").attr("data-is-virtual-order");
			$("#shippingContainer").attr("data-submitvalidate", "false");
			$("#shippingContainer").load(localeName+"/checkout/includes/containerShippingForm.jsp", function(){
				if(virtualOrder == "true"){
					wizardInit(1);
					if(dtmEnabledFlag == "true"){
					newCheckoutMkobj.enableDTMpayment();
					}
				}else{
					wizardInit(0);
				}
				shippingInit();
				initializeZipcode();
			  initializeAddress1();
				if(mobileRequest == 'false') {
					$("#shippingContainer").find('.selectpicker').selectpicker('refresh');
				}

			});
			break;
		case "billingContainer" :
			$("#billingContainer").attr("data-submitvalidate", "false");
			if(dtmEnabledFlag == "true" || adobeLaunchEnabledFlag == "true"){
			newCheckoutMkobj.enableDTMpayment();
			}
			$("#billingContainer").load(localeName+"/checkout/includes/containerBilling.jsp", function(){
				$("#payment-step").removeClass("hidden");
				billingInit();
				initializeBillingZipcode();
			  initializeBillingAddress1();
				if(mobileRequest == 'false') {
					$("#billingContainer").find('.selectpicker').selectpicker('refresh');
				}
			});
			break;
		}
    }

  return this.beforeShowingStep(nextStep, target, isEdit).done(function(){
    if(nextStep >= currentStep){
      setTimeout(function(){
        $($currentStep.closest('.panel')).addClass('complete');
        window.scrollTo(0, $(window.location.hash + '-step').offset().top - 70);
        that.updateStepEditLinks();
        that.updateCompleteStepClickHandlers();
        that.enableTab();
      }, 1000);
      $destination.removeClass('hidden');
      $currentStep.removeClass('hidden');
      $($destination.closest('.panel')).removeClass('complete');
      that.preventTab();
    }
    else {
      $currentStep.addClass('hidden');
      that.updateCompleteStepClickHandlers();
    }
    setTimeout(function(){
      that.scrollToPosition($(window.location.hash + '-step').offset().top - 70);
    }, 10);

    that.runStepShownHook(nextStep);
    that.updateTabHeaders(nextStep);
    that.updateStepEditLinks();
  }).fail(function(error){
		that.updateCompleteStepClickHandlers();
		var errortTypeDTM = "";
		var errorPageType = '';

		if($('#payment-step').is(':visible')){
			errorPageType = "checkout:billing";
			errortTypeDTM = "payment-form";
		} else if($('#shipping-step').is(':visible')){
			errorPageType = "checkout:shipping";
			errortTypeDTM = ($('#editShipping').val() === 'true') ? "Edit" : "Add" + " Shipping Address";
		}
		$('.parsley-errors-list li').each(function(){
			addToDTMTrackEvent(errortTypeDTM,$(this).text(),errorPageType);
		});
    console.log(error);
  });
};

/**
 * Adds a css class to the current wizard step so that it gets
 * the UI elements associated with being a current step
 * @param {number} Curent step
 */
CollapseWizard.prototype.updateTabHeaders = function(currentStep){
  $('.panel').removeClass('current');
  $('.panel').removeAttr('aria-hidden');
  var $panels = $('.panel').toArray();
  for(var i=0; i < $panels.length; i++){
	  if(i < currentStep){
		  $($panels[i]).addClass('complete');
		  $($panels[i]).find(".kor-panel-collapse").removeClass("hidden");
          $($panels[i]).attr("aria-hidden", "false");
          $($panels[i]).find("#headingOne .panel-title .step-link-click").attr("aria-hidden", "false");
          $($panels[i]).find("#headingOne .panel-title .pull-right").attr("aria-hidden", "false");
	  }else{
		  $($panels[i]).find(".kor-panel-collapse").addClass("hidden");
          $($panels[i]).attr("aria-hidden", "true");

      }
  }
  $($panels[currentStep]).addClass('current');
  $($panels[currentStep]).attr("aria-hidden", "false");
  $($panels[currentStep]).find(".kor-panel-collapse").removeClass("hidden");
};

/**
 * Updates the display of edit links in step headers (currently 'edit' for complete steps)
 * and 'Step x of x' for current/future steps
 */
CollapseWizard.prototype.updateStepEditLinks = function(){
  var $panels = $('.panel').toArray();
  for(var i = 0; i < $panels.length; i++){
    var $panel = $($panels[i]);
    if($panel.hasClass('complete')){
      $panel.find('.step-number').text('Edit');
      $panel.find('.step-number').addClass('underline');
    }
    else {
      $panel.find('.step-number').text('Step ' + (i + 1) + ' of ' + this.options.steps.length);
      $panel.find('.step-number').removeClass('underline');
    }
  }
};

/**
 * Sets click events on completed steps which open the step for edit.
 */
CollapseWizard.prototype.updateCompleteStepClickHandlers = function(){
  var that = this;

  setTimeout(function(){
    $('.panel.complete').unbind('click');
    $('.panel.complete').click(function(event){
      $(this).unbind('click');
      var index = $('.panel').toArray().indexOf($(event.target).closest('.panel')[0]);
      window.location.hash = that.hashForStep(index);
      that.onToggle(index, undefined, true);
    });
  }, 10);
};

/**
 * This subclass of BaseWizard is for the mobile slider view.
 * This object should be initialized by using the jQuery extension
 *
 * $('.wizard').wizard(options);
 *
 * @param {DomElement} the root element for the whole wizard
 * @param {JSON object} options to configure wizard.
 * @return {}
 */
function SliderWizard(element, options){
  BaseWizard.call(this, element, options);
  var that = this;

  this.$panelCollapse.removeClass('collapse');
  this.$panelGroup.slick(options.slick);

  this.$element.find('[data-toggle="wizard"]').unbind('click');
  this.$element.find('[data-toggle="wizard"]').click(function(event){
	  $($(".panel").get(this.currentStep)).attr("data-submitvalidate", "true");
	  var isNavButton = $(event.currentTarget).hasClass("mobile-nav-button");
	  if(isNavButton){
		  if($($(event.currentTarget).parent(".arrow-container")).hasClass("complete")){
		  	switch($(event.currentTarget).attr("href")){
				case "#shipping" :
					$("#shippingContainer").attr("data-submitvalidate", "false");
					$("#shippingContainer").load(localeName+"/checkout/includes/containerShippingForm.jsp", function(){
						wizardInit(0);
						shippingInit();
						initializeZipcode();
					    initializeAddress1();
					});
					break;
				case "#payment" :
					$("#billingContainer").attr("data-submitvalidate", "false");
					$("#billingContainer").load(localeName+"/checkout/includes/containerBilling.jsp", function(){
						$("#payment-step").removeClass("hidden");
						wizardInit(1);
						if(dtmEnabledFlag == "true" || adobeLaunchEnabledFlag == "true"){
						newCheckoutMkobj.enableDTMpayment();
						}
						billingInit();
						initializeBillingZipcode();
					    initializeBillingAddress1();
					});
					break;
		  	}
		  }else{
			  return;
		  }

	  }
    if(that.allowStepChange(event)){
      if((window.pageYOffset || document.documentElement.scrollTop) > 200){
        setTimeout(function(){
          that.scrollToPosition(70);
        });
        setTimeout(function(){
          that.changeSlides.apply(that, [that.nextStep(that.eventTarget(event)), true, event.target]);
        }, 600);
      }
      else {
        that.changeSlides.apply(that, [that.nextStep(that.eventTarget(event)), true, event.target]);
      }
    }
    return false;
  });

  $(document).on('shown.bs.collapse', function(){
    that.onSlideHeightChange();
  });

  $(document).on('hidden.bs.collapse', function(){
    that.onSlideHeightChange();
  });


  that.changeSlides.apply(that, [options.needToLoadStep, true, undefined, false]);
  that.$panelGroup[0].slick.setOption("speed",0);
  that.$panelGroup[0].slick.slickGoTo(options.needToLoadStep);
  that.runStepShownHook(options.needToLoadStep);
  that.onSlideHeightChange();
  this.updateSlideHeaders(options.needToLoadStep);
  this.$panelGroup.on('afterChange', function(event){
    event.preventDefault();
  });

  $(this.options.backLink).unbind('click');
  $(this.options.backLink).click(function(event){
    that.onBack.apply(that, [event]);
  });

  $(this.$element).find('.wizard-step-link').unbind('click');
  $(this.$element).find('.wizard-step-link').click(function(){
    that.changeSlides($(this).data('step'), true, undefined, true);
  });

  this.fastForward(that.changeSlides);


  setTimeout(function(){
    that.onSlideHeightChange();
  }, 500);
}

SliderWizard.prototype = new BaseWizard();

/**
 * Calls a slick carousel hook to recalculate height of current slide.  Used after side change to make sure
 * that the current slide has no extra whitespace and is tall enough to show all its content.
 * @param {}
 * @return {}
 */
SliderWizard.prototype.onSlideHeightChange = function(){
  if(this.$panelGroup[0].slick){
    this.$panelGroup[0].slick.setPosition();
    if($("#shippingContainer").length > 0) {
        $("#shippingContainer").removeAttr("role tabindex");
    }
    if($("#billingContainer").length > 0) {
        $("#billingContainer").removeAttr("role tabindex");
      }
      if($("#reviewContainer").length > 0) {
          $("#reviewContainer").removeAttr("role tabindex");
      }
  }
};

/**
 * This method moves the wizard from one step to another.
 * @param {number} Destination step
 * @param {boolean} Whether the url should be updated with the destination step hash (optional)
 * @param {DomElement} The dom element that triggered the transition (optional)
 */
SliderWizard.prototype.changeSlides = function(nextStep, updateUrl, target, isEdit){
  var $destination = $(this.stepElement(nextStep));
  var $currentStep = $(this.stepElement(this.currentStep));
  var that = this;
  var deferred = $.Deferred();
  $destination.removeClass('hidden');
  if(isEdit == true){
  	switch($($destination.closest('.panel')).attr("id")){
		case "shippingContainer" :
			$("#shippingContainer").attr("data-submitvalidate", "false");
			$("#shippingContainer").load(localeName+"/checkout/includes/containerShippingForm.jsp", function(){
				wizardInit(0);
				shippingInit();
				initializeZipcode();
			    initializeAddress1();
			});
			break;
		case "billingContainer" :
			$("#billingContainer").attr("data-submitvalidate", "false");
			$("#billingContainer").load(localeName+"/checkout/includes/containerBilling.jsp", function(){
				$("#payment-step").removeClass("hidden");
				wizardInit(1);
				if(dtmEnabledFlag == "true" || adobeLaunchEnabledFlag == "true"){
				newCheckoutMkobj.enableDTMpayment();
				}
				billingInit();
				initializeBillingZipcode();
			    initializeBillingAddress1();
			});
			break;
  		}
    }
  this.beforeShowingStep(nextStep, target).done(function(result){
    $($currentStep.closest('.panel')).addClass('complete');
    if($($currentStep.closest('.panel')).attr("data-submitvalidate") == "false"){
    	that.$panelGroup[0].slick.setOption("speed",0);
    }else{
    	that.$panelGroup[0].slick.setOption("speed",300);
    }
    that.$panelGroup[0].slick.slickGoTo(nextStep);
    window.setTimeout(function(){
      window.scrollTo(0, 70);
      if(updateUrl){
        window.location.hash = $destination.attr('id').replace('-step', '');
      }
      that.runStepShownHook(nextStep);
      deferred.resolve(result);
    }, 300);
    that.onSlideHeightChange();
    that.updateSlideHeaders(nextStep);
  }).fail(function(error){
    that.onSlideHeightChange();
    console.log(error);
    deferred.reject(error);
  });

  return deferred.promise();
};

/**
 * Updates the arrow style display on top of the mobile wizard, currently highlighting the current step
 * in orange, past steps in black and future steps in grey.
 * @param {number} currentStep
 */
SliderWizard.prototype.updateSlideHeaders = function(currentStep){
  var buttons = $('.mobile-nav').find('.arrow-container');
  buttons.removeClass('current');
  buttons.removeAttr('aria-hidden');
  $("#shippingContainer").removeAttr("role tabindex");
  $("#billingContainer").removeAttr("role tabindex");
  $("#reviewContainer").removeAttr("role tabindex");
  var buttonsArray = buttons.toArray();
  for(var i = 0; i < buttonsArray.length; i++){
    var $button = $(buttonsArray[i]);
    if(i < currentStep){
      $button.addClass('complete');
      $button.attr("aria-hidden", "false");
      $button.find('button').removeAttr("tabindex");
    }
    else if (i === currentStep){
      $button.removeClass('complete');
      $button.addClass('current');
      $button.attr("aria-hidden", "false");
      $button.find('button').removeAttr("tabindex");
    }
    else if(i > currentStep){
      $button.attr("aria-hidden", "true");
      $button.find('button').attr("tabindex", "-1");
    }
  }
};

/**
 * Moves the wizard a step back;
 */
SliderWizard.prototype.onBack = function(){
  this.back();
  this.changeSlides(this.currentStep - 1, true, undefined, true);
};

/**
 * Javascript that applies to the whole site (as opposed to specific pages)
 */

'use strict';
$(function(){

  window.setTimeout(function() {
    Placeholders.enable();
  }, 100);

  /* Seed the array of keys to allow for numbers-only inputs */
  var NUMBERS_INPUT_ARRAY = [];

  /* backspace key */
  NUMBERS_INPUT_ARRAY.push(8);

  /* delete key */
  NUMBERS_INPUT_ARRAY.push(46);

  /* tab key */
  NUMBERS_INPUT_ARRAY.push(9);

  /* standard number keys, 0-9 */
  for (var i = 48; i < 58; i++) {
      NUMBERS_INPUT_ARRAY.push(i);
  }

  /* numpad number keys, 0-9 */
  for (var j = 96; j < 106; j++) {
      NUMBERS_INPUT_ARRAY.push(j);
  }

  $('select').mousedown(function(){
    $('meta[name=viewport]').remove();
    $('head').append('<meta name="viewport" content="width=device-width, maximum-scale=1.0, user-scalable=0">');
    $(this).css('color', '#565656');
  });

  $('select').focusout(function(){
    $('meta[name=viewport]').remove();
    $('head').append('<meta name="viewport" content="width=device-width, initial-scale=yes">' );
    if($(this).val()){
      $(this).css('color', '#565656');
    }
    else {
      $(this).css('color', '#707070');
    }
  });

  // Setup Tooltips
  $('[data-toggle="tooltip"]').tooltip();


  // Setup Slick Carousel
  $('.responsive-carousel').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    adaptiveHeight: true,
    responsive: [{
        breakpoint: window.KOR.breakpoints.lg,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true
        }
      }, {
        breakpoint: window.KOR.breakpoints.md,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }, {
        breakpoint: window.KOR.breakpoints.xs,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: 'unslick'
      // instead of a settings object
    ]
  });

  // Setup Tabs Panels
  $('.js-tabsPanel').tabsPanel();

  $('[data-toggle="collapse"]').click(function (event) {
    var targetId = $(event.target).attr('href'),
        $targetEl = $(targetId);

    if($targetEl.hasClass('collapsing')){
      return;
    }

    var $iconEl = $('[data-icon-href="' + targetId + '"]');
    if($iconEl.hasClass('icon-expand')){
      $iconEl.removeClass('icon-expand');
      $iconEl.addClass('icon-collapse');
    }
    else if($iconEl.hasClass('icon-collapse')){
      $iconEl.removeClass('icon-collapse');
      $iconEl.addClass('icon-expand');
    }
    else if ($iconEl.hasClass('icon-open')) {
      $iconEl.removeClass('icon-open');
      $iconEl.addClass('icon-close-');
    }
    else if ($iconEl.hasClass('icon-close-')) {
      $iconEl.removeClass('icon-close-');
      $iconEl.addClass('icon-open');
    }
  });

  $('.js-btnDisabled').click(function(e) {
    e.preventDefault();
  });

  /* Set up validation for any form in any modal window */
  $('.js-korModal').on('show.bs.modal', function() {
    var $form = $(this).find('form');

    if ($form.length > 0) {
      $form[0].reset();
      console.log($form.find('.selectpicker').length);
      $form.find('.selectpicker').selectpicker('render');
      $form.parsley().reset();
    }
    Placeholders.enable();
  });

  /* Disable SHIFT key on certain inputs */
  $('.js-disableShift').keydown(function(event) {
    if(event.shiftKey) {
      event.preventDefault();
      return false;
    }
  });

  /* Disable ALT key + any other key on certain inputs */
  var altPressed = false;

  $('.js-disableAlt').keydown(function(event) {
    if(event.which === 18) {
      altPressed = true;
    } else if (altPressed) {
      event.preventDefault();
      return false;
    }
  }).keyup(function(event) {
    if(event.which === 18) {
      altPressed = false;
    }
  });

  /* Disable PASTE on certain inputs */
  $('.js-disablePaste').bind('paste', function (e) {
    e.preventDefault();
    return false;
  });

  $('.kor-disablePaste').bind('cut copy paste', function (e) {
    e.preventDefault();
    return false;
  });

  /* Initialize any character limit counters */
  $.each($('.js-charLimit').toArray(), function(index, obj){
    $(obj).simplyCountable({
      counter: $(obj).data('counter'),
      maxCount: $(obj).data('counter-max-length'),
      strictMax: true
    });

  });

  /* Restrict certain inputs to numbers only */
  $('.js-numberInput').keydown(function(e) {
      var k = e.which;

      if (!($.inArray(k, NUMBERS_INPUT_ARRAY) >= 0)) {
          e.preventDefault();
      }
  });

  $('.js-footer-email-signup-form').parsley();
  $('#js-store-finder-form').parsley();

  $('.nav-links-detail').on('show.bs.collapse', function(){
    $('.follow-us').removeClass('hidden');
    $('.social-summmary').addClass('hidden');
    $('.desktop-footer-toggle-icon').addClass('icon-collapse');
    $('.desktop-footer-toggle-icon').removeClass('icon-expand');
  });

  $('.nav-links-detail').on('hide.bs.collapse', function(){
    $('.follow-us').addClass('hidden');
    $('.social-summmary').removeClass('hidden');
    $('.desktop-footer-toggle-icon').removeClass('icon-collapse');
    $('.desktop-footer-toggle-icon').addClass('icon-expand');
  });

  window.onscroll = function () {
    var offset = $('#shopping-bag-container').length > 0 ? -150 : -50;
    if($('#page-footer').isInViewPort(offset)){
      $('.mobile-scroll-to-top').removeClass('opacity-hidden');
    }
    else {
      $('.mobile-scroll-to-top').addClass('opacity-hidden');
    }
  };

  $('.mobile-scroll-to-top').click(function(){
    $('html, body').animate({
      scrollTop: 0
    }, 500);
  });

  //custom parsley validators
  window.ParsleyValidator
    .addValidator('ccard', function (value, ccEl) {
      return $(ccEl).validateCreditCard().valid;
    }, 32)
    .addMessage('en', 'ccard', 'Please enter a valid Card Number.');

  //this was erased in the past, it needs to be here for password validation.
  window.ParsleyValidator
    .addValidator('korpassword', function (value) {
      return /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(value) && /^\S{6,20}$/.test(value);
    }, 32)
    .addMessage('en', 'korpassword', 'Please enter a valid Password.');

 /* window.ParsleyValidator
    .addValidator('korpassword', function (value) {
      return /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(value) && /^\S{6,20}$/.test(value);
    }, 32)
    .addMessage('en', 'korpassword', 'Please enter a valid Password.');*/

  window.ParsleyValidator
    .addValidator('fancyname', function (value) {
      return /^[a-zA-Z\s]*$/.test(value) && $.trim(value) === value;
    }, 32);

  /*waseem LYLT-381 30/10/2016*/
  window.ParsleyValidator.addValidator('birthday', function (value) {
	var month = $.trim($('#birth_month').val()), day = $.trim($('#birth_day').val());
	month = month ? month : 0;
	if (month == "" && day == "") {
		$('#birth_day').attr("data-parsley-validate-if-empty", "false");
		return true;
	}
	if(day > 0 || day <= 31){
		month = parseInt(month);
		day = parseInt(day);
		if((month < 1 || month > 12) || (day < 1 || day > 31)){
			return false;
		}
		if (month === 2) {
			return day <= 29;
	     } else if ((month === 4) || (month === 6) || (month === 9) || (month === 11)) {
	    	 return day <= 30;
	     } else {
	    	 return day <= 31;
	     }
		$('#birth_day').attr("data-parsley-validate-if-empty", "true");
	}
	$('#birth_day').attr("data-parsley-validate-if-empty", "false");
	return false;
  }, 32);

  /*waseem LYLTUAT-47 14/12/2017*/
  window.ParsleyValidator.addValidator('birthmonth', function (value) {
	var month = $.trim($('#birth_month').val()), day = $.trim($('#birth_day').val());
	if (month == "" && day == "") {
		$('#birth_day').attr("data-parsley-validate-if-empty", "false");
		return true;
	}
    if (month != '') {
    	var validres = /(0?[1-9]|1[012])$/.test(value);
    	return validres && $.trim(value) === value;
    }
    $('#birth_day').attr("data-parsley-validate-if-empty", "false");
    return false;
  }, 32);

  //hack to fix bootstrap ios modal issue
  //where clicking into inputs inside a modal causes the background to scroll instead of the modal itself.
  //https://github.com/twbs/bootstrap/issues/14839
  $('body').on('shown.bs.modal', function() {
    $('body').addClass('modal-open-fix');
  });

  $('body').on('hide.bs.modal', function() {
    $('body').removeClass('modal-open-fix');
  });
});

/**
 * Footer JS
 */

'use strict';
$(function(){
  $('.js-footer-email-signup-form').parsley();
  $('#js-store-finder-form').parsley();

  $('.nav-links-detail').on('show.bs.collapse', function(){
    $('.follow-us').removeClass('hidden');
    $('.social-summmary').addClass('hidden');
    $('.desktop-footer-toggle-icon').addClass('icon-collapse');
    $('.desktop-footer-toggle-icon').removeClass('icon-expand');
  });

  $('.nav-links-detail').on('hide.bs.collapse', function(){
    $('.follow-us').addClass('hidden');
    $('.social-summmary').removeClass('hidden');
    $('.desktop-footer-toggle-icon').removeClass('icon-collapse');
    $('.desktop-footer-toggle-icon').addClass('icon-expand');
  });

  window.onscroll = function () {
    var offset = $('#shopping-bag-container').length > 0 ? -150 : -50;
    if($('#page-footer').isInViewPort(offset)){
      $('.mobile-scroll-to-top').removeClass('opacity-hidden');
    }
    else {
      $('.mobile-scroll-to-top').addClass('opacity-hidden');
    }
  };

  $('.mobile-scroll-to-top').click(function(){
    $('html, body').animate({
      scrollTop: 0
    }, 500);
  });
});

/**
 * Header JS
 */

'use strict';
$(function(){
  var accountTooltipContent = '<ul class="header-account-tooltip">'+$(".header-account-tooltip-content").html()+'</ul>';
  var bopusTooltipContent=$(".bopus-tooltip").html();
  $('.js-account-link-desktop').tooltip({
    placement: 'bottom',
    html: true,
    container: $('.js-account-link-desktop'),
    title: accountTooltipContent,
    trigger: 'hover'
  });

	$('.stop-tablet-click').on('click', function(e){
		e.preventDefault();
	});

  //RESDGN-339 start
  $('body').on('click','.link-secondary.my-account-link.js-account-link-tablet a.link-primary',function(){
    window.location = $(this).attr('href');
  });

  $('body').click(function(evt){
      if($(evt.target).closest('.account-link-container').length){return;}
      $('.tooltip').hide();
  });

  $('.js-account-link-tablet').on('click',function(e) {
    if($(this).find('.tooltip:visible').length==0){
      $(this).find('.tooltip').eq(0).show();
     }
  });
  //RESDGN-339 end
  $('.js-account-link-tablet').tooltip({
    placement: 'bottom',
    html: true,
    container: $('.js-account-link-tablet'),
    title: accountTooltipContent,
    trigger: 'click'
  });
  /*<Waseem> <FRKSIT-378> Fixed on 19-09-2016 starts*/
  $('.pickup-info-details').each(function(key,value){
	  var currentObj = $(this);
	  var currentClass = "pickup-info-details-";
	  currentClass = currentClass+key;
	  currentObj.addClass(currentClass);
	  $('.'+currentClass).tooltip({
		    placement: 'bottom',
		    html: true,
		    container: $('.'+currentClass),
		    title: bopusTooltipContent,
		    trigger: 'manual'
		  }).click(function(e) {
			  $(this).tooltip('show');
			/*<sukraj> fix for FRKSIT-755 starts on 7/10/2016*/
			  var tooptipId = $(this).attr('aria-describedby');
			  var tipPos = $('#'+tooptipId).position().left;
			  var tipArrowPos = $('#'+tooptipId+' .tooltip-arrow').position().left;
			  if(tipPos > 0){
				  tipPos = tipPos-20;
				  tipArrowPos = (tipArrowPos+20);
			  }else{
				  tipPos = tipPos+20;
				  tipArrowPos = (tipArrowPos-20);
			  }
			  $('#'+tooptipId).css('left',tipPos);
			  $('#'+tooptipId+' .tooltip-arrow').css('left',tipArrowPos);
			/*<sukraj> fix for FRKSIT-755 ends on 7/10/2016*/
			  e.stopPropagation();
			  if($(e.target).is('.close-icon')){
			        $(this).tooltip('hide');
			    }
		  });
  });
  /*<Waseem> <FRKSIT-378> Fixed on 19-09-2016 ends*/
  /*$('.pickup-info-details').tooltip({
	    placement: 'bottom',
	    html: true,
	    container: $('.pickup-info-details'),
	    title: bopusTooltipContent,
	    trigger: 'click'
	  });*/

  /* var countrySelectorTooltipContent = $(".countryDropdownContent").html();

  $('.js-country-selector-tablet').tooltip({
    placement: 'bottom',
    html: true,
    container: $('.js-country-selector-tablet'),
    title: countrySelectorTooltipContent,
    trigger: 'click'
  });

  $('.js-country-selector-desktop').tooltip({
    placement: 'bottom',
    html: true,
    container: $('.js-country-selector-desktop'),
    title: countrySelectorTooltipContent,
    trigger: 'hover'
  });*/
});

'use strict';
$(function() {
  //wizard configuration
	if($(".checkout").length > 0){
		var expressCheckout =$("#checkout_type_info").attr("data-is-express-checkout");
		var virtualOrder = $("#checkout_type_info").attr("data-is-virtual-order");
		// [Added as part of MKEcho Paypal Release]
		var paypalCheckout = $("#checkout_type_info").attr("data-is-paypal-checkout");
		var payerIdPresent = $("#checkout_type_info").attr("data-is-payerIdPresent");
		if(expressCheckout == "true"){
			if(dtmEnabledFlag == "true" || adobeLaunchEnabledFlag == "true"){
		    	mkorsData.page.name="checkout:review";
				mkorsData.page.channel="checkout";
				mkorsData.page.type="checkout:review";
				mkorsData.page.siteSectionLevel2="checkout:review";
				mkorsData.page.siteSectionLevel3="checkout:review";
				if(mkorsData.page.errorMessage != undefined){
					delete mkorsData.page.errorMessage;
				}
				_satellite.track("Checkout review");
		    	}
			wizardInit(2);

			 /*<prashob> GWSIT-496 Fixed on 30-12-2015*/
					$("#review-gift-checkbox").each(function(){
						var currentObj = $(this);
						var extraInputField = currentObj.next("input");
						currentObj.next("input").remove();
						currentObj.closest(".checkbox").append(extraInputField);
					});
			/*<prashob> GWSIT-496 Fixed on 30-12-2015 ends*/



		}else if(virtualOrder == "true"){
			if(dtmEnabledFlag == "true" || adobeLaunchEnabledFlag == "true"){
		    	mkorsData.page.name="checkout:billing";
				mkorsData.page.channel="checkout";
				mkorsData.page.type="checkout:billing";
				mkorsData.page.siteSectionLevel2="checkout:billing";
				mkorsData.page.siteSectionLevel3="checkout:billing";
				if(mkorsData.page.errorMessage != undefined){
					delete mkorsData.page.errorMessage;
				}
				if(typeof _satellite !== 'undefined'){
				_satellite.track("Checkout Billing");
				}
		    	}
		    wizardInit(1);
			if(paypalCheckout == "true" && payerIdPresent == "false"){
				ajaxPayPalIntermediateFormSubmit($("form#payPalForm-removeCall"), loaderInitText, laddaBtn);
			}
			else if(paypalCheckout == "true"){
				var loaderInitText = $('#payment-form .ladda-button').text();
				$('#payment-form .ladda-button').text('Verifying payment');
				var laddaBtn =  Ladda.create(document.querySelector('#payment-form .ladda-button'));
				/*waseeem fix for ECOUAT-157 on 17/09/2016*/
				$('html, body').animate({
					   scrollTop: $('#payment-form').offset().top + 150
					 }, 300);
				 laddaBtn.start();
				 setTimeout(function(){
					 ajaxPayPalIntermediateFormSubmit($("form#payPalForm-getCall"), loaderInitText, laddaBtn);
				 },1000);
			}
		}else if(paypalCheckout == "true" && payerIdPresent == "false"){
				ajaxPayPalIntermediateFormSubmit($("form#payPalForm-removeCall"), loaderInitText, laddaBtn);
		}else if(paypalCheckout == "true"){
			//wizardInit(1);  TEST2101-41 change
			var loaderInitText = $('#payment-form .ladda-button').text();
			$('#payment-form .ladda-button').text('Verifying payment');
			var laddaBtn =  Ladda.create(document.querySelector('#payment-form .ladda-button'));
			/*waseeem fix for ECOUAT-157 on 17/09/2016*/
			$('html, body').animate({
				   scrollTop: $('#payment-form').offset().top + 150
				 }, 300);
			 laddaBtn.start();
			 setTimeout(function(){
				 ajaxPayPalIntermediateFormSubmit($("form#payPalForm-getCall"), loaderInitText, laddaBtn);
			 },1000);
		}
		else{
			wizardInit();
		}
	}
});

var korscheckoutobj = {};
korscheckoutobj = {

		  formRequest: function(d , formid){
			  var deferred = d;
				var localeName = $("#nonPrimaryLocale").val();
				if (localeName == null) {
					localeName = "";
				}
				var $form = '#'+formid;
				var form = $($form);
				var formId = formid;
				// Start : Fix for the defect # GWSIT-566. Leading and trailing spaces to be trimmed in the form fields.
				form.find("input").each(function(){
					var $self = $(this);
					$self.val($.trim($self.val()));
					$self.val($self.val().replace(/\t/g," "));
					$self.val($self.val().replace(/\s{2,}/g, " " ));
				});
				// End : Fix for the defect # GWSIT-566. Leading and trailing spaces to be trimmed in the form fields.
				korscheckoutobj.formDataPopulation(formId);
				//formClass = $(this).attr("class").split(" ")[1];
				var fieldsArray = form.serializeArray();
				fieldsArray.push({
					name : "formName",
					value : formId
				});
				//alert(formId);
				fieldsArray = $.grep(fieldsArray, function(n, i) {
					return n.name != "successUrl";
				});
				fieldsArray = $.grep(fieldsArray, function(n, i) {
					return n.name != "errorUrl";
				});
				var successUrl = form.find('#successUrl').val();
				var errorUrl = form.find('#errorUrl').val();
				var ajaxUrl = localeName + '/checkout/common/ajaxFormSubmit.jsp';
				/*<dattaprasad> Captcha implementaion for payment form Added on 09-10-2018 starts*/
				if(formid == "payment-form") {
					ajaxUrl = localeName + '/checkout/common/ajaxAddCreditCard.jsp';
				}
				jQuery.ajax({
					url : ajaxUrl,
					type : "post",
					data : fieldsArray,
					dataType : "json",
					cache : false,
					success : function(data) {
						$("#generic-error-message-container").addClass("hidden");
						$("#generic-error-message-container #generic-error-message").html('');
						if(data.result =='error'){
							/*<dattaprasad> ECB-12702 Added on 29-06-2017 starts*/
							if(dtmEnabledFlag == "true" || adobeLaunchEnabledFlag == "true"){
								if((data.formName == "payment_form") || (data.formName == "shipping_form") ){
									var errors = data.errors;
									var errorMsgForDtm = "";
									for(var i in errors){
										var propertyName = errors[i].propertyName;
										var message = errors[i].message ;
										if((errors[i].propertyName == "city") || (errors[i].propertyName == "state") || (errors[i].propertyName == "zip-code") ){
											errorMsgForDtm = errorMsgForDtm + errors[i].message + " ";
										}
									}
									if(errorMsgForDtm != ""){
	                                	var errortTypeDTM = "fieldErrorr";
	    								var errorMessageDTM = errorMsgForDtm;
	    								addToDTMTrackEvent(errortTypeDTM,errorMessageDTM);
	                                }
								}
								/*<%--ECB-15566 start --%>*/
								else if( ( (data.formName == 'reviewForm') || (data.formName == 'applePayOrderSubmitForm') ) && (data.firstNameAnonymousCheckFailed == true) ){
									//$('#shippingContainer .step-link-click').click();
									//$('#billingContainer .step-link-click').click();
									window.location.href = localeName+"/checkout/shoppingCart.jsp";
								}/*<%--ECB-15566 End --%>*/
							}
							/*<dattaprasad> ECB-12702 Added on 29-06-2017 ends*/
							korscheckoutobj.displayError(data, form, formid);
							return deferred.reject();
						}
						else{
							korscheckoutobj.renderAjaxSuccessCallBack(data, formid, successUrl);
							return deferred.resolve();
						}
					},
					error: function(xhr, ajaxOptions, thrownError) {
						newCheckoutMkobj.errorHandle(xhr, ajaxOptions, thrownError);
					}
				});

		  },
		  formDataPopulation: function(formId){
				switch (formId) {
					case "payment-form" :
						var creditCardCVV = $("input[name=cvv]:visible").val();
						if(creditCardCVV != undefined && creditCardCVV != ""){
							var inputElements = document.getElementsByTagName("input");
							document.getElementById("cCVV").value = creditCardCVV;

						}
						var creditCardHandleType = $("#creditCardHandleType").val();
						if(creditCardHandleType == 2 || creditCardHandleType == "2"){
							var cardName = $("#payment-form .card-edit-form").find("#card-name:visible").val();
							var cardExpiraton = $("#payment-form .card-edit-form").find("#payment-card-expiration:visible").val();
							if(cardExpiraton != undefined) {
								var cardExpiratonValues = cardExpiraton.split("/");
								$("#payment-form").find("#editExpirationMonth").val(cardExpiratonValues[0]);
								$("#payment-form").find("#editExpirationYear").val(cardExpiratonValues[1]);
							}
							$("#payment-form").find("#editNameOnCard").val(cardName);
						}else if((creditCardHandleType == 1 || creditCardHandleType == "1") && ($("#payment-form .card-new-form").length > 0)){
							var cardName = $("#payment-form .card-new-form").find("#card-name:visible").val();
							var cardNumber = $("#payment-form .card-new-form").find("#payment-card-number").val();
							var cardExpiraton = $("#payment-form .card-new-form").find("#payment-card-expiration:visible").val();
							if(cardExpiraton != undefined) {
								var cardExpiratonValues = cardExpiraton.split("/");
								$("#payment-form").find("#editExpirationMonth").val(cardExpiratonValues[0]);
								$("#payment-form").find("#editExpirationYear").val(cardExpiratonValues[1]);
							}
							$("#payment-form").find("#editNameOnCard").val(cardName);
							$("#payment-form").find("#editCreditCardNumber").val(cardNumber);
						}else {
							var cardName = $("#payment-form").find("#card-name:visible").val();
							var cardNumber = $("#payment-form").find("#payment-card-number").val();
							var cardExpiraton = $("#payment-form").find("#payment-card-expiration:visible").val();
							if(cardExpiraton != undefined) {
								var cardExpiratonValues = cardExpiraton.split("/");
								$("#payment-form").find("#editExpirationMonth").val(cardExpiratonValues[0]);
								$("#payment-form").find("#editExpirationYear").val(cardExpiratonValues[1]);
							}
							$("#payment-form").find("#editNameOnCard").val(cardName);
							$("#payment-form").find("#editCreditCardNumber").val(cardNumber);
						}
						break;

					case "shipping-form":
						var shipgrplist = $("#shipping-form").find("#shippingGrpList").val();
						var idsList = shipgrplist.split(",");
						var jsonobjValue = "";
						for (var i=0; i<idsList.length; i++){
							var firstNameID= "#"+idsList[i]+"_firstName";
							var lastNameID= "#"+idsList[i]+"_lastName";
							var emailID= "#"+idsList[i]+"_email";
							var cnrfEmailID= "#"+idsList[i]+"_cnrfEmail";
							var pickupType=$("input[name="+idsList[i]+"_selected_store]:checked");
							var firstName = $("#shipping-form").find(firstNameID).val();
							var lastName = $("#shipping-form").find(lastNameID).val();
							var email = $("#shipping-form").find(emailID).val();
							var cnrfEmail = $("#shipping-form").find(cnrfEmailID).val();
							var pickupTypeValue = $("#shipping-form").find(pickupType).val();
							var newval ='"'+idsList[i]+'" :{"firstName":"'+firstName+'","lastName":"'+lastName+'","email":"'+email+'","cnrfEmail":"'+cnrfEmail+'","pickupType":"'+pickupTypeValue+'"}';
							if(jsonobjValue == '' || jsonobjValue == null){
								jsonobjValue = newval;
							}
							else{
								jsonobjValue = jsonobjValue + "," + newval;
							}
						}
						var finalJsonobj = "{"+jsonobjValue+"}";
						$("#shipping-form").find("#pickpersonDetails").val(finalJsonobj);

						var maxCount = document.getElementById("max_count_value").value;
						var giftWrapValues = new Array();
						var giftWrapMessages = "";
						var inputElements = document.getElementsByTagName("input");
						for (i=0; i<maxCount; i++){
							var num = i+1;
							giftWrapValues[i] = $("input#desktop-toggle-note-"+num).is(":checked");
							if(i==0){
								giftWrapMessages = $("textarea#gift-text-"+num).val();
							}else{
								giftWrapMessages = giftWrapMessages + "@@@@"+ $("textarea#gift-text-"+num).val();
							}
						}
						document.getElementById("giftWrapOpt").value = giftWrapValues;
						document.getElementById("giftMessages").value = giftWrapMessages;

						break;
				}
			},
			renderAjaxSuccessCallBack: function(data, formId, successUrl){
				switch (formId) {
					case "shipping-form" :
						if(dtmEnabledFlag == "true" || adobeLaunchEnabledFlag == "true"){
						newCheckoutMkobj.enableDTMpayment();
						}
						$(".shipping-completed").load(localeName+"/checkout/includes/shippingFormInfo.jsp");
						$("#payment-shipping-info").load(localeName+"/checkout/includes/sameAsShippingInfo.jsp");
						$(".billingForm .promotionSectionForMobile").load(localeName+"/checkout/common/applyPromotionOnCheckoutForMobile.jsp?pageName=mobileCheckout&idName=billingPromotion");
						$("#billingContainer").attr("data-submitvalidate", "false");
						//$("#reviewContainer").load(localeName+"/checkout/includes/containerReviewForm.jsp");
						$("#miniCartSection").load(localeName+"/checkout/includes/checkOutCartLineItems.jsp");
						$("#miniCartSectionMobile").load(localeName+"/checkout/includes/checkOutCartLineItems.jsp");
						$("#billingContainer").load(localeName+"/checkout/includes/containerBilling.jsp", function(){
							$("#payment-step").removeClass("hidden");
							wizardInit(1);
							billingInit();
							initializeBillingZipcode();
						  initializeBillingAddress1();

							if(mobileRequest == 'false') {
							  $("#billingContainer").find('.selectpicker').selectpicker('refresh');
							}
						    /*<dattaprasad> GWSIT-496 Fixed on 22-12-2015 starts*/
						    var removeCheckboxExtraInputField = ['use-shipping-checkbox', 'mailing-list'];
							newCheckoutMkobj.removeExtraField(removeCheckboxExtraInputField);
							/*<dattaprasad> GWSIT-496 Fixed on 22-12-2015 ends*/
						});
						break;
					case "payment-form" :
						if(dtmEnabledFlag == "true" || adobeLaunchEnabledFlag == "true"){
						newCheckoutMkobj.enableDTMreview();
						}
						$(".shipping-completed").load(localeName+"/checkout/includes/shippingFormInfo.jsp");
						$(".billing-completed").load(localeName+"/checkout/includes/billingFormInfo.jsp", function(){
							korscheckoutobj.orderSummaryTaxInit();
							$("#apply-promo-container").addClass('hidden');
							 /*<dattaprasad> GWSIT-496 Fixed on 27-11-2015*/
							var removeCheckboxExtraInputField = ['review-gift-checkbox'];
							newCheckoutMkobj.removeExtraField(removeCheckboxExtraInputField);
	                        /*<dattaprasad> GWSIT-496 Fixed on 27-11-2015 ends*/
							$("#billingContainer").find(".step-number").removeClass("step-number").addClass("edit-paypal-btn");
						});

						break;
					case "order-review" :
						location.href = successUrl;
						return false;
						break;

					default :
						location.href = successUrl;
						return false;
						break;
				}
			},
			orderSummaryTaxInit : function(){
				$("#totalOrderSummary").load(localeName+"/checkout/includes/checkoutOrderTotalSummary.jsp?isShipping=false", function(){
					newCheckoutMkobj.promoToggle();		/*<dattaprasad> MKPROD-1747 Fixed on 08-12-2015*/
			  });
			},
			displayError: function (formResponseData , form, formId){
				var data = formResponseData.errors;
				var response = [];
				var formIds = {};
				switch (formId) {
					case "shipping-form" :
						if(dtmEnabledFlag == "true" || adobeLaunchEnabledFlag == "true"){
							window.omniture_errorCapture("shipping-form");
                         }
						formIds = addressFormIds;
						break;
					case "payment-form" :
						if(dtmEnabledFlag == "true" || adobeLaunchEnabledFlag == "true"){
							window.omniture_errorCapture("payment-form");
							var errortTypeDTM = "payment-form";
							var errorMessageDTM = data[0].message;
							var errorPageType = "checkout:billing";
							addToDTMTrackEvent(errortTypeDTM,errorMessageDTM,errorPageType);/*<Sukraj> WEBA-1293 Added on 18-09-2019*/
                         }
						formIds = billingAddressFormIds;
						break;
					case "order-review" :
						if(dtmEnabledFlag == "true" || adobeLaunchEnabledFlag == "true"){
							window.omniture_errorCapture("order-review");
                         }
						break;
					case "createAccountForm" :
						$("#createAccountForm .clearPassword").val("");
						formIds = createAccountFormIds;
						break;
				}

				for(var key in data){
					var ele = $(form).find('#'+formIds[data[key].propertyName]+":visible");
					if(ele.length > 0){
						response.item = '#'+ formIds[data[key].propertyName];
						response.message = data[key].message;
						//$(ele[0]).text(data[key]);
						//$(form).parsley().reset();
						/*<dattaprasad> GWUAT-146 Fixed on 11-11-2015*/
						var FieldInstance = $(ele).parsley(),
									errorName = 'custom_error';

						/**
						 * You'll probably need to remove the error first, so the error
						 * doesn't show multiple times
						 */
						window.ParsleyUI.removeError(FieldInstance, errorName);

						// now display the error
						window.ParsleyUI.addError(FieldInstance, errorName, response.message);
					}
					else{
						if(typeof formResponseData.outOfStockFlag == "undefined" || formResponseData.outOfStockFlag == false ){
							var errorMessage = $("#generic-error-message-container #generic-error-message").html();
							if(errorMessage == undefined || errorMessage == ""){
								errorMessage = data[key].message;
							}else{
								errorMessage  = errorMessage + "<br/>" + data[key].message;
							}

							 $("#generic-error-message-container #generic-error-message").html(errorMessage);
							 $("#generic-error-message-container").removeClass("hidden");
							 $("#generic-error-message-container .alert-message--error").removeClass("hidden").show();
							 /* baskar fixed for GWSIT-326 defect starts*/
							 // $('html, body').animate({
								//    scrollTop: $('#generic-error-message-container').offset().top
								//  }, 'slow');
						    /* baskar fixed for GWSIT-326 defect ends*/

								var errMsg = '';
								if(errorMessage != null && errorMessage != 'undefined' && errorMessage != ""){
									$('.korsvip-password-mismatch').removeClass("korsvip-hidden");
									if( errorMessage.search("Passwords") != -1 ) {
										$('.korsvip-left-content').show();
										$('.korsvip-right-content').show();
										$('.korsvip-duplicate-account').css("margin", "10px");
										$('#korsvip-join-button').addClass('disable').attr("disabled", true);
									} else {
										errMsg = $('.korsvip-duplicate-account').html();
										$('.korsvip-left-content').hide();
										$('.korsvip-right-content').hide();
										$('.korsvip-duplicate-account').removeClass("korsvip-hidden");
									}

									if(errMsg!=undefined && errMsg!='' && errMsg.length > 0) {
										addToDTMTrackEvent('Member Already exists',errMsg.trim(),'checkout:confirmation');
									}
								} else {
									$('.korsvip-welcome').removeClass("korsvip-hidden");
								}
						}
					}
					/*<dattaprasad> MKPROD-1646 Fixed on 23-12-2015 starts*/
					if(formId == 'shipping-form' && formIds[data[key].propertyName] == 'shipping-phone'){
						$(".address-edit-collection-link").trigger('click');
						setTimeout(function(){ $("#shipping-form").submit(); }, 500);
					}
					if(formId == 'payment-form' && (formIds[data[key].propertyName] == 'shipping-phone' || formIds[data[key].propertyName] =='email')){
						$(".billing-edit-collection-link").trigger('click');
						setTimeout(function(){ $("#payment-form").submit(); }, 500);
					}  /*<dattaprasad> MKPROD-1646 Fixed on 23-12-2015 ends*/
				} /* Added to address MKOPS-8416 : START */
				var repricingForTax = "false";
				if(formId == 'order-review'){

					if(typeof formResponseData.outOfStockFlag != "undefined" && formResponseData.outOfStockFlag == true){
						$("#reviewOutofstock-modal").modal("show");
					}else{
						korscheckoutobj.reloadOrderInformation(formId,repricingForTax);
					}
				}  /* Added to address MKOPS-8416 : END */
				if(formId == "removeOutofstockItems"){
					$(".checkout .shopping-bag-items-container .js-shoppingBagCount").html(formResponseData.updatedItemQuantity);
					$("#generic-success-message-container .alert-message__text p").html(formResponseData.successMessage);
					$("#generic-success-message-container").removeClass("hidden");
					$(".cart-link-container .shopping-bag-count").html(formResponseData.updatedItemQuantity);
					repricingForTax = "true";
					korscheckoutobj.reloadOrderInformation(formId,repricingForTax);
				}
				korscheckoutobj.removedisplayError(form , errorName)
			},
			reloadOrderInformation: function(formId,repricingForTax){
				var expressCheckout =$("#checkout_type_info").attr("data-is-express-checkout"), virtualOrder = $("#checkout_type_info").attr("data-is-virtual-order");
				if(virtualOrder != "true"){
					var selShipMethod = $("#shipping-form .shipping-method:checked").val();
					$.post(localeName+'/checkout/includes/updateShipMethod.jsp', {shipMethod : selShipMethod}, function(data) {
						$("#totalOrderSummary").load(localeName+"/checkout/includes/checkoutOrderTotalSummary.jsp?isShipping=false&isRepriceRequired=" + repricingForTax);
					});
				}
				$.ajax({
                    url:localeName + '/checkout/includes/checkOutCartLineItems.jsp',
                    type: "get",
                    cache: false,
                    success: function(data) {
                    	$("#miniCartSectionMobile").html(data);
                    	$("#miniCartSection").html(data);
                    	/*<dattaprasad> Analytics - Reqs for New Out of Stock Message ECB-13697 starts on 22-09-2017*/
                    	if($(".shoppingBagForCartLineItemDTM").length > 0 && formId == "removeOutofstockItems"){
                    		var shoppingBagForCartLineItemDTMObj = $("#miniCartSection .shoppingBagForCartLineItemDTM");
                    		checkForDTMEditOrCustomProductRemoval(shoppingBagForCartLineItemDTMObj);
                    	    $(".shoppingBagForCartLineItemDTMContainer").remove();
                    	}
                    	/*<dattaprasad> Analytics - Reqs for New Out of Stock Message ECB-13697 ends on 22-09-2017*/
                    }
				});
				$(".orderReviewAmount").load(localeName+"/checkout/includes/youWillBeCharged.jsp");
			},
			removedisplayError: function(form , errorName){
				 /* if (!$(fieldInstance.$element).is(':visible')) {
					var ret = fieldInstance.validationResult = true;
					return ret;window.ParsleyUI.removeError(FieldInstance, errorName)
				  } */
				  if($(form).length > 0) {
					$(form).parsley().on('field:validated', function(FieldInstance){
						window.ParsleyUI.removeError(FieldInstance, errorName);
					});
				}
			},
			chekboxEnterKeyActive :function(){/*FRKSIT-469 <prashob> 23Sep2016 Starts*/
				$(document).on('keydown',"input[type='checkbox']", function(e){
							var hasFocus=$("input[type='checkbox']").is(":focus");
							var keyCode = e.which || e.keyCode;
							if( keyCode == 13  || keyCode == 32){
								if(hasFocus=== true){
									e.preventDefault();
									$(this).trigger("click");
								}
							}
				});

			}
	  };

function wizardInit(step){
	 var options = {
			    backLink: '#header-back-link',
			    previousPage: '/checkout/shoppingCart.jsp',
			    needToLoadStep : (step != undefined) ? step : 0,
			    steps: [
			      {
			        form: '#shipping-form',
			        onStepComplete: function(target){
			          var deferred = $.Deferred();
//			          setTimeout(function(){
//			            deferred.resolve();
//			          }, 1);
			          var formid = $(target).closest('form').attr('id')
			          korscheckoutobj.formRequest(deferred , formid);
			          return deferred.promise();
			        },
			        onStepShown: function(){
			          var deferred = $.Deferred();
			          $('.hidable-place-order').addClass('hidden');
			          /*<waseem> fix for MKFP-547 on 06/09/2016*/
			          $('.visibleOnlyShipping').show();
			          $('.sign-in-button').removeClass('hidden');
					  $("#apply-promo-container").removeClass('hidden');
					  if((dtmEnabledFlag == "true" || adobeLaunchEnabledFlag == "true") && step !=1){
						newCheckoutMkobj.enableDTMshipping();
					  }
			          deferred.resolve();
			          return deferred.promise();
			        }
			      },
			      {
			        form: '#payment-form',
			        onStepComplete: function(target){
			          var deferred = $.Deferred();
//			          setTimeout(function(){
//			            deferred.resolve();
//			          }, 1);
			          var formid = $(target).closest('form').attr('id');
			          	$(".captcha_error_msg").hide();
						/*if (typeof $("#google_captcha:visible #captchaEnabled").val() == "undefined") {
							korscheckoutobj.formRequest(deferred,formid);
						} else {
							if (window.grecaptcha.getResponse() != "") {
								korscheckoutobj.formRequest(deferred, formid);
							} else {
								$(".captcha_error_msg").show();
								 $('html, body').animate({
								   scrollTop: $('.captcha_error_msg').offset().top - 20
								 }, 'slow');
								deferred.reject({Captcha: "invalid"});
							}
						}*/
			          	if($("#google_captcha:visible #captchaEnabled").val() == "true") {
			          		if (window.grecaptcha.getResponse() != "") {
								korscheckoutobj.formRequest(deferred, formid);
							} else {
								$(".captcha_error_msg").show();
								 $('html, body').animate({
								   scrollTop: $('.captcha_error_msg').offset().top - 20
								 }, 'slow');
								deferred.reject({Captcha: "invalid"});
							}
			          	}else {
			          		korscheckoutobj.formRequest(deferred,formid);
			          	}
			          /*korscheckoutobj.formRequest(deferred , formid);*/
			          return deferred.promise();
			        },
			        onStepShown: function(){
			          var deferred = $.Deferred();
			          $('.hidable-place-order').addClass('hidden');
			          $('.sign-in-button').addClass('hidden');
			          $("#apply-promo-container").removeClass('hidden');
			          /*<waseem> fix for MKFP-547 on 06/09/2016*/
			          $('.visibleOnlyShipping').hide();
			          $("#billingContainer").removeAttr("role tabindex");
					  korscheckoutobj.chekboxEnterKeyActive();/*FRKSIT-469 <prashob> 23Sep2016 Starts*/
			          deferred.resolve();
			          return deferred.promise();
			        }
			      },
			      {
			        form: '#order-review',
			        onStepComplete: function(target){
			          var deferred = $.Deferred();
			          /*setTimeout(function(){
			            deferred.resolve();
			          }, 1);*/
			          var formid = $(target).closest('form').attr('id')
			          korscheckoutobj.formRequest(deferred , formid);
			          return deferred.promise();
			        },
			        onStepShown: function(){
			          var deferred = $.Deferred();
			          $('.hidable-place-order').removeClass('hidden');
			          $("#apply-promo-container").addClass('hidden');
			          /*added as part of MKOPS-8416 : START*/
			          $(".orderReviewAmount").load(localeName+"/checkout/includes/youWillBeCharged.jsp");
			         /* added as part of MKOPS-8416 : START*/
			          /*<waseem> fix for MKFP-547 on 06/09/2016*/
			          $("#reviewContainer").removeAttr("role tabindex");
			          $('.visibleOnlyShipping').hide();
			          deferred.resolve();
			          return deferred.promise();
			        }
			      }
			    ],
			    slick: {
			      dots: false,
			      swipe: false,
			      infinite: false,
			      speed: 300,
			      slide: '.panel',
			      slidesToShow: 1,
			      slidesToScroll: 1,
			      adaptiveHeight: true,
			      prevArrow: false,
			      nextArrow: false
			    },
			    onWizardComplete: function(){
			      var deferred = $.Deferred();
			      setTimeout(function(){
			        window.location.href = window.location.origin + '/checkout/confirm.jsp';
			        deferred.resolve();
			      }, 1000);
			      return deferred.promise();
			    }
			  };

			  //run wizard initially and any time screen width changes.
			  var width;
			  var setup = function(){
			    if(window.location.href.indexOf('signed-in-checkout') > -1){
			      options.steps[1].form = '#saved-cards-form';
			    }
			    var currentWidth = $(document).width();
			    if(currentWidth !== width){
			      width = currentWidth;
			      $('.wizard').wizard(options);
			    }
			  };

			  var timeout;
			  /*<Baskar> GWUAT-103 Fixed on 02-12-2015 starts*/
			  /*$(window).resize(function() {
			    if(timeout) {
			      clearTimeout(timeout);
			    }
			    timeout = setTimeout(setup, 500);
			  });*/
			  /*<Baskar> GWUAT-103 Fixed on 02-12-2015 ends*/
			  setup();

			  if ($('#shipping-form').length > 0) {
				    $('#shipping-form').parsley({}).on('field:error', window.KOR.util.dontValidateHiddenField);
				  }
				  $('#payment-shipping-form').on('show.bs.collapse', function(){
				    var fields = $(this).find('input,select').toArray();
				    for(var i = 0; i < fields.length; i++){
				      $(fields[i]).parsley().reset();
				    }
				  });
				  $('#shipping-form #shipping-phone').inputmask('999-999-9999', {'placeholder': ' '});
				  $('#payment-form #shipping-phone').inputmask('999-999-9999', {'placeholder': ' '});
				  $('#payment-card-ccv').inputmask('9999', {'placeholder': ''});
				  if($('#send-cart-to-email-form').length > 0) {
				    $('#send-cart-to-email-form').parsley();
				  }

				  for(var index in $('.promo-code-form').toArray()){
				    $($('.promo-code-form')[index]).parsley();
				  }

				  $('.nested-promo-submit').click(function(e){
				    e.preventDefault();
				    $(this).closest('.nested-promo-code-form').find('input').parsley().validate();
				  });


				  if($('#payment-card-number').length > 0) {
				    //$('#payment-card-number').inputmask('9999999999999999', {'placeholder': ''});

				    var creditCards = ['visa', 'amex', 'mastercard', 'discover'];
				    var creditCardValue = {
				    		visa : "visa",
				    		amex : "americanExpress",
				    		mastercard : "masterCard",
				    		discover : "discover"
				    }
				    $('#payment-card-number').keyup(function(){
				      var cardInfo = $(this).validateCreditCard().card_type;

				      var icon = $(this).closest('.credit-card-input-group').find('.card-type-icon');
				      if(cardInfo && cardInfo.name){
				        icon.removeClass('icon-generic-card');
				        icon.addClass('icon-' + cardInfo.name);
				        $("#payment-form").find("#editCreditCardType").val(creditCardValue[cardInfo.name]);
				        if(cardInfo.name == 'amex'){
				        	$("#payment-form").find('input[name="cvv"]:visible').attr("pattern","^[0-9]{4}$");
				        	$("#payment-form").find('input[name="cvv"]:visible').attr("maxlength","4");
				        	$("#payment-form").find('input[name="cvv"]:visible').val("");
				        }else{
				        	$("#payment-form").find('input[name="cvv"]:visible').attr("pattern","^[0-9]{3}$");
				        	$("#payment-form").find('input[name="cvv"]:visible').attr("maxlength","3");
				        	$("#payment-form").find('input[name="cvv"]:visible').val("");
				        }
				      }
				      else {
				        for(var i in creditCards){
				          icon.removeClass('icon-' + creditCards[i]);
				        }
				        icon.addClass('icon-generic-card');
				      }
				    });
				  }

				  if ($('.card-new-form #payment-card-expiration').length > 0) {
				    $('.card-new-form #payment-card-expiration').inputmask('99/9999', {'placeholder': ''});
				  }

				  if ($('.card-edit-form #payment-card-expiration').length > 0) {
					    $('.card-edit-form #payment-card-expiration').inputmask('99/9999', {'placeholder': ''});
				  }

				  $('#payment-card-expiration').inputmask('99/9999', {'placeholder': ''});

				  $('.payment-card-ccv').inputmask('9999', {'placeholder': ''});
				  if($('.payment-card-ccv').length > 0 && !$('.payment-card-ccv').css('-webkit-text-security')){
				    $('.payment-card-ccv').remove();
				    $('.payment-card-ccv-ie').removeClass('hidden');
				  }
                  else{
                      $('.payment-card-ccv-ie').remove(); /*<dattaprasad> GWSIT-433 Fixed on 05-11-2015*/
                  }

				  //toggles paypal and credit card forms
				  if ($('input[name="checkout-payment-methods"]').length > 0) {
				    $('input[name="checkout-payment-methods"]').change(function(){
				      if($(this).attr('id') === 'paypal-payment'){
				    	$(".apple-pay-button-with-text").addClass("hidden");
				        $('#paypal-form').collapse('show');
				        $('#credit-card-form').collapse('hide');
				        //hack for ie9
				        setTimeout(function(){
				          $('#cc-continue-container').css('display', 'none');
				        }, 100);
				      } else if($(this).attr('id') === 'applepay-payment'){
				    	  $('#paypal-form').collapse('hide');
				    	  $('#credit-card-form').collapse('hide');
				    	  setTimeout(function(){
					          $('#cc-continue-container').css('display', 'none');
					      }, 100);
				    	  $(".apple-pay-button-with-text").removeClass("hidden");
				      }
				      else {
				    	$(".apple-pay-button-with-text").addClass("hidden");
				        $('#paypal-form').collapse('hide');
				        $('#credit-card-form').collapse('show');
				        $('#cc-continue-container').css('display', 'block');
				      }
				    });
				  }

				  //connects gift wrapping checkbox with gift reciept checkbox
				  $(document).on("change", '#gift-wrapping-checkbox', function(){
				    var that = this;
				    //var $path = $(that).attr("data-url");
				    /*if(this.checked){
				    	$('#gift-wrap-modal').modal('show');
				    	$("#gift-wrap-modal .modal-body").load($path, function(){
				    		newCheckoutMkobj.giftWraptoggle();
				    		newCheckoutMkobj.jsGiftAddnote();
				    	});
				    }*/
				    if(this.checked){
						$('.giftWrap').collapse('show');
					}
					else{
						$('.giftWrap').collapse('hide');
					}

				    $.each($('.gift-reciept-container').find('input[type="checkbox"]').toArray(), function(){
					      this.checked = that.checked;
					});
				  });

				  $(document).on('show.bs.modal', '#gift-wrap-modal', function(event){
						$("#gift-wrap-modal .modal-body").load($(event.relatedTarget).attr("data-url"), function(){
							newCheckoutMkobj.giftWraptoggle();
							newCheckoutMkobj.giftWrapCheckToggle();
							newCheckoutMkobj.jsGiftAddnote();
						});
				    });


				  /*$(document).on('click', '.js-add-note-link', function(){
				    if(!$($(this).attr('href')).hasClass('collapsing')){
				      if($(this).text() === 'Add Note'){
				        $(this).text('Remove Note');
				      }
				      else {
				        $($(this).attr('href')).find('textarea').val('');
				        $(this).text('Add Note');
				      }
				    }
				  });*/

//				  $('.product-checkbox-desktop , .mob-gfWrap').find('input[type="checkbox"]').on('change', function(){
//				    if(this.checked){
//				      $($(this).attr('href')).collapse('show');
//				    }
//				    else {
//				      $($(this).attr('href')).collapse('hide');
//				    }
//				  });

//				  $('#js-giftwrap-cancel').click(function(){
//				    $('#gift-wrap-modal').find('textarea').val('');
//				    $('.js-add-note-container').collapse('hide');
//				    $('.product-checkbox-desktop').find('input[type="checkbox"]').attr('checked', false);
//				  });

				  if($('#payment-form').length > 0) {
				    $('#payment-form').parsley({}).on('field:error', window.KOR.util.dontValidateHiddenField);
				  }

				  if (dtmEnabledFlag == "true" || adobeLaunchEnabledFlag == "true") {
					if (typeof sendCustomEvent === 'function') {
						if (window.mkorsData.page && window.mkorsData.page.type && window.mkorsData.page.type !== "") {
							sendCustomEvent('dataLayerReady');
						}
					}
				}
}

$(function(){

	if($('#sign-in-form').length > 0){
	    var toggleSignInButton = function(){
	      if($('#sign-in-email-address').parsley().isValid()
	        && $('#sign-in-password').parsley().isValid()){
	        $('#sign-in-submit').removeClass('btn-disabled');
	        $('#sign-in-submit').addClass('btn-primary');
	      }
	      else {
	        $('#sign-in-submit').removeClass('btn-primary');
	        $('#sign-in-submit').addClass('btn-disabled');
	      }
	    };

	    $('#sign-in-form').parsley();
	    $('#sign-in-email-address').change(toggleSignInButton);
	    $('#sign-in-password').change(toggleSignInButton);
	  }

	//connects express checkout with overlay
	  $(document).on("click","#mobExpressCheckoutBtn", function(e){
		  e.preventDefault();
		  if(!($(this).hasClass("js-btnDisabled"))){
			  $("#mobExpressCheckout").collapse("show");
		  }
	  });
	  $('#mobExpressCheckout').on('show.bs.collapse', function () {
		  $('#mobExpressCheckoutSticky').collapse('hide')
	  });
	  $('#mobExpressCheckoutSticky').on('show.bs.collapse', function () {
		  $('#mobExpressCheckout').collapse('hide')
	  });
	  for(var index in $('.express-order-form').toArray()){
		    $($('.express-order-form')[index]).parsley();
	  }
});


$(function(){
  'use strict';

  var equalizeBoxes = function(){
    var $signature = $('#mk-signature-container');
    if(window.KOR.breakpoints.xs < window.innerWidth && $signature.length > 0){
      setTimeout(function(){
        var height = $('.js-sigSizer').height()
          + parseInt($('.js-sigSizer').css('padding-top'))
          + parseInt($('.js-sigSizer').css('padding-bottom'));
        $signature.css('height', height);
        $signature.css('display', 'block');
      }, 400);
    }
  };
  equalizeBoxes();

  var timeout;
  $(window).resize(function() {
    if(timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(equalizeBoxes, 500);

    /*EUISSIT-699 waseem 03/10/2018*/
    var $width = $(window).width();
    if($('.country-selector-panel').length > 0 && $width < 1026) {
  	  var cntryModalClose = $(".country-selector-panel .closeButton");
  	  cntryModalClose.trigger("click");
    }
  });

  if($('#confirmation-create-account-form').length > 0){
    $('#confirmation-create-account-form').parsley();
  }
  /*waseem ECB-12375 12/10/2017*/
  $(window).on('orientationchange',function() {
	  if(window.innerWidth < window.KOR.breakpoints.md) {
		  $("#JoinsUs").collapse('show');
	  }
  });
});

'use strict';

$(function() {

if($('#shopping-bag-container').length > 0){
	$('#page-footer').addClass('padded-footer');
	$('.mobile-scroll-to-top').css('bottom', '100px');
}

///* maintains the state for showing the 2nd modal on edit gift card flow */
//var IS_EMAIL_GIFT_CARD = false;
//var modelTwo;
//var giftcardAmount = '';
//$(document).on('click', '#continue-gift-card-edit' ,function(e){
//	alert("vbcbcv");
//	e.preventDefault();
//	modelTwo = $(this).closest('form').find('#continue-gift-card-edit-modelTwo').val();
//	/* reset e-mail gift card state */
//	IS_EMAIL_GIFT_CARD = false;
//
//	if($('#gift-card-edit-form').parsley().validate()){
//
//	  /* hide the edit gift card modal, step 1 */
//	  $('#shopping-bag-edit-gift-card-step-one-modal').modal('hide');
//
//	  IS_EMAIL_GIFT_CARD = ($('select[name=giftCardSendByDropdown]').val().toString() === 'true');
//	}
//	if(IS_EMAIL_GIFT_CARD == false){
//		//Write the ajax trigger function here
//		//ajaxFormSubmit($("#gift-card-edit-form"));
//	}
//});
//
///* show the e-mail gift card modal if the state was selected and
//the first modal has closed completely */
//$('#shopping-bag-edit-gift-card-step-one-modal').on('hidden.bs.modal', function () {
//if (IS_EMAIL_GIFT_CARD) {
//  giftcardAmount = $('#giftCardAmount option:selected').val();
//  IS_EMAIL_GIFT_CARD = false;
//  $('#shopping-bag-edit-gift-card-step-two-modal').modal('show');
//}
//});
//
//$("#shopping-bag-edit-gift-card-step-two-modal").on('show.bs.modal', function(event){
//	$("#shopping-bag-edit-gift-card-step-two-modal .modal-body").load(modelTwo , function(){
//		$('.js-tabsPanel').tabsPanel();
//		/*var $form = $(this).find('form');
//		if ($form.length > 0) {
//		      $form[0].reset();
//		      $form.find('.selectpicker').selectpicker('render');
//		 }*/
//		$('#shopping-bag-edit-gift-card-step-two-modal').find('#giftAmountPop').val(giftcardAmount);
//		var $form = $(this).find('form');
//		$form.parsley().reset();
//		//formReset($form);
//	});
//
//});
	/*<dattaprasad> CYUAT-14 Fixed on 05-04-2016 starts*/
	$('#shopping-bag-edit-gift-card-step-two-modal').on('shown.bs.modal', function () {
		setTimeout(function(){
			$("textarea#message").attr("data-counter",".e-gift-card-message-counter");
			var maxCount = $("textarea#message").attr("maxlength");
			$("textarea#message").simplyCountable({
			  counter: $("textarea#message").data('counter'),
			  maxCount: maxCount,
			  strictMax: true
			});
		},500);
	});
	/*<dattaprasad> CYUAT-14 Fixed on 05-04-2016 ends*/

	$(document).on('show.bs.modal', '#reviewOutofstock-modal', function(event){
		$('.popUpErrorMessage .alert-message--error, .popUpErrorMessage').addClass('hidden');
		$("#reviewOutofstock-modal .modal-body ").load("/checkout/includes/outOfStockmodal.jsp", function(){
			if($(".placeOrderCartLineItemDTM").length > 0){
				placeOrderCartLineProductRemoval("outOfStockProducts");
			}
		});
	});
});
function placeOrderCartLineProductRemoval(outOfStockStatus){
	var lineItemDTMObj = $(".placeOrderCartLineItemDTM");
	var productPerlineItem = lineItemDTMObj.length;
	var multipleParametersArr = [];
	var quantityArr = [];
	var eventName = "removeFromCart";
	var eventType = "cart";
	var eventFrom = eventType;
	var errorEvent = {};
	if(outOfStockStatus == "outOfStockProducts"){
		eventName = "errorEventOrderSubmit";
		eventType = "customer facing error";
		eventFrom = "orderConfirmation";
		errorEvent = {
			"error":[{
			    "errorType": "orderSubmitInventory-case_1",  //case 1-4 from ECB-13570
			    "errorCode": "EM-22", //If possible. Allows for language neutral reporting
			    "errorMessage": "Product Out of Stock.", //Not needed if errorCode exists
			    "errorPageType": "Check Out"
			  }],
		};
	}

	lineItemDTMObj.each(function(i,val){
		var $this = $(this);
		var parentContainer = $(this).attr("class")+"_"+i;
		parentContainer = $("#"+parentContainer);
		var quantity = "";
		var eventParametersObj = createDTMEventParametersForCartRemoval($this,parentContainer);
		multipleParametersArr.push(eventParametersObj);
		if($this.closest(parentContainer).find(".quantity").val()){
			quantity = $this.closest(parentContainer).find(".quantity").val();
			quantityArr.push(quantity)
		}
	});
	triggerDTMEventParametersForCartRemoval(quantityArr,multipleParametersArr,eventName,eventType,eventFrom, errorEvent);
}
$(function(){
  'use strict';

  if($('#saved-cards-form').length > 0) {
    $('#saved-cards-form').parsley().on('field:error', window.KOR.util.dontValidateHiddenField);
  }

	var errorPageType = '';
	var errortTypeDTM = '';

	shippingInit(true);
	billingInit(true);
  /////


  var resizeSlick = function(){
    setTimeout(function(){
      var panelGroup = $('.panel-group');
      if(panelGroup.hasClass('slick-initialized')){
        panelGroup[0].slick.setPosition();
      }
    });
  };
  /*<surkraj> CSIT-376 Fixed on 20-04-2016 start*/
  window.Parsley.on('field:validate', function() {
       resizeSlick();
   });

	 window.Parsley.on('form:validated', function() {
			var formId = this.$element.selector;
			if($(formId + ' .parsley-errors-list li:visible').length > 0) {
				var formName = formId;
				var pageName = "checkout";
			}

			$(formId + ' .parsley-errors-list li:visible').each(function(key, value) {
				addToDTMTrackEvent(errortTypeDTM,$(value).text(),errorPageType);
			});
	});
	if($('#signUpPassword').parsley() != undefined && $('#confirmPassword').parsley() != undefined ) {
		window.Parsley.on('field:success', function() {
			if($('#signUpPassword').parsley().isValid() && $('#confirmPassword').val().length >= 1){
					$('#korsvip-join-button').removeClass('disable').attr("disabled", false);
				}
		});

		window.Parsley.on('field:error', function() {
			$('#korsvip-join-button').addClass('disable').attr("disabled", true);
			errorPageType = "checkout:confirmation";
			errortTypeDTM = 'Passwords do not match';
			var errorMessage = "Password or Confirmation is missing";
			if($('#signUpPassword').val() != $('#confirmPassword').val()) {
				errorMessage = "Passwords do not match";
			}
		});
	}

	$("#confirmPassword").on('keyup', function() {
		if($('#confirmPassword').val().length >= 1) {
			$(this).closest('form').parsley().validate();
		} else {
			$('#signUpPassword').parsley().validate();
		}
	});
  /*<waseem> fix for  ECOSIT-88 on 04/08/2016 removed if condition for paypal ajax edit*/
  $(document).on('change', 'input[name="saved-cards-payment-methods"]', function(){
    if($(this).attr('id') === 'paypal-payment'){
      $('#paypal-form-container').removeClass('hidden');
      setTimeout(function(){
        $('#saved-cards-container').addClass('hidden');
        $('#saved-cards-container').addClass('opacity-hidden');
		 $('#credit-card-form').collapse('hide');
		 $('.apple-pay-button-with-text').addClass('hidden');
        window.scrollTo(0, $('#alternate-payment-method').offset().top - 20);
        resizeSlick();
      }, 600);
      resizeSlick();
      $('#cc-continue-container').css('display', 'none');
      //hack for ie9
      setTimeout(function(){
        $('#cc-continue-container').css('display', 'none');
      }, 100);

      $('html, body').animate({
        scrollTop: $('#alternate-payment-method').offset().top - 20
      }, 500);
    }else if($(this).attr('id') === 'applepay-payment'){
    	$('#saved-cards-container').addClass('hidden');
    	 $('#saved-cards-container').addClass('opacity-hidden');
    	 $('#credit-card-form').collapse('hide');
    	 $('#paypal-form-container').addClass('hidden');
    	 $('#cc-continue-container').css('display', 'none');

    	 $(".apple-pay-button-with-text").removeClass("hidden");
    	 resizeSlick();
    	 setTimeout(function () {
	    	 window.scrollTo(0, $('#applePay-payment-method').offset().top - 20);
    	 },600);
    	 $('html, body').animate({
	 	        scrollTop: $('#applePay-payment-method').offset().top - 20
	 	      }, 500);
}
    else {
      $('.apple-pay-button-with-text').addClass('hidden');
      $('#paypal-form-container').addClass('hidden');
      $('#cc-continue-container').css('display', 'block');
      $('#saved-cards-container').removeClass('hidden');
		 $('#credit-card-form').collapse('show');
      setTimeout(function () {
        $('#saved-cards-container').removeClass('opacity-hidden');
        resizeSlick();
      }, 20);
    }
  });
  /* Apple pay show/hide condition starts */
  var enableApple = true;
	var disableCheckoutMaxQty = $('#disableCheckoutMaxQty').val();
	if(disableCheckoutMaxQty == "true"){
		enableApple = false;
	}
  if (window.ApplePaySession && enableApple) {
  	var merchantIdentifier = $("#merchantIdentifier").val();
  	if(merchantIdentifier != undefined && merchantIdentifier != ""){
  		var promise = ApplePaySession.canMakePaymentsWithActiveCard(merchantIdentifier);
  		promise.then(function (canMakePayments) {
  			if (canMakePayments){
  				HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
  				$(".apple-pay-button").removeClass("hidden");
  				$("#applePay-payment-method").removeClass("hidden");
  				updateDTMForApplePay(true)
  			}else{
  				updateDTMForApplePay(false)
  			}
  		});
  	}else{
  		updateDTMForApplePay(false)
  	}
  }else{
	  updateDTMForApplePay(false)
  }
  /* Apple pay show/hide condition ends */
});

function updateDTMForApplePay(applePayEnabled){
	if(dtmEnabledFlag == "true" || adobeLaunchEnabledFlag == "true"){
		if(typeof mkorsData.user != "undefined") {
			var mkorsData_Obj = mkorsData.user[0].profile[0].profileInfo;
			mkorsData_Obj["applePayEnabled"] = applePayEnabled;
			mkorsData.user[0].profile[0].profileInfo = mkorsData_Obj;
		}
		else {
		  mkorsData.user= new Array();
		  mkorsData.user[0] = {};
		  mkorsData.user[0].profile = new Array();
		  mkorsData.user[0].profile[0] = {};
		  mkorsData.user[0].profile[0].profileInfo ={"applePayEnabled" : applePayEnabled}
		}
	 }
}

function shippingInit(isOfShipping){
	$.ajax({
		url : localeName+'/checkout/common/profileAddreses.jsp',
		data: {"isBilling":"false"},
		type : "post",
		dataType : "text",
		cache : false,
		success : function(data) {
			if(data != undefined && data != ""){
				options.collection = JSON.parse(data);
				  options.selectEl = '#saved-address-dropdown';
				  options.selectValue = function(key){
					 return this.options.collection[key].nickName;
				  };
				  options.selectText = function(key){
				    var ret = this.options.collection[key].addr_1;
				    if(this.options.collection[key].addr_2){
				      ret += (', ' + this.options.collection[key].addr_2.replace(/\./g, ' '));
				    }
				    return ret.toUpperCase();
				  };
				  options.isSelectedValue = function(key){
					  if(this.options.collection[key].isSelected != undefined &&
							  this.options.collection[key].isSelected == "true"){
						  return true;
					  }else{
						  return false;
					  }
				  };
				  options.addNewItemText = 'Add a new address';
				  options.editDisplayForm = '.address-display';
				  options.newForm = options.editForm = '.address-edit-form';
				  options.newTitle = 'Add a new address';
				  options.editTitle = 'Edit address';
				  options.populateForm = function(data, form){
				    $(form).find('select[name=title]').val(data.title);
				    $(form).find('input[name="first-name"]').val(data.first_name);
				    $(form).find('input[name="last-name"]').val(data.last_name);
				    $(form).find('input[name="addr-1"]').val(data.addr_1);
				    $(form).find('input[name="addr-2"]').val(data.addr_2);
				    $(form).find('input[name="zip-code"]').val(data.zip);
				    $(form).find('input[name="city"]').val(data.city);
				    $(form).find('select[name="state"]').val(data.state);
				    $(form).find('input[name="phone"]').val(data.phone);
				    $(form).find('input[name="email"]').val(data.email);
						if(mobileRequest == 'false') {
				    	$(form).find('.selectpicker').selectpicker('refresh');
						}
				  };
				  options.onNewItemSelect = function(){
				    $(this.element).find('.address-edit-collection-link').css("cssText", "display: none !important");
				    $(this.element).find('.address-add-collection-link').css("cssText", "display: none !important");
				    $("#shippingHandleType").val("1");
				  };
				  options.onEditableItemSelect = function(){
				    $(this.element).find('.address-edit-collection-link').css("cssText", "display: none !important");
				    $(this.element).find('.address-add-collection-link').css('display', 'inline');
				    $("#shippingHandleType").val("2");
				  };
				  options.onDisplayItemSelect = function(){
				    $(this.element).find('.address-edit-collection-link').css('display', 'inline');
				    $(this.element).find('.address-add-collection-link').css('display', 'inline');
				    $("#shippingHandleType").val("3");
				  };
				  options.name = 'address';
				  $('#saved-addresses').collectionForm(options);
			}

			var expressCheckout =$("#checkout_type_info").attr("data-is-express-checkout");
			var virtualOrder = $("#checkout_type_info").attr("data-is-virtual-order");
			if(expressCheckout != "true" && virtualOrder != "true"){
				 var selShipMethod = $("#shipping-form .shipping-method:checked").val();
				 if(selShipMethod == undefined || selShipMethod == ""){
					 /*<dattaprasad> ECB-19854 on 26-10-2018 */
					 $("#shippingMethodsContainer").data("stopShippingMethodFocusOnLoad","true");
					 $("#shipping-form .shipping-method").first().click();
				 }else{
						$.post(localeName+'/checkout/includes/updateShipMethod.jsp', {shipMethod : selShipMethod}, function(data) {
							$("#totalOrderSummary").load(localeName+"/checkout/includes/checkoutOrderTotalSummary.jsp?isShipping=true", function(){
								newCheckoutMkobj.promoToggle();
							});
					});
				 }
			}

			if(isOfShipping){
				$.get(localeName+"/checkout/includes/checkoutOrderTotalSummary.jsp", { isShipping: "true"});
			}

			if(mobileRequest == 'false') {
				$('#shipping-form .selectpicker').selectpicker('refresh');
			}
			newCheckoutMkobj.promoToggle();
			newCheckoutMkobj.giftWraptoggle();
			newCheckoutMkobj.giftWrapCheckToggle();
			newCheckoutMkobj.jsGiftAddnote();
			validateEditedAdressShippingAndBilling();
		}
	});
}

function billingInit(isFromShipping){
	$.ajax({
		url : localeName+'/checkout/common/profileAddreses.jsp',
		data: {"isBilling":"true"},
		type : "post",
		dataType : "text",
		cache : false,
		success : function(data) {
			if(data != undefined && data != ""){
			  billingAddressOptions.collection = JSON.parse(data);
			  billingAddressOptions.selectEl = '#billing-address-dropdown';
			  billingAddressOptions.selectValue = function(key){
				  return this.options.collection[key].nickName;
			  };
			  billingAddressOptions.selectText = function(key){
			    var ret = this.options.collection[key].addr_1;
			    if(this.options.collection[key].addr_2){
			      ret += (', ' + this.options.collection[key].addr_2.replace(/\./g, ' '));
			    }
			    return ret.toUpperCase();
			  };
			  billingAddressOptions.isSelectedValue = function(key){
				  if(this.options.collection[key].isSelected != undefined &&
						  this.options.collection[key].isSelected == "true"){
					  return true;
				  }else{
					  return false;
				  }
			  };
			  billingAddressOptions.addNewItemText = 'Add a new address';
			  billingAddressOptions.editDisplayForm = '.billing-address-display';
			  billingAddressOptions.newForm = billingAddressOptions.editForm = '.billing-address-edit-form';
			  billingAddressOptions.newTitle = 'Add a new address';
			  billingAddressOptions.editTitle = 'Edit address';
			  billingAddressOptions.populateForm = function(data, form){
			    $(form).find('select[name=title]').val(data.title);
			    $(form).find('input[name="first-name"]').val(data.first_name);
			    $(form).find('input[name="last-name"]').val(data.last_name);
			   if(data.country != undefined){
				   $(form).find('select[name="country"]').val(data.country);
				   var country = data.country;
				   var state = data.state;
			   }else{
				   var country = $("#defaultCntry").val();
				   var state = "";
				   $(form).find('select[name="country"]').val(country);
			   }
				   $.ajax({
					   url : localeName + '/checkout/includes/billingAddressStates.jsp?selectedCountry='+country+'&selectedState='+state,
					   type : "post",
					   dataType : "html",
					   cache : false,
					   beforeSend : function() {
						   $("#custState").val("");
					   },
					   success : function(data) {
						   $("#payment-form").find("#statedropdown").show();
						   $("#payment-form").find("#custStateText").hide();
						   $("#payment-form").find('#statedropdown select[name="state"]').prop("disabled",false);
						   $("#payment-form").find('#custStateText input[name="state"]').prop("disabled",true);
						   if(typeof data != undefined && data != "" && data != null){
							   $("#payment-form").find("#state").html(data);
						   }else{
							   $('#custState').parsley().reset();
							   $("#payment-form").find("#statedropdown").hide();
							   $("#payment-form").find("#custStateText").show();
							   $("#payment-form").find('#statedropdown select[name="state"]').prop("disabled",true);
							   $("#payment-form").find('#custStateText input[name="state"]').prop("disabled",false);
						   }
					   },
					   error: function(xhr, ajaxOptions, thrownError) {
						   newCheckoutMkobj.errorHandle(xhr, ajaxOptions, thrownError);
					   },
					   complete: function(){
						   $('#payment-form').find("#state").trigger("focusout");						   
						   $("#payment-form").parsley().reset();
					   }
				   });
			    $(form).find('input[name="addr-1"]').val(data.addr_1);
			    $(form).find('input[name="addr-2"]').val(data.addr_2);
			    $(form).find('input[name="zip-code"]').val(data.zip);
			    $(form).find('input[name="city"]').val(data.city);
			    $(form).find('input[name="phone"]').val(data.phone);
			    $(form).find('select[name="state"]').val(data.state);
					if(mobileRequest == 'false') {
						$(form).find('.selectpicker').selectpicker('refresh');
					}
			  };
			  billingAddressOptions.onEditableItemSelect = function(){
			    $(this.element).find('.billing-edit-collection-link').collapse('hide');
			    $("#billingAddressHandleType").val("2");
			  };

			  billingAddressOptions.onNewItemSelect = function(){
			    $(this.element).find('.billing-edit-collection-link').collapse('hide');
			    $(this.element).find('.billing-add-collection-link').collapse('hide');
			    $("#billingAddressHandleType").val("1");
			  };
			  billingAddressOptions.onDisplayItemSelect = function(){
				$("#billingAddressHandleType").val("3");
			  };
			  billingAddressOptions.name = 'billing';
			  $('#billing-address').collectionForm(billingAddressOptions);
			}

			if(mobileRequest == 'false') {
				$('#payment-form .selectpicker').selectpicker('refresh');
			}
			validateEditedAdressShippingAndBilling();
		}
	});

	var expressCheckout = $("#checkout_type_info").attr("data-is-express-checkout");

	if(isFromShipping && expressCheckout == "false"){
		 $("#totalOrderSummary").load(localeName+"/checkout/includes/checkoutOrderTotalSummary.jsp?isShipping=true", function(){
				newCheckoutMkobj.promoToggle();		/*<dattaprasad> MKPROD-1747 Fixed on 08-12-2015*/
		  });
	}else{
		 $("#totalOrderSummary").load(localeName+"/checkout/includes/checkoutOrderTotalSummary.jsp?isShipping=false", function(){
				newCheckoutMkobj.promoToggle();		/*<dattaprasad> MKPROD-1747 Fixed on 08-12-2015*/
		  });
	}


	  $(".orderReviewAmount").load(localeName+"/checkout/includes/youWillBeCharged.jsp");

	  /*$("#payment-form #state").load(localeName+"/checkout/includes/countryBasedStates.jsp?selectedCountry="+$("#payment-form #country-select").val(), function(){*/
		  if($("#payment-form #state option").length == 0 || $("#payment-form #state option").length == 1){
			  $("#payment-form").find("#statedropdown").hide();
				$("#payment-form").find("#custStateText").show();
			  $("#payment-form").find('#statedropdown select[name="state"]').prop("disabled",true);
			  $("#payment-form").find('#custStateText input[name="state"]').prop("disabled",false);
		  }
	  /*});*/




	$.ajax({
		url : localeName+'/checkout/common/profileCards.jsp',
		type : "post",
		dataType : "text",
		cache : false,
		success : function(data) {
			if(data != undefined && data != ""){
				paymentOptions.collection = JSON.parse(data);
				  paymentOptions.selectEl = '#saved-cards-dropdown';
				  paymentOptions.selectValue = function(key){
					  	return this.options.collection[key].card_nickname;
				  };
				  paymentOptions.selectText = function(key){
				    var number = this.options.collection[key].card_number;
				    var cardType = this.options.collection[key].card_type.toUpperCase();
				    return cardType +' ending in ' + number.substring(number.length - 4, number.length);
				  };
				  paymentOptions.isSelectedValue = function(key){
					  if(this.options.collection[key].isSelected != undefined &&
							  this.options.collection[key].isSelected == "true"){
						  return true;
					  }else{
						  return false;
					  }
				  };
				  paymentOptions.addNewItemText = 'Add a new card';
				  paymentOptions.editDisplayForm = '.card-display';
				  paymentOptions.newForm = '.card-new-form';
				  paymentOptions.editForm = '.card-edit-form';
				  paymentOptions.newTitle = 'Add a new card';
				  paymentOptions.editTitle = 'Edit card';
				  paymentOptions.populateForm = function(data, form){
				    $(form).find('input[name="card-name"]').val(data.card_name);
				    var expirationDate = data.expiry;
				    if(expirationDate != undefined){
				    	var arr = expirationDate.split("/");
					    var expirationMonth = arr[0];
					    var expirationYear = arr[1];
					    if(expirationMonth.length == 1){
					    	expirationMonth = "0"+expirationMonth;
					    	expirationDate = expirationMonth+"/"+expirationYear;
					    }
				    }
				    $(form).find('input[name="expirationDate"]').val(expirationDate);
				    $(form).find('select#billing-address-dropdown').val(data.card_address_nickname);
				    var ccInput = $(form).find('input[name="card-number"]');
				    $("#editCreditCardNumber").val(data.card_number);
				    $("#editCreditCardType").val(data.card_type);
				    ccInput.val(data.card_number_withStar);
				    if(data.card_number){
				      var icon = ccInput.closest('.credit-card-input-group').find('.card-type-icon');
				      icon.removeClass('icon-generic-card');
				      icon.addClass('icon-' + data.card_type);
				    }
						if(mobileRequest == 'false') {
				    	$(form).find('.selectpicker').selectpicker('refresh');
						}
				  };

					paymentOptions.onNewItemSelect = function(){
					    $(this.element).find('.hide-on-new').hide();
					    $(this.element).find('.credit-edit-collection-link').hide();
					    $(this.element).find('.credit-add-collection-link').hide();
					    $("#creditCardHandleType").val("1");
				  };
				  paymentOptions.onEditableItemSelect = function(){
				    $(this.element).find('.hide-on-new').show();
				    $(this.element).find('.credit-edit-collection-link').hide();
				    $(this.element).find('.credit-add-collection-link').show();
				    $("#creditCardHandleType").val("2");
				    $(".card-edit-form #payment-card-number").prop('disabled', true);
				  };
				  paymentOptions.onDisplayItemSelect = function(index){
					$(this.element).find('.hide-on-new').show();
					$(this.element).find('.credit-edit-collection-link').show();
				  $(this.element).find('.credit-add-collection-link').show();
				  $('.card-edit-form').collapse('hide');
					$("#creditCardHandleType").val("3");
					if(index != undefined){
						var cardType = this.options.collection[index].card_type;
					  	if(cardType == "americanExpress"){
				        	$("#payment-form").find('input[name="cvv"]:visible').attr("pattern","^[0-9]{4}$");
				        	$("#payment-form").find('input[name="cvv"]:visible').attr("maxlength","4");
				        	$("#payment-form").find('input[name="cvv"]:visible').val("");
				        }else{
				        	$("#payment-form").find('input[name="cvv"]:visible').attr("pattern","^[0-9]{3}$");
				        	$("#payment-form").find('input[name="cvv"]:visible').attr("maxlength","3");
				        	$("#payment-form").find('input[name="cvv"]:visible').val("");
				        }
					}
				  };
				  paymentOptions.name = 'credit';
				  $('#payment-form').collectionForm(paymentOptions);
			}
			$('[data-toggle="tooltip"]').tooltip();
			newCheckoutMkobj.promoToggle();
		}
	});
	
	var enableApple = true;
	var disableCheckoutMaxQty = $('#disableCheckoutMaxQty').val();
	if(disableCheckoutMaxQty == "true"){
		enableApple = false;
	}
	if (window.ApplePaySession && enableApple) {
	  	var merchantIdentifier = $("#merchantIdentifier").val();
	  	if(merchantIdentifier != undefined && merchantIdentifier != ""){
	  		var promise = ApplePaySession.canMakePaymentsWithActiveCard(merchantIdentifier);
	  		promise.then(function (canMakePayments) {
	  			if (canMakePayments){
	  				HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
	  				$(".apple-pay-button").removeClass("hidden");
	  				$("#applePay-payment-method").removeClass("hidden");
	  			}
	  		});
	  	}
	}
	/*<dattaprasad> ECB-18158 Added on 12-04-2019 starts*/
	/*$(document).on('hover', '.securityTooltip .input-icon-tooltip', function(e){
		readSecurityTooltip($(this));
	});
	$(document).on('mouseenter', '.securityTooltip .input-icon-tooltip', function(e){
		readSecurityTooltip($(this));
	});
	$(document).on('focus', '.securityTooltip .input-icon-tooltip', function(e){
		readSecurityTooltip($(this));
	});*/
	$('.securityTooltip .input-icon-tooltip-mobile').tooltip();
	$(document).on('click', '.securityTooltip .input-icon-tooltip', function(e){
		e.stopPropagation();
		e.stopImmediatePropagation();
		e.preventDefault();
		readSecurityTooltip($(this));
	});
	$('.input-icon-tooltip-mobile').on('hidden.bs.tooltip', function () {
		console.log("On hidden function in the tooltip");
		var currentObj = $(this);
		currentObj.closest(".securityTooltip").find(".input-icon-tooltip").attr("aria-expanded","false");
		setTimeout(function(){currentObj.closest(".securityTooltip").find(".input-icon-tooltip").focus();},500);
	});
	$('.input-icon-tooltip-mobile').on('shown.bs.tooltip', function () {
		console.log("On shown function in the tooltip");
		var currentObj = $(this);
		currentObj.closest(".securityTooltip").find(".input-icon-tooltip").attr("aria-expanded","true");
		setTimeout(function(){currentObj.closest(".securityTooltip").find(".input-icon-tooltip").focus();},500);
	});
	$(document).on("click",".securityTooltip .tooltip, .securityTooltip .tooltip-inner",function(e) {
		e.stopPropagation();
		e.stopImmediatePropagation();
		e.preventDefault();
		var currentObj = $(this);
		setTimeout(function(){
			currentObj.closest(".securityTooltip").find(".input-icon-tooltip").attr("aria-expanded","false");
			currentObj.closest(".securityTooltip").find(".input-icon-tooltip").focus();
		},200);
	});
	/*<dattaprasad> ECB-18161 starts*/
	$(document).on("keyup",".icon-more-info.input-info-icon", function(e) {
		console.log(e.keyCode);
		var currentObj = $(this);
		if(e.keyCode == 27 || e.keyCode == 13) {
			if(e.keyCode == 13 && typeof currentObj.attr("aria-describedby") == "undefined") {
				currentObj.tooltip('show');
			}
			else {
				currentObj.tooltip('hide');
			}
		}
	});
	/*<dattaprasad> ECB-18161 ends*/
}
function readSecurityTooltip(currentObj) {
	if(currentObj.attr("aria-expanded") == "false") {
		console.log("In the if condition");
		currentObj.closest(".securityTooltip").find(".input-icon-tooltip-mobile").tooltip('show');
	}
	else {
		console.log("In the else condition");
		currentObj.closest(".securityTooltip").find(".input-icon-tooltip-mobile").tooltip('hide');
	}
	setTimeout(function(){currentObj.focus();},500);
}
/*<dattaprasad> ECB-18158 Added on 12-04-2019 ends*/

/*<Dattaprasad code for the header and footer related functionalities starts here*/
var newCheckoutMkobj = {
	enableDTMshipping: function(){
		if(dtmEnabledFlag == "true" || adobeLaunchEnabledFlag == "true"){
			mkorsData.page.name="checkout:shipping";
			mkorsData.page.channel="checkout";
			mkorsData.page.type="checkout:shipping";
			mkorsData.page.siteSectionLevel2="checkout:shipping";
			mkorsData.page.siteSectionLevel3="checkout:shipping";
			if(mkorsData.page.errorMessage != undefined){
				delete mkorsData.page.errorMessage;
			}
			_satellite.track("Checkout shipping");
		}
	}
};
$(function(){
	$(document).on("submit", '#footer_complete_account', function(e) {
		e.preventDefault();
		var localeName = $("#nonPrimaryLocale").val();
		if (localeName == null) {
			localeName = "";
		}
		var form = $(this);
		var formId = $(this).attr("id");
		var fieldsArray = form.serializeArray();
		var footerEmailId = $(this).find(".footer_email").val();
		//alert($("#footer_email").val());
		fieldsArray.push({
			name : "formName",
			value : formId
		});
		var successUrl = $(this).find('#successUrl').val();
			jQuery.ajax({
				url : localeName + '/checkout/common/ajaxFormSubmit.jsp',
				type : "post",
				data : fieldsArray,
				dataType : "json",
				cache : false,
				success : function(data) {
					//MKFP-361 : removed login query string : Harjeet
					location.href = successUrl;
				}
			});
	});
	$(document).on("submit", '#js-store-finder-form', function(e) {
		e.preventDefault();
		var localeName = $("#nonPrimaryLocale").val();
		if (localeName == null) {
			localeName = "";
		}
		var form = $(this);
		var formId = $(this).attr("id");
		var fieldsArray = form.serializeArray();
		fieldsArray.push({
			name : "formName",
			value : formId
		});
		var successUrl = $(this).find('#successUrl').val();
			jQuery.ajax({
				url : localeName + '/checkout/common/ajaxFormSubmit.jsp',
				type : "post",
				data : fieldsArray,
				dataType : "json",
				cache : false,
				success : function(data) {
					/*Added as part of MKPROD-1654 : START*/
					if(data.result == "success"){
						var zipcode = data.zipcode;
						var selctedZipcode = zipcode.replace(" ", "-");
						if (selctedZipcode != ''&& selctedZipcode != undefined) {
							successUrl =  successUrl+ '/'+ selctedZipcode;
							location.href = successUrl;
						} /* Added getUserCurrentLocation as part of MKFP-324 */
						else{
							newCheckoutMkobj.getUserCurrentLocation();
						}

					}  /*Added as part of MKPROD-1654 : END*/
					else if(data.result == "error"){
						/*<dattaprasad> MKPROD-1654 Fixed on 18-12-2015 starts*/
						$.each(data.errors,function(key,value){
							var propertyName = value.propertyName;
							propertyName = propertyName + "Error";
							$("."+propertyName).html(value.message).removeClass("hiddenErrorMsg").show();
						});
						$("#footer-zip").keydown(function(){
							$(this).closest('form').find(".error").addClass("hiddenErrorMsg");
						});
						/*<dattaprasad> MKPROD-1654 Fixed on 18-12-2015 starts*/
					}
				},
				error: function(xhr, ajaxOptions, thrownError) {
					newCheckoutMkobj.errorHandle(xhr, ajaxOptions, thrownError);
				}
			});
	});
//	$(document).on("click",".country-selector a",function(){
//		newCheckoutMkobj.changingCountry($(this));
//	});
//	$(document).on("click",".country-selector-mobile a",function(){
//		newCheckoutMkobj.changingCountry($(this));
//	});
//	$(document).on('click','.change_yes',function (){
//		$('#switchCountry').val("yes");
//		newCheckoutMkobj.redirectToCountry();
//	});
	$(document).on("submit", '#js-store-finder-form', function(e) {
		e.preventDefault();
		var localeName = $("#nonPrimaryLocale").val();
		if (localeName == null) {
			localeName = "";
		}
		form = $(this);
		formId = form.attr("id");
		fieldsArray = form.serializeArray();
		fieldsArray.push({
			name : "formName",
			value : formId
		});
		successUrl = form.find('#successUrl').val();
		errorUrl = form.find('#errorUrl').val();
		jQuery.ajax({
			url : localeName + '/checkout/common/ajaxFormSubmit.jsp',
			type : "post",
			data : fieldsArray,
			dataType : "json",
			cache : false,
			success : function(data) {
				location.href = successUrl;
			},
			error: function(xhr, ajaxOptions, thrownError) {
				newCheckoutMkobj.errorHandle(xhr, ajaxOptions, thrownError);
			}
		});
	});

	/*Creating the mkObj where we will define our custom functions*/
	newCheckoutMkobj={
			changingCountry:function(currentObj){
				var currentSite=currentObj.data("country");
				var requestSite=currentObj.data("countrycode");
				var locale=currentObj.data("locale");
				$('#change-country-confirm-modal').data('countrySelectedObj',currentObj);
				if(currentSite!=requestSite){
					$('#change-country-confirm-modal').modal('show');
				}
				else if($(".country-selected").find("a.link-primary").attr("data-locale") != locale){
					newCheckoutMkobj.redirectToCountry();
				}

			},
			redirectToCountry: function(){
				var currentObj = $('#change-country-confirm-modal').data('countrySelectedObj');
				var currentSite=currentObj.data("country");
				var requestSite=currentObj.data("countrycode");
				var url=currentObj.data("produrl");
				var locale=currentObj.data("locale");
				var currentURI=currentObj.data("currenturi");
				$('#locale').val(locale);
				if(locale == 'fr_CA'){
					$('#switchURL').val("https://"+url+"/"+locale);
				}else{
					$('#switchURL').val("https://"+url);
				}
				$('#set_locale_to_profile').submit();
			},
			/* Start MKFP-324 : Added geoLocation success methode : Harjeet */
			geolocationSuccess :function(position){
				var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				var geocoder = new google.maps.Geocoder();
				geocoder.geocode({ 'latLng': pos }, function (results, status){
					if (status == google.maps.GeocoderStatus.OK) {
						var address_components = results[0].address_components;
						var countryName = "";
						var zipCode = "";
						$.each(address_components, function(key,value){
							var typeComponentArr = value.types;
							var isCountry = $.inArray( "country", typeComponentArr );
							var isZipCode = $.inArray( "postal_code", typeComponentArr );
							if(isCountry != -1){
								countryName = value.long_name;
							}
							if(isZipCode != -1){
								zipCode = value.long_name;
							}
						});
						var country=countryName.replace(" ", "-");
						var url=localeName+'/stores/search/'+country+'/25/'+zipCode;
						location.href=url;
					}
				})

			},

			gerlocationError: function(error){
				var url=localeName+'/stores/';
				location.href=url;
			},

			getUserCurrentLocation : function(){
				if(navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(newCheckoutMkobj.geolocationSuccess, newCheckoutMkobj.gerlocationError);
				}
			},
			/* END : MKFP-324 : Added geoLocation success methode : Harjeet */
			footerShowHide: function(status){
				var localeName = $("#nonPrimaryLocale").val();
				if (localeName == null) {
					localeName = "";
				}
				var form = $("#selectedViewForm");
				var formId = form.attr("id");
				var collapsedStatus = false;
				if(status == 'true'){
					collapsedStatus = true;
				}
				else{
					collapsedStatus = false;
				}
				form.find("#selectedView").val(collapsedStatus);
				var fieldsArray = form.serializeArray();
				fieldsArray.push({
					name : "formName",
					value : formId
				});
				var successUrl = $(this).find('#successUrl').val();
				jQuery.ajax({
					url : localeName + '/checkout/common/ajaxFormSubmit.jsp',
					type : "post",
					data : fieldsArray,
					dataType : "json",
					cache : false,
					success : function(data) {
						//location.href = successUrl;
					}
				});
			},
			enableDTMpayment:function(){
				if(dtmEnabledFlag == "true" || adobeLaunchEnabledFlag == "true"){
					mkorsData.page.name="checkout:billing";
					mkorsData.page.channel="checkout";
					mkorsData.page.type="checkout:billing";
					mkorsData.page.siteSectionLevel2="checkout:billing";
					mkorsData.page.siteSectionLevel3="checkout:billing";
					if(mkorsData.page.errorMessage != undefined){
						delete mkorsData.page.errorMessage;
					}
					_satellite.track("Checkout Billing");
				}
			},
			enableDTMreview: function(){
				if(dtmEnabledFlag == "true" || adobeLaunchEnabledFlag == "true"){
					mkorsData.page.name="checkout:review";
					mkorsData.page.channel="checkout";
					mkorsData.page.type="checkout:review";
					mkorsData.page.siteSectionLevel2="checkout:review";
					mkorsData.page.siteSectionLevel3="checkout:review";
					if(mkorsData.page.errorMessage != undefined){
						delete mkorsData.page.errorMessage;
					}
					if (typeof sendCustomEvent === "function") {
						sendCustomEvent('dataLayerReady');
					}
					_satellite.track("Checkout review");
				}
			},
			enableDTMshipping: function(){
				if(dtmEnabledFlag == "true" || adobeLaunchEnabledFlag == "true"){
					mkorsData.page.name="checkout:shipping";
					mkorsData.page.channel="checkout";
					mkorsData.page.type="checkout:shipping";
					mkorsData.page.siteSectionLevel2="checkout:shipping";
					mkorsData.page.siteSectionLevel3="checkout:shipping";
					if(mkorsData.page.errorMessage != undefined){
						delete mkorsData.page.errorMessage;
					}
					_satellite.track("Checkout shipping");
				}
			},

			promoToggle: function(){
				$('[data-toggle="collapse"]').off("click").click(function (event) { /*<dattaprasad> GWSIT-608 Fixed on 06-11-2015*/
				    var targetId = $(event.target).attr('href'),
				        $targetEl = $(targetId);

				    if($targetEl.hasClass('collapsing')){
				      return;
				    }

				    var $iconEl = $('[data-icon-href="' + targetId + '"]');
				    if($iconEl.hasClass('icon-expand')){
				      $iconEl.removeClass('icon-expand');
				      $iconEl.addClass('icon-collapse');
				    }
				    else if($iconEl.hasClass('icon-collapse')){
				      $iconEl.removeClass('icon-collapse');
				      $iconEl.addClass('icon-expand');
				    }
				    else if ($iconEl.hasClass('icon-open')) {
				      $iconEl.removeClass('icon-open');
				      $iconEl.addClass('icon-close-');
				    }
				    else if ($iconEl.hasClass('icon-close-')) {
				      $iconEl.removeClass('icon-close-');
				      $iconEl.addClass('icon-open');
				    }
				  });
			},

			errorHandle: function(xhr, ajaxOptions, thrownError){
				if(xhr.status=='409'){
					location.href = sessionexpurl;
				} else if(xhr.status !='200' && xhr.status !='302'){
					location.href = internalServerError;
				}
			},

			giftWraptoggle: function(){
				$('.product-checkbox-desktop , .mob-gfWrap').find('input[type="checkbox"]').on('change', function(){
				    if(this.checked){
				      $($(this).attr('href')).collapse('show');
				    }
				    else {
				      $($(this).attr('href')).collapse('hide');
				    }
				});

				$('.js-add-note-link').on('click', function(){
					if(!$($(this).attr('href')).hasClass('collapsing')){
						if($(this).text() === 'Add Note'){
							$(this).text('Remove Note');
						}
						else {
							$($(this).attr('href')).find('textarea').val('');
							$(this).text('Add Note');
							/*<dattaprasad> GWUAT-82 Fixed on 19-11-2015 starts*/
							var giftNoteMaxlen = $($(this).attr('href')).find('textarea').attr("data-parsley-maxlength");
							$($(this).attr('href')).find('label.character-count').text(giftNoteMaxlen);
							/*<dattaprasad> GWUAT-82 Fixed on 19-11-2015 ends*/
						}
				    }
				});
			},

			giftWrapCheckToggle: function(){
				$('#gift_wrap_note .product-checkbox-desktop input[type="checkbox"]').each(function(){
					if($(this).is(":checked")){
						$($(this).attr('href')).collapse('show');
						/*<dattaprasad> GWUAT-113 Fixed on 23-11-2015 starts*/
						if($($(this).attr('href')).find('textarea').val().length > 0){
							$($(this).attr('href')).closest('.js-add-note-container').find('.wrapMsgCount').show();
						}
						/*<dattaprasad> GWUAT-113 Fixed on 23-11-2015 ends*/
					}
					else if($(this).is(":not(:checked)")){
					}
				});
				if($('#gift_wrap_note .product-checkbox-desktop input[type="checkbox"]:checked').length > 0){
					$('.addGift #gift-wrapping-checkbox').trigger("click");
				}
			},



			jsGiftAddnote: function(){
				$.each($('.js-add-note-container').find('textarea').toArray(), function(index, obj){
				    $(obj).simplyCountable({
				      counter: $(obj).data('counter'),
				      maxCount: 140,
				      strictMax: true
				    });
				// FRSIT-427
				/*$(".link-primary").on("click",function(){
				$("textarea").val($("textarea").text());

				});*/
				    if($(this).val().length >  0){

						$(this).closest('.js-add-note-container').find('.wrapMsgCount').show();
						}
						else{

							$(this).closest('.js-add-note-container').find('.wrapMsgCount').hide();}
				});
				 $(".js-add-note-container textarea").on('keyup',function(){

						if($(this).val().length >  -1){

						var giftNoteMaxlen = $(this).closest('.js-add-note-container').find('textarea').attr("data-parsley-maxlength");
						var textarealen=$(this).val().length;
						var totallen=giftNoteMaxlen-textarealen;
						$(this).closest('.js-add-note-container').find('wrapMsgCount span:first').text(totallen);

						$(this).closest('.js-add-note-container').find('.wrapMsgCount').show();
						}
						else{

							$(this).closest('.js-add-note-container').find('.wrapMsgCount').hide();}
				    });
				$(".js-add-note-container textarea").on('focus',function(){


					if($(this).val().length >  0){

					$(this).closest('.js-add-note-container').find('.wrapMsgCount').show();
					}
					else{

						$(this).closest('.js-add-note-container').find('.wrapMsgCount').hide();}
				});
				/*$(".js-add-note-container textarea").on('focusout',function(){
					if($(this).closest('.js-add-note-container').find('textarea').val().length > 0){
						$(this).closest('.js-add-note-container').find('textarea').val('');
						var giftNoteMaxlen = $(this).closest('.js-add-note-container').find('textarea').attr("data-parsley-maxlength");
						$(this).closest('.js-add-note-container').find('wrapMsgCount span:first').text(giftNoteMaxlen);
						$(this).closest('.js-add-note-container').find('.wrapMsgCount').hide();
					}
				});*/
				$(".js-add-note-container .clearNote").on('click',function(){
					$(this).closest('.js-add-note-container').find('textarea').val('');
					var giftNoteMaxlen = $(this).closest('.js-add-note-container').find('textarea').attr("data-parsley-maxlength");
					$(this).closest('.js-add-note-container').find('wrapMsgCount span:first').text(giftNoteMaxlen);
					$(this).closest('.js-add-note-container').find('.wrapMsgCount').hide();
				});
			},

			/*waseem fix for FRKSIT-246 on 18/09/2016 method resize slick*/
			resizeSlick: function(){
				setTimeout(function(){
				  var panelGroup = $('.panel-group');
				  if(panelGroup.hasClass('slick-initialized')){
					panelGroup[0].slick.setPosition();
				  }
				}, 100);
			},

			/*waseem ECB-11973 12/07/2017 added implementation of shipping restriction*/
			shippingMethodAddrUpdate: function(){
				var addrParam = {};
				var addressfield = $("#shipping-form #addr-1");
				var addressDropdown = $("#saved-address-dropdown");
		    	if(addressfield.is(":visible") && addressfield.val() != ""){
		    		var shippingState = $("#shipping-form select#state").val(),
		    		shippingAddrLine1 = $("#shipping-form #addr-1").val(),
		    		shippingAddrLine2 = $("#shipping-form #addr-2").val();
		    		addrParam = {
						address1: shippingAddrLine1,
						address2: shippingAddrLine2,
						shippingState : shippingState
					};
		    	}else if(addressDropdown.length > 0){
		    		var defAddress = addressDropdown.val();
		    		addrParam = {
						selectedAddress: defAddress
					};
		    	}
		    	return addrParam;
			},
			updateShippingMethodParam: function(){
				var shippingState = $("#shipping-form select#state").val(),
				shippingAddrLine1 = $("#shipping-form #addr-1").val(),
				shippingAddrLine2 = $("#shipping-form #addr-2").val();
				var addrParam = {
					address1: shippingAddrLine1,
					address2: shippingAddrLine2,
					shippingState : shippingState
				};

		    	$("#shippingMethodsContainer").load(localeName+"/checkout/includes/shippingMethod.jsp", addrParam, function(){
		    		var selShipMethod = $("#shipping-form .shipping-method:checked").val();
					if(selShipMethod == undefined || selShipMethod == ""){
						$("#shipping-form .shipping-method").first().click();
					}
		    	});
			},

			KorsvipCollapseExpand: function(){
				$(".heading-toggle").off('click').on('click', function(e){
					e.preventDefault();
					$(".mk-korsvip-overview").slideToggle();
					$(this).toggleClass("collapsed");
				});
			},

			removeExtraField: function(removeCheckboxExtraInputField){ /*<dattaprasad> GWSIT-496 Fixed on 22-12-2015 starts*/
				$.each(removeCheckboxExtraInputField, function(key, value){
					var currentObj = $("#"+value);
					var extraInputField = currentObj.next("input");
					currentObj.next("input").remove();
					currentObj.closest(".checkbox").append(extraInputField);
				});/*<dattaprasad> GWSIT-496 Fixed on 22-12-2015 ends*/
			}
	}
	$(".nav-links-detail").on("hide.bs.collapse", function(){
		newCheckoutMkobj.footerShowHide('true');
	});
	$(".nav-links-detail").on("show.bs.collapse", function(){
		newCheckoutMkobj.footerShowHide('false');
	});
	/*<dattaprasad> GWSIT-496 Fixed on 27-11-2015*/
	$('#review-gift-checkbox,#gift-checkbox-top').keydown(function(e){
		e.stopPropagation();
		var keyCode = e.keyCode || e.which;
		var  elem_1 = $(this);
		var hasFocus=elem_1.is(":focus");
		if(hasFocus === true && (keyCode==13)){
			if(elem_1.prop('checked') == true){
				elem_1.prop('checked', false);
			}
			else{
				elem_1.prop('checked', true);
			}
		}
	});

	/*<dattaprasad> GWSIT-496 Fixed on 27-11-2015 ends*/
	/*<dattaprasad> GWSIT-458 Fixed on 02-12-2015 starts*/
	$('.js-country-selector-desktop').focus(function(e){
		e.stopPropagation();
		var  currentObj = $(this);
		currentObj.tooltip('show');
		$(".country-selector .link-primary").attr("tabindex","0");
	});
	$(".js-country-selector-desktop").on("keydown",".link-primary",function(e){
		e.stopPropagation();
		var keyCode = e.keyCode || e.which;
		var  currentObj = $(this);
		var hasFocus=currentObj.is(":focus");
		if(hasFocus === true && (keyCode==13)){
			currentObj.trigger('click');
			$('.js-country-selector-desktop').tooltip('hide');
		}
	});
	$('.my-account-link, #header-back-link').focusin(function(e){
		$('.js-country-selector-desktop').tooltip('hide');
	});
	/*<dattaprasad> GWSIT-458 Fixed on 02-12-2015 ends*/
	/*waseem ECB-12375 12/10/2017*/
	newCheckoutMkobj.KorsvipCollapseExpand();
	$("body").on("click",".signUpOverlay", function(e){
		e.preventDefault();
		if(window.innerWidth < window.KOR.breakpoints.md) {
			$(".mk-korsvip-overview").slideUp();
			$(".heading-toggle").addClass("collapsed");
		}
		$("body").addClass("overlayOpen");
		$("#JoinsUs").collapse('show');
	});
	$("body").on("click", ".kor-overlay-header-close", function(){
		$("body").removeClass("overlayOpen");
		$("#JoinsUs").collapse('hide');
	});
});
/*<Dattaprasad code for the header and footer related functionalities ends here*/

/*<prashob> GWSIT-369 05Nov2015 Starts*/
	if($('.header-account-tooltip-content').length){
		$('.my-account-link .header-account-tooltip-content').remove();
	}
/*<prashob> GWSIT-369 05Nov2015 Ends*/


/*<sukraj >checkout UI Countrydrop start*/

$(document).ready(function() {

	$(".country_dropdown_ctry").find('ul').find("li").on("click",function(){
		var selectedctry = $(this).find('span').html();
		var slectedCtry_flag = $(this).find('img').attr("src");
		$("#selectedCtry").attr("src",slectedCtry_flag);
		$("#selectedCtry_name").html(selectedctry);
	});


	$(document).on('hidden.bs.modal', function (event) {
		if ($('.modal:visible').length) {
			$('body').addClass('modal-open');
		}
	});

	/*country change modal popup start*/
	$('.change_yes').click(function() {
		$('#country_change_popup').modal('hide');
		$("#selectedCtry_mainFlg").attr("src",$("#selectedCtry").attr("src"));
	});
	$('#close_ctry').click(function() {
		$('.country_container,.country_arrow').hide();
	});
	/*country change modal popup end*/

	/*$('.size-guide_close').on('click',function(){
		$('#size-guide-modal').removeClass('in').css("display","none");
	});	*/
	/*<prashop/sukraj> fix for FRKSIT-244 starts on 19/09/2016*/
	$(".storePickUpBottomDivider:last").hide();
	/*<prashop/sukraj> fix for FRKSIT-244 ends on 19/09/2016*/
	/*waseem LLUAT-49 25/10/2017*/
	$(document).on("click", ".registerLoyalty", function(e){
	e.preventDefault();
	window.__regLoyaltylightBoxOpen__();
	});
});

/*<sukraj> checkout UI Countrydrop end*/


/* country dropdown releated js code*/
//populating country dropdown

var cntryMkobj = cntryMkobj || (function() {
	var webURL, mobileRequest = $("#isMobileRequest").val(),firstReq=true,isNACountry='false',total_cntryCount,
	  _initcntryList = function(){
				$.ajax({
					url : "/common/fetchCountryDetails.jsp",
					type : "GET",
					dataType : "JSON",
					success : function(data) {
						cntryListObj = $.extend(true,{},data);
						cntryListObj.UiCountryData = {};
						g_cntryList = data;
						_setCntryList(data);
						/*_setcntryListMobile(data);*/
						$(".checkout-countryImg").attr("src", cntryListObj.UiCountryData.defaultContryData.flagURL);
					}
				});
			},
			setCntryLanguage = function(selectedCntryList){
				$('.country_poppup_ctry #select_box_ctrylng .language_ctry').append('<ul></ul>');
				$('.select_box_ctry  img#selectedCtry').attr("src",selectedCntryList.flagURL);
				$('.select_box_ctry  span#selectedCtry_name').html(selectedCntryList.countryName);
				var selectedctry_label = selectedCntryList.countryName + " selected";
				$('.select_box_ctry  span#selectedCtry_name').attr("aria-label", selectedctry_label);
				cntryListObj.UiCountryData.sRegion = selectedCntryList.region;
				cntryListObj.UiCountryData.sCtryCd = selectedCntryList.ctryCd;
				$.each(selectedCntryList.languages,function(i, value) {
					$('.country_poppup_ctry #select_box_ctrylng .language_ctry ul').append('<li lngCode="'+ i+ '" tabindex="1">'+ value+ '</li>');
					if (i == selectedCntryList.selectedLanguage) {
						$('.country_poppup_ctry #select_box_ctrylng #selectedLang').html(value);
						$('.country_poppup_ctry #select_box_ctrylng #selectedLang').attr("lngCode",i);
						$('.language_ctry ul li[lngCode="'+ i+'"]').addClass('selected_ctrylng');
						cntryListObj.UiCountryData.sLngCode = i;
					}
				});
			},
			_setCntryList = function(cntryList){
				var cntryRegion = {},divided_column_no,element_count=0,divid_flag  = true;
				var country_dropdown = "<div class='column1_ctry cntryColLeft'>";
				$.each(cntryList,function(i, categoryList) {
					if(i !='countryCount'){
						/*var regionName = i.replace('_',' ');
						country_dropdown += '<div id="'+i+'"><h3>'+i.replace('_',' ')+'</h3><ul id="'+i+'">';*/
						$.each(categoryList,function(key, value) {
							/*element_count += 1;
							if(element_count <= divided_column_no){
								country_dropdown += '<li data-cntryCode="'+ value.ctryCd+ '" role="option" tabindex="0"><img aria-hidden="true" alt="" src="'+ value.flagURL+ '" data-cntryCode="'+ value.ctryCd+ '" value="'+ value.countryName+ '"><span>'+ value.countryName+ ' ('+ value.currency+ ')</span></li>';
							}else{
								if(divid_flag){
									country_dropdown += '</ul></div></div><div class="column1_ctry border_none_ctry"><div id="'+i+'"><ul id="'+i+'">';
								}
								country_dropdown += '<li data-cntryCode="'+ value.ctryCd+ '" tabindex="0"><img aria-hidden="true" alt="" src="'+ value.flagURL+ '" data-cntryCode="'+ value.ctryCd+ '" value="'+ value.countryName+ '"><span>'+ value.countryName+ ' ('+ value.currency+ ')</span></li>';
								divid_flag = false;
							}*/
							if(value.defaultCtry){
								cntryListObj.UiCountryData.defaultContryData = value;
								/*defaultCountry = value.ctryCd;
								defaultCntryRegion = i;
								setCntryLanguage(value);*/
								cntryListObj.UiCountryData.sRegion = value.region;
								cntryListObj.UiCountryData.sCtryCd = value.ctryCd;
							}
						});
						/*country_dropdown += '</ul></div>';
					}else{
						total_cntryCount = categoryList;
						if(total_cntryCount > 14){
							divided_column_no = Math.round(total_cntryCount/2);
						}else{
							divided_column_no = total_cntryCount;
						}*/
					}
				});
				country_dropdown += "</div>";
				/* $('.country_dropdown_ctry').html(country_dropdown);
				if(total_cntryCount < 14){
					$('.country_dropdown_ctry').css('width','225px');
					$('.column1_ctry.cntryColLeft ul li').css('width','223px');
					$('.country_dropdown_ctry .column1_ctry.cntryColLeft').css('border-right','none');
				} */
			},
			_chngeCntryfromSubmit = function(deviceType){
				var locale,finalURL='',switchURL,selectedLang,selectedCntryRegion,selectedCntryCode;
				var requestURI = $('#pageRequestURI').val();
				if(deviceType == 'mobile'){
					var seltedCntryOpn= $('#country-selector .select_ctry select option:selected');
					selectedCntryRegion = seltedCntryOpn.data('cntryregion');
					selectedCntryCode = seltedCntryOpn.data('cntrycode');
					selectedLang = $('#country-selector .select_ctrylng select option:selected').attr("value");
				}else{
				    selectedCntryRegion = (cntryListObj.UiCountryData.sRegion).replace(' ','_');
					selectedCntryCode = cntryListObj.UiCountryData.sCtryCd;
					selectedLang = cntryListObj.UiCountryData.sLngCode;
				}
				var currentURI = $('#currentURI').text();
				locale = selectedLang+ "_"+ cntryListObj[selectedCntryRegion][selectedCntryCode].twoCharCd;
				if (cntryListObj[selectedCntryRegion][selectedCntryCode].defLanguage != selectedLang) {
					switchURL = (mobileRequest == 'true')?cntryListObj[selectedCntryRegion][selectedCntryCode].mobURL+ "/" + locale:cntryListObj[selectedCntryRegion][selectedCntryCode].webURL+ "/" + locale;
				}else {
					switchURL = (mobileRequest == 'true')?cntryListObj[selectedCntryRegion][selectedCntryCode].mobURL:cntryListObj[selectedCntryRegion][selectedCntryCode].webURL;
				}
				$('#locale').val(locale);
				var swichOfDiffCountries = cntryListObj[selectedCntryRegion][selectedCntryCode].region != cntryListObj.UiCountryData.defaultContryData.region;
				var switchInSameRegion = cntryListObj[selectedCntryRegion][selectedCntryCode].regionCode == 'na'
					&& cntryListObj.UiCountryData.defaultContryData.regionCode == 'na';
				if (swichOfDiffCountries || switchInSameRegion){
					finalURL = switchURL ;
				}else{
					var finalRequestURI = "" ;
					if(requestURI.indexOf("_") != -1 && requestURI.indexOf("_") < 5){
						var splitRequestURI = requestURI.split("/");
						if(splitRequestURI.length > 1 && splitRequestURI[1].indexOf("_") != -1){
							for(var index=2;index<splitRequestURI.length;index++){
								finalRequestURI += "/"+splitRequestURI[index];
							}
						}
					}else {
						finalRequestURI = requestURI;
					}
					finalURL = switchURL+finalRequestURI;
					var finalURLSplitArray = finalURL.split("?");
					var browserQueryString ;
					var finalQueryString ;
					if(finalURLSplitArray != null && finalURLSplitArray.length > 1){
						finalQueryString = finalURLSplitArray[1];
					}

					var browserURL = window.location.href;
					var browserSplitURL = browserURL.split("?");

					if(browserURL.length > 1){
						 browserQueryString = browserSplitURL[1];
					}

					if(browserQueryString != undefined && browserQueryString.length >1){
						if(browserQueryString.localeCompare(finalQueryString) != 0){
							 	finalURL = finalURL +"?"+ browserQueryString;
						}
					}
				}
				$('#switchURL').val(finalURL);
				if(swichOfDiffCountries || switchInSameRegion){
					$('#switchCountry').val("yes");
					$.ajax({
						url : '/common/ajax/countryChangePopup.jsp',
						type : 'GET',
						dataType : 'html',
						success : function(data) {
							$('.country_container,.country_arrow').hide();
							$('#country-selector').modal('hide');
							$('#change-country-confirmation-modal').find('.modal-body').html(data);
							$('#change-country-confirmation-modal').modal('show');
						}
					});
				}
				else{
					$('#switchCountry').val("no");
					$('#set_locale_to_profile').submit();

				}
			},
			/*Starts - Added to switch the local on click of cancel in the shopping cart page - Manjula*/
			_chngeCntryfromCancel = function(e) {
				e.preventDefault();
				var locale, switchURL, currentURI, countryId, countryRegion, basketPort;
				currentURI = $('#currentURI').text();
				countryId = $('#countryId').val();
				countryRegion = $('#countryRegion').val();
				if(mobileRequest=='true') {
					switchURL = g_cntryList[countryRegion]['Ctry'+countryId].mobURL;
				}
				else {
					switchURL = g_cntryList[countryRegion]['Ctry'+countryId].webURL;
				}
				var finalRequestURI = "" ;
				var requestURI = $('#pageRequestURI').val();
				if(requestURI.indexOf("_") != -1 && requestURI.indexOf("_") < 5){
					var splitRequestURI = requestURI.split("/");
					if(splitRequestURI.length > 1 && splitRequestURI[1].indexOf("_") != -1){
						for(var index=2;index<splitRequestURI.length;index++){
							finalRequestURI += "/"+splitRequestURI[index];
						}
					}
				}else {
					finalRequestURI = requestURI;
				}

				basketPort = $('#basketPort').val();
				if(basketPort!=undefined && basketPort!='' && basketPort=='yes') {
					finalRequestURI = "/checkout/checkout.jsp";
				}
				locale = $('#prevLocale').val();
				$('#switchToPreviousDomain #locale').val(locale);
				$('#switchToPreviousDomain #switchCountry').val("no");
				switchURL = switchURL+finalRequestURI;
				$('#switchToPreviousDomain #switchURL').val(switchURL);
				$('#switchToPreviousDomain').submit();
			},
			/*Ends - Added to switch the local on click of cancel in the shopping cart page - Manjula*/
			_chngeLang = function($this){
				$('.country_poppup_ctry #select_box_ctrylng .language_ctry').empty();
				var cntyRegionName = $this.parent().attr('id');
				var cntryCode = $this.attr('data-cntryCode');
				setCntryLanguage(cntryListObj[cntyRegionName][cntryCode]);
			},

			_IP_popup = function(status){
				/*....Michael IP popup Scripts....*/
				//Modified as part of ECOSIT-299
	    		var nonPrimarylocale = $("#nonPrimaryLocale").val();

				var  ajaxURL = "/homepage/cookieStatus.jsp";

				if((firstReq && status.toLowerCase()=='yes') || status.toLowerCase()=='yes'){
					ajaxURL+='?clicked='+status;
				}
				var akamaiParam = '';

				if(status.toLowerCase()=='no'){
					var readAjaxURL = nonPrimarylocale + "/checkout/includes/totalItemCount.jsp";
					$.ajax({
						url : readAjaxURL,
						dataType : "html",
						async:false,
						success : function(data,textStatus,request){
							akamaiParam = request.getResponseHeader('MK-USER-COUNTRY');
							if(firstReq){
								firstReq=false;
								ajaxURL+='?clicked='+status+'&akamaiParameter='+akamaiParam;
							}
						}
					});
				}

				$.ajax({
					url : ajaxURL,
					dataType : "JSON",
					success : function(data) {
						if (data.ipOverlay == "true") {
							isNACountry = data.isNACountry;
							$("#ipDetection-modal").modal('show');
						}
						else{
							 if(data.display == "true") {
								 $("#cookie_msg_popup").show();
								cookie_msg_overlay();
							}
						}
						webURL = data.webURL;
					}
				});

			},
			_getCtryWebURL = function(){
				return webURL;
			},
			/* for mobile device start*/
			_setcntryListMobile = function(cntryList){
				var cntryItems = '<select id="country_selection">';
				$.each(cntryList,function(key, items) {
					if(key != 'countryCount'){
					$.each(items,function(index, value) {
						if(value.defaultCtry){
						cntryItems += '<option data-cntryRegion="'+key+'" data-cntryCode="'+ value.ctryCd+ '" value="'+ value.countryName+ '" selected>'+ value.countryName+ ' ('+ value.currency+ ')</option>';
							//defaultCntryRegion = key;
							cntryListObj.UiCountryData.defaultContryData = value;
							setLangListMobile(value);
						}else{
							cntryItems += '<option data-cntryRegion="'+key+'" data-cntryCode="'+ value.ctryCd+ '" value="'+ value.countryName+ '">'+ value.countryName+ ' ('+ value.currency+ ')</option>';
						}
					});
				}
				});
				cntryItems += '</select>';
				$('#country-selector .select_ctry').html(cntryItems);
				try{
				$('#country-selector .select_ctry select').selectbox();
				}catch(err){
				    console.log(err.message);
				}
			},
			setLangListMobile = function(langList){
				var langItem = '<select id="language_selection">';
				$.each(langList.languages,function(i, value){
					if (i == langList.selectedLanguage) {
						langItem += '<option value="'+ i+ '" selected>'+ value+ '</option>';
					}else{
						langItem += '<option value="'+ i+ '">'+value+ '</option>';
					}
				});
				langItem += '</select>';
				$('#country-selector .select_ctrylng').html(langItem);
				try{
				$('#country-selector .select_ctrylng select').selectbox();
				}catch(err){
				    console.log(err.message);
				}
			},
			_resetLagnListmobile = function($this){
				var seldCntry = $this.find(":selected"),
				 regnName = seldCntry.data('cntryregion'),
				 cntrycode = seldCntry.data('cntrycode');
				 setLangListMobile(cntryListObj[regnName][cntrycode]);

			},
			_setDefaultCntry = function(){
				$('.select_box_ctry  img#selectedCtry').attr("src",cntryListObj.UiCountryData.defaultContryData.flagURL);
				$('.select_box_ctry  span#selectedCtry_name').html(cntryListObj.UiCountryData.defaultContryData.countryName +' ('+cntryListObj.UiCountryData.defaultContryData.currency+')');
				$('.country_poppup_ctry #select_box_ctrylng .language_ctry').html("");
				setCntryLanguage(cntryListObj.UiCountryData.defaultContryData);
				if(total_cntryCount < 14){
					$('.country_dropdown_ctry').css('width','225px'); /*<sukraj> EUAT-3 Fixed on 24-06-2016 */
					$('.column1_ctry.cntryColLeft ul li').css('width','223px');/*<sukraj> EUAT-3 Fixed on 24-06-2016*/
					$('.country_dropdown_ctry .column1_ctry.cntryColLeft').css('border-right','none');
				}
			},
			_setDefaultCntryMobile = function(){
				var cntryName = cntryListObj.UiCountryData.defaultContryData.countryName;
				var currSldCntryName = $("#country_selection option:selected").val();
				if(cntryName != currSldCntryName ){
					$("#country_selection option[value='" + cntryName +"']").attr("selected","selected");
					var tmpSbid = $("#country_selection").attr('sb');
					$("#sbSelector_"+tmpSbid).text($("#country_selection option:selected").html());
					setLangListMobile(cntryListObj.UiCountryData.defaultContryData);
				}
			},
			cookie_msg_overlay = function(){
				var overlayDiv = "<div class='cookie_msg_overlay'></div>";
				$('body').append(overlayDiv).show();
			};
			/* for mobile device end*/
	return{
		module: "cntryMkobj",
		initcntryList:_initcntryList,
		chngeLang:_chngeLang,
		chngeCntryfromSubmit:_chngeCntryfromSubmit,
		IP_popup:_IP_popup,
		getCtryWebURL:_getCtryWebURL,
		resetLagnListmobile:_resetLagnListmobile,
		chngeCntryfromCancel:_chngeCntryfromCancel,
		setDefaultCntry:_setDefaultCntry,
		setDefaultCntryMobile:_setDefaultCntryMobile

	}
})();


$(document).ready(function() {
	var IPOffValue= $('#combinedIPDetctionValue').val();
	var pageRequestURI = $('#pageRequestURI').val();
	if(pageRequestURI != undefined && pageRequestURI.indexOf(IPOffValue) != -1){
		cntryMkobj.IP_popup('yes');
	}else{
		cntryMkobj.IP_popup('no');
	}

	cntryMkobj.initcntryList();

	 /*$(document).on("click touchstart",function(e){Fix for EUSIT-615 - 25/April/2016 - sukraj
		 if((!$(e.target).closest(".country_container").length > 0) && (!$(e.target).is('.countrydrop_show'))){
			$('.country_container,.country_arrow,.language_ctry,.country_dropdown_ctry').hide();
		}
	});*/
	 $(document).on('click keypress','.country_poppup_ctry .language_ctry ul li',function(e){
		if((e.type=="click")||(e.type=="keypress" && e.which == 13)){
			$('.country_poppup_ctry #select_box_ctrylng #selectedLang').html($(this).html());
			$('.country_poppup_ctry #select_box_ctrylng #selectedLang').attr("lngCode",$(this).attr("lngCode"));
			cntryListObj.UiCountryData.sLngCode = $(this).attr("lngCode");
			$('.language_ctry ul li').removeClass('selected_ctrylng');
			$(this).addClass('selected_ctrylng');
			if(e.type=="keypress"){
				$(".select_language_ctry .select_box_ctry").focus();
			}
		}
	});
	$(".select_language_ctry .select_box_ctry").on("click keypress",function(e){
		$(".country_dropdown_ctry").hide();
		if($('.language_ctry ul li').length > 1){
			if((e.type=="click") || (e.type=="keypress" && e.which == 13)){
				$(".language_ctry").toggle(200);
			}
		}
	});
    $(".select_country_ctry .select_box_ctry").on("keypress click",function(e){
        $(".language_ctry").hide();
        var target_ctnr = $('.country_dropdown_ctry h3');
        if(!target_ctnr.is(e.target) && (e.type=="click") ){
            if($('.country_dropdown_ctry').css('display') == 'none') {
                $(".country_dropdown_ctry").removeAttr("aria-hidden");
            }
            else {
                $(".country_dropdown_ctry").attr('aria-hidden', 'true');
            }
            $(".country_dropdown_ctry").toggle(200);
        }else if(e.type=="keypress" && e.which == 13){
            if($('.country_dropdown_ctry').css('display') == 'none') {
                $(".country_dropdown_ctry").removeAttr("aria-hidden");
            }
            else {
                $(".country_dropdown_ctry").attr('aria-hidden', 'true');
            }
            $(".country_dropdown_ctry").toggle(200);
        }
    });

	$(document).on('click keypress','.country_poppup_ctry .column1_ctry ul li',function(e){
		if((e.type=="click")||(e.type=="keypress" && e.which == 13)){
			cntryMkobj.chngeLang($(this));
			if(e.type=="keypress"){
				$(".select_country_ctry .select_box_ctry").focus();
			}
		}
	});
	$(document).on('change',".select_ctry select",function (e) {
		cntryMkobj.resetLagnListmobile($(this));
	});

	$(document).on('change',"#billing-address-dropdown",function (e) {
		if($('#billing-address-dropdown').val() == '') {
			$("#billing-address-dropdown option:selected").text("Nothing Selected");
		}
	});

	 $("#go_button_ctry").on("keypress click",function(e) {
		 if((e.type=="click")||(e.type=="keypress" && e.which == 13)){
			 cntryMkobj.chngeCntryfromSubmit('desktop');
		 }
	});
	 /* Mobile country dropdown*/
	 $(document).on('click','#SeldCountrySubmit',function(){
		cntryMkobj.chngeCntryfromSubmit('mobile');
	});

	 $(document).on('click','#cookie_msg_popup .close-x,.cookie_msg_overlay,#cookie_msg_popup #accept', function() {
			$('#cookie_msg_popup').hide();
			$('.cookie_msg_overlay').remove();
		});
	 $(document).on('click','.change_yes',function(){
		 $('#set_locale_to_profile').submit();

	 });
	 $(document).on('click','.change_no',function(){
		$('#change-country-confirmation-modal').modal('hide');

	 });
	 $(document).on('click  keypress','.size-guide_close',function(e){
			 if((e.type=="click")||(e.type=="keypress" && e.which == 13)){
				 $('#size-guide-modal').modal('hide');
			 }
		});
	 /*EUSIT-361 starts : 25/March/2016*/
	 $(document).on('touchstart','.size-guide_close',function(e){
			 $('#size-guide-modal').modal('hide');
	 });
	 /*EUSIT-361 ends : 25/march/2016*/
	 $('#ipDetection-modal .countryip_submitfirst').on('click',function() {
			$("#ipDetection-modal").modal('hide');
			cntryMkobj.IP_popup('yes');
		});
		$('#ipDetection-modal .countryip_submitsecond').on('click',function() {
			window.location=cntryMkobj.getCtryWebURL();
		});

		/*Starts - Added to switch the local on click of cancel in the shopping cart page - Manjula*/
		$("a#cancelBtn").on("click",function(e) {
			 cntryMkobj.chngeCntryfromCancel(e);
			});
		/*Ends - Added to switch the local on click of cancel in the shopping cart page - Manjula*/

		$(document).on('click','.shipping-method',function(){
			//alert($(this).val());
			$("#shippingMethod").val($(this).val());
		});
		$(document).on('click','.countrySelectorModal',function(e){
			/*if(cntryListObj.UiCountryData.defaultContryData.flagURL != $('.select_box_ctry  img#selectedCtry').attr("src")){
				cntryMkobj.setDefaultCntry();
			}
			$('.country_container,.country_arrow').show();*/
			/*envoking react country selector modal*/
			/*EUISSIT-699 waseem 03/10/2018*/
			e.preventDefault();
			var $width = $(window).width();
			var cntryModal = $(".utility-nav .countrySelector");
			if(cntryModal.length > 0 && $width > 1025) {
				cntryModal.trigger("click");
			}
		});
		$('.js-account-link-desktop,.my-account-link').on('mouseover focus',function(){
			$('.country_container,.country_arrow').hide();
		});

		$(document).on("keypress",".select_box_ctry,.country_poppup_ctry .column1_ctry ul li,.language_ctry ul li,.go_button_ctry",function(e){
			if((e.which || e.keyCode) == 32){
				e.preventDefault();
			}
		});

		$('#country-selector').on('show.bs.modal', function() {
			cntryMkobj.setDefaultCntryMobile();
			if(dtmEnabledFlag == "true" || adobeLaunchEnabledFlag == "true"){
			var currCntry = mkorsData.tagConfig.adobe.accountCountry;
			var countrySelector = $("#countrySelector").val();
			mkorsData.page.name=countrySelector+": "+currCntry;
			mkorsData.page.channel=countrySelector;
			mkorsData.page.type=countrySelector;
			mkorsData.page.siteSectionLevel2=countrySelector;
			mkorsData.page.siteSectionLevel3=countrySelector;
			}
		});
		$(document).on('click','.modal-backdrop.fade.in',function(){
			if($("#country-selector").data('bs.modal').isShown){
				$("#country-selector").modal('hide');
			}
		});
		/*Starts - update for paypal popup  - nitish , MKFP-547<waseem>*/
		$(document).on("click","#paypalcustimage,#paypalcustmobileimage, #paypalInitShipping",function(){
			if(!($(this).hasClass("disablepaypal-btn"))){
				if($(this).attr("id") == "paypalInitShipping"){
					paypalClick("true");
				}else{
					paypalClick("false");
				}
			}
			//var reqfromShipPage = $(this).attr("reqfromShipping");
			//paypalClick(reqfromShipPage);
		});
		/*End - update for paypal popup - nitish*/

		/*<dattaprasad> ECB-19088 Added on 21-12-2018 starts*/
		$(document).on("mouseenter", "a, button, input", function(){
		    $(this).addClass("mouseFocusUnActive");
		});
		$(document).on("keydown", "a, button, input", function(){
			if($(".mouseFocusUnActive").length > 0){
				$("a, button, input").removeClass("mouseFocusUnActive");
			}
		});
		/*<dattaprasad> ECB-19088 Added on 21-12-2018 ends*/
		/*<dattaprasad> ECB-19853 Added on 15-11-2019 starts*/
		$('.modal').on('show.bs.modal', function (){
		  $(".close span").html("");
		});
		$('.modal').on('shown.bs.modal', function (){
		  $(".close span").html("");
		});
		/*<dattaprasad> ECB-19853 Added on 15-11-2019 ends*/
});

/*$(document).ready( function(){
	if($(".checkout").length > 0){
	var formType = 'getPaypalService';
		$.ajax({
			type	: "POST",
			url	: "/checkout/common/ajaxIntermediateRequest.jsp",
			data	: {"formID": formType},
			dataType: "html",
			async : false,
			success : function(data) {
			   alert('hello');

			},
			error: function(e) {
			   alert('in error');
			},
			complete : function(){
				 wizardInit(1);
			}
		});
	}
});*/


//[Added as part of MKEcho Paypal Release] for populating error in checkout flow
$(window).load(function() {
	var errorMsg =$('#errorPaypalGet').val();
	if(errorMsg != null && errorMsg != 'undefined' && errorMsg != ""){
        $("#generic-error-message-container").removeClass("hidden");
        $("#generic-error-message-container .alert-message--error .alert-message__text").html(errorMsg);
        $("#generic-error-message-container .alert-message--error").removeClass("hidden");
	}
	/*FRKSIT-469 <prashob> 23Sep2016 Starts*/
	korscheckoutobj.chekboxEnterKeyActive();
	/*FRKSIT-469 <prashob> 23Sep2016 Ends*/

  $("#shippingContainer").removeAttr("role tabindex");
  $("#billingContainer").removeAttr("role tabindex");
  $("#reviewContainer").removeAttr("role tabindex");

});
function ajaxPayPalIntermediateFormSubmit(form, loaderInitText, ladda){
	var PPShippingStep = $("#paypalShippingReq").val();
	var formId = $(form).attr("id");
	var $form = '#'+"shipping-form";

	var errform = $($form);
	var errformid = errform.attr("id");
	var fieldsArray = $(form).serializeArray();
	fieldsArray.push({
		name : "formName",
		value : formId
	});
	fieldsArray = $.grep(fieldsArray, function(n, i) {
		return n.name != "successUrl";
	});
	fieldsArray = $.grep(fieldsArray, function(n, i) {
		return n.name != "errorUrl";
	});
	var successUrl = $(form).find('#successUrl').val();
	var errorUrl = $(form).find('#errorUrl').val();
	var pageName = $(form).find('#pageFrom').val();

	$.ajax({
		url : localeName + '/checkout/common/ajaxFormSubmit.jsp',
		type : "post",
		data : fieldsArray,
		dataType : "json",
		cache : false,
		beforSend : function(){

		},
		success : function(data) {
			if(data.result == "success"){
				if(data.formName == "payPalForm-removeCall"){
					if(PPShippingStep == "true"){
						$("#shippingContainer").attr("data-submitvalidate", "false");
						$("#shippingContainer").load(localeName+"/checkout/includes/containerShippingForm.jsp", function(){
						    wizardInit(0);
						    shippingInit();
						    initializeZipcode();
						    initializeAddress1();
						    if(mobileRequest == 'false') {
									$("#shippingContainer").find('.selectpicker').selectpicker('refresh');
								}
						  //MKCAB-16 Fix for ECOSIT-340 | END
						});
					}else{
						$("#billingContainer").load(localeName+"/checkout/includes/containerBilling.jsp", function(){
							$("#payment-step").removeClass("hidden");
							wizardInit(1);
							billingInit();
							initializeBillingZipcode();
							initializeBillingAddress1();
							if(mobileRequest == 'false') {
								$("#billingContainer").find('.selectpicker').selectpicker('refresh');
							}
							/*<dattaprasad> GWSIT-496 Fixed on 22-12-2015 starts*/
							var removeCheckboxExtraInputField = ['use-shipping-checkbox', 'mailing-list'];
							newCheckoutMkobj.removeExtraField(removeCheckboxExtraInputField);
							/*<dattaprasad> GWSIT-496 Fixed on 22-12-2015 ends*/
						});
					}
				}else{
					ladda.stop();
					$('#payment-form .ladda-button').text(loaderInitText);
					$(".shipping-completed").load(localeName+"/checkout/includes/shippingFormInfo.jsp");
					wizardInit(1);
					korscheckoutobj.orderSummaryTaxInit();
					$(".orderReviewAmount").load(localeName+"/checkout/includes/youWillBeCharged.jsp");
					//MKCAB-16 Fix for defect-274 | START
					$.ajax({
						url : localeName + '/checkout/includes/containerBillingForm.jsp',
						type : "post",
						dataType : "html",
						cache : false,
						success : function(data) {
							$('.paypalResponseAddress').html($(data).find('.paypalResponseAddress').html());
						}
					});
					//MKCAB-16 Fix for defect-274 | END
				}
			}
			if(data.result == "error"){
				//MKCAB-16 Fix for ECOSIT-340 | START
				$("#shippingContainer").attr("data-submitvalidate", "false");
				$("#shippingContainer").load(localeName+"/checkout/includes/containerShippingForm.jsp", function(){
				    wizardInit(0);
				    shippingInit();
				    initializeZipcode();
				    initializeAddress1();
				    $("#shippingContainer").find('.selectpicker').selectpicker('refresh');
				  //MKCAB-16 Fix for ECOSIT-340 | END
				});

				korscheckoutobj.displayError(data, errform, errformid);

			}
		},
		complete : function(){

		},
		error: function(xhr, ajaxOptions, thrownError) {
			newCheckoutMkobj.errorHandle(xhr, ajaxOptions, thrownError);
		}

	});
}

/** ECB-24499 Changes */
function sendCustomEvent(evt){
    if (document.createEvent && document.body.dispatchEvent) {
        var event = document.createEvent('Event');
        event.initEvent(evt, true, true); //can bubble, and is cancellable
        document.body.dispatchEvent(event);
    } else if (window.CustomEvent && document.body.dispatchEvent) {
        var event = new CustomEvent(evt, {
            bubbles : true,
            cancelable : true
        });
        document.body.dispatchEvent(event);
    }
}
