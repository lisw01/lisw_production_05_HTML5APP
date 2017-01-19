;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-baitianqing" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512 275.584C381.632 275.584 275.584 381.632 275.584 512c0 130.368 106.048 236.48 236.416 236.48S748.352 642.368 748.352 512C748.352 381.632 642.368 275.584 512 275.584zM512 696.512C410.304 696.512 327.552 613.76 327.552 512S410.304 327.552 512 327.552c101.76 0 184.512 82.752 184.512 184.448S613.76 696.512 512 696.512z"  ></path>' +
    '' +
    '<path d="M512 241.344c14.336 0 25.984-11.648 25.984-25.984L537.984 89.984C537.984 75.648 526.336 64 512 64S486.016 75.648 486.016 89.984l0 125.376C486.016 229.696 497.664 241.344 512 241.344z"  ></path>' +
    '' +
    '<path d="M512 782.72c-14.336 0-25.984 11.648-25.984 25.92l0 125.376C486.016 948.352 497.664 960 512 960s25.984-11.648 25.984-25.92l0-125.376C537.984 794.368 526.336 782.72 512 782.72z"  ></path>' +
    '' +
    '<path d="M283.904 320.64c5.056 5.056 11.712 7.616 18.368 7.616 6.656 0 13.312-2.56 18.368-7.616 10.176-10.176 10.176-26.624 0-36.736L231.936 195.264c-10.112-10.176-26.56-10.176-36.736 0s-10.112 26.624 0 36.736L283.904 320.64z"  ></path>' +
    '' +
    '<path d="M740.096 703.424c-10.112-10.176-26.624-10.176-36.736 0s-10.112 26.56 0 36.672l88.64 88.704c5.12 5.056 11.776 7.552 18.368 7.552 6.656 0 13.312-2.496 18.368-7.552 10.112-10.176 10.112-26.56 0-36.672L740.096 703.424z"  ></path>' +
    '' +
    '<path d="M241.344 512c0-14.336-11.648-25.984-25.984-25.984L89.984 486.016C75.648 486.08 64 497.664 64 512s11.648 25.984 25.984 25.984l125.376 0C229.696 537.984 241.344 526.4 241.344 512z"  ></path>' +
    '' +
    '<path d="M934.016 486.08l-125.376 0c-14.336 0-25.984 11.648-25.984 25.984s11.712 25.984 25.984 25.984l125.376 0C948.352 537.984 960 526.4 960 512S948.352 486.08 934.016 486.08z"  ></path>' +
    '' +
    '<path d="M283.904 703.424 195.2 792.128c-10.176 10.112-10.176 26.496 0 36.672 5.056 5.056 11.712 7.552 18.368 7.552 6.656 0 13.312-2.496 18.368-7.552l88.64-88.704c10.176-10.112 10.176-26.496 0-36.672S294.016 693.248 283.904 703.424z"  ></path>' +
    '' +
    '<path d="M721.728 328.256c6.656 0 13.312-2.56 18.368-7.616l88.64-88.64c10.112-10.112 10.112-26.56 0-36.736s-26.56-10.176-36.736 0L703.36 283.904c-10.112 10.112-10.112 26.56 0 36.736C708.48 325.696 715.136 328.256 721.728 328.256z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)