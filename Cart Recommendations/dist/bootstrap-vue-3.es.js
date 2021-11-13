var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { computed, defineComponent, provide, openBlock, createElementBlock, normalizeClass, renderSlot, onMounted, onBeforeUnmount, ref, watch, inject, resolveComponent, resolveDirective, createElementVNode, withDirectives, createTextVNode, toDisplayString, createVNode, withCtx, createCommentVNode, createBlock, resolveDynamicComponent, mergeProps, normalizeStyle, reactive, Fragment, renderList, withModifiers, onActivated, nextTick, Teleport, normalizeProps, guardReactiveProps, toRef, unref, h } from "vue";
function getID(suffix = "") {
  return `__BVID__${Math.random().toString().substr(2, 6)}___BV_${suffix}__`;
}
function useId(id, suffix) {
  return computed(() => id || getID(suffix));
}
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const injectionKey$2 = Symbol();
const _sfc_main$10 = defineComponent({
  name: "BAccordion",
  props: {
    flush: { type: Boolean, default: false },
    free: { type: Boolean, default: false },
    id: { type: String, default: void 0 }
  },
  setup(props) {
    const computedId = useId(props.id, "accordion");
    const classes = computed(() => ({
      "accordion-flush": props.flush
    }));
    if (!props.free) {
      provide(injectionKey$2, `#${computedId.value}`);
    }
    return {
      computedId,
      classes
    };
  }
});
const _hoisted_1$G = ["id"];
function _sfc_render$_(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    id: _ctx.computedId,
    class: normalizeClass(["accordion", _ctx.classes])
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 10, _hoisted_1$G);
}
var BAccordion = /* @__PURE__ */ _export_sfc(_sfc_main$10, [["render", _sfc_render$_]]);
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}
function isElement$1(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect$2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles$1 = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect: effect$2,
  requires: ["computeStyles"]
};
function getBasePlacement(placement) {
  return placement.split("-")[0];
}
function getBoundingClientRect(element, includeScale) {
  var rect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  return {
    width: rect.width / scaleX,
    height: rect.height / scaleY,
    top: rect.top / scaleY,
    right: rect.right / scaleX,
    bottom: rect.bottom / scaleY,
    left: rect.left / scaleX,
    x: rect.left / scaleX,
    y: rect.top / scaleY
  };
}
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}
function getDocumentElement(element) {
  return ((isElement$1(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
  var isIE = navigator.userAgent.indexOf("Trident") !== -1;
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle$1(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle$1(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle$1(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
var max = Math.max;
var min = Math.min;
var round = Math.round;
function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect$1(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow$1 = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect$1,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function getVariation(placement) {
  return placement.split("-")[1];
}
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref) {
  var x = _ref.x, y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(round(x * dpr) / dpr) || 0,
    y: round(round(y * dpr) / dpr) || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets;
  var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === "function" ? roundOffsets(offsets) : offsets, _ref3$x = _ref3.x, x = _ref3$x === void 0 ? 0 : _ref3$x, _ref3$y = _ref3.y, y = _ref3$y === void 0 ? 0 : _ref3$y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle$1(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      y -= offsetParent[heightProp] - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      x -= offsetParent[widthProp] - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref4) {
  var state = _ref4.state, options = _ref4.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles$1 = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};
var passive = {
  passive: true
};
function effect(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect,
  data: {}
};
var hash$1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash$1[matched];
  });
}
var hash = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash[matched];
  });
}
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element),
    y
  };
}
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle$1(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle$1(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle$1(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement$1(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement$1(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
    }
  }
  return offsets;
}
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement$1(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip$1 = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide$1 = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
var offset$1 = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets$1 = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis || checkAltAxis) {
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min$1 = popperOffsets2[mainAxis] + overflow[mainSide];
    var max$1 = popperOffsets2[mainAxis] - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
    var tetherMin = popperOffsets2[mainAxis] + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = popperOffsets2[mainAxis] + maxOffset - offsetModifierValue;
    if (checkMainAxis) {
      var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset2, tether ? max(max$1, tetherMax) : max$1);
      popperOffsets2[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset2;
    }
    if (checkAltAxis) {
      var _mainSide = mainAxis === "x" ? top : left;
      var _altSide = mainAxis === "x" ? bottom : right;
      var _offset = popperOffsets2[altAxis];
      var _min = _offset + overflow[_mainSide];
      var _max = _offset - overflow[_altSide];
      var _preventedOffset = within(tether ? min(_min, tetherMin) : _min, _offset, tether ? max(_max, tetherMax) : _max);
      popperOffsets2[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }
  }
  state.modifiersData[name] = data;
}
var preventOverflow$1 = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = rect.width / element.offsetWidth || 1;
  var scaleY = rect.height / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement$1(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy2() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref3) {
        var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect2 = _ref3.effect;
        if (typeof effect2 === "function") {
          var cleanupFn = effect2({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var createPopper$2 = /* @__PURE__ */ popperGenerator();
var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
var createPopper$1 = /* @__PURE__ */ popperGenerator({
  defaultModifiers: defaultModifiers$1
});
var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});
var Popper = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  popperGenerator,
  detectOverflow,
  createPopperBase: createPopper$2,
  createPopper,
  createPopperLite: createPopper$1,
  top,
  bottom,
  right,
  left,
  auto,
  basePlacements,
  start,
  end,
  clippingParents,
  viewport,
  popper,
  reference,
  variationPlacements,
  placements,
  beforeRead,
  read,
  afterRead,
  beforeMain,
  main,
  afterMain,
  beforeWrite,
  write,
  afterWrite,
  modifierPhases,
  applyStyles: applyStyles$1,
  arrow: arrow$1,
  computeStyles: computeStyles$1,
  eventListeners,
  flip: flip$1,
  hide: hide$1,
  offset: offset$1,
  popperOffsets: popperOffsets$1,
  preventOverflow: preventOverflow$1
});
/*!
  * Bootstrap v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
const MAX_UID = 1e6;
const MILLISECONDS_MULTIPLIER = 1e3;
const TRANSITION_END = "transitionend";
const toType = (obj) => {
  if (obj === null || obj === void 0) {
    return `${obj}`;
  }
  return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
};
const getUID = (prefix) => {
  do {
    prefix += Math.floor(Math.random() * MAX_UID);
  } while (document.getElementById(prefix));
  return prefix;
};
const getSelector = (element) => {
  let selector = element.getAttribute("data-bs-target");
  if (!selector || selector === "#") {
    let hrefAttr = element.getAttribute("href");
    if (!hrefAttr || !hrefAttr.includes("#") && !hrefAttr.startsWith(".")) {
      return null;
    }
    if (hrefAttr.includes("#") && !hrefAttr.startsWith("#")) {
      hrefAttr = `#${hrefAttr.split("#")[1]}`;
    }
    selector = hrefAttr && hrefAttr !== "#" ? hrefAttr.trim() : null;
  }
  return selector;
};
const getSelectorFromElement = (element) => {
  const selector = getSelector(element);
  if (selector) {
    return document.querySelector(selector) ? selector : null;
  }
  return null;
};
const getElementFromSelector = (element) => {
  const selector = getSelector(element);
  return selector ? document.querySelector(selector) : null;
};
const getTransitionDurationFromElement = (element) => {
  if (!element) {
    return 0;
  }
  let {
    transitionDuration,
    transitionDelay
  } = window.getComputedStyle(element);
  const floatTransitionDuration = Number.parseFloat(transitionDuration);
  const floatTransitionDelay = Number.parseFloat(transitionDelay);
  if (!floatTransitionDuration && !floatTransitionDelay) {
    return 0;
  }
  transitionDuration = transitionDuration.split(",")[0];
  transitionDelay = transitionDelay.split(",")[0];
  return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
};
const triggerTransitionEnd = (element) => {
  element.dispatchEvent(new Event(TRANSITION_END));
};
const isElement = (obj) => {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  if (typeof obj.jquery !== "undefined") {
    obj = obj[0];
  }
  return typeof obj.nodeType !== "undefined";
};
const getElement = (obj) => {
  if (isElement(obj)) {
    return obj.jquery ? obj[0] : obj;
  }
  if (typeof obj === "string" && obj.length > 0) {
    return document.querySelector(obj);
  }
  return null;
};
const typeCheckConfig = (componentName, config, configTypes) => {
  Object.keys(configTypes).forEach((property) => {
    const expectedTypes = configTypes[property];
    const value = config[property];
    const valueType = value && isElement(value) ? "element" : toType(value);
    if (!new RegExp(expectedTypes).test(valueType)) {
      throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
    }
  });
};
const isVisible = (element) => {
  if (!isElement(element) || element.getClientRects().length === 0) {
    return false;
  }
  return getComputedStyle(element).getPropertyValue("visibility") === "visible";
};
const isDisabled = (element) => {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return true;
  }
  if (element.classList.contains("disabled")) {
    return true;
  }
  if (typeof element.disabled !== "undefined") {
    return element.disabled;
  }
  return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
};
const findShadowRoot = (element) => {
  if (!document.documentElement.attachShadow) {
    return null;
  }
  if (typeof element.getRootNode === "function") {
    const root = element.getRootNode();
    return root instanceof ShadowRoot ? root : null;
  }
  if (element instanceof ShadowRoot) {
    return element;
  }
  if (!element.parentNode) {
    return null;
  }
  return findShadowRoot(element.parentNode);
};
const noop = () => {
};
const reflow = (element) => {
  element.offsetHeight;
};
const getjQuery = () => {
  const {
    jQuery
  } = window;
  if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
    return jQuery;
  }
  return null;
};
const DOMContentLoadedCallbacks = [];
const onDOMContentLoaded = (callback) => {
  if (document.readyState === "loading") {
    if (!DOMContentLoadedCallbacks.length) {
      document.addEventListener("DOMContentLoaded", () => {
        DOMContentLoadedCallbacks.forEach((callback2) => callback2());
      });
    }
    DOMContentLoadedCallbacks.push(callback);
  } else {
    callback();
  }
};
const isRTL = () => document.documentElement.dir === "rtl";
const defineJQueryPlugin = (plugin2) => {
  onDOMContentLoaded(() => {
    const $ = getjQuery();
    if ($) {
      const name = plugin2.NAME;
      const JQUERY_NO_CONFLICT = $.fn[name];
      $.fn[name] = plugin2.jQueryInterface;
      $.fn[name].Constructor = plugin2;
      $.fn[name].noConflict = () => {
        $.fn[name] = JQUERY_NO_CONFLICT;
        return plugin2.jQueryInterface;
      };
    }
  });
};
const execute = (callback) => {
  if (typeof callback === "function") {
    callback();
  }
};
const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
  if (!waitForTransition) {
    execute(callback);
    return;
  }
  const durationPadding = 5;
  const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
  let called = false;
  const handler = ({
    target
  }) => {
    if (target !== transitionElement) {
      return;
    }
    called = true;
    transitionElement.removeEventListener(TRANSITION_END, handler);
    execute(callback);
  };
  transitionElement.addEventListener(TRANSITION_END, handler);
  setTimeout(() => {
    if (!called) {
      triggerTransitionEnd(transitionElement);
    }
  }, emulatedDuration);
};
const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
  let index = list.indexOf(activeElement);
  if (index === -1) {
    return list[!shouldGetNext && isCycleAllowed ? list.length - 1 : 0];
  }
  const listLength = list.length;
  index += shouldGetNext ? 1 : -1;
  if (isCycleAllowed) {
    index = (index + listLength) % listLength;
  }
  return list[Math.max(0, Math.min(index, listLength - 1))];
};
const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
const stripNameRegex = /\..*/;
const stripUidRegex = /::\d+$/;
const eventRegistry = {};
let uidEvent = 1;
const customEvents = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
};
const customEventsRegex = /^(mouseenter|mouseleave)/i;
const nativeEvents = new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
function getUidEvent(element, uid) {
  return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
}
function getEvent(element) {
  const uid = getUidEvent(element);
  element.uidEvent = uid;
  eventRegistry[uid] = eventRegistry[uid] || {};
  return eventRegistry[uid];
}
function bootstrapHandler(element, fn2) {
  return function handler(event) {
    event.delegateTarget = element;
    if (handler.oneOff) {
      EventHandler.off(element, event.type, fn2);
    }
    return fn2.apply(element, [event]);
  };
}
function bootstrapDelegationHandler(element, selector, fn2) {
  return function handler(event) {
    const domElements = element.querySelectorAll(selector);
    for (let {
      target
    } = event; target && target !== this; target = target.parentNode) {
      for (let i = domElements.length; i--; ) {
        if (domElements[i] === target) {
          event.delegateTarget = target;
          if (handler.oneOff) {
            EventHandler.off(element, event.type, selector, fn2);
          }
          return fn2.apply(target, [event]);
        }
      }
    }
    return null;
  };
}
function findHandler(events, handler, delegationSelector = null) {
  const uidEventList = Object.keys(events);
  for (let i = 0, len = uidEventList.length; i < len; i++) {
    const event = events[uidEventList[i]];
    if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
      return event;
    }
  }
  return null;
}
function normalizeParams(originalTypeEvent, handler, delegationFn) {
  const delegation = typeof handler === "string";
  const originalHandler = delegation ? delegationFn : handler;
  let typeEvent = getTypeEvent(originalTypeEvent);
  const isNative = nativeEvents.has(typeEvent);
  if (!isNative) {
    typeEvent = originalTypeEvent;
  }
  return [delegation, originalHandler, typeEvent];
}
function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
  if (typeof originalTypeEvent !== "string" || !element) {
    return;
  }
  if (!handler) {
    handler = delegationFn;
    delegationFn = null;
  }
  if (customEventsRegex.test(originalTypeEvent)) {
    const wrapFn = (fn3) => {
      return function(event) {
        if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
          return fn3.call(this, event);
        }
      };
    };
    if (delegationFn) {
      delegationFn = wrapFn(delegationFn);
    } else {
      handler = wrapFn(handler);
    }
  }
  const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
  const events = getEvent(element);
  const handlers = events[typeEvent] || (events[typeEvent] = {});
  const previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);
  if (previousFn) {
    previousFn.oneOff = previousFn.oneOff && oneOff;
    return;
  }
  const uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ""));
  const fn2 = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
  fn2.delegationSelector = delegation ? handler : null;
  fn2.originalHandler = originalHandler;
  fn2.oneOff = oneOff;
  fn2.uidEvent = uid;
  handlers[uid] = fn2;
  element.addEventListener(typeEvent, fn2, delegation);
}
function removeHandler(element, events, typeEvent, handler, delegationSelector) {
  const fn2 = findHandler(events[typeEvent], handler, delegationSelector);
  if (!fn2) {
    return;
  }
  element.removeEventListener(typeEvent, fn2, Boolean(delegationSelector));
  delete events[typeEvent][fn2.uidEvent];
}
function removeNamespacedHandlers(element, events, typeEvent, namespace) {
  const storeElementEvent = events[typeEvent] || {};
  Object.keys(storeElementEvent).forEach((handlerKey) => {
    if (handlerKey.includes(namespace)) {
      const event = storeElementEvent[handlerKey];
      removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
    }
  });
}
function getTypeEvent(event) {
  event = event.replace(stripNameRegex, "");
  return customEvents[event] || event;
}
const EventHandler = {
  on(element, event, handler, delegationFn) {
    addHandler(element, event, handler, delegationFn, false);
  },
  one(element, event, handler, delegationFn) {
    addHandler(element, event, handler, delegationFn, true);
  },
  off(element, originalTypeEvent, handler, delegationFn) {
    if (typeof originalTypeEvent !== "string" || !element) {
      return;
    }
    const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
    const inNamespace = typeEvent !== originalTypeEvent;
    const events = getEvent(element);
    const isNamespace = originalTypeEvent.startsWith(".");
    if (typeof originalHandler !== "undefined") {
      if (!events || !events[typeEvent]) {
        return;
      }
      removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
      return;
    }
    if (isNamespace) {
      Object.keys(events).forEach((elementEvent) => {
        removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
      });
    }
    const storeElementEvent = events[typeEvent] || {};
    Object.keys(storeElementEvent).forEach((keyHandlers) => {
      const handlerKey = keyHandlers.replace(stripUidRegex, "");
      if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
        const event = storeElementEvent[keyHandlers];
        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
      }
    });
  },
  trigger(element, event, args) {
    if (typeof event !== "string" || !element) {
      return null;
    }
    const $ = getjQuery();
    const typeEvent = getTypeEvent(event);
    const inNamespace = event !== typeEvent;
    const isNative = nativeEvents.has(typeEvent);
    let jQueryEvent;
    let bubbles = true;
    let nativeDispatch = true;
    let defaultPrevented = false;
    let evt = null;
    if (inNamespace && $) {
      jQueryEvent = $.Event(event, args);
      $(element).trigger(jQueryEvent);
      bubbles = !jQueryEvent.isPropagationStopped();
      nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
      defaultPrevented = jQueryEvent.isDefaultPrevented();
    }
    if (isNative) {
      evt = document.createEvent("HTMLEvents");
      evt.initEvent(typeEvent, bubbles, true);
    } else {
      evt = new CustomEvent(event, {
        bubbles,
        cancelable: true
      });
    }
    if (typeof args !== "undefined") {
      Object.keys(args).forEach((key) => {
        Object.defineProperty(evt, key, {
          get() {
            return args[key];
          }
        });
      });
    }
    if (defaultPrevented) {
      evt.preventDefault();
    }
    if (nativeDispatch) {
      element.dispatchEvent(evt);
    }
    if (evt.defaultPrevented && typeof jQueryEvent !== "undefined") {
      jQueryEvent.preventDefault();
    }
    return evt;
  }
};
const elementMap = new Map();
const Data = {
  set(element, key, instance) {
    if (!elementMap.has(element)) {
      elementMap.set(element, new Map());
    }
    const instanceMap = elementMap.get(element);
    if (!instanceMap.has(key) && instanceMap.size !== 0) {
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
      return;
    }
    instanceMap.set(key, instance);
  },
  get(element, key) {
    if (elementMap.has(element)) {
      return elementMap.get(element).get(key) || null;
    }
    return null;
  },
  remove(element, key) {
    if (!elementMap.has(element)) {
      return;
    }
    const instanceMap = elementMap.get(element);
    instanceMap.delete(key);
    if (instanceMap.size === 0) {
      elementMap.delete(element);
    }
  }
};
const VERSION = "5.1.3";
class BaseComponent {
  constructor(element) {
    element = getElement(element);
    if (!element) {
      return;
    }
    this._element = element;
    Data.set(this._element, this.constructor.DATA_KEY, this);
  }
  dispose() {
    Data.remove(this._element, this.constructor.DATA_KEY);
    EventHandler.off(this._element, this.constructor.EVENT_KEY);
    Object.getOwnPropertyNames(this).forEach((propertyName) => {
      this[propertyName] = null;
    });
  }
  _queueCallback(callback, element, isAnimated = true) {
    executeAfterTransition(callback, element, isAnimated);
  }
  static getInstance(element) {
    return Data.get(getElement(element), this.DATA_KEY);
  }
  static getOrCreateInstance(element, config = {}) {
    return this.getInstance(element) || new this(element, typeof config === "object" ? config : null);
  }
  static get VERSION() {
    return VERSION;
  }
  static get NAME() {
    throw new Error('You have to implement the static method "NAME", for each component!');
  }
  static get DATA_KEY() {
    return `bs.${this.NAME}`;
  }
  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`;
  }
}
const enableDismissTrigger = (component, method = "hide") => {
  const clickEvent = `click.dismiss${component.EVENT_KEY}`;
  const name = component.NAME;
  EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function(event) {
    if (["A", "AREA"].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    const target = getElementFromSelector(this) || this.closest(`.${name}`);
    const instance = component.getOrCreateInstance(target);
    instance[method]();
  });
};
const NAME$d = "alert";
const DATA_KEY$c = "bs.alert";
const EVENT_KEY$c = `.${DATA_KEY$c}`;
const EVENT_CLOSE = `close${EVENT_KEY$c}`;
const EVENT_CLOSED = `closed${EVENT_KEY$c}`;
const CLASS_NAME_FADE$5 = "fade";
const CLASS_NAME_SHOW$8 = "show";
class Alert extends BaseComponent {
  static get NAME() {
    return NAME$d;
  }
  close() {
    const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);
    if (closeEvent.defaultPrevented) {
      return;
    }
    this._element.classList.remove(CLASS_NAME_SHOW$8);
    const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);
    this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
  }
  _destroyElement() {
    this._element.remove();
    EventHandler.trigger(this._element, EVENT_CLOSED);
    this.dispose();
  }
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Alert.getOrCreateInstance(this);
      if (typeof config !== "string") {
        return;
      }
      if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config](this);
    });
  }
}
enableDismissTrigger(Alert, "close");
defineJQueryPlugin(Alert);
const NAME$c = "button";
const DATA_KEY$b = "bs.button";
const EVENT_KEY$b = `.${DATA_KEY$b}`;
const DATA_API_KEY$7 = ".data-api";
const CLASS_NAME_ACTIVE$3 = "active";
const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$b}${DATA_API_KEY$7}`;
class Button extends BaseComponent {
  static get NAME() {
    return NAME$c;
  }
  toggle() {
    this._element.setAttribute("aria-pressed", this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
  }
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Button.getOrCreateInstance(this);
      if (config === "toggle") {
        data[config]();
      }
    });
  }
}
EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, (event) => {
  event.preventDefault();
  const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
  const data = Button.getOrCreateInstance(button);
  data.toggle();
});
defineJQueryPlugin(Button);
function normalizeData(val) {
  if (val === "true") {
    return true;
  }
  if (val === "false") {
    return false;
  }
  if (val === Number(val).toString()) {
    return Number(val);
  }
  if (val === "" || val === "null") {
    return null;
  }
  return val;
}
function normalizeDataKey(key) {
  return key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);
}
const Manipulator = {
  setDataAttribute(element, key, value) {
    element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
  },
  removeDataAttribute(element, key) {
    element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
  },
  getDataAttributes(element) {
    if (!element) {
      return {};
    }
    const attributes = {};
    Object.keys(element.dataset).filter((key) => key.startsWith("bs")).forEach((key) => {
      let pureKey = key.replace(/^bs/, "");
      pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
      attributes[pureKey] = normalizeData(element.dataset[key]);
    });
    return attributes;
  },
  getDataAttribute(element, key) {
    return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
  },
  offset(element) {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset
    };
  },
  position(element) {
    return {
      top: element.offsetTop,
      left: element.offsetLeft
    };
  }
};
const NODE_TEXT = 3;
const SelectorEngine = {
  find(selector, element = document.documentElement) {
    return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
  },
  findOne(selector, element = document.documentElement) {
    return Element.prototype.querySelector.call(element, selector);
  },
  children(element, selector) {
    return [].concat(...element.children).filter((child) => child.matches(selector));
  },
  parents(element, selector) {
    const parents = [];
    let ancestor = element.parentNode;
    while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
      if (ancestor.matches(selector)) {
        parents.push(ancestor);
      }
      ancestor = ancestor.parentNode;
    }
    return parents;
  },
  prev(element, selector) {
    let previous = element.previousElementSibling;
    while (previous) {
      if (previous.matches(selector)) {
        return [previous];
      }
      previous = previous.previousElementSibling;
    }
    return [];
  },
  next(element, selector) {
    let next = element.nextElementSibling;
    while (next) {
      if (next.matches(selector)) {
        return [next];
      }
      next = next.nextElementSibling;
    }
    return [];
  },
  focusableChildren(element) {
    const focusables = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((selector) => `${selector}:not([tabindex^="-"])`).join(", ");
    return this.find(focusables, element).filter((el) => !isDisabled(el) && isVisible(el));
  }
};
const NAME$b = "carousel";
const DATA_KEY$a = "bs.carousel";
const EVENT_KEY$a = `.${DATA_KEY$a}`;
const DATA_API_KEY$6 = ".data-api";
const ARROW_LEFT_KEY = "ArrowLeft";
const ARROW_RIGHT_KEY = "ArrowRight";
const TOUCHEVENT_COMPAT_WAIT = 500;
const SWIPE_THRESHOLD = 40;
const Default$a = {
  interval: 5e3,
  keyboard: true,
  slide: false,
  pause: "hover",
  wrap: true,
  touch: true
};
const DefaultType$a = {
  interval: "(number|boolean)",
  keyboard: "boolean",
  slide: "(boolean|string)",
  pause: "(string|boolean)",
  wrap: "boolean",
  touch: "boolean"
};
const ORDER_NEXT = "next";
const ORDER_PREV = "prev";
const DIRECTION_LEFT = "left";
const DIRECTION_RIGHT = "right";
const KEY_TO_DIRECTION = {
  [ARROW_LEFT_KEY]: DIRECTION_RIGHT,
  [ARROW_RIGHT_KEY]: DIRECTION_LEFT
};
const EVENT_SLIDE = `slide${EVENT_KEY$a}`;
const EVENT_SLID = `slid${EVENT_KEY$a}`;
const EVENT_KEYDOWN = `keydown${EVENT_KEY$a}`;
const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY$a}`;
const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY$a}`;
const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$a}`;
const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$a}`;
const EVENT_TOUCHEND = `touchend${EVENT_KEY$a}`;
const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$a}`;
const EVENT_POINTERUP = `pointerup${EVENT_KEY$a}`;
const EVENT_DRAG_START = `dragstart${EVENT_KEY$a}`;
const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$a}${DATA_API_KEY$6}`;
const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;
const CLASS_NAME_CAROUSEL = "carousel";
const CLASS_NAME_ACTIVE$2 = "active";
const CLASS_NAME_SLIDE = "slide";
const CLASS_NAME_END = "carousel-item-end";
const CLASS_NAME_START = "carousel-item-start";
const CLASS_NAME_NEXT = "carousel-item-next";
const CLASS_NAME_PREV = "carousel-item-prev";
const CLASS_NAME_POINTER_EVENT = "pointer-event";
const SELECTOR_ACTIVE$1 = ".active";
const SELECTOR_ACTIVE_ITEM = ".active.carousel-item";
const SELECTOR_ITEM = ".carousel-item";
const SELECTOR_ITEM_IMG = ".carousel-item img";
const SELECTOR_NEXT_PREV = ".carousel-item-next, .carousel-item-prev";
const SELECTOR_INDICATORS = ".carousel-indicators";
const SELECTOR_INDICATOR = "[data-bs-target]";
const SELECTOR_DATA_SLIDE = "[data-bs-slide], [data-bs-slide-to]";
const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
const POINTER_TYPE_TOUCH = "touch";
const POINTER_TYPE_PEN = "pen";
class Carousel extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._items = null;
    this._interval = null;
    this._activeElement = null;
    this._isPaused = false;
    this._isSliding = false;
    this.touchTimeout = null;
    this.touchStartX = 0;
    this.touchDeltaX = 0;
    this._config = this._getConfig(config);
    this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
    this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
    this._pointerEvent = Boolean(window.PointerEvent);
    this._addEventListeners();
  }
  static get Default() {
    return Default$a;
  }
  static get NAME() {
    return NAME$b;
  }
  next() {
    this._slide(ORDER_NEXT);
  }
  nextWhenVisible() {
    if (!document.hidden && isVisible(this._element)) {
      this.next();
    }
  }
  prev() {
    this._slide(ORDER_PREV);
  }
  pause(event) {
    if (!event) {
      this._isPaused = true;
    }
    if (SelectorEngine.findOne(SELECTOR_NEXT_PREV, this._element)) {
      triggerTransitionEnd(this._element);
      this.cycle(true);
    }
    clearInterval(this._interval);
    this._interval = null;
  }
  cycle(event) {
    if (!event) {
      this._isPaused = false;
    }
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
    if (this._config && this._config.interval && !this._isPaused) {
      this._updateInterval();
      this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
    }
  }
  to(index) {
    this._activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
    const activeIndex = this._getItemIndex(this._activeElement);
    if (index > this._items.length - 1 || index < 0) {
      return;
    }
    if (this._isSliding) {
      EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
      return;
    }
    if (activeIndex === index) {
      this.pause();
      this.cycle();
      return;
    }
    const order2 = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
    this._slide(order2, this._items[index]);
  }
  _getConfig(config) {
    config = __spreadValues(__spreadValues(__spreadValues({}, Default$a), Manipulator.getDataAttributes(this._element)), typeof config === "object" ? config : {});
    typeCheckConfig(NAME$b, config, DefaultType$a);
    return config;
  }
  _handleSwipe() {
    const absDeltax = Math.abs(this.touchDeltaX);
    if (absDeltax <= SWIPE_THRESHOLD) {
      return;
    }
    const direction = absDeltax / this.touchDeltaX;
    this.touchDeltaX = 0;
    if (!direction) {
      return;
    }
    this._slide(direction > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT);
  }
  _addEventListeners() {
    if (this._config.keyboard) {
      EventHandler.on(this._element, EVENT_KEYDOWN, (event) => this._keydown(event));
    }
    if (this._config.pause === "hover") {
      EventHandler.on(this._element, EVENT_MOUSEENTER, (event) => this.pause(event));
      EventHandler.on(this._element, EVENT_MOUSELEAVE, (event) => this.cycle(event));
    }
    if (this._config.touch && this._touchSupported) {
      this._addTouchEventListeners();
    }
  }
  _addTouchEventListeners() {
    const hasPointerPenTouch = (event) => {
      return this._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
    };
    const start2 = (event) => {
      if (hasPointerPenTouch(event)) {
        this.touchStartX = event.clientX;
      } else if (!this._pointerEvent) {
        this.touchStartX = event.touches[0].clientX;
      }
    };
    const move = (event) => {
      this.touchDeltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this.touchStartX;
    };
    const end2 = (event) => {
      if (hasPointerPenTouch(event)) {
        this.touchDeltaX = event.clientX - this.touchStartX;
      }
      this._handleSwipe();
      if (this._config.pause === "hover") {
        this.pause();
        if (this.touchTimeout) {
          clearTimeout(this.touchTimeout);
        }
        this.touchTimeout = setTimeout((event2) => this.cycle(event2), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
      }
    };
    SelectorEngine.find(SELECTOR_ITEM_IMG, this._element).forEach((itemImg) => {
      EventHandler.on(itemImg, EVENT_DRAG_START, (event) => event.preventDefault());
    });
    if (this._pointerEvent) {
      EventHandler.on(this._element, EVENT_POINTERDOWN, (event) => start2(event));
      EventHandler.on(this._element, EVENT_POINTERUP, (event) => end2(event));
      this._element.classList.add(CLASS_NAME_POINTER_EVENT);
    } else {
      EventHandler.on(this._element, EVENT_TOUCHSTART, (event) => start2(event));
      EventHandler.on(this._element, EVENT_TOUCHMOVE, (event) => move(event));
      EventHandler.on(this._element, EVENT_TOUCHEND, (event) => end2(event));
    }
  }
  _keydown(event) {
    if (/input|textarea/i.test(event.target.tagName)) {
      return;
    }
    const direction = KEY_TO_DIRECTION[event.key];
    if (direction) {
      event.preventDefault();
      this._slide(direction);
    }
  }
  _getItemIndex(element) {
    this._items = element && element.parentNode ? SelectorEngine.find(SELECTOR_ITEM, element.parentNode) : [];
    return this._items.indexOf(element);
  }
  _getItemByOrder(order2, activeElement) {
    const isNext = order2 === ORDER_NEXT;
    return getNextActiveElement(this._items, activeElement, isNext, this._config.wrap);
  }
  _triggerSlideEvent(relatedTarget, eventDirectionName) {
    const targetIndex = this._getItemIndex(relatedTarget);
    const fromIndex = this._getItemIndex(SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element));
    return EventHandler.trigger(this._element, EVENT_SLIDE, {
      relatedTarget,
      direction: eventDirectionName,
      from: fromIndex,
      to: targetIndex
    });
  }
  _setActiveIndicatorElement(element) {
    if (this._indicatorsElement) {
      const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE$1, this._indicatorsElement);
      activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
      activeIndicator.removeAttribute("aria-current");
      const indicators = SelectorEngine.find(SELECTOR_INDICATOR, this._indicatorsElement);
      for (let i = 0; i < indicators.length; i++) {
        if (Number.parseInt(indicators[i].getAttribute("data-bs-slide-to"), 10) === this._getItemIndex(element)) {
          indicators[i].classList.add(CLASS_NAME_ACTIVE$2);
          indicators[i].setAttribute("aria-current", "true");
          break;
        }
      }
    }
  }
  _updateInterval() {
    const element = this._activeElement || SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
    if (!element) {
      return;
    }
    const elementInterval = Number.parseInt(element.getAttribute("data-bs-interval"), 10);
    if (elementInterval) {
      this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
      this._config.interval = elementInterval;
    } else {
      this._config.interval = this._config.defaultInterval || this._config.interval;
    }
  }
  _slide(directionOrOrder, element) {
    const order2 = this._directionToOrder(directionOrOrder);
    const activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
    const activeElementIndex = this._getItemIndex(activeElement);
    const nextElement = element || this._getItemByOrder(order2, activeElement);
    const nextElementIndex = this._getItemIndex(nextElement);
    const isCycling = Boolean(this._interval);
    const isNext = order2 === ORDER_NEXT;
    const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
    const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
    const eventDirectionName = this._orderToDirection(order2);
    if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE$2)) {
      this._isSliding = false;
      return;
    }
    if (this._isSliding) {
      return;
    }
    const slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
    if (slideEvent.defaultPrevented) {
      return;
    }
    if (!activeElement || !nextElement) {
      return;
    }
    this._isSliding = true;
    if (isCycling) {
      this.pause();
    }
    this._setActiveIndicatorElement(nextElement);
    this._activeElement = nextElement;
    const triggerSlidEvent = () => {
      EventHandler.trigger(this._element, EVENT_SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });
    };
    if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
      nextElement.classList.add(orderClassName);
      reflow(nextElement);
      activeElement.classList.add(directionalClassName);
      nextElement.classList.add(directionalClassName);
      const completeCallBack = () => {
        nextElement.classList.remove(directionalClassName, orderClassName);
        nextElement.classList.add(CLASS_NAME_ACTIVE$2);
        activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
        this._isSliding = false;
        setTimeout(triggerSlidEvent, 0);
      };
      this._queueCallback(completeCallBack, activeElement, true);
    } else {
      activeElement.classList.remove(CLASS_NAME_ACTIVE$2);
      nextElement.classList.add(CLASS_NAME_ACTIVE$2);
      this._isSliding = false;
      triggerSlidEvent();
    }
    if (isCycling) {
      this.cycle();
    }
  }
  _directionToOrder(direction) {
    if (![DIRECTION_RIGHT, DIRECTION_LEFT].includes(direction)) {
      return direction;
    }
    if (isRTL()) {
      return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
    }
    return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
  }
  _orderToDirection(order2) {
    if (![ORDER_NEXT, ORDER_PREV].includes(order2)) {
      return order2;
    }
    if (isRTL()) {
      return order2 === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return order2 === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
  }
  static carouselInterface(element, config) {
    const data = Carousel.getOrCreateInstance(element, config);
    let {
      _config
    } = data;
    if (typeof config === "object") {
      _config = __spreadValues(__spreadValues({}, _config), config);
    }
    const action = typeof config === "string" ? config : _config.slide;
    if (typeof config === "number") {
      data.to(config);
    } else if (typeof action === "string") {
      if (typeof data[action] === "undefined") {
        throw new TypeError(`No method named "${action}"`);
      }
      data[action]();
    } else if (_config.interval && _config.ride) {
      data.pause();
      data.cycle();
    }
  }
  static jQueryInterface(config) {
    return this.each(function() {
      Carousel.carouselInterface(this, config);
    });
  }
  static dataApiClickHandler(event) {
    const target = getElementFromSelector(this);
    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
      return;
    }
    const config = __spreadValues(__spreadValues({}, Manipulator.getDataAttributes(target)), Manipulator.getDataAttributes(this));
    const slideIndex = this.getAttribute("data-bs-slide-to");
    if (slideIndex) {
      config.interval = false;
    }
    Carousel.carouselInterface(target, config);
    if (slideIndex) {
      Carousel.getInstance(target).to(slideIndex);
    }
    event.preventDefault();
  }
}
EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler);
EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
  const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
  for (let i = 0, len = carousels.length; i < len; i++) {
    Carousel.carouselInterface(carousels[i], Carousel.getInstance(carousels[i]));
  }
});
defineJQueryPlugin(Carousel);
const NAME$a = "collapse";
const DATA_KEY$9 = "bs.collapse";
const EVENT_KEY$9 = `.${DATA_KEY$9}`;
const DATA_API_KEY$5 = ".data-api";
const Default$9 = {
  toggle: true,
  parent: null
};
const DefaultType$9 = {
  toggle: "boolean",
  parent: "(null|element)"
};
const EVENT_SHOW$5 = `show${EVENT_KEY$9}`;
const EVENT_SHOWN$5 = `shown${EVENT_KEY$9}`;
const EVENT_HIDE$5 = `hide${EVENT_KEY$9}`;
const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$9}`;
const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$9}${DATA_API_KEY$5}`;
const CLASS_NAME_SHOW$7 = "show";
const CLASS_NAME_COLLAPSE = "collapse";
const CLASS_NAME_COLLAPSING = "collapsing";
const CLASS_NAME_COLLAPSED = "collapsed";
const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
const CLASS_NAME_HORIZONTAL = "collapse-horizontal";
const WIDTH = "width";
const HEIGHT = "height";
const SELECTOR_ACTIVES = ".collapse.show, .collapse.collapsing";
const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
class Collapse extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._isTransitioning = false;
    this._config = this._getConfig(config);
    this._triggerArray = [];
    const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);
    for (let i = 0, len = toggleList.length; i < len; i++) {
      const elem = toggleList[i];
      const selector = getSelectorFromElement(elem);
      const filterElement = SelectorEngine.find(selector).filter((foundElem) => foundElem === this._element);
      if (selector !== null && filterElement.length) {
        this._selector = selector;
        this._triggerArray.push(elem);
      }
    }
    this._initializeChildren();
    if (!this._config.parent) {
      this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
    }
    if (this._config.toggle) {
      this.toggle();
    }
  }
  static get Default() {
    return Default$9;
  }
  static get NAME() {
    return NAME$a;
  }
  toggle() {
    if (this._isShown()) {
      this.hide();
    } else {
      this.show();
    }
  }
  show() {
    if (this._isTransitioning || this._isShown()) {
      return;
    }
    let actives = [];
    let activesData;
    if (this._config.parent) {
      const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
      actives = SelectorEngine.find(SELECTOR_ACTIVES, this._config.parent).filter((elem) => !children.includes(elem));
    }
    const container = SelectorEngine.findOne(this._selector);
    if (actives.length) {
      const tempActiveData = actives.find((elem) => container !== elem);
      activesData = tempActiveData ? Collapse.getInstance(tempActiveData) : null;
      if (activesData && activesData._isTransitioning) {
        return;
      }
    }
    const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$5);
    if (startEvent.defaultPrevented) {
      return;
    }
    actives.forEach((elemActive) => {
      if (container !== elemActive) {
        Collapse.getOrCreateInstance(elemActive, {
          toggle: false
        }).hide();
      }
      if (!activesData) {
        Data.set(elemActive, DATA_KEY$9, null);
      }
    });
    const dimension = this._getDimension();
    this._element.classList.remove(CLASS_NAME_COLLAPSE);
    this._element.classList.add(CLASS_NAME_COLLAPSING);
    this._element.style[dimension] = 0;
    this._addAriaAndCollapsedClass(this._triggerArray, true);
    this._isTransitioning = true;
    const complete = () => {
      this._isTransitioning = false;
      this._element.classList.remove(CLASS_NAME_COLLAPSING);
      this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
      this._element.style[dimension] = "";
      EventHandler.trigger(this._element, EVENT_SHOWN$5);
    };
    const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
    const scrollSize = `scroll${capitalizedDimension}`;
    this._queueCallback(complete, this._element, true);
    this._element.style[dimension] = `${this._element[scrollSize]}px`;
  }
  hide() {
    if (this._isTransitioning || !this._isShown()) {
      return;
    }
    const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$5);
    if (startEvent.defaultPrevented) {
      return;
    }
    const dimension = this._getDimension();
    this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
    reflow(this._element);
    this._element.classList.add(CLASS_NAME_COLLAPSING);
    this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
    const triggerArrayLength = this._triggerArray.length;
    for (let i = 0; i < triggerArrayLength; i++) {
      const trigger = this._triggerArray[i];
      const elem = getElementFromSelector(trigger);
      if (elem && !this._isShown(elem)) {
        this._addAriaAndCollapsedClass([trigger], false);
      }
    }
    this._isTransitioning = true;
    const complete = () => {
      this._isTransitioning = false;
      this._element.classList.remove(CLASS_NAME_COLLAPSING);
      this._element.classList.add(CLASS_NAME_COLLAPSE);
      EventHandler.trigger(this._element, EVENT_HIDDEN$5);
    };
    this._element.style[dimension] = "";
    this._queueCallback(complete, this._element, true);
  }
  _isShown(element = this._element) {
    return element.classList.contains(CLASS_NAME_SHOW$7);
  }
  _getConfig(config) {
    config = __spreadValues(__spreadValues(__spreadValues({}, Default$9), Manipulator.getDataAttributes(this._element)), config);
    config.toggle = Boolean(config.toggle);
    config.parent = getElement(config.parent);
    typeCheckConfig(NAME$a, config, DefaultType$9);
    return config;
  }
  _getDimension() {
    return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
  }
  _initializeChildren() {
    if (!this._config.parent) {
      return;
    }
    const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
    SelectorEngine.find(SELECTOR_DATA_TOGGLE$4, this._config.parent).filter((elem) => !children.includes(elem)).forEach((element) => {
      const selected = getElementFromSelector(element);
      if (selected) {
        this._addAriaAndCollapsedClass([element], this._isShown(selected));
      }
    });
  }
  _addAriaAndCollapsedClass(triggerArray, isOpen) {
    if (!triggerArray.length) {
      return;
    }
    triggerArray.forEach((elem) => {
      if (isOpen) {
        elem.classList.remove(CLASS_NAME_COLLAPSED);
      } else {
        elem.classList.add(CLASS_NAME_COLLAPSED);
      }
      elem.setAttribute("aria-expanded", isOpen);
    });
  }
  static jQueryInterface(config) {
    return this.each(function() {
      const _config = {};
      if (typeof config === "string" && /show|hide/.test(config)) {
        _config.toggle = false;
      }
      const data = Collapse.getOrCreateInstance(this, _config);
      if (typeof config === "string") {
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      }
    });
  }
}
EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function(event) {
  if (event.target.tagName === "A" || event.delegateTarget && event.delegateTarget.tagName === "A") {
    event.preventDefault();
  }
  const selector = getSelectorFromElement(this);
  const selectorElements = SelectorEngine.find(selector);
  selectorElements.forEach((element) => {
    Collapse.getOrCreateInstance(element, {
      toggle: false
    }).toggle();
  });
});
defineJQueryPlugin(Collapse);
const NAME$9 = "dropdown";
const DATA_KEY$8 = "bs.dropdown";
const EVENT_KEY$8 = `.${DATA_KEY$8}`;
const DATA_API_KEY$4 = ".data-api";
const ESCAPE_KEY$2 = "Escape";
const SPACE_KEY = "Space";
const TAB_KEY$1 = "Tab";
const ARROW_UP_KEY = "ArrowUp";
const ARROW_DOWN_KEY = "ArrowDown";
const RIGHT_MOUSE_BUTTON = 2;
const REGEXP_KEYDOWN = new RegExp(`${ARROW_UP_KEY}|${ARROW_DOWN_KEY}|${ESCAPE_KEY$2}`);
const EVENT_HIDE$4 = `hide${EVENT_KEY$8}`;
const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$8}`;
const EVENT_SHOW$4 = `show${EVENT_KEY$8}`;
const EVENT_SHOWN$4 = `shown${EVENT_KEY$8}`;
const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$8}${DATA_API_KEY$4}`;
const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$8}${DATA_API_KEY$4}`;
const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$8}${DATA_API_KEY$4}`;
const CLASS_NAME_SHOW$6 = "show";
const CLASS_NAME_DROPUP = "dropup";
const CLASS_NAME_DROPEND = "dropend";
const CLASS_NAME_DROPSTART = "dropstart";
const CLASS_NAME_NAVBAR = "navbar";
const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]';
const SELECTOR_MENU = ".dropdown-menu";
const SELECTOR_NAVBAR_NAV = ".navbar-nav";
const SELECTOR_VISIBLE_ITEMS = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)";
const PLACEMENT_TOP = isRTL() ? "top-end" : "top-start";
const PLACEMENT_TOPEND = isRTL() ? "top-start" : "top-end";
const PLACEMENT_BOTTOM = isRTL() ? "bottom-end" : "bottom-start";
const PLACEMENT_BOTTOMEND = isRTL() ? "bottom-start" : "bottom-end";
const PLACEMENT_RIGHT = isRTL() ? "left-start" : "right-start";
const PLACEMENT_LEFT = isRTL() ? "right-start" : "left-start";
const Default$8 = {
  offset: [0, 2],
  boundary: "clippingParents",
  reference: "toggle",
  display: "dynamic",
  popperConfig: null,
  autoClose: true
};
const DefaultType$8 = {
  offset: "(array|string|function)",
  boundary: "(string|element)",
  reference: "(string|element|object)",
  display: "string",
  popperConfig: "(null|object|function)",
  autoClose: "(boolean|string)"
};
class Dropdown extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._popper = null;
    this._config = this._getConfig(config);
    this._menu = this._getMenuElement();
    this._inNavbar = this._detectNavbar();
  }
  static get Default() {
    return Default$8;
  }
  static get DefaultType() {
    return DefaultType$8;
  }
  static get NAME() {
    return NAME$9;
  }
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (isDisabled(this._element) || this._isShown(this._menu)) {
      return;
    }
    const relatedTarget = {
      relatedTarget: this._element
    };
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, relatedTarget);
    if (showEvent.defaultPrevented) {
      return;
    }
    const parent = Dropdown.getParentFromElement(this._element);
    if (this._inNavbar) {
      Manipulator.setDataAttribute(this._menu, "popper", "none");
    } else {
      this._createPopper(parent);
    }
    if ("ontouchstart" in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
      [].concat(...document.body.children).forEach((elem) => EventHandler.on(elem, "mouseover", noop));
    }
    this._element.focus();
    this._element.setAttribute("aria-expanded", true);
    this._menu.classList.add(CLASS_NAME_SHOW$6);
    this._element.classList.add(CLASS_NAME_SHOW$6);
    EventHandler.trigger(this._element, EVENT_SHOWN$4, relatedTarget);
  }
  hide() {
    if (isDisabled(this._element) || !this._isShown(this._menu)) {
      return;
    }
    const relatedTarget = {
      relatedTarget: this._element
    };
    this._completeHide(relatedTarget);
  }
  dispose() {
    if (this._popper) {
      this._popper.destroy();
    }
    super.dispose();
  }
  update() {
    this._inNavbar = this._detectNavbar();
    if (this._popper) {
      this._popper.update();
    }
  }
  _completeHide(relatedTarget) {
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4, relatedTarget);
    if (hideEvent.defaultPrevented) {
      return;
    }
    if ("ontouchstart" in document.documentElement) {
      [].concat(...document.body.children).forEach((elem) => EventHandler.off(elem, "mouseover", noop));
    }
    if (this._popper) {
      this._popper.destroy();
    }
    this._menu.classList.remove(CLASS_NAME_SHOW$6);
    this._element.classList.remove(CLASS_NAME_SHOW$6);
    this._element.setAttribute("aria-expanded", "false");
    Manipulator.removeDataAttribute(this._menu, "popper");
    EventHandler.trigger(this._element, EVENT_HIDDEN$4, relatedTarget);
  }
  _getConfig(config) {
    config = __spreadValues(__spreadValues(__spreadValues({}, this.constructor.Default), Manipulator.getDataAttributes(this._element)), config);
    typeCheckConfig(NAME$9, config, this.constructor.DefaultType);
    if (typeof config.reference === "object" && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== "function") {
      throw new TypeError(`${NAME$9.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    }
    return config;
  }
  _createPopper(parent) {
    if (typeof Popper === "undefined") {
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
    }
    let referenceElement = this._element;
    if (this._config.reference === "parent") {
      referenceElement = parent;
    } else if (isElement(this._config.reference)) {
      referenceElement = getElement(this._config.reference);
    } else if (typeof this._config.reference === "object") {
      referenceElement = this._config.reference;
    }
    const popperConfig = this._getPopperConfig();
    const isDisplayStatic = popperConfig.modifiers.find((modifier) => modifier.name === "applyStyles" && modifier.enabled === false);
    this._popper = createPopper(referenceElement, this._menu, popperConfig);
    if (isDisplayStatic) {
      Manipulator.setDataAttribute(this._menu, "popper", "static");
    }
  }
  _isShown(element = this._element) {
    return element.classList.contains(CLASS_NAME_SHOW$6);
  }
  _getMenuElement() {
    return SelectorEngine.next(this._element, SELECTOR_MENU)[0];
  }
  _getPlacement() {
    const parentDropdown = this._element.parentNode;
    if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
      return PLACEMENT_RIGHT;
    }
    if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
      return PLACEMENT_LEFT;
    }
    const isEnd = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
      return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
    }
    return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
  }
  _detectNavbar() {
    return this._element.closest(`.${CLASS_NAME_NAVBAR}`) !== null;
  }
  _getOffset() {
    const {
      offset: offset2
    } = this._config;
    if (typeof offset2 === "string") {
      return offset2.split(",").map((val) => Number.parseInt(val, 10));
    }
    if (typeof offset2 === "function") {
      return (popperData) => offset2(popperData, this._element);
    }
    return offset2;
  }
  _getPopperConfig() {
    const defaultBsPopperConfig = {
      placement: this._getPlacement(),
      modifiers: [{
        name: "preventOverflow",
        options: {
          boundary: this._config.boundary
        }
      }, {
        name: "offset",
        options: {
          offset: this._getOffset()
        }
      }]
    };
    if (this._config.display === "static") {
      defaultBsPopperConfig.modifiers = [{
        name: "applyStyles",
        enabled: false
      }];
    }
    return __spreadValues(__spreadValues({}, defaultBsPopperConfig), typeof this._config.popperConfig === "function" ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig);
  }
  _selectMenuItem({
    key,
    target
  }) {
    const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(isVisible);
    if (!items.length) {
      return;
    }
    getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
  }
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Dropdown.getOrCreateInstance(this, config);
      if (typeof config !== "string") {
        return;
      }
      if (typeof data[config] === "undefined") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
  static clearMenus(event) {
    if (event && (event.button === RIGHT_MOUSE_BUTTON || event.type === "keyup" && event.key !== TAB_KEY$1)) {
      return;
    }
    const toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$3);
    for (let i = 0, len = toggles.length; i < len; i++) {
      const context = Dropdown.getInstance(toggles[i]);
      if (!context || context._config.autoClose === false) {
        continue;
      }
      if (!context._isShown()) {
        continue;
      }
      const relatedTarget = {
        relatedTarget: context._element
      };
      if (event) {
        const composedPath = event.composedPath();
        const isMenuTarget = composedPath.includes(context._menu);
        if (composedPath.includes(context._element) || context._config.autoClose === "inside" && !isMenuTarget || context._config.autoClose === "outside" && isMenuTarget) {
          continue;
        }
        if (context._menu.contains(event.target) && (event.type === "keyup" && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
          continue;
        }
        if (event.type === "click") {
          relatedTarget.clickEvent = event;
        }
      }
      context._completeHide(relatedTarget);
    }
  }
  static getParentFromElement(element) {
    return getElementFromSelector(element) || element.parentNode;
  }
  static dataApiKeydownHandler(event) {
    if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY$2 && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
      return;
    }
    const isActive = this.classList.contains(CLASS_NAME_SHOW$6);
    if (!isActive && event.key === ESCAPE_KEY$2) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    if (isDisabled(this)) {
      return;
    }
    const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0];
    const instance = Dropdown.getOrCreateInstance(getToggleButton);
    if (event.key === ESCAPE_KEY$2) {
      instance.hide();
      return;
    }
    if (event.key === ARROW_UP_KEY || event.key === ARROW_DOWN_KEY) {
      if (!isActive) {
        instance.show();
      }
      instance._selectMenuItem(event);
      return;
    }
    if (!isActive || event.key === SPACE_KEY) {
      Dropdown.clearMenus();
    }
  }
}
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function(event) {
  event.preventDefault();
  Dropdown.getOrCreateInstance(this).toggle();
});
defineJQueryPlugin(Dropdown);
const SELECTOR_FIXED_CONTENT = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top";
const SELECTOR_STICKY_CONTENT = ".sticky-top";
class ScrollBarHelper {
  constructor() {
    this._element = document.body;
  }
  getWidth() {
    const documentWidth = document.documentElement.clientWidth;
    return Math.abs(window.innerWidth - documentWidth);
  }
  hide() {
    const width = this.getWidth();
    this._disableOverFlow();
    this._setElementAttributes(this._element, "paddingRight", (calculatedValue) => calculatedValue + width);
    this._setElementAttributes(SELECTOR_FIXED_CONTENT, "paddingRight", (calculatedValue) => calculatedValue + width);
    this._setElementAttributes(SELECTOR_STICKY_CONTENT, "marginRight", (calculatedValue) => calculatedValue - width);
  }
  _disableOverFlow() {
    this._saveInitialAttribute(this._element, "overflow");
    this._element.style.overflow = "hidden";
  }
  _setElementAttributes(selector, styleProp, callback) {
    const scrollbarWidth = this.getWidth();
    const manipulationCallBack = (element) => {
      if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
        return;
      }
      this._saveInitialAttribute(element, styleProp);
      const calculatedValue = window.getComputedStyle(element)[styleProp];
      element.style[styleProp] = `${callback(Number.parseFloat(calculatedValue))}px`;
    };
    this._applyManipulationCallback(selector, manipulationCallBack);
  }
  reset() {
    this._resetElementAttributes(this._element, "overflow");
    this._resetElementAttributes(this._element, "paddingRight");
    this._resetElementAttributes(SELECTOR_FIXED_CONTENT, "paddingRight");
    this._resetElementAttributes(SELECTOR_STICKY_CONTENT, "marginRight");
  }
  _saveInitialAttribute(element, styleProp) {
    const actualValue = element.style[styleProp];
    if (actualValue) {
      Manipulator.setDataAttribute(element, styleProp, actualValue);
    }
  }
  _resetElementAttributes(selector, styleProp) {
    const manipulationCallBack = (element) => {
      const value = Manipulator.getDataAttribute(element, styleProp);
      if (typeof value === "undefined") {
        element.style.removeProperty(styleProp);
      } else {
        Manipulator.removeDataAttribute(element, styleProp);
        element.style[styleProp] = value;
      }
    };
    this._applyManipulationCallback(selector, manipulationCallBack);
  }
  _applyManipulationCallback(selector, callBack) {
    if (isElement(selector)) {
      callBack(selector);
    } else {
      SelectorEngine.find(selector, this._element).forEach(callBack);
    }
  }
  isOverflowing() {
    return this.getWidth() > 0;
  }
}
const Default$7 = {
  className: "modal-backdrop",
  isVisible: true,
  isAnimated: false,
  rootElement: "body",
  clickCallback: null
};
const DefaultType$7 = {
  className: "string",
  isVisible: "boolean",
  isAnimated: "boolean",
  rootElement: "(element|string)",
  clickCallback: "(function|null)"
};
const NAME$8 = "backdrop";
const CLASS_NAME_FADE$4 = "fade";
const CLASS_NAME_SHOW$5 = "show";
const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$8}`;
class Backdrop {
  constructor(config) {
    this._config = this._getConfig(config);
    this._isAppended = false;
    this._element = null;
  }
  show(callback) {
    if (!this._config.isVisible) {
      execute(callback);
      return;
    }
    this._append();
    if (this._config.isAnimated) {
      reflow(this._getElement());
    }
    this._getElement().classList.add(CLASS_NAME_SHOW$5);
    this._emulateAnimation(() => {
      execute(callback);
    });
  }
  hide(callback) {
    if (!this._config.isVisible) {
      execute(callback);
      return;
    }
    this._getElement().classList.remove(CLASS_NAME_SHOW$5);
    this._emulateAnimation(() => {
      this.dispose();
      execute(callback);
    });
  }
  _getElement() {
    if (!this._element) {
      const backdrop = document.createElement("div");
      backdrop.className = this._config.className;
      if (this._config.isAnimated) {
        backdrop.classList.add(CLASS_NAME_FADE$4);
      }
      this._element = backdrop;
    }
    return this._element;
  }
  _getConfig(config) {
    config = __spreadValues(__spreadValues({}, Default$7), typeof config === "object" ? config : {});
    config.rootElement = getElement(config.rootElement);
    typeCheckConfig(NAME$8, config, DefaultType$7);
    return config;
  }
  _append() {
    if (this._isAppended) {
      return;
    }
    this._config.rootElement.append(this._getElement());
    EventHandler.on(this._getElement(), EVENT_MOUSEDOWN, () => {
      execute(this._config.clickCallback);
    });
    this._isAppended = true;
  }
  dispose() {
    if (!this._isAppended) {
      return;
    }
    EventHandler.off(this._element, EVENT_MOUSEDOWN);
    this._element.remove();
    this._isAppended = false;
  }
  _emulateAnimation(callback) {
    executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
  }
}
const Default$6 = {
  trapElement: null,
  autofocus: true
};
const DefaultType$6 = {
  trapElement: "element",
  autofocus: "boolean"
};
const NAME$7 = "focustrap";
const DATA_KEY$7 = "bs.focustrap";
const EVENT_KEY$7 = `.${DATA_KEY$7}`;
const EVENT_FOCUSIN$1 = `focusin${EVENT_KEY$7}`;
const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$7}`;
const TAB_KEY = "Tab";
const TAB_NAV_FORWARD = "forward";
const TAB_NAV_BACKWARD = "backward";
class FocusTrap {
  constructor(config) {
    this._config = this._getConfig(config);
    this._isActive = false;
    this._lastTabNavDirection = null;
  }
  activate() {
    const {
      trapElement,
      autofocus
    } = this._config;
    if (this._isActive) {
      return;
    }
    if (autofocus) {
      trapElement.focus();
    }
    EventHandler.off(document, EVENT_KEY$7);
    EventHandler.on(document, EVENT_FOCUSIN$1, (event) => this._handleFocusin(event));
    EventHandler.on(document, EVENT_KEYDOWN_TAB, (event) => this._handleKeydown(event));
    this._isActive = true;
  }
  deactivate() {
    if (!this._isActive) {
      return;
    }
    this._isActive = false;
    EventHandler.off(document, EVENT_KEY$7);
  }
  _handleFocusin(event) {
    const {
      target
    } = event;
    const {
      trapElement
    } = this._config;
    if (target === document || target === trapElement || trapElement.contains(target)) {
      return;
    }
    const elements = SelectorEngine.focusableChildren(trapElement);
    if (elements.length === 0) {
      trapElement.focus();
    } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
      elements[elements.length - 1].focus();
    } else {
      elements[0].focus();
    }
  }
  _handleKeydown(event) {
    if (event.key !== TAB_KEY) {
      return;
    }
    this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
  }
  _getConfig(config) {
    config = __spreadValues(__spreadValues({}, Default$6), typeof config === "object" ? config : {});
    typeCheckConfig(NAME$7, config, DefaultType$6);
    return config;
  }
}
const NAME$6 = "modal";
const DATA_KEY$6 = "bs.modal";
const EVENT_KEY$6 = `.${DATA_KEY$6}`;
const DATA_API_KEY$3 = ".data-api";
const ESCAPE_KEY$1 = "Escape";
const Default$5 = {
  backdrop: true,
  keyboard: true,
  focus: true
};
const DefaultType$5 = {
  backdrop: "(boolean|string)",
  keyboard: "boolean",
  focus: "boolean"
};
const EVENT_HIDE$3 = `hide${EVENT_KEY$6}`;
const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$6}`;
const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$6}`;
const EVENT_SHOW$3 = `show${EVENT_KEY$6}`;
const EVENT_SHOWN$3 = `shown${EVENT_KEY$6}`;
const EVENT_RESIZE = `resize${EVENT_KEY$6}`;
const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$6}`;
const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$6}`;
const EVENT_MOUSEUP_DISMISS = `mouseup.dismiss${EVENT_KEY$6}`;
const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$6}`;
const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
const CLASS_NAME_OPEN = "modal-open";
const CLASS_NAME_FADE$3 = "fade";
const CLASS_NAME_SHOW$4 = "show";
const CLASS_NAME_STATIC = "modal-static";
const OPEN_SELECTOR$1 = ".modal.show";
const SELECTOR_DIALOG = ".modal-dialog";
const SELECTOR_MODAL_BODY = ".modal-body";
const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
class Modal extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._config = this._getConfig(config);
    this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
    this._backdrop = this._initializeBackDrop();
    this._focustrap = this._initializeFocusTrap();
    this._isShown = false;
    this._ignoreBackdropClick = false;
    this._isTransitioning = false;
    this._scrollBar = new ScrollBarHelper();
  }
  static get Default() {
    return Default$5;
  }
  static get NAME() {
    return NAME$6;
  }
  toggle(relatedTarget) {
    return this._isShown ? this.hide() : this.show(relatedTarget);
  }
  show(relatedTarget) {
    if (this._isShown || this._isTransitioning) {
      return;
    }
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
      relatedTarget
    });
    if (showEvent.defaultPrevented) {
      return;
    }
    this._isShown = true;
    if (this._isAnimated()) {
      this._isTransitioning = true;
    }
    this._scrollBar.hide();
    document.body.classList.add(CLASS_NAME_OPEN);
    this._adjustDialog();
    this._setEscapeEvent();
    this._setResizeEvent();
    EventHandler.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, () => {
      EventHandler.one(this._element, EVENT_MOUSEUP_DISMISS, (event) => {
        if (event.target === this._element) {
          this._ignoreBackdropClick = true;
        }
      });
    });
    this._showBackdrop(() => this._showElement(relatedTarget));
  }
  hide() {
    if (!this._isShown || this._isTransitioning) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);
    if (hideEvent.defaultPrevented) {
      return;
    }
    this._isShown = false;
    const isAnimated = this._isAnimated();
    if (isAnimated) {
      this._isTransitioning = true;
    }
    this._setEscapeEvent();
    this._setResizeEvent();
    this._focustrap.deactivate();
    this._element.classList.remove(CLASS_NAME_SHOW$4);
    EventHandler.off(this._element, EVENT_CLICK_DISMISS);
    EventHandler.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);
    this._queueCallback(() => this._hideModal(), this._element, isAnimated);
  }
  dispose() {
    [window, this._dialog].forEach((htmlElement) => EventHandler.off(htmlElement, EVENT_KEY$6));
    this._backdrop.dispose();
    this._focustrap.deactivate();
    super.dispose();
  }
  handleUpdate() {
    this._adjustDialog();
  }
  _initializeBackDrop() {
    return new Backdrop({
      isVisible: Boolean(this._config.backdrop),
      isAnimated: this._isAnimated()
    });
  }
  _initializeFocusTrap() {
    return new FocusTrap({
      trapElement: this._element
    });
  }
  _getConfig(config) {
    config = __spreadValues(__spreadValues(__spreadValues({}, Default$5), Manipulator.getDataAttributes(this._element)), typeof config === "object" ? config : {});
    typeCheckConfig(NAME$6, config, DefaultType$5);
    return config;
  }
  _showElement(relatedTarget) {
    const isAnimated = this._isAnimated();
    const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
    if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
      document.body.append(this._element);
    }
    this._element.style.display = "block";
    this._element.removeAttribute("aria-hidden");
    this._element.setAttribute("aria-modal", true);
    this._element.setAttribute("role", "dialog");
    this._element.scrollTop = 0;
    if (modalBody) {
      modalBody.scrollTop = 0;
    }
    if (isAnimated) {
      reflow(this._element);
    }
    this._element.classList.add(CLASS_NAME_SHOW$4);
    const transitionComplete = () => {
      if (this._config.focus) {
        this._focustrap.activate();
      }
      this._isTransitioning = false;
      EventHandler.trigger(this._element, EVENT_SHOWN$3, {
        relatedTarget
      });
    };
    this._queueCallback(transitionComplete, this._dialog, isAnimated);
  }
  _setEscapeEvent() {
    if (this._isShown) {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, (event) => {
        if (this._config.keyboard && event.key === ESCAPE_KEY$1) {
          event.preventDefault();
          this.hide();
        } else if (!this._config.keyboard && event.key === ESCAPE_KEY$1) {
          this._triggerBackdropTransition();
        }
      });
    } else {
      EventHandler.off(this._element, EVENT_KEYDOWN_DISMISS$1);
    }
  }
  _setResizeEvent() {
    if (this._isShown) {
      EventHandler.on(window, EVENT_RESIZE, () => this._adjustDialog());
    } else {
      EventHandler.off(window, EVENT_RESIZE);
    }
  }
  _hideModal() {
    this._element.style.display = "none";
    this._element.setAttribute("aria-hidden", true);
    this._element.removeAttribute("aria-modal");
    this._element.removeAttribute("role");
    this._isTransitioning = false;
    this._backdrop.hide(() => {
      document.body.classList.remove(CLASS_NAME_OPEN);
      this._resetAdjustments();
      this._scrollBar.reset();
      EventHandler.trigger(this._element, EVENT_HIDDEN$3);
    });
  }
  _showBackdrop(callback) {
    EventHandler.on(this._element, EVENT_CLICK_DISMISS, (event) => {
      if (this._ignoreBackdropClick) {
        this._ignoreBackdropClick = false;
        return;
      }
      if (event.target !== event.currentTarget) {
        return;
      }
      if (this._config.backdrop === true) {
        this.hide();
      } else if (this._config.backdrop === "static") {
        this._triggerBackdropTransition();
      }
    });
    this._backdrop.show(callback);
  }
  _isAnimated() {
    return this._element.classList.contains(CLASS_NAME_FADE$3);
  }
  _triggerBackdropTransition() {
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
    if (hideEvent.defaultPrevented) {
      return;
    }
    const {
      classList,
      scrollHeight,
      style
    } = this._element;
    const isModalOverflowing = scrollHeight > document.documentElement.clientHeight;
    if (!isModalOverflowing && style.overflowY === "hidden" || classList.contains(CLASS_NAME_STATIC)) {
      return;
    }
    if (!isModalOverflowing) {
      style.overflowY = "hidden";
    }
    classList.add(CLASS_NAME_STATIC);
    this._queueCallback(() => {
      classList.remove(CLASS_NAME_STATIC);
      if (!isModalOverflowing) {
        this._queueCallback(() => {
          style.overflowY = "";
        }, this._dialog);
      }
    }, this._dialog);
    this._element.focus();
  }
  _adjustDialog() {
    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
    const scrollbarWidth = this._scrollBar.getWidth();
    const isBodyOverflowing = scrollbarWidth > 0;
    if (!isBodyOverflowing && isModalOverflowing && !isRTL() || isBodyOverflowing && !isModalOverflowing && isRTL()) {
      this._element.style.paddingLeft = `${scrollbarWidth}px`;
    }
    if (isBodyOverflowing && !isModalOverflowing && !isRTL() || !isBodyOverflowing && isModalOverflowing && isRTL()) {
      this._element.style.paddingRight = `${scrollbarWidth}px`;
    }
  }
  _resetAdjustments() {
    this._element.style.paddingLeft = "";
    this._element.style.paddingRight = "";
  }
  static jQueryInterface(config, relatedTarget) {
    return this.each(function() {
      const data = Modal.getOrCreateInstance(this, config);
      if (typeof config !== "string") {
        return;
      }
      if (typeof data[config] === "undefined") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config](relatedTarget);
    });
  }
}
EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function(event) {
  const target = getElementFromSelector(this);
  if (["A", "AREA"].includes(this.tagName)) {
    event.preventDefault();
  }
  EventHandler.one(target, EVENT_SHOW$3, (showEvent) => {
    if (showEvent.defaultPrevented) {
      return;
    }
    EventHandler.one(target, EVENT_HIDDEN$3, () => {
      if (isVisible(this)) {
        this.focus();
      }
    });
  });
  const allReadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);
  if (allReadyOpen) {
    Modal.getInstance(allReadyOpen).hide();
  }
  const data = Modal.getOrCreateInstance(target);
  data.toggle(this);
});
enableDismissTrigger(Modal);
defineJQueryPlugin(Modal);
const NAME$5 = "offcanvas";
const DATA_KEY$5 = "bs.offcanvas";
const EVENT_KEY$5 = `.${DATA_KEY$5}`;
const DATA_API_KEY$2 = ".data-api";
const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$5}${DATA_API_KEY$2}`;
const ESCAPE_KEY = "Escape";
const Default$4 = {
  backdrop: true,
  keyboard: true,
  scroll: false
};
const DefaultType$4 = {
  backdrop: "boolean",
  keyboard: "boolean",
  scroll: "boolean"
};
const CLASS_NAME_SHOW$3 = "show";
const CLASS_NAME_BACKDROP = "offcanvas-backdrop";
const OPEN_SELECTOR = ".offcanvas.show";
const EVENT_SHOW$2 = `show${EVENT_KEY$5}`;
const EVENT_SHOWN$2 = `shown${EVENT_KEY$5}`;
const EVENT_HIDE$2 = `hide${EVENT_KEY$5}`;
const EVENT_HIDDEN$2 = `hidden${EVENT_KEY$5}`;
const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$5}${DATA_API_KEY$2}`;
const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$5}`;
const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
class Offcanvas extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._config = this._getConfig(config);
    this._isShown = false;
    this._backdrop = this._initializeBackDrop();
    this._focustrap = this._initializeFocusTrap();
    this._addEventListeners();
  }
  static get NAME() {
    return NAME$5;
  }
  static get Default() {
    return Default$4;
  }
  toggle(relatedTarget) {
    return this._isShown ? this.hide() : this.show(relatedTarget);
  }
  show(relatedTarget) {
    if (this._isShown) {
      return;
    }
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$2, {
      relatedTarget
    });
    if (showEvent.defaultPrevented) {
      return;
    }
    this._isShown = true;
    this._element.style.visibility = "visible";
    this._backdrop.show();
    if (!this._config.scroll) {
      new ScrollBarHelper().hide();
    }
    this._element.removeAttribute("aria-hidden");
    this._element.setAttribute("aria-modal", true);
    this._element.setAttribute("role", "dialog");
    this._element.classList.add(CLASS_NAME_SHOW$3);
    const completeCallBack = () => {
      if (!this._config.scroll) {
        this._focustrap.activate();
      }
      EventHandler.trigger(this._element, EVENT_SHOWN$2, {
        relatedTarget
      });
    };
    this._queueCallback(completeCallBack, this._element, true);
  }
  hide() {
    if (!this._isShown) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$2);
    if (hideEvent.defaultPrevented) {
      return;
    }
    this._focustrap.deactivate();
    this._element.blur();
    this._isShown = false;
    this._element.classList.remove(CLASS_NAME_SHOW$3);
    this._backdrop.hide();
    const completeCallback = () => {
      this._element.setAttribute("aria-hidden", true);
      this._element.removeAttribute("aria-modal");
      this._element.removeAttribute("role");
      this._element.style.visibility = "hidden";
      if (!this._config.scroll) {
        new ScrollBarHelper().reset();
      }
      EventHandler.trigger(this._element, EVENT_HIDDEN$2);
    };
    this._queueCallback(completeCallback, this._element, true);
  }
  dispose() {
    this._backdrop.dispose();
    this._focustrap.deactivate();
    super.dispose();
  }
  _getConfig(config) {
    config = __spreadValues(__spreadValues(__spreadValues({}, Default$4), Manipulator.getDataAttributes(this._element)), typeof config === "object" ? config : {});
    typeCheckConfig(NAME$5, config, DefaultType$4);
    return config;
  }
  _initializeBackDrop() {
    return new Backdrop({
      className: CLASS_NAME_BACKDROP,
      isVisible: this._config.backdrop,
      isAnimated: true,
      rootElement: this._element.parentNode,
      clickCallback: () => this.hide()
    });
  }
  _initializeFocusTrap() {
    return new FocusTrap({
      trapElement: this._element
    });
  }
  _addEventListeners() {
    EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, (event) => {
      if (this._config.keyboard && event.key === ESCAPE_KEY) {
        this.hide();
      }
    });
  }
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Offcanvas.getOrCreateInstance(this, config);
      if (typeof config !== "string") {
        return;
      }
      if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config](this);
    });
  }
}
EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function(event) {
  const target = getElementFromSelector(this);
  if (["A", "AREA"].includes(this.tagName)) {
    event.preventDefault();
  }
  if (isDisabled(this)) {
    return;
  }
  EventHandler.one(target, EVENT_HIDDEN$2, () => {
    if (isVisible(this)) {
      this.focus();
    }
  });
  const allReadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
  if (allReadyOpen && allReadyOpen !== target) {
    Offcanvas.getInstance(allReadyOpen).hide();
  }
  const data = Offcanvas.getOrCreateInstance(target);
  data.toggle(this);
});
EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => SelectorEngine.find(OPEN_SELECTOR).forEach((el) => Offcanvas.getOrCreateInstance(el).show()));
enableDismissTrigger(Offcanvas);
defineJQueryPlugin(Offcanvas);
const uriAttributes = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]);
const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
const allowedAttribute = (attribute, allowedAttributeList) => {
  const attributeName = attribute.nodeName.toLowerCase();
  if (allowedAttributeList.includes(attributeName)) {
    if (uriAttributes.has(attributeName)) {
      return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue) || DATA_URL_PATTERN.test(attribute.nodeValue));
    }
    return true;
  }
  const regExp = allowedAttributeList.filter((attributeRegex) => attributeRegex instanceof RegExp);
  for (let i = 0, len = regExp.length; i < len; i++) {
    if (regExp[i].test(attributeName)) {
      return true;
    }
  }
  return false;
};
const DefaultAllowlist = {
  "*": ["class", "dir", "id", "lang", "role", ARIA_ATTRIBUTE_PATTERN],
  a: ["target", "href", "title", "rel"],
  area: [],
  b: [],
  br: [],
  col: [],
  code: [],
  div: [],
  em: [],
  hr: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  img: ["src", "srcset", "alt", "title", "width", "height"],
  li: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  small: [],
  span: [],
  sub: [],
  sup: [],
  strong: [],
  u: [],
  ul: []
};
function sanitizeHtml(unsafeHtml, allowList, sanitizeFn) {
  if (!unsafeHtml.length) {
    return unsafeHtml;
  }
  if (sanitizeFn && typeof sanitizeFn === "function") {
    return sanitizeFn(unsafeHtml);
  }
  const domParser = new window.DOMParser();
  const createdDocument = domParser.parseFromString(unsafeHtml, "text/html");
  const elements = [].concat(...createdDocument.body.querySelectorAll("*"));
  for (let i = 0, len = elements.length; i < len; i++) {
    const element = elements[i];
    const elementName = element.nodeName.toLowerCase();
    if (!Object.keys(allowList).includes(elementName)) {
      element.remove();
      continue;
    }
    const attributeList = [].concat(...element.attributes);
    const allowedAttributes = [].concat(allowList["*"] || [], allowList[elementName] || []);
    attributeList.forEach((attribute) => {
      if (!allowedAttribute(attribute, allowedAttributes)) {
        element.removeAttribute(attribute.nodeName);
      }
    });
  }
  return createdDocument.body.innerHTML;
}
const NAME$4 = "tooltip";
const DATA_KEY$4 = "bs.tooltip";
const EVENT_KEY$4 = `.${DATA_KEY$4}`;
const CLASS_PREFIX$1 = "bs-tooltip";
const DISALLOWED_ATTRIBUTES = new Set(["sanitize", "allowList", "sanitizeFn"]);
const DefaultType$3 = {
  animation: "boolean",
  template: "string",
  title: "(string|element|function)",
  trigger: "string",
  delay: "(number|object)",
  html: "boolean",
  selector: "(string|boolean)",
  placement: "(string|function)",
  offset: "(array|string|function)",
  container: "(string|element|boolean)",
  fallbackPlacements: "array",
  boundary: "(string|element)",
  customClass: "(string|function)",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  allowList: "object",
  popperConfig: "(null|object|function)"
};
const AttachmentMap = {
  AUTO: "auto",
  TOP: "top",
  RIGHT: isRTL() ? "left" : "right",
  BOTTOM: "bottom",
  LEFT: isRTL() ? "right" : "left"
};
const Default$3 = {
  animation: true,
  template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  trigger: "hover focus",
  title: "",
  delay: 0,
  html: false,
  selector: false,
  placement: "top",
  offset: [0, 0],
  container: false,
  fallbackPlacements: ["top", "right", "bottom", "left"],
  boundary: "clippingParents",
  customClass: "",
  sanitize: true,
  sanitizeFn: null,
  allowList: DefaultAllowlist,
  popperConfig: null
};
const Event$2 = {
  HIDE: `hide${EVENT_KEY$4}`,
  HIDDEN: `hidden${EVENT_KEY$4}`,
  SHOW: `show${EVENT_KEY$4}`,
  SHOWN: `shown${EVENT_KEY$4}`,
  INSERTED: `inserted${EVENT_KEY$4}`,
  CLICK: `click${EVENT_KEY$4}`,
  FOCUSIN: `focusin${EVENT_KEY$4}`,
  FOCUSOUT: `focusout${EVENT_KEY$4}`,
  MOUSEENTER: `mouseenter${EVENT_KEY$4}`,
  MOUSELEAVE: `mouseleave${EVENT_KEY$4}`
};
const CLASS_NAME_FADE$2 = "fade";
const CLASS_NAME_MODAL = "modal";
const CLASS_NAME_SHOW$2 = "show";
const HOVER_STATE_SHOW = "show";
const HOVER_STATE_OUT = "out";
const SELECTOR_TOOLTIP_INNER = ".tooltip-inner";
const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
const EVENT_MODAL_HIDE = "hide.bs.modal";
const TRIGGER_HOVER = "hover";
const TRIGGER_FOCUS = "focus";
const TRIGGER_CLICK = "click";
const TRIGGER_MANUAL = "manual";
class Tooltip extends BaseComponent {
  constructor(element, config) {
    if (typeof Popper === "undefined") {
      throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
    }
    super(element);
    this._isEnabled = true;
    this._timeout = 0;
    this._hoverState = "";
    this._activeTrigger = {};
    this._popper = null;
    this._config = this._getConfig(config);
    this.tip = null;
    this._setListeners();
  }
  static get Default() {
    return Default$3;
  }
  static get NAME() {
    return NAME$4;
  }
  static get Event() {
    return Event$2;
  }
  static get DefaultType() {
    return DefaultType$3;
  }
  enable() {
    this._isEnabled = true;
  }
  disable() {
    this._isEnabled = false;
  }
  toggleEnabled() {
    this._isEnabled = !this._isEnabled;
  }
  toggle(event) {
    if (!this._isEnabled) {
      return;
    }
    if (event) {
      const context = this._initializeOnDelegatedTarget(event);
      context._activeTrigger.click = !context._activeTrigger.click;
      if (context._isWithActiveTrigger()) {
        context._enter(null, context);
      } else {
        context._leave(null, context);
      }
    } else {
      if (this.getTipElement().classList.contains(CLASS_NAME_SHOW$2)) {
        this._leave(null, this);
        return;
      }
      this._enter(null, this);
    }
  }
  dispose() {
    clearTimeout(this._timeout);
    EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
    if (this.tip) {
      this.tip.remove();
    }
    this._disposePopper();
    super.dispose();
  }
  show() {
    if (this._element.style.display === "none") {
      throw new Error("Please use show on visible elements");
    }
    if (!(this.isWithContent() && this._isEnabled)) {
      return;
    }
    const showEvent = EventHandler.trigger(this._element, this.constructor.Event.SHOW);
    const shadowRoot = findShadowRoot(this._element);
    const isInTheDom = shadowRoot === null ? this._element.ownerDocument.documentElement.contains(this._element) : shadowRoot.contains(this._element);
    if (showEvent.defaultPrevented || !isInTheDom) {
      return;
    }
    if (this.constructor.NAME === "tooltip" && this.tip && this.getTitle() !== this.tip.querySelector(SELECTOR_TOOLTIP_INNER).innerHTML) {
      this._disposePopper();
      this.tip.remove();
      this.tip = null;
    }
    const tip = this.getTipElement();
    const tipId = getUID(this.constructor.NAME);
    tip.setAttribute("id", tipId);
    this._element.setAttribute("aria-describedby", tipId);
    if (this._config.animation) {
      tip.classList.add(CLASS_NAME_FADE$2);
    }
    const placement = typeof this._config.placement === "function" ? this._config.placement.call(this, tip, this._element) : this._config.placement;
    const attachment = this._getAttachment(placement);
    this._addAttachmentClass(attachment);
    const {
      container
    } = this._config;
    Data.set(tip, this.constructor.DATA_KEY, this);
    if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
      container.append(tip);
      EventHandler.trigger(this._element, this.constructor.Event.INSERTED);
    }
    if (this._popper) {
      this._popper.update();
    } else {
      this._popper = createPopper(this._element, tip, this._getPopperConfig(attachment));
    }
    tip.classList.add(CLASS_NAME_SHOW$2);
    const customClass = this._resolvePossibleFunction(this._config.customClass);
    if (customClass) {
      tip.classList.add(...customClass.split(" "));
    }
    if ("ontouchstart" in document.documentElement) {
      [].concat(...document.body.children).forEach((element) => {
        EventHandler.on(element, "mouseover", noop);
      });
    }
    const complete = () => {
      const prevHoverState = this._hoverState;
      this._hoverState = null;
      EventHandler.trigger(this._element, this.constructor.Event.SHOWN);
      if (prevHoverState === HOVER_STATE_OUT) {
        this._leave(null, this);
      }
    };
    const isAnimated = this.tip.classList.contains(CLASS_NAME_FADE$2);
    this._queueCallback(complete, this.tip, isAnimated);
  }
  hide() {
    if (!this._popper) {
      return;
    }
    const tip = this.getTipElement();
    const complete = () => {
      if (this._isWithActiveTrigger()) {
        return;
      }
      if (this._hoverState !== HOVER_STATE_SHOW) {
        tip.remove();
      }
      this._cleanTipClass();
      this._element.removeAttribute("aria-describedby");
      EventHandler.trigger(this._element, this.constructor.Event.HIDDEN);
      this._disposePopper();
    };
    const hideEvent = EventHandler.trigger(this._element, this.constructor.Event.HIDE);
    if (hideEvent.defaultPrevented) {
      return;
    }
    tip.classList.remove(CLASS_NAME_SHOW$2);
    if ("ontouchstart" in document.documentElement) {
      [].concat(...document.body.children).forEach((element) => EventHandler.off(element, "mouseover", noop));
    }
    this._activeTrigger[TRIGGER_CLICK] = false;
    this._activeTrigger[TRIGGER_FOCUS] = false;
    this._activeTrigger[TRIGGER_HOVER] = false;
    const isAnimated = this.tip.classList.contains(CLASS_NAME_FADE$2);
    this._queueCallback(complete, this.tip, isAnimated);
    this._hoverState = "";
  }
  update() {
    if (this._popper !== null) {
      this._popper.update();
    }
  }
  isWithContent() {
    return Boolean(this.getTitle());
  }
  getTipElement() {
    if (this.tip) {
      return this.tip;
    }
    const element = document.createElement("div");
    element.innerHTML = this._config.template;
    const tip = element.children[0];
    this.setContent(tip);
    tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
    this.tip = tip;
    return this.tip;
  }
  setContent(tip) {
    this._sanitizeAndSetContent(tip, this.getTitle(), SELECTOR_TOOLTIP_INNER);
  }
  _sanitizeAndSetContent(template, content, selector) {
    const templateElement = SelectorEngine.findOne(selector, template);
    if (!content && templateElement) {
      templateElement.remove();
      return;
    }
    this.setElementContent(templateElement, content);
  }
  setElementContent(element, content) {
    if (element === null) {
      return;
    }
    if (isElement(content)) {
      content = getElement(content);
      if (this._config.html) {
        if (content.parentNode !== element) {
          element.innerHTML = "";
          element.append(content);
        }
      } else {
        element.textContent = content.textContent;
      }
      return;
    }
    if (this._config.html) {
      if (this._config.sanitize) {
        content = sanitizeHtml(content, this._config.allowList, this._config.sanitizeFn);
      }
      element.innerHTML = content;
    } else {
      element.textContent = content;
    }
  }
  getTitle() {
    const title = this._element.getAttribute("data-bs-original-title") || this._config.title;
    return this._resolvePossibleFunction(title);
  }
  updateAttachment(attachment) {
    if (attachment === "right") {
      return "end";
    }
    if (attachment === "left") {
      return "start";
    }
    return attachment;
  }
  _initializeOnDelegatedTarget(event, context) {
    return context || this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
  }
  _getOffset() {
    const {
      offset: offset2
    } = this._config;
    if (typeof offset2 === "string") {
      return offset2.split(",").map((val) => Number.parseInt(val, 10));
    }
    if (typeof offset2 === "function") {
      return (popperData) => offset2(popperData, this._element);
    }
    return offset2;
  }
  _resolvePossibleFunction(content) {
    return typeof content === "function" ? content.call(this._element) : content;
  }
  _getPopperConfig(attachment) {
    const defaultBsPopperConfig = {
      placement: attachment,
      modifiers: [{
        name: "flip",
        options: {
          fallbackPlacements: this._config.fallbackPlacements
        }
      }, {
        name: "offset",
        options: {
          offset: this._getOffset()
        }
      }, {
        name: "preventOverflow",
        options: {
          boundary: this._config.boundary
        }
      }, {
        name: "arrow",
        options: {
          element: `.${this.constructor.NAME}-arrow`
        }
      }, {
        name: "onChange",
        enabled: true,
        phase: "afterWrite",
        fn: (data) => this._handlePopperPlacementChange(data)
      }],
      onFirstUpdate: (data) => {
        if (data.options.placement !== data.placement) {
          this._handlePopperPlacementChange(data);
        }
      }
    };
    return __spreadValues(__spreadValues({}, defaultBsPopperConfig), typeof this._config.popperConfig === "function" ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig);
  }
  _addAttachmentClass(attachment) {
    this.getTipElement().classList.add(`${this._getBasicClassPrefix()}-${this.updateAttachment(attachment)}`);
  }
  _getAttachment(placement) {
    return AttachmentMap[placement.toUpperCase()];
  }
  _setListeners() {
    const triggers = this._config.trigger.split(" ");
    triggers.forEach((trigger) => {
      if (trigger === "click") {
        EventHandler.on(this._element, this.constructor.Event.CLICK, this._config.selector, (event) => this.toggle(event));
      } else if (trigger !== TRIGGER_MANUAL) {
        const eventIn = trigger === TRIGGER_HOVER ? this.constructor.Event.MOUSEENTER : this.constructor.Event.FOCUSIN;
        const eventOut = trigger === TRIGGER_HOVER ? this.constructor.Event.MOUSELEAVE : this.constructor.Event.FOCUSOUT;
        EventHandler.on(this._element, eventIn, this._config.selector, (event) => this._enter(event));
        EventHandler.on(this._element, eventOut, this._config.selector, (event) => this._leave(event));
      }
    });
    this._hideModalHandler = () => {
      if (this._element) {
        this.hide();
      }
    };
    EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
    if (this._config.selector) {
      this._config = __spreadProps(__spreadValues({}, this._config), {
        trigger: "manual",
        selector: ""
      });
    } else {
      this._fixTitle();
    }
  }
  _fixTitle() {
    const title = this._element.getAttribute("title");
    const originalTitleType = typeof this._element.getAttribute("data-bs-original-title");
    if (title || originalTitleType !== "string") {
      this._element.setAttribute("data-bs-original-title", title || "");
      if (title && !this._element.getAttribute("aria-label") && !this._element.textContent) {
        this._element.setAttribute("aria-label", title);
      }
      this._element.setAttribute("title", "");
    }
  }
  _enter(event, context) {
    context = this._initializeOnDelegatedTarget(event, context);
    if (event) {
      context._activeTrigger[event.type === "focusin" ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
    }
    if (context.getTipElement().classList.contains(CLASS_NAME_SHOW$2) || context._hoverState === HOVER_STATE_SHOW) {
      context._hoverState = HOVER_STATE_SHOW;
      return;
    }
    clearTimeout(context._timeout);
    context._hoverState = HOVER_STATE_SHOW;
    if (!context._config.delay || !context._config.delay.show) {
      context.show();
      return;
    }
    context._timeout = setTimeout(() => {
      if (context._hoverState === HOVER_STATE_SHOW) {
        context.show();
      }
    }, context._config.delay.show);
  }
  _leave(event, context) {
    context = this._initializeOnDelegatedTarget(event, context);
    if (event) {
      context._activeTrigger[event.type === "focusout" ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
    }
    if (context._isWithActiveTrigger()) {
      return;
    }
    clearTimeout(context._timeout);
    context._hoverState = HOVER_STATE_OUT;
    if (!context._config.delay || !context._config.delay.hide) {
      context.hide();
      return;
    }
    context._timeout = setTimeout(() => {
      if (context._hoverState === HOVER_STATE_OUT) {
        context.hide();
      }
    }, context._config.delay.hide);
  }
  _isWithActiveTrigger() {
    for (const trigger in this._activeTrigger) {
      if (this._activeTrigger[trigger]) {
        return true;
      }
    }
    return false;
  }
  _getConfig(config) {
    const dataAttributes = Manipulator.getDataAttributes(this._element);
    Object.keys(dataAttributes).forEach((dataAttr) => {
      if (DISALLOWED_ATTRIBUTES.has(dataAttr)) {
        delete dataAttributes[dataAttr];
      }
    });
    config = __spreadValues(__spreadValues(__spreadValues({}, this.constructor.Default), dataAttributes), typeof config === "object" && config ? config : {});
    config.container = config.container === false ? document.body : getElement(config.container);
    if (typeof config.delay === "number") {
      config.delay = {
        show: config.delay,
        hide: config.delay
      };
    }
    if (typeof config.title === "number") {
      config.title = config.title.toString();
    }
    if (typeof config.content === "number") {
      config.content = config.content.toString();
    }
    typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
    if (config.sanitize) {
      config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
    }
    return config;
  }
  _getDelegateConfig() {
    const config = {};
    for (const key in this._config) {
      if (this.constructor.Default[key] !== this._config[key]) {
        config[key] = this._config[key];
      }
    }
    return config;
  }
  _cleanTipClass() {
    const tip = this.getTipElement();
    const basicClassPrefixRegex = new RegExp(`(^|\\s)${this._getBasicClassPrefix()}\\S+`, "g");
    const tabClass = tip.getAttribute("class").match(basicClassPrefixRegex);
    if (tabClass !== null && tabClass.length > 0) {
      tabClass.map((token) => token.trim()).forEach((tClass) => tip.classList.remove(tClass));
    }
  }
  _getBasicClassPrefix() {
    return CLASS_PREFIX$1;
  }
  _handlePopperPlacementChange(popperData) {
    const {
      state
    } = popperData;
    if (!state) {
      return;
    }
    this.tip = state.elements.popper;
    this._cleanTipClass();
    this._addAttachmentClass(this._getAttachment(state.placement));
  }
  _disposePopper() {
    if (this._popper) {
      this._popper.destroy();
      this._popper = null;
    }
  }
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Tooltip.getOrCreateInstance(this, config);
      if (typeof config === "string") {
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      }
    });
  }
}
defineJQueryPlugin(Tooltip);
const NAME$3 = "popover";
const DATA_KEY$3 = "bs.popover";
const EVENT_KEY$3 = `.${DATA_KEY$3}`;
const CLASS_PREFIX = "bs-popover";
const Default$2 = __spreadProps(__spreadValues({}, Tooltip.Default), {
  placement: "right",
  offset: [0, 8],
  trigger: "click",
  content: "",
  template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
});
const DefaultType$2 = __spreadProps(__spreadValues({}, Tooltip.DefaultType), {
  content: "(string|element|function)"
});
const Event$1 = {
  HIDE: `hide${EVENT_KEY$3}`,
  HIDDEN: `hidden${EVENT_KEY$3}`,
  SHOW: `show${EVENT_KEY$3}`,
  SHOWN: `shown${EVENT_KEY$3}`,
  INSERTED: `inserted${EVENT_KEY$3}`,
  CLICK: `click${EVENT_KEY$3}`,
  FOCUSIN: `focusin${EVENT_KEY$3}`,
  FOCUSOUT: `focusout${EVENT_KEY$3}`,
  MOUSEENTER: `mouseenter${EVENT_KEY$3}`,
  MOUSELEAVE: `mouseleave${EVENT_KEY$3}`
};
const SELECTOR_TITLE = ".popover-header";
const SELECTOR_CONTENT = ".popover-body";
class Popover extends Tooltip {
  static get Default() {
    return Default$2;
  }
  static get NAME() {
    return NAME$3;
  }
  static get Event() {
    return Event$1;
  }
  static get DefaultType() {
    return DefaultType$2;
  }
  isWithContent() {
    return this.getTitle() || this._getContent();
  }
  setContent(tip) {
    this._sanitizeAndSetContent(tip, this.getTitle(), SELECTOR_TITLE);
    this._sanitizeAndSetContent(tip, this._getContent(), SELECTOR_CONTENT);
  }
  _getContent() {
    return this._resolvePossibleFunction(this._config.content);
  }
  _getBasicClassPrefix() {
    return CLASS_PREFIX;
  }
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Popover.getOrCreateInstance(this, config);
      if (typeof config === "string") {
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      }
    });
  }
}
defineJQueryPlugin(Popover);
const NAME$2 = "scrollspy";
const DATA_KEY$2 = "bs.scrollspy";
const EVENT_KEY$2 = `.${DATA_KEY$2}`;
const DATA_API_KEY$1 = ".data-api";
const Default$1 = {
  offset: 10,
  method: "auto",
  target: ""
};
const DefaultType$1 = {
  offset: "number",
  method: "string",
  target: "(string|element)"
};
const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
const EVENT_SCROLL = `scroll${EVENT_KEY$2}`;
const EVENT_LOAD_DATA_API = `load${EVENT_KEY$2}${DATA_API_KEY$1}`;
const CLASS_NAME_DROPDOWN_ITEM = "dropdown-item";
const CLASS_NAME_ACTIVE$1 = "active";
const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
const SELECTOR_NAV_LIST_GROUP$1 = ".nav, .list-group";
const SELECTOR_NAV_LINKS = ".nav-link";
const SELECTOR_NAV_ITEMS = ".nav-item";
const SELECTOR_LIST_ITEMS = ".list-group-item";
const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}, .${CLASS_NAME_DROPDOWN_ITEM}`;
const SELECTOR_DROPDOWN$1 = ".dropdown";
const SELECTOR_DROPDOWN_TOGGLE$1 = ".dropdown-toggle";
const METHOD_OFFSET = "offset";
const METHOD_POSITION = "position";
class ScrollSpy extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._scrollElement = this._element.tagName === "BODY" ? window : this._element;
    this._config = this._getConfig(config);
    this._offsets = [];
    this._targets = [];
    this._activeTarget = null;
    this._scrollHeight = 0;
    EventHandler.on(this._scrollElement, EVENT_SCROLL, () => this._process());
    this.refresh();
    this._process();
  }
  static get Default() {
    return Default$1;
  }
  static get NAME() {
    return NAME$2;
  }
  refresh() {
    const autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
    const offsetMethod = this._config.method === "auto" ? autoMethod : this._config.method;
    const offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
    this._offsets = [];
    this._targets = [];
    this._scrollHeight = this._getScrollHeight();
    const targets = SelectorEngine.find(SELECTOR_LINK_ITEMS, this._config.target);
    targets.map((element) => {
      const targetSelector = getSelectorFromElement(element);
      const target = targetSelector ? SelectorEngine.findOne(targetSelector) : null;
      if (target) {
        const targetBCR = target.getBoundingClientRect();
        if (targetBCR.width || targetBCR.height) {
          return [Manipulator[offsetMethod](target).top + offsetBase, targetSelector];
        }
      }
      return null;
    }).filter((item) => item).sort((a, b) => a[0] - b[0]).forEach((item) => {
      this._offsets.push(item[0]);
      this._targets.push(item[1]);
    });
  }
  dispose() {
    EventHandler.off(this._scrollElement, EVENT_KEY$2);
    super.dispose();
  }
  _getConfig(config) {
    config = __spreadValues(__spreadValues(__spreadValues({}, Default$1), Manipulator.getDataAttributes(this._element)), typeof config === "object" && config ? config : {});
    config.target = getElement(config.target) || document.documentElement;
    typeCheckConfig(NAME$2, config, DefaultType$1);
    return config;
  }
  _getScrollTop() {
    return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
  }
  _getScrollHeight() {
    return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
  }
  _getOffsetHeight() {
    return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
  }
  _process() {
    const scrollTop = this._getScrollTop() + this._config.offset;
    const scrollHeight = this._getScrollHeight();
    const maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();
    if (this._scrollHeight !== scrollHeight) {
      this.refresh();
    }
    if (scrollTop >= maxScroll) {
      const target = this._targets[this._targets.length - 1];
      if (this._activeTarget !== target) {
        this._activate(target);
      }
      return;
    }
    if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
      this._activeTarget = null;
      this._clear();
      return;
    }
    for (let i = this._offsets.length; i--; ) {
      const isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === "undefined" || scrollTop < this._offsets[i + 1]);
      if (isActiveTarget) {
        this._activate(this._targets[i]);
      }
    }
  }
  _activate(target) {
    this._activeTarget = target;
    this._clear();
    const queries = SELECTOR_LINK_ITEMS.split(",").map((selector) => `${selector}[data-bs-target="${target}"],${selector}[href="${target}"]`);
    const link = SelectorEngine.findOne(queries.join(","), this._config.target);
    link.classList.add(CLASS_NAME_ACTIVE$1);
    if (link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
      SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, link.closest(SELECTOR_DROPDOWN$1)).classList.add(CLASS_NAME_ACTIVE$1);
    } else {
      SelectorEngine.parents(link, SELECTOR_NAV_LIST_GROUP$1).forEach((listGroup) => {
        SelectorEngine.prev(listGroup, `${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`).forEach((item) => item.classList.add(CLASS_NAME_ACTIVE$1));
        SelectorEngine.prev(listGroup, SELECTOR_NAV_ITEMS).forEach((navItem) => {
          SelectorEngine.children(navItem, SELECTOR_NAV_LINKS).forEach((item) => item.classList.add(CLASS_NAME_ACTIVE$1));
        });
      });
    }
    EventHandler.trigger(this._scrollElement, EVENT_ACTIVATE, {
      relatedTarget: target
    });
  }
  _clear() {
    SelectorEngine.find(SELECTOR_LINK_ITEMS, this._config.target).filter((node) => node.classList.contains(CLASS_NAME_ACTIVE$1)).forEach((node) => node.classList.remove(CLASS_NAME_ACTIVE$1));
  }
  static jQueryInterface(config) {
    return this.each(function() {
      const data = ScrollSpy.getOrCreateInstance(this, config);
      if (typeof config !== "string") {
        return;
      }
      if (typeof data[config] === "undefined") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
}
EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
  SelectorEngine.find(SELECTOR_DATA_SPY).forEach((spy) => new ScrollSpy(spy));
});
defineJQueryPlugin(ScrollSpy);
const NAME$1 = "tab";
const DATA_KEY$1 = "bs.tab";
const EVENT_KEY$1 = `.${DATA_KEY$1}`;
const DATA_API_KEY = ".data-api";
const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}${DATA_API_KEY}`;
const CLASS_NAME_DROPDOWN_MENU = "dropdown-menu";
const CLASS_NAME_ACTIVE = "active";
const CLASS_NAME_FADE$1 = "fade";
const CLASS_NAME_SHOW$1 = "show";
const SELECTOR_DROPDOWN = ".dropdown";
const SELECTOR_NAV_LIST_GROUP = ".nav, .list-group";
const SELECTOR_ACTIVE = ".active";
const SELECTOR_ACTIVE_UL = ":scope > li > .active";
const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
const SELECTOR_DROPDOWN_TOGGLE = ".dropdown-toggle";
const SELECTOR_DROPDOWN_ACTIVE_CHILD = ":scope > .dropdown-menu .active";
class Tab extends BaseComponent {
  static get NAME() {
    return NAME$1;
  }
  show() {
    if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
      return;
    }
    let previous;
    const target = getElementFromSelector(this._element);
    const listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP);
    if (listElement) {
      const itemSelector = listElement.nodeName === "UL" || listElement.nodeName === "OL" ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE;
      previous = SelectorEngine.find(itemSelector, listElement);
      previous = previous[previous.length - 1];
    }
    const hideEvent = previous ? EventHandler.trigger(previous, EVENT_HIDE$1, {
      relatedTarget: this._element
    }) : null;
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$1, {
      relatedTarget: previous
    });
    if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
      return;
    }
    this._activate(this._element, listElement);
    const complete = () => {
      EventHandler.trigger(previous, EVENT_HIDDEN$1, {
        relatedTarget: this._element
      });
      EventHandler.trigger(this._element, EVENT_SHOWN$1, {
        relatedTarget: previous
      });
    };
    if (target) {
      this._activate(target, target.parentNode, complete);
    } else {
      complete();
    }
  }
  _activate(element, container, callback) {
    const activeElements = container && (container.nodeName === "UL" || container.nodeName === "OL") ? SelectorEngine.find(SELECTOR_ACTIVE_UL, container) : SelectorEngine.children(container, SELECTOR_ACTIVE);
    const active = activeElements[0];
    const isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE$1);
    const complete = () => this._transitionComplete(element, active, callback);
    if (active && isTransitioning) {
      active.classList.remove(CLASS_NAME_SHOW$1);
      this._queueCallback(complete, element, true);
    } else {
      complete();
    }
  }
  _transitionComplete(element, active, callback) {
    if (active) {
      active.classList.remove(CLASS_NAME_ACTIVE);
      const dropdownChild = SelectorEngine.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);
      if (dropdownChild) {
        dropdownChild.classList.remove(CLASS_NAME_ACTIVE);
      }
      if (active.getAttribute("role") === "tab") {
        active.setAttribute("aria-selected", false);
      }
    }
    element.classList.add(CLASS_NAME_ACTIVE);
    if (element.getAttribute("role") === "tab") {
      element.setAttribute("aria-selected", true);
    }
    reflow(element);
    if (element.classList.contains(CLASS_NAME_FADE$1)) {
      element.classList.add(CLASS_NAME_SHOW$1);
    }
    let parent = element.parentNode;
    if (parent && parent.nodeName === "LI") {
      parent = parent.parentNode;
    }
    if (parent && parent.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
      const dropdownElement = element.closest(SELECTOR_DROPDOWN);
      if (dropdownElement) {
        SelectorEngine.find(SELECTOR_DROPDOWN_TOGGLE, dropdownElement).forEach((dropdown) => dropdown.classList.add(CLASS_NAME_ACTIVE));
      }
      element.setAttribute("aria-expanded", true);
    }
    if (callback) {
      callback();
    }
  }
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Tab.getOrCreateInstance(this);
      if (typeof config === "string") {
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      }
    });
  }
}
EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
  if (["A", "AREA"].includes(this.tagName)) {
    event.preventDefault();
  }
  if (isDisabled(this)) {
    return;
  }
  const data = Tab.getOrCreateInstance(this);
  data.show();
});
defineJQueryPlugin(Tab);
const NAME = "toast";
const DATA_KEY = "bs.toast";
const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
const EVENT_HIDE = `hide${EVENT_KEY}`;
const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
const EVENT_SHOW = `show${EVENT_KEY}`;
const EVENT_SHOWN = `shown${EVENT_KEY}`;
const CLASS_NAME_FADE = "fade";
const CLASS_NAME_HIDE = "hide";
const CLASS_NAME_SHOW = "show";
const CLASS_NAME_SHOWING = "showing";
const DefaultType = {
  animation: "boolean",
  autohide: "boolean",
  delay: "number"
};
const Default = {
  animation: true,
  autohide: true,
  delay: 5e3
};
class Toast extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._config = this._getConfig(config);
    this._timeout = null;
    this._hasMouseInteraction = false;
    this._hasKeyboardInteraction = false;
    this._setListeners();
  }
  static get DefaultType() {
    return DefaultType;
  }
  static get Default() {
    return Default;
  }
  static get NAME() {
    return NAME;
  }
  show() {
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);
    if (showEvent.defaultPrevented) {
      return;
    }
    this._clearTimeout();
    if (this._config.animation) {
      this._element.classList.add(CLASS_NAME_FADE);
    }
    const complete = () => {
      this._element.classList.remove(CLASS_NAME_SHOWING);
      EventHandler.trigger(this._element, EVENT_SHOWN);
      this._maybeScheduleHide();
    };
    this._element.classList.remove(CLASS_NAME_HIDE);
    reflow(this._element);
    this._element.classList.add(CLASS_NAME_SHOW);
    this._element.classList.add(CLASS_NAME_SHOWING);
    this._queueCallback(complete, this._element, this._config.animation);
  }
  hide() {
    if (!this._element.classList.contains(CLASS_NAME_SHOW)) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
    if (hideEvent.defaultPrevented) {
      return;
    }
    const complete = () => {
      this._element.classList.add(CLASS_NAME_HIDE);
      this._element.classList.remove(CLASS_NAME_SHOWING);
      this._element.classList.remove(CLASS_NAME_SHOW);
      EventHandler.trigger(this._element, EVENT_HIDDEN);
    };
    this._element.classList.add(CLASS_NAME_SHOWING);
    this._queueCallback(complete, this._element, this._config.animation);
  }
  dispose() {
    this._clearTimeout();
    if (this._element.classList.contains(CLASS_NAME_SHOW)) {
      this._element.classList.remove(CLASS_NAME_SHOW);
    }
    super.dispose();
  }
  _getConfig(config) {
    config = __spreadValues(__spreadValues(__spreadValues({}, Default), Manipulator.getDataAttributes(this._element)), typeof config === "object" && config ? config : {});
    typeCheckConfig(NAME, config, this.constructor.DefaultType);
    return config;
  }
  _maybeScheduleHide() {
    if (!this._config.autohide) {
      return;
    }
    if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
      return;
    }
    this._timeout = setTimeout(() => {
      this.hide();
    }, this._config.delay);
  }
  _onInteraction(event, isInteracting) {
    switch (event.type) {
      case "mouseover":
      case "mouseout":
        this._hasMouseInteraction = isInteracting;
        break;
      case "focusin":
      case "focusout":
        this._hasKeyboardInteraction = isInteracting;
        break;
    }
    if (isInteracting) {
      this._clearTimeout();
      return;
    }
    const nextElement = event.relatedTarget;
    if (this._element === nextElement || this._element.contains(nextElement)) {
      return;
    }
    this._maybeScheduleHide();
  }
  _setListeners() {
    EventHandler.on(this._element, EVENT_MOUSEOVER, (event) => this._onInteraction(event, true));
    EventHandler.on(this._element, EVENT_MOUSEOUT, (event) => this._onInteraction(event, false));
    EventHandler.on(this._element, EVENT_FOCUSIN, (event) => this._onInteraction(event, true));
    EventHandler.on(this._element, EVENT_FOCUSOUT, (event) => this._onInteraction(event, false));
  }
  _clearTimeout() {
    clearTimeout(this._timeout);
    this._timeout = null;
  }
  static jQueryInterface(config) {
    return this.each(function() {
      const data = Toast.getOrCreateInstance(this, config);
      if (typeof config === "string") {
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](this);
      }
    });
  }
}
enableDismissTrigger(Toast);
defineJQueryPlugin(Toast);
function useEventListener(element, event, callback) {
  onMounted(() => {
    var _a;
    (_a = element == null ? void 0 : element.value) == null ? void 0 : _a.addEventListener(event, callback);
  });
  onBeforeUnmount(() => {
    var _a;
    (_a = element == null ? void 0 : element.value) == null ? void 0 : _a.removeEventListener(event, callback);
  });
}
const _sfc_main$$ = defineComponent({
  name: "BCollapse",
  props: {
    modelValue: { type: Boolean, default: false },
    parent: { type: String, default: "" },
    toggle: { type: Boolean, default: false },
    visible: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "show", "shown", "hide", "hidden"],
  setup(props, { emit }) {
    const element = ref();
    const instance = ref();
    const classes = computed(() => ({
      show: props.visible
    }));
    useEventListener(element, "show.bs.collapse", () => {
      emit("show");
      emit("update:modelValue", true);
    });
    useEventListener(element, "hide.bs.collapse", () => {
      emit("show");
      emit("update:modelValue", true);
    });
    useEventListener(element, "shown.bs.collapse", () => emit("shown"));
    useEventListener(element, "hidden.bs.collapse", () => emit("hidden"));
    onMounted(() => {
      if (props.visible) {
        emit("update:modelValue", props.visible);
      }
      instance.value = new Collapse(element.value, {
        parent: props.parent,
        toggle: props.toggle
      });
    });
    watch(() => props.modelValue, (value) => {
      var _a, _b;
      if (value) {
        (_a = instance.value) == null ? void 0 : _a.show();
      } else {
        (_b = instance.value) == null ? void 0 : _b.hide();
      }
    });
    return {
      element,
      classes
    };
  }
});
const _hoisted_1$F = ["data-bs-parent"];
function _sfc_render$Z(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    ref: "element",
    class: normalizeClass(["collapse", _ctx.classes]),
    "data-bs-parent": _ctx.parent || null
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 10, _hoisted_1$F);
}
var BCollapse = /* @__PURE__ */ _export_sfc(_sfc_main$$, [["render", _sfc_render$Z]]);
function resolveToggleType(el) {
  if (el.classList.contains("offcanvas")) {
    return "offcanvas";
  }
  if (el.classList.contains("collapse")) {
    return "collapse";
  }
  throw Error("Couldn't resolve toggle type");
}
var BToggle = {
  mounted(el, binding) {
    if (typeof binding.arg === "string") {
      const target = document.getElementById(binding.arg);
      let targetAttr = "data-bs-target";
      if (target) {
        el.setAttribute("data-bs-toggle", resolveToggleType(target));
        if (el.tagName === "a") {
          targetAttr = "href";
        }
        el.setAttribute(targetAttr, `#${binding.arg}`);
      }
    }
  }
};
const _sfc_main$_ = defineComponent({
  name: "BAccordionItem",
  components: {
    BCollapse
  },
  directives: {
    BToggle
  },
  props: {
    title: { type: String },
    id: { type: String },
    visible: { type: Boolean, default: false }
  },
  setup(props) {
    const computedId = useId(props.id, "accordion_item");
    const parent = inject(injectionKey$2, "");
    return {
      parent,
      computedId
    };
  }
});
const _hoisted_1$E = { class: "accordion-item" };
const _hoisted_2$j = ["id"];
const _hoisted_3$8 = ["aria-expanded", "aria-controls"];
const _hoisted_4$4 = { class: "accordion-body" };
function _sfc_render$Y(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_collapse = resolveComponent("b-collapse");
  const _directive_b_toggle = resolveDirective("b-toggle");
  return openBlock(), createElementBlock("div", _hoisted_1$E, [
    createElementVNode("h2", {
      id: `${_ctx.computedId}heading`,
      class: "accordion-header"
    }, [
      withDirectives(createElementVNode("button", {
        class: normalizeClass(["accordion-button", { collapsed: !_ctx.visible }]),
        type: "button",
        "aria-expanded": _ctx.visible ? "true" : "false",
        "aria-controls": _ctx.computedId
      }, [
        renderSlot(_ctx.$slots, "title", {}, () => [
          createTextVNode(toDisplayString(_ctx.title), 1)
        ])
      ], 10, _hoisted_3$8), [
        [_directive_b_toggle, void 0, _ctx.computedId]
      ])
    ], 8, _hoisted_2$j),
    createVNode(_component_b_collapse, {
      id: _ctx.computedId,
      class: "accordion-collapse",
      visible: _ctx.visible,
      parent: _ctx.parent,
      "aria-labelledby": `heading${_ctx.computedId}`
    }, {
      default: withCtx(() => [
        createElementVNode("div", _hoisted_4$4, [
          renderSlot(_ctx.$slots, "default")
        ])
      ]),
      _: 3
    }, 8, ["id", "visible", "parent", "aria-labelledby"])
  ]);
}
var BAccordionItem = /* @__PURE__ */ _export_sfc(_sfc_main$_, [["render", _sfc_render$Y]]);
const toInteger = (value, defaultValue = NaN) => {
  return Number.isInteger(value) ? value : defaultValue;
};
const toFloat = (value, defaultValue = NaN) => {
  return !Number.isInteger(value) ? value : defaultValue;
};
const _sfc_main$Z = defineComponent({
  name: "BAlert",
  props: {
    dismissLabel: { type: String, default: "Close" },
    dismissible: { type: Boolean, default: false },
    fade: { type: Boolean, default: false },
    modelValue: { type: [Boolean, Number], default: false },
    show: { type: Boolean, default: false },
    variant: { type: String, default: "info" }
  },
  emits: ["dismissed", "dismiss-count-down", "update:modelValue"],
  setup(props, { emit }) {
    const element = ref();
    const instance = ref();
    const classes = computed(() => ({
      [`alert-${props.variant}`]: props.variant,
      "show": props.modelValue,
      "alert-dismissible": props.dismissible,
      "fade": props.modelValue
    }));
    let _countDownTimeout = 0;
    const parseCountDown = (value) => {
      if (typeof value === "boolean") {
        return 0;
      }
      const numberValue = toInteger(value, 0);
      return numberValue > 0 ? numberValue : 0;
    };
    const clearCountDownInterval = () => {
      if (_countDownTimeout === void 0)
        return;
      clearTimeout(_countDownTimeout);
      _countDownTimeout = void 0;
    };
    const countDown = ref(parseCountDown(props.modelValue));
    const isAlertVisible = computed(() => props.modelValue || props.show);
    onBeforeUnmount(() => {
      var _a;
      clearCountDownInterval();
      (_a = instance.value) == null ? void 0 : _a.dispose();
      instance.value = void 0;
    });
    const parsedModelValue = computed(() => {
      if (props.modelValue === true) {
        return true;
      }
      if (props.modelValue === false)
        return false;
      if (toInteger(props.modelValue, 0) < 1) {
        return false;
      }
      return !!props.modelValue;
    });
    const handleShowAndModelChanged = () => {
      countDown.value = parseCountDown(props.modelValue);
      if ((parsedModelValue.value || props.show) && !instance.value)
        instance.value = new Alert(element.value);
    };
    const dismissClicked = () => {
      if (typeof props.modelValue === "boolean") {
        emit("update:modelValue", false);
      } else {
        emit("update:modelValue", 0);
      }
      emit("dismissed");
    };
    watch(() => props.modelValue, handleShowAndModelChanged);
    watch(() => props.show, handleShowAndModelChanged);
    watch(countDown, (newValue) => {
      clearCountDownInterval();
      if (typeof props.modelValue === "boolean")
        return;
      emit("dismiss-count-down", newValue);
      if (newValue === 0 && props.modelValue > 0)
        emit("dismissed");
      if (props.modelValue !== newValue)
        emit("update:modelValue", newValue);
      if (newValue > 0) {
        _countDownTimeout = setTimeout(() => {
          countDown.value--;
        }, 1e3);
      }
    });
    return {
      dismissClicked,
      isAlertVisible,
      element,
      classes
    };
  }
});
const _hoisted_1$D = ["aria-label"];
function _sfc_render$X(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.isAlertVisible ? (openBlock(), createElementBlock("div", {
    key: 0,
    ref: "element",
    class: normalizeClass(["alert", _ctx.classes]),
    role: "alert"
  }, [
    renderSlot(_ctx.$slots, "default"),
    _ctx.dismissible ? (openBlock(), createElementBlock("button", {
      key: 0,
      type: "button",
      class: "btn-close",
      "data-bs-dismiss": "alert",
      "aria-label": _ctx.dismissLabel,
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.dismissClicked && _ctx.dismissClicked(...args))
    }, null, 8, _hoisted_1$D)) : createCommentVNode("", true)
  ], 2)) : createCommentVNode("", true);
}
var BAlert = /* @__PURE__ */ _export_sfc(_sfc_main$Z, [["render", _sfc_render$X]]);
const isEmptySlot = (slot, data) => !slot || slot(data).filter((vnode) => vnode.type !== Comment).length < 1;
const RX_NUMBER = /^[0-9]*\.?[0-9]+$/;
const isObject = (obj) => obj !== null && typeof obj === "object";
const isString = (value) => typeof value === "string";
const isUndefined = (value) => value === void 0;
const isNull = (value) => value === null;
const isUndefinedOrNull = (value) => isUndefined(value) || isNull(value);
const isNumeric = (value) => RX_NUMBER.test(String(value));
const isNumber = (value) => typeof value === "number";
const _sfc_main$Y = defineComponent({
  name: "BAvatar",
  props: {
    alt: { type: String, default: "avatar" },
    ariaLabel: { type: String, required: false },
    badge: { type: [Boolean, String], default: false },
    badgeLeft: { type: Boolean, default: false },
    badgeOffset: { type: String, required: false },
    badgeTop: { type: Boolean, default: false },
    badgeVariant: { type: String, default: "primary" },
    button: { type: Boolean, default: false },
    buttonType: { type: String, default: "button" },
    disabled: { type: Boolean, default: false },
    icon: { type: String, required: false },
    iconVariant: { type: String, default: null },
    rounded: { type: [Boolean, String], default: "circle" },
    size: { type: String },
    square: { type: Boolean, default: false },
    src: { type: String, required: false },
    text: { type: String, required: false },
    textVariant: { type: String, default: void 0 },
    variant: { type: String, default: "secondary" }
  },
  emits: ["click", "img-error"],
  setup(props, { emit, slots }) {
    const SIZES = ["sm", null, "lg"];
    const FONT_SIZE_SCALE = 0.4;
    const BADGE_FONT_SIZE_SCALE = FONT_SIZE_SCALE * 0.7;
    const computeSize = (value) => {
      const calcValue = isString(value) && isNumeric(value) ? toFloat(value, 0) : value;
      return isNumber(calcValue) ? `${calcValue}px` : calcValue || null;
    };
    const computeContrastVariant = (colorVariant) => {
      if (colorVariant === "light")
        return "dark";
      if (colorVariant === "warning")
        return "dark";
      return "light";
    };
    const hasDefaultSlot = computed(() => !isEmptySlot(slots.default));
    const hasBadgeSlot = computed(() => !isEmptySlot(slots.badge));
    const showBadge = computed(() => props.badge || props.badge === "" || hasBadgeSlot.value);
    const computedSize = computed(() => computeSize(props.size));
    const attrs = computed(() => ({
      "aria-label": props.ariaLabel || null,
      "disabled": props.disabled || null
    }));
    const badgeClasses = computed(() => ({
      [`bg-${props.badgeVariant}`]: props.badgeVariant
    }));
    const badgeText = computed(() => props.badge === true ? "" : props.badge);
    const badgeTextClasses = computed(() => {
      const textVariant = computeContrastVariant(props.badgeVariant);
      return `text-${textVariant}`;
    });
    const classes = computed(() => ({
      [`b-avatar-${props.size}`]: props.size && SIZES.indexOf(props.size || null) !== -1,
      [`bg-${props.variant}`]: props.variant,
      [`badge`]: !props.button && props.variant && hasDefaultSlot.value,
      rounded: props.rounded === "" || props.rounded === true,
      [`rounded-circle`]: !props.square && props.rounded === "circle",
      [`rounded-0`]: props.square || props.rounded === "0",
      [`rounded-1`]: !props.square && props.rounded === "sm",
      [`rounded-3`]: !props.square && props.rounded === "lg",
      [`rounded-top`]: !props.square && props.rounded === "top",
      [`rounded-bottom`]: !props.square && props.rounded === "bottom",
      [`rounded-start`]: !props.square && props.rounded === "left",
      [`rounded-end`]: !props.square && props.rounded === "right",
      btn: props.button,
      [`btn-${props.variant}`]: props.button ? props.variant : null
    }));
    const textClasses = computed(() => {
      const textVariant = props.textVariant || computeContrastVariant(props.variant);
      return `text-${textVariant}`;
    });
    const iconName = computed(() => {
      if (props.icon)
        return props.icon;
      if (!props.text && !props.src)
        return "person-fill";
      return void 0;
    });
    const computedIconVariant = computed(() => props.iconVariant || computeContrastVariant(props.variant));
    const badgeStyle = computed(() => {
      const offset2 = props.badgeOffset || "0px";
      const fontSize = SIZES.indexOf(computedSize.value || null) === -1 ? `calc(${computedSize.value} * ${BADGE_FONT_SIZE_SCALE})` : "";
      return {
        fontSize: fontSize || "",
        top: props.badgeTop ? offset2 : "",
        bottom: props.badgeTop ? "" : offset2,
        left: props.badgeLeft ? offset2 : "",
        right: props.badgeLeft ? "" : offset2
      };
    });
    const fontStyle = computed(() => {
      const fontSize = SIZES.indexOf(computedSize.value || null) === -1 ? `calc(${computedSize.value} * ${FONT_SIZE_SCALE})` : null;
      return fontSize ? { fontSize } : {};
    });
    const marginStyle = computed(() => {
      const overlapScale = 0;
      const value = computedSize.value ? `calc(${computedSize.value} * -${overlapScale})` : null;
      return value ? { marginLeft: value, marginRight: value } : {};
    });
    const tag = computed(() => props.button ? props.buttonType : "span");
    const tagStyle = computed(() => __spreadProps(__spreadValues({}, marginStyle.value), {
      width: computedSize.value,
      height: computedSize.value
    }));
    const clicked = function(e) {
      if (!props.disabled && props.button)
        emit("click", e);
    };
    const onImgError = (e) => emit("img-error", e);
    return {
      attrs,
      badgeClasses,
      badgeStyle,
      badgeText,
      badgeTextClasses,
      classes,
      clicked,
      computedIconVariant,
      fontStyle,
      hasBadgeSlot,
      hasDefaultSlot,
      iconName,
      onImgError,
      showBadge,
      tag,
      tagStyle,
      textClasses
    };
  }
});
const _hoisted_1$C = {
  key: 0,
  class: "b-avatar-custom"
};
const _hoisted_2$i = {
  key: 1,
  class: "b-avatar-img"
};
const _hoisted_3$7 = ["src", "alt"];
function _sfc_render$W(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), mergeProps({
    class: ["b-avatar", _ctx.classes],
    style: _ctx.tagStyle
  }, _ctx.attrs, { onClick: _ctx.clicked }), {
    default: withCtx(() => [
      _ctx.hasDefaultSlot ? (openBlock(), createElementBlock("span", _hoisted_1$C, [
        renderSlot(_ctx.$slots, "default")
      ])) : _ctx.src ? (openBlock(), createElementBlock("span", _hoisted_2$i, [
        createElementVNode("img", {
          src: _ctx.src,
          alt: _ctx.alt,
          onError: _cache[0] || (_cache[0] = (...args) => _ctx.onImgError && _ctx.onImgError(...args))
        }, null, 40, _hoisted_3$7)
      ])) : _ctx.icon ? (openBlock(), createBlock(_component_b_icon, {
        key: 2,
        icon: _ctx.iconName,
        "aria-hidden": "true",
        alt: _ctx.alt,
        variant: _ctx.computedIconVariant,
        size: _ctx.size
      }, null, 8, ["icon", "alt", "variant", "size"])) : _ctx.text ? (openBlock(), createElementBlock("span", {
        key: 3,
        class: normalizeClass(["b-avatar-text", _ctx.textClasses]),
        style: normalizeStyle(_ctx.fontStyle)
      }, toDisplayString(_ctx.text), 7)) : (openBlock(), createBlock(_component_b_icon, {
        key: 4,
        icon: _ctx.iconName,
        variant: _ctx.computedIconVariant,
        "aria-hidden": "true",
        alt: _ctx.alt
      }, null, 8, ["icon", "variant", "alt"])),
      _ctx.showBadge ? (openBlock(), createElementBlock("span", {
        key: 5,
        class: normalizeClass(["b-avatar-badge", _ctx.badgeClasses]),
        style: normalizeStyle(_ctx.badgeStyle)
      }, [
        _ctx.hasBadgeSlot ? renderSlot(_ctx.$slots, "badge", { key: 0 }) : (openBlock(), createElementBlock("span", {
          key: 1,
          class: normalizeClass(_ctx.badgeTextClasses)
        }, toDisplayString(_ctx.badgeText), 3))
      ], 6)) : createCommentVNode("", true)
    ]),
    _: 3
  }, 16, ["class", "style", "onClick"]);
}
var BAvatar = /* @__PURE__ */ _export_sfc(_sfc_main$Y, [["render", _sfc_render$W]]);
const _sfc_main$X = defineComponent({
  name: "BBadge",
  props: {
    textIndicator: { type: Boolean, default: false },
    dotIndicator: { type: Boolean, default: false },
    pill: { type: Boolean, default: false },
    tag: { type: String, default: "span" },
    variant: { type: String, default: "secondary" }
  },
  setup(props) {
    const classes = computed(() => ({
      [`bg-${props.variant}`]: props.variant,
      "text-dark": ["warning", "info", "light"].includes(props.variant),
      "rounded-pill": props.pill,
      "position-absolute top-0 start-100 translate-middle": props.textIndicator || props.dotIndicator,
      "p-2 border border-light rounded-circle": props.dotIndicator
    }));
    return {
      classes
    };
  }
});
function _sfc_render$V(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    class: normalizeClass(["badge", _ctx.classes])
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]);
}
var BBadge = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["render", _sfc_render$V]]);
const BREADCRUMB_SYMBOL = Symbol();
const BREADCRUMB_OBJECT = {
  items: reactive([]),
  reset() {
    this.items = reactive([]);
  }
};
function createBreadcrumb(app) {
  app.provide(BREADCRUMB_SYMBOL, BREADCRUMB_OBJECT);
}
function useBreadcrumb() {
  const context = inject(BREADCRUMB_SYMBOL);
  if (!context) {
    return BREADCRUMB_OBJECT;
  }
  return context;
}
const _sfc_main$W = defineComponent({
  name: "BBreadcrumbItem",
  props: {
    active: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    href: { type: String, required: false },
    target: { type: String, default: "_self" },
    text: { type: String, required: false },
    to: { type: String, required: false }
  },
  emits: ["click"],
  setup(props, { emit }) {
    const classes = computed(() => ({
      active: props.active,
      disabled: props.disabled
    }));
    const clicked = function(e) {
      if (!props.disabled)
        emit("click", e);
    };
    return {
      classes,
      clicked
    };
  }
});
const _hoisted_1$B = ["href", "target"];
function _sfc_render$U(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("li", {
    class: normalizeClass(["breadcrumb-item", _ctx.classes]),
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.clicked && _ctx.clicked(...args))
  }, [
    _ctx.href ? (openBlock(), createElementBlock("a", {
      key: 0,
      href: _ctx.href,
      target: _ctx.target
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 8, _hoisted_1$B)) : renderSlot(_ctx.$slots, "default", { key: 1 })
  ], 2);
}
var BBreadcrumbItem = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["render", _sfc_render$U]]);
const _sfc_main$V = defineComponent({
  name: "BBreadcrumb",
  components: {
    BBreadcrumbItem
  },
  props: {
    items: { type: Array }
  },
  setup(props) {
    const breadcrumb = useBreadcrumb();
    const computedItems = computed(() => {
      const localItems = props.items || (breadcrumb == null ? void 0 : breadcrumb.items) || [];
      let activeDefined = false;
      const items = localItems.map((item, idx) => {
        if (typeof item === "string") {
          item = { text: item };
          if (idx < localItems.length - 1)
            item.href = "#";
        }
        if (item.active)
          activeDefined = true;
        if (!item.active && !activeDefined) {
          item.active = idx + 1 === localItems.length;
        }
        return item;
      });
      return items;
    });
    return {
      computedItems
    };
  }
});
const _hoisted_1$A = { "aria-label": "breadcrumb" };
const _hoisted_2$h = { class: "breadcrumb" };
function _sfc_render$T(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_breadcrumb_item = resolveComponent("b-breadcrumb-item");
  return openBlock(), createElementBlock("nav", _hoisted_1$A, [
    createElementVNode("ol", _hoisted_2$h, [
      renderSlot(_ctx.$slots, "prepend"),
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.computedItems, (item, i) => {
        return openBlock(), createBlock(_component_b_breadcrumb_item, mergeProps({ key: i }, item), {
          default: withCtx(() => [
            createTextVNode(toDisplayString(item.text), 1)
          ]),
          _: 2
        }, 1040);
      }), 128)),
      renderSlot(_ctx.$slots, "default"),
      renderSlot(_ctx.$slots, "append")
    ])
  ]);
}
var BBreadcrumb = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["render", _sfc_render$T]]);
const _sfc_main$U = defineComponent({
  name: "BButton",
  props: {
    active: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    href: { type: String },
    pill: { type: Boolean, default: false },
    pressed: { type: Boolean, default: null },
    rel: { type: String, default: null },
    size: { type: String },
    squared: { type: Boolean, default: false },
    tag: { type: String, default: "button" },
    target: { type: String, default: "_self" },
    type: { type: String, default: "button" },
    variant: { type: String, default: "secondary" }
  },
  emits: ["update:pressed"],
  setup(props, { emit }) {
    const isToggle = props.pressed !== null;
    const isButton = props.tag === "button" && !props.href;
    const hashLink = props.href === "#";
    const nonStandardTag = props.href ? false : !isButton;
    const classes = computed(() => ({
      [`btn-${props.variant}`]: props.variant,
      [`btn-${props.size}`]: props.size,
      "active": props.active || props.pressed,
      "rounded-pill": props.pill,
      "rounded-0": props.squared,
      "disabled": props.disabled
    }));
    const attrs = computed(() => ({
      "aria-disabled": nonStandardTag ? String(props.disabled) : null,
      "aria-pressed": isToggle ? String(props.pressed) : null,
      "autocomplete": isToggle ? "off" : null,
      "disabled": isButton ? props.disabled : null,
      "href": props.href,
      "rel": props.href ? props.rel : null,
      "role": nonStandardTag || hashLink ? "button" : null,
      "target": props.href ? props.target : null,
      "type": isButton ? props.type : null
    }));
    const clicked = function(e) {
      if (props.disabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      if (isToggle) {
        emit("update:pressed", !props.pressed);
      }
    };
    const computedTag = computed(() => props.href ? "a" : props.tag);
    return {
      classes,
      attrs,
      computedTag,
      clicked
    };
  }
});
function _sfc_render$S(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.computedTag), mergeProps({
    class: ["btn", _ctx.classes]
  }, _ctx.attrs, { onClick: _ctx.clicked }), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16, ["class", "onClick"]);
}
var BButton = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["render", _sfc_render$S]]);
const _sfc_main$T = defineComponent({
  name: "BButtonGroup",
  props: {
    ariaRole: { type: String, default: "group" },
    size: { type: String },
    tag: { type: String, default: "div" },
    vertical: { type: Boolean, default: false }
  },
  setup(props) {
    const classes = computed(() => ({
      "btn-group": !props.vertical,
      "btn-group-vertical": props.vertical,
      [`btn-group-${props.size}`]: props.size
    }));
    return {
      classes
    };
  }
});
function _sfc_render$R(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    class: normalizeClass(_ctx.classes),
    role: "group",
    "aria-role": _ctx.ariaRole
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class", "aria-role"]);
}
var BButtonGroup = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["render", _sfc_render$R]]);
const _sfc_main$S = defineComponent({
  name: "BButtonToolbar",
  props: {
    ariaRole: { type: String, default: "group" },
    justify: { type: Boolean, default: false }
  },
  setup(props) {
    const classes = computed(() => ({
      "justify-content-between": props.justify
    }));
    return {
      classes
    };
  }
});
const _hoisted_1$z = ["aria-label"];
function _sfc_render$Q(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([_ctx.classes, "btn-toolbar"]),
    role: "toolbar",
    "aria-label": _ctx.ariaRole
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 10, _hoisted_1$z);
}
var BButtonToolbar = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["render", _sfc_render$Q]]);
const _sfc_main$R = defineComponent({
  name: "BCard",
  props: {
    align: { type: String },
    bgVariant: { type: String },
    bodyBgVariant: { type: String },
    bodyBorderVariant: { type: String },
    bodyClass: { type: [Array, Object, String] },
    bodyTag: { type: String, default: "div" },
    bodyTextVariant: { type: String },
    borderVariant: { type: String },
    footer: { type: String },
    footerBgVariant: { type: String },
    footerBorderVariant: { type: String },
    footerClass: { type: [Array, Object, String] },
    footerHtml: { type: String, default: "" },
    footerTag: { type: String, default: "div" },
    footerTextVariant: { type: String },
    header: { type: String },
    headerBgVariant: { type: String },
    headerBorderVariant: { type: String },
    headerClass: { type: [Array, Object, String] },
    headerHtml: { type: String, default: "" },
    headerTag: { type: String, default: "div" },
    headerTextVariant: { type: String },
    imgAlt: { type: String },
    imgBottom: { type: Boolean, default: false },
    imgEnd: { type: Boolean, default: false },
    imgHeight: { type: [String, Number] },
    imgLeft: { type: Boolean, default: false },
    imgRight: { type: Boolean, default: false },
    imgSrc: { type: String },
    imgStart: { type: Boolean, default: false },
    imgTop: { type: Boolean, default: false },
    imgWidth: { type: [String, Number] },
    noBody: { type: Boolean, default: false },
    overlay: { type: Boolean, default: false },
    subTitle: { type: String },
    subTitleTag: { type: String, default: "h6" },
    subTitleTextVariant: { type: String, default: "muted" },
    tag: { type: String, default: "div" },
    textVariant: { type: String },
    title: { type: String },
    titleTag: { type: String, default: "h4" }
  },
  setup(props) {
    const classes = computed(() => ({
      [`text-${props.align}`]: props.align,
      [`text-${props.textVariant}`]: props.textVariant,
      [`bg-${props.bgVariant}`]: props.bgVariant,
      [`border-${props.borderVariant}`]: props.borderVariant,
      "flex-row": props.imgLeft || props.imgStart,
      "flex-row-reverse": props.imgEnd || props.imgRight
    }));
    const bodyClasses = computed(() => ({
      "card-body": !props.noBody,
      "card-img-overlay": props.overlay,
      [`bg-${props.bodyBgVariant}`]: props.bodyBgVariant,
      [`border-${props.bodyBorderVariant}`]: props.bodyBorderVariant,
      [`text-${props.bodyTextVariant}`]: props.bodyTextVariant
    }));
    const footerClasses = computed(() => ({
      [`bg-${props.footerBgVariant}`]: props.footerBgVariant,
      [`border-${props.footerBorderVariant}`]: props.footerBorderVariant,
      [`text-${props.footerTextVariant}`]: props.footerTextVariant
    }));
    const headerClasses = computed(() => ({
      [`bg-${props.headerBgVariant}`]: props.headerBgVariant,
      [`border-${props.headerBorderVariant}`]: props.headerBorderVariant,
      [`text-${props.headerTextVariant}`]: props.headerTextVariant
    }));
    const imgClasses = computed(() => ({
      "card-img": !props.imgEnd && !props.imgRight && !props.imgStart && !props.imgLeft && !props.imgTop && !props.imgTop,
      "card-img-right": props.imgEnd || props.imgRight,
      "card-img-left": props.imgStart || props.imgLeft,
      "card-img-top": props.imgTop,
      "card-img-bottom": props.imgBottom
    }));
    const imgAttr = computed(() => ({
      src: props.imgSrc,
      alt: props.imgAlt,
      height: props.imgHeight,
      width: props.imgWidth
    }));
    const subTitleClasses = computed(() => ({
      [`text-${props.subTitleTextVariant}`]: props.subTitleTextVariant
    }));
    return {
      classes,
      bodyClasses,
      footerClasses,
      headerClasses,
      imgClasses,
      imgAttr,
      subTitleClasses
    };
  }
});
const _hoisted_1$y = ["innerHTML"];
const _hoisted_2$g = ["innerHTML"];
function _sfc_render$P(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    class: normalizeClass(["card", _ctx.classes])
  }, {
    default: withCtx(() => [
      _ctx.imgSrc && !_ctx.imgBottom ? (openBlock(), createElementBlock("img", mergeProps({ key: 0 }, _ctx.imgAttr, { class: _ctx.imgClasses }), null, 16)) : createCommentVNode("", true),
      _ctx.header || _ctx.$slots.header || _ctx.headerHtml ? (openBlock(), createElementBlock("div", {
        key: 1,
        class: normalizeClass(["card-header", [_ctx.headerClass, _ctx.headerClasses]])
      }, [
        !!_ctx.headerHtml ? (openBlock(), createElementBlock("div", {
          key: 0,
          innerHTML: _ctx.headerHtml
        }, null, 8, _hoisted_1$y)) : renderSlot(_ctx.$slots, "header", { key: 1 }, () => [
          createTextVNode(toDisplayString(_ctx.header), 1)
        ])
      ], 2)) : createCommentVNode("", true),
      (openBlock(), createBlock(resolveDynamicComponent(_ctx.bodyTag), {
        class: normalizeClass([_ctx.bodyClass, _ctx.bodyClasses])
      }, {
        default: withCtx(() => [
          _ctx.title && !_ctx.noBody ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.titleTag), {
            key: 0,
            class: "card-title"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.title), 1)
            ]),
            _: 1
          })) : createCommentVNode("", true),
          _ctx.subTitle && !_ctx.noBody ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.subTitleTag), {
            key: 1,
            class: normalizeClass(["card-subtitle mb-2", _ctx.subTitleClasses])
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.subTitle), 1)
            ]),
            _: 1
          }, 8, ["class"])) : createCommentVNode("", true),
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["class"])),
      _ctx.footer || _ctx.$slots.footer || _ctx.footerHtml ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.footerTag), {
        key: 2,
        class: normalizeClass(["card-footer", [_ctx.footerClass, _ctx.footerClasses]])
      }, {
        default: withCtx(() => [
          !!_ctx.footerHtml ? (openBlock(), createElementBlock("div", {
            key: 0,
            innerHTML: _ctx.footerHtml
          }, null, 8, _hoisted_2$g)) : renderSlot(_ctx.$slots, "footer", { key: 1 }, () => [
            createTextVNode(toDisplayString(_ctx.footer), 1)
          ])
        ]),
        _: 3
      }, 8, ["class"])) : createCommentVNode("", true),
      _ctx.imgSrc && _ctx.imgBottom ? (openBlock(), createElementBlock("img", mergeProps({ key: 3 }, _ctx.imgAttr, { class: _ctx.imgClasses }), null, 16)) : createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["class"]);
}
var BCard = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["render", _sfc_render$P]]);
const _sfc_main$Q = defineComponent({
  name: "BCardBody",
  props: {
    bodyBgVariant: { type: String },
    bodyBorderVariant: { type: String },
    bodyClass: { type: [Array, Object, String] },
    bodyTag: { type: String, default: "div" },
    bodyTextVariant: { type: String },
    subTitle: { type: String },
    subTitleTag: { type: String, default: "h4" },
    subTitleTextVariant: { type: String },
    title: { type: String },
    titleTag: { type: String, default: "h4" }
  },
  setup(props) {
    const classes = computed(() => ({
      [`text-${props.bodyTextVariant}`]: props.bodyTextVariant,
      [`bg-${props.bodyBgVariant}`]: props.bodyBgVariant,
      [`border-${props.bodyBorderVariant}`]: props.bodyBorderVariant
    }));
    return {
      classes
    };
  }
});
function _sfc_render$O(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_card_title = resolveComponent("b-card-title");
  const _component_b_card_sub_title = resolveComponent("b-card-sub-title");
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.bodyTag), {
    class: normalizeClass(["card-body", _ctx.classes])
  }, {
    default: withCtx(() => [
      _ctx.title ? (openBlock(), createBlock(_component_b_card_title, {
        key: 0,
        "title-tag": _ctx.titleTag,
        title: _ctx.title
      }, null, 8, ["title-tag", "title"])) : createCommentVNode("", true),
      _ctx.subTitle ? (openBlock(), createBlock(_component_b_card_sub_title, {
        key: 1,
        "sub-title-tag": _ctx.subTitleTag,
        "sub-title": _ctx.subTitle,
        "sub-title-text-variant": _ctx.subTitleTextVariant
      }, null, 8, ["sub-title-tag", "sub-title", "sub-title-text-variant"])) : createCommentVNode("", true),
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]);
}
var BCardBody = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["render", _sfc_render$O]]);
const _sfc_main$P = defineComponent({
  name: "BCardfooter",
  props: {
    footer: { type: String },
    footerBgVariant: { type: String },
    footerBorderVariant: { type: String },
    footerClass: { type: [Array, Object, String] },
    footerHtml: { type: String },
    footerTag: { type: String, default: "div" },
    footerTextVariant: { type: String }
  },
  setup(props) {
    const classes = computed(() => ({
      [`text-${props.footerTextVariant}`]: props.footerTextVariant,
      [`bg-${props.footerBgVariant}`]: props.footerBgVariant,
      [`border-${props.footerBorderVariant}`]: props.footerBorderVariant
    }));
    return {
      classes
    };
  }
});
const _hoisted_1$x = ["innerHTML"];
function _sfc_render$N(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.footerTag), {
    class: normalizeClass(["card-footer", [_ctx.footerClass, _ctx.classes]])
  }, {
    default: withCtx(() => [
      !!_ctx.footerHtml ? (openBlock(), createElementBlock("div", {
        key: 0,
        innerHTML: _ctx.footerHtml
      }, null, 8, _hoisted_1$x)) : renderSlot(_ctx.$slots, "default", { key: 1 }, () => [
        createTextVNode(toDisplayString(_ctx.footer), 1)
      ])
    ]),
    _: 3
  }, 8, ["class"]);
}
var BCardFooter = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["render", _sfc_render$N]]);
const _sfc_main$O = {};
const _hoisted_1$w = { class: "card-group" };
function _sfc_render$M(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$w, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
var BCardGroup = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["render", _sfc_render$M]]);
const _sfc_main$N = defineComponent({
  name: "BCardHeader",
  props: {
    header: { type: String },
    headerBgVariant: { type: String },
    headerBorderVariant: { type: String },
    headerClass: { type: [Array, Object, String] },
    headerHtml: { type: String },
    headerTag: { type: String, default: "div" },
    headerTextVariant: { type: String }
  },
  setup(props) {
    const classes = computed(() => ({
      [`text-${props.headerTextVariant}`]: props.headerTextVariant,
      [`bg-${props.headerBgVariant}`]: props.headerBgVariant,
      [`border-${props.headerBorderVariant}`]: props.headerBorderVariant
    }));
    return {
      classes
    };
  }
});
const _hoisted_1$v = ["innerHTML"];
function _sfc_render$L(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.headerTag), {
    class: normalizeClass(["card-header", [_ctx.headerClass, _ctx.classes]])
  }, {
    default: withCtx(() => [
      !!_ctx.headerHtml ? (openBlock(), createElementBlock("div", {
        key: 0,
        innerHTML: _ctx.headerHtml
      }, null, 8, _hoisted_1$v)) : renderSlot(_ctx.$slots, "default", { key: 1 }, () => [
        createTextVNode(toDisplayString(_ctx.header), 1)
      ])
    ]),
    _: 3
  }, 8, ["class"]);
}
var BCardHeader = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["render", _sfc_render$L]]);
const _sfc_main$M = defineComponent({
  name: "BCardImage",
  props: {
    alt: { type: String, default: null },
    bottom: { type: Boolean, default: false },
    end: { type: Boolean, default: false },
    height: { type: [Number, String] },
    left: { type: Boolean, default: false },
    right: { type: Boolean, default: false },
    src: { type: String },
    start: { type: Boolean, default: false },
    top: { type: Boolean, default: false },
    width: { type: [Number, String] }
  },
  setup(props) {
    const attrs = computed(() => {
      const { src, width, height } = props;
      return {
        src,
        alt: props.alt,
        width: (typeof width === "number" ? width : parseInt(width, 10)) || null,
        height: (typeof height === "number" ? height : parseInt(height, 10)) || null
      };
    });
    const classes = computed(() => {
      const { top: top2, right: right2, end: end2, bottom: bottom2, left: left2, start: start2 } = props;
      const align = left2 ? "float-left" : right2 ? "float-right" : "";
      let baseClass = "card-img";
      if (top2) {
        baseClass += "-top";
      } else if (right2 || end2) {
        baseClass += "-right";
      } else if (bottom2) {
        baseClass += "-bottom";
      } else if (left2 || start2) {
        baseClass += "-left";
      }
      return {
        [align]: !!align,
        [baseClass]: true
      };
    });
    return {
      attrs,
      classes
    };
  }
});
function _sfc_render$K(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("img", mergeProps({ class: _ctx.classes }, _ctx.attrs), null, 16);
}
var BCardImg = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["render", _sfc_render$K]]);
const _sfc_main$L = defineComponent({
  name: "BCardSubTitle",
  props: {
    subTitle: { type: String },
    subTitleTag: { type: String, default: "h6" },
    subTitleTextVariant: { type: String, default: "muted" }
  },
  setup(props) {
    const classes = computed(() => ({
      [`text-${props.subTitleTextVariant}`]: props.subTitleTextVariant
    }));
    return {
      classes
    };
  }
});
function _sfc_render$J(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.subTitleTag), {
    class: normalizeClass(["card-subtitle mb-2", _ctx.classes])
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(toDisplayString(_ctx.subTitle), 1)
      ])
    ]),
    _: 3
  }, 8, ["class"]);
}
var BCardSubTitle = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["render", _sfc_render$J]]);
const _sfc_main$K = {};
const _hoisted_1$u = { class: "card-text" };
function _sfc_render$I(_ctx, _cache) {
  return openBlock(), createElementBlock("p", _hoisted_1$u, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
var BCardText = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["render", _sfc_render$I]]);
const _sfc_main$J = defineComponent({
  name: "BCardTitle",
  props: {
    title: { type: String },
    titleTag: { type: String, default: "h4" }
  }
});
function _sfc_render$H(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.titleTag), { class: "card-title" }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(toDisplayString(_ctx.title), 1)
      ])
    ]),
    _: 3
  });
}
var BCardTitle = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["render", _sfc_render$H]]);
const injectionKey$1 = Symbol();
const _sfc_main$I = defineComponent({
  name: "BCarousel",
  props: {
    modelValue: { type: Boolean, default: false },
    controls: { type: Boolean, default: false },
    id: { type: String },
    imgHeight: { type: String },
    imgWidth: { type: String },
    indicators: { type: Boolean, default: false },
    interval: { type: Number, default: 5e3 },
    noTouch: { type: Boolean, default: false },
    noWrap: { type: Boolean, default: false }
  },
  emits: ["slide", "slid"],
  setup(props, { slots, emit }) {
    const element = ref();
    const instance = ref();
    const computedId = useId(props.id, "accordion");
    const slides = ref([]);
    useEventListener(element, "slide.bs.carousel", (payload) => emit("slide", payload));
    useEventListener(element, "slid.bs.carousel", (payload) => emit("slid", payload));
    onMounted(() => {
      instance.value = new Carousel(element.value, {
        wrap: !props.noTouch,
        interval: props.interval,
        touch: !props.noTouch
      });
      if (slots.default) {
        slides.value = slots.default().filter((child) => child.type.name === "BCarouselSlide");
      }
    });
    provide(injectionKey$1, {
      width: props.imgWidth,
      height: props.imgHeight
    });
    return {
      element,
      computedId,
      slides
    };
  }
});
const _hoisted_1$t = ["id"];
const _hoisted_2$f = {
  key: 0,
  class: "carousel-indicators"
};
const _hoisted_3$6 = ["data-bs-target", "data-bs-slide-to", "aria-label"];
const _hoisted_4$3 = { class: "carousel-inner" };
const _hoisted_5$2 = ["data-bs-target"];
const _hoisted_6$1 = /* @__PURE__ */ createElementVNode("span", {
  class: "carousel-control-prev-icon",
  "aria-hidden": "true"
}, null, -1);
const _hoisted_7$1 = /* @__PURE__ */ createElementVNode("span", { class: "visually-hidden" }, "Previous", -1);
const _hoisted_8 = [
  _hoisted_6$1,
  _hoisted_7$1
];
const _hoisted_9 = ["data-bs-target"];
const _hoisted_10 = /* @__PURE__ */ createElementVNode("span", {
  class: "carousel-control-next-icon",
  "aria-hidden": "true"
}, null, -1);
const _hoisted_11 = /* @__PURE__ */ createElementVNode("span", { class: "visually-hidden" }, "Next", -1);
const _hoisted_12 = [
  _hoisted_10,
  _hoisted_11
];
function _sfc_render$G(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    id: _ctx.computedId,
    ref: "element",
    class: "carousel slide",
    "data-bs-ride": "carousel"
  }, [
    _ctx.indicators ? (openBlock(), createElementBlock("div", _hoisted_2$f, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.slides, (slide, i) => {
        return openBlock(), createElementBlock("button", {
          key: i,
          type: "button",
          "data-bs-target": `#${_ctx.computedId}`,
          "data-bs-slide-to": i,
          class: normalizeClass(i === 0 ? "active" : ""),
          "aria-current": "true",
          "aria-label": `Slide ${i}`
        }, null, 10, _hoisted_3$6);
      }), 128))
    ])) : createCommentVNode("", true),
    createElementVNode("div", _hoisted_4$3, [
      renderSlot(_ctx.$slots, "default")
    ]),
    _ctx.controls ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
      createElementVNode("button", {
        class: "carousel-control-prev",
        type: "button",
        "data-bs-target": `#${_ctx.computedId}`,
        "data-bs-slide": "prev"
      }, _hoisted_8, 8, _hoisted_5$2),
      createElementVNode("button", {
        class: "carousel-control-next",
        type: "button",
        "data-bs-target": `#${_ctx.computedId}`,
        "data-bs-slide": "next"
      }, _hoisted_12, 8, _hoisted_9)
    ], 64)) : createCommentVNode("", true)
  ], 8, _hoisted_1$t);
}
var BCarousel = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["render", _sfc_render$G]]);
const _sfc_main$H = defineComponent({
  name: "BCarouselSlide",
  props: {
    active: { type: Boolean, default: false },
    caption: { type: String },
    imgBlank: { type: Boolean, default: false },
    imgHeight: { type: String },
    imgSrc: { type: String },
    imgWidth: { type: String },
    text: { type: String },
    interval: { type: [String, Number] }
  },
  setup(props) {
    const parentData = inject(injectionKey$1, {});
    const imgBlank = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%221024%22%20height%3D%22480%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20%25%7Bw%7D%20%25%7Bh%7D%22%20preserveAspectRatio%3D%22none%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20style%3D%22fill%3Atransparent%3B%22%3E%3C%2Frect%3E%3C%2Fsvg%3E";
    const img = computed(() => props.imgBlank ? imgBlank : props.imgSrc);
    return {
      width: parentData.width,
      height: parentData.height,
      img
    };
  }
});
const _hoisted_1$s = ["src", "width", "height"];
const _hoisted_2$e = {
  key: 0,
  class: "carousel-caption d-none d-md-block"
};
const _hoisted_3$5 = { key: 0 };
const _hoisted_4$2 = { key: 0 };
function _sfc_render$F(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["carousel-item", { active: _ctx.active }]),
    style: normalizeStyle({
      background: "rgb(171, 171, 171) none repeat scroll 0% 0%"
    })
  }, [
    renderSlot(_ctx.$slots, "img", {}, () => [
      createElementVNode("img", {
        class: "d-block w-100",
        src: _ctx.img,
        width: _ctx.imgWidth || _ctx.width,
        height: _ctx.imgHeight || _ctx.height
      }, null, 8, _hoisted_1$s)
    ]),
    _ctx.caption || _ctx.text || _ctx.$slots.default ? (openBlock(), createElementBlock("div", _hoisted_2$e, [
      _ctx.caption ? (openBlock(), createElementBlock("h5", _hoisted_3$5, toDisplayString(_ctx.caption), 1)) : createCommentVNode("", true),
      renderSlot(_ctx.$slots, "default", {}, () => [
        _ctx.text ? (openBlock(), createElementBlock("p", _hoisted_4$2, toDisplayString(_ctx.text), 1)) : createCommentVNode("", true)
      ])
    ])) : createCommentVNode("", true)
  ], 6);
}
var BCarouselSlide = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["render", _sfc_render$F]]);
const _sfc_main$G = defineComponent({
  name: "BCloseButton",
  props: {
    disabled: { type: Boolean, default: false },
    white: { type: Boolean, default: false }
  },
  setup(props) {
    const classes = computed(() => ({
      "btn-close-white": props.white
    }));
    return {
      classes
    };
  }
});
const _hoisted_1$r = ["disabled"];
function _sfc_render$E(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("button", {
    type: "button",
    class: normalizeClass(["btn-close", _ctx.classes]),
    disabled: _ctx.disabled,
    "aria-label": "Close"
  }, null, 10, _hoisted_1$r);
}
var BCloseButton = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["render", _sfc_render$E]]);
var getBreakpointProps = (prefix, breakpoints, definition) => breakpoints.concat(["sm", "md", "lg", "xl", "xxl"]).reduce((props, breakpoint) => {
  props[!prefix ? breakpoint : `${prefix}${breakpoint.charAt(0).toUpperCase() + breakpoint.slice(1)}`] = definition;
  return props;
}, Object.create(null));
var getClasses$1 = (props, els, propPrefix, classPrefix = propPrefix) => Object.keys(els).reduce((arr, prop) => {
  if (!props[prop])
    return arr;
  arr.push([classPrefix, prop.replace(propPrefix, ""), props[prop]].filter((e) => e).join("-").toLowerCase());
  return arr;
}, []);
const breakpointCol = getBreakpointProps("", [], { type: [Boolean, String, Number], default: false });
const breakpointOffset = getBreakpointProps("offset", [""], { type: [String, Number], default: null });
const breakpointOrder = getBreakpointProps("order", [""], { type: [String, Number], default: null });
const _sfc_main$F = defineComponent({
  name: "BCol",
  props: __spreadProps(__spreadValues(__spreadProps(__spreadValues(__spreadProps(__spreadValues({
    col: { type: Boolean, default: false },
    cols: { type: [String, Number], default: null }
  }, breakpointCol), {
    offset: { type: [String, Number], default: null }
  }), breakpointOffset), {
    order: { type: [String, Number], default: null }
  }), breakpointOrder), {
    alignSelf: { type: String, default: null },
    tag: { type: String, default: "div" }
  }),
  setup(props) {
    let classList = [];
    const properties = [
      { content: breakpointCol, propPrefix: "cols", classPrefix: "col" },
      { content: breakpointOffset, propPrefix: "offset" },
      { content: breakpointOrder, propPrefix: "order" }
    ];
    properties.forEach((property) => {
      classList = classList.concat(getClasses$1(props, property.content, property.propPrefix, property.classPrefix));
    });
    const classes = computed(() => ({
      col: props.col || !classList.some((e) => /^col-/.test(e) && !props.cols),
      [`col-${props.cols}`]: !!props.cols,
      [`offset-${props.offset}`]: !!props.offset,
      [`order-${props.order}`]: !!props.order,
      [`align-self-${props.alignSelf}`]: !!props.alignSelf
    }));
    return {
      classes,
      classList
    };
  }
});
function _sfc_render$D(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    class: normalizeClass([_ctx.classes, _ctx.classList])
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]);
}
var BCol = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["render", _sfc_render$D]]);
const _sfc_main$E = defineComponent({
  name: "BContainer",
  props: {
    fluid: { type: [Boolean, String], default: false }
  },
  setup(props) {
    const classes = computed(() => ({
      container: !props.fluid,
      [`container-fluid`]: typeof props.fluid === "boolean" && props.fluid,
      [`container-${props.fluid}`]: typeof props.fluid === "string"
    }));
    return {
      classes
    };
  }
});
function _sfc_render$C(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classes)
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
var BContainer = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["render", _sfc_render$C]]);
function _isObject(item) {
  return item && typeof item === "object" && item.constructor === Object;
}
function mergeDeep(target, source, extendArray = true) {
  const output = target instanceof Date && typeof target.getMonth === "function" ? new Date(target) : Object.assign({}, target);
  if (_isObject(target) && _isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (_isObject(source[key])) {
        if (!(key in target))
          Object.assign(output, { [key]: source[key] });
        else
          output[key] = mergeDeep(target[key], source[key], extendArray);
      } else if (Array.isArray(source[key]) && Array.isArray(target[key])) {
        Object.assign(output, {
          [key]: !extendArray ? source[key] : target[key].concat(source[key].filter((item) => !target[key].includes(item)))
        });
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}
const _sfc_main$D = defineComponent({
  name: "BDropdown",
  props: {
    autoClose: { type: [Boolean, String], default: true },
    block: { type: Boolean, default: false },
    boundary: {
      type: [HTMLElement, String],
      default: "clippingParents"
    },
    dark: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    dropup: { type: Boolean, default: false },
    dropright: { type: Boolean, default: false },
    dropleft: { type: Boolean, default: false },
    id: { type: String },
    menuClass: { type: [Array, Object, String] },
    noFlip: { type: Boolean, default: false },
    offset: { type: [Number, String], default: 0 },
    popperOpts: { type: Object, default: () => ({}) },
    right: { type: Boolean, default: false },
    role: { type: String, default: "menu" },
    size: { type: String },
    split: { type: Boolean, default: false },
    splitButtonType: { type: String, default: "button" },
    splitClass: { type: [Array, Object, String] },
    splitHref: { type: String, default: null },
    noCaret: { type: Boolean, default: false },
    splitVariant: { type: String },
    text: { type: String },
    toggleClass: { type: [Array, Object, String] },
    toggleText: { type: String, default: "Toggle dropdown" },
    variant: { type: String, default: "secondary" }
  },
  emits: ["show", "shown", "hide", "hidden"],
  setup(props, { emit }) {
    const parent = ref();
    const dropdown = ref();
    const instance = ref();
    const computedId = useId(props.id, "dropdown");
    useEventListener(parent, "show.bs.dropdown", () => emit("show"));
    useEventListener(parent, "shown.bs.dropdown", () => emit("shown"));
    useEventListener(parent, "hide.bs.dropdown", () => emit("hide"));
    useEventListener(parent, "hidden.bs.dropdown", () => emit("hidden"));
    const classes = computed(() => ({
      "d-grid": props.block,
      "d-flex": props.block && props.split
    }));
    const buttonClasses = computed(() => ({
      "dropdown-toggle": !props.split,
      "dropdown-toggle-no-caret": props.noCaret && !props.split,
      "w-100": props.split && props.block
    }));
    const dropdownMenuClasses = computed(() => ({
      "dropdown-menu-dark": props.dark
    }));
    const buttonAttr = computed(() => ({
      "data-bs-toggle": props.split ? null : "dropdown",
      "aria-expanded": props.split ? null : false,
      "ref": props.split ? null : dropdown,
      "href": props.split ? props.splitHref : null
    }));
    const splitAttr = computed(() => ({
      ref: props.split ? dropdown : null
    }));
    onMounted(() => {
      var _a;
      instance.value = new Dropdown((_a = dropdown.value) == null ? void 0 : _a.$el, {
        autoClose: props.autoClose,
        boundary: props.boundary,
        offset: props.offset.toString(),
        reference: props.offset || props.split ? "parent" : "toggle",
        popperConfig: (defaultConfig) => {
          const dropDownConfig = {
            placement: "bottom-start",
            modifiers: !props.noFlip ? [] : [
              {
                name: "flip",
                options: {
                  fallbackPlacements: []
                }
              }
            ]
          };
          if (props.dropup) {
            dropDownConfig.placement = props.right ? "top-end" : "top-start";
          } else if (props.dropright) {
            dropDownConfig.placement = "right-start";
          } else if (props.dropleft) {
            dropDownConfig.placement = "left-start";
          } else if (props.right) {
            dropDownConfig.placement = "bottom-end";
          }
          return mergeDeep(defaultConfig, mergeDeep(dropDownConfig, props.popperOpts));
        }
      });
    });
    return {
      parent,
      computedId,
      classes,
      buttonClasses,
      buttonAttr,
      splitAttr,
      dropdownMenuClasses,
      dropdown
    };
  }
});
const _hoisted_1$q = { class: "visually-hidden" };
const _hoisted_2$d = ["aria-labelledby", "role"];
function _sfc_render$B(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_button = resolveComponent("b-button");
  return openBlock(), createElementBlock("div", {
    ref: "parent",
    class: normalizeClass([_ctx.classes, "btn-group"])
  }, [
    createVNode(_component_b_button, mergeProps({
      id: _ctx.computedId,
      variant: _ctx.splitVariant || _ctx.variant,
      size: _ctx.size,
      class: [_ctx.buttonClasses, _ctx.split ? _ctx.splitClass : _ctx.toggleClass],
      disabled: _ctx.disabled,
      type: _ctx.splitButtonType
    }, _ctx.buttonAttr), {
      default: withCtx(() => [
        createTextVNode(toDisplayString(_ctx.text) + " ", 1),
        renderSlot(_ctx.$slots, "button-content")
      ]),
      _: 3
    }, 16, ["id", "variant", "size", "class", "disabled", "type"]),
    _ctx.split ? (openBlock(), createBlock(_component_b_button, mergeProps({
      key: 0,
      variant: _ctx.variant,
      size: _ctx.size,
      disabled: _ctx.disabled
    }, _ctx.splitAttr, {
      class: [_ctx.toggleClass, "dropdown-toggle-split dropdown-toggle"],
      "data-bs-toggle": "dropdown",
      "aria-expanded": "false"
    }), {
      default: withCtx(() => [
        createElementVNode("span", _hoisted_1$q, toDisplayString(_ctx.toggleText), 1)
      ]),
      _: 1
    }, 16, ["variant", "size", "disabled", "class"])) : createCommentVNode("", true),
    createElementVNode("ul", {
      class: normalizeClass(["dropdown-menu", [_ctx.menuClass, _ctx.dropdownMenuClasses]]),
      "aria-labelledby": _ctx.computedId,
      role: _ctx.role
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 10, _hoisted_2$d)
  ], 2);
}
var BDropdown = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["render", _sfc_render$B]]);
const _sfc_main$C = defineComponent({
  name: "BDropdownDivider",
  props: {
    tag: { type: String, default: "hr" }
  }
});
const _hoisted_1$p = { role: "presentation" };
function _sfc_render$A(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("li", _hoisted_1$p, [
    (openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
      class: "dropdown-divider",
      role: "separator",
      "aria-orientation": "horizontal"
    }))
  ]);
}
var BDropdownDivider = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["render", _sfc_render$A]]);
const _sfc_main$B = defineComponent({
  name: "BDropdownForm"
});
const _hoisted_1$o = { role: "presentation" };
const _hoisted_2$c = { class: "px-4 py-3" };
function _sfc_render$z(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("li", _hoisted_1$o, [
    createElementVNode("form", _hoisted_2$c, [
      renderSlot(_ctx.$slots, "default")
    ])
  ]);
}
var BDropdownForm = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$z]]);
const _sfc_main$A = defineComponent({
  name: "BDropdownGroup",
  inheritAttrs: false,
  props: {
    ariaDescribedby: { type: String },
    header: { type: String },
    headerClasses: { type: [String, Array, Object], default: null },
    headerTag: { type: String, default: "header" },
    headerVariant: { type: String, default: null },
    id: { type: String }
  },
  setup(props) {
    const headerId = computed(() => props.id ? [props.id, "group_dd_header"].join("_") : null);
    const headerRole = computed(() => props.headerTag === "header" ? null : "heading");
    const classes = computed(() => ({
      [`text-${props.headerVariant}`]: props.headerVariant
    }));
    return {
      classes,
      headerId,
      headerRole
    };
  }
});
const _hoisted_1$n = { role: "presentation" };
const _hoisted_2$b = ["id", "aria-describedby"];
function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("li", _hoisted_1$n, [
    (openBlock(), createBlock(resolveDynamicComponent(_ctx.headerTag), {
      id: _ctx.headerId,
      class: normalizeClass(["dropdown-header", [_ctx.classes, _ctx.headerClasses]]),
      role: _ctx.headerRole
    }, {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "header", {}, () => [
          createTextVNode(toDisplayString(_ctx.header), 1)
        ])
      ]),
      _: 3
    }, 8, ["id", "class", "role"])),
    createElementVNode("ul", mergeProps({
      id: _ctx.id,
      role: "group",
      class: "list-unstyled"
    }, _ctx.$attrs, {
      "aria-describedby": _ctx.ariaDescribedby || _ctx.headerId
    }), [
      renderSlot(_ctx.$slots, "default")
    ], 16, _hoisted_2$b)
  ]);
}
var BDropdownGroup = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$y]]);
const _sfc_main$z = {};
const _hoisted_1$m = { class: "dropdown-header" };
function _sfc_render$x(_ctx, _cache) {
  return openBlock(), createElementBlock("li", null, [
    createElementVNode("h6", _hoisted_1$m, [
      renderSlot(_ctx.$slots, "default")
    ])
  ]);
}
var BDropdownHeader = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$x]]);
const _sfc_main$y = defineComponent({
  name: "BDropdownItem",
  inheritAttrs: false,
  props: {
    active: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    href: { type: String },
    linkClass: { type: [Array, Object, String] },
    rel: { type: String, default: null },
    target: { type: String, default: "_self" },
    variant: { type: String, default: null }
  },
  emits: ["click"],
  setup(props) {
    const classes = computed(() => ({
      active: props.active,
      disabled: props.disabled,
      [`text-${props.variant}`]: props.variant
    }));
    const tag = computed(() => props.href ? "a" : "button");
    const attrs = computed(() => ({
      "aria-current": props.active ? "true" : null,
      "href": tag.value === "a" ? props.href : null,
      "rel": props.rel,
      "type": tag.value === "button" ? "button" : null,
      "target": props.target
    }));
    return {
      classes,
      tag,
      attrs
    };
  }
});
const _hoisted_1$l = { role: "presentation" };
function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("li", _hoisted_1$l, [
    (openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), mergeProps({
      class: ["dropdown-item", [_ctx.classes, _ctx.linkClass]]
    }, _ctx.attrs, {
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click", $event))
    }), {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]))
  ]);
}
var BDropdownItem = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$w]]);
const _sfc_main$x = defineComponent({
  name: "BDropdownItemButton",
  inheritAttrs: false,
  props: {
    active: { type: Boolean, default: false },
    activeClass: { type: String, default: "active" },
    buttonClass: { type: [String, Array, Object] },
    disabled: { type: Boolean, default: false },
    variant: { type: String, default: null }
  },
  emits: ["click"],
  setup(props) {
    const classes = computed(() => ({
      [props.activeClass]: props.active,
      disabled: props.disabled,
      [`text-${props.variant}`]: props.variant
    }));
    const attrs = computed(() => ({
      role: "menuitem",
      type: "button",
      disabled: props.disabled
    }));
    return {
      classes,
      attrs
    };
  }
});
const _hoisted_1$k = { role: "presentation" };
function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("li", _hoisted_1$k, [
    createElementVNode("button", mergeProps({
      class: ["dropdown-item", [_ctx.classes, _ctx.buttonClass]]
    }, _ctx.attrs, {
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click", $event))
    }), [
      renderSlot(_ctx.$slots, "default")
    ], 16)
  ]);
}
var BDropdownItemButton = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$v]]);
const _sfc_main$w = defineComponent({
  name: "BDropdownText"
});
const _hoisted_1$j = { role: "presentation" };
const _hoisted_2$a = { class: "px-4 py-1 mb-0 text-muted" };
function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("li", _hoisted_1$j, [
    createElementVNode("p", _hoisted_2$a, [
      renderSlot(_ctx.$slots, "default")
    ])
  ]);
}
var BDropdownText = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$u]]);
const _sfc_main$v = defineComponent({
  name: "BForm",
  props: {
    id: { type: String },
    floating: { type: Boolean, default: false },
    novalidate: { type: Boolean, default: false },
    validated: { type: Boolean, default: false }
  },
  emits: ["submit"],
  setup(props) {
    const classes = computed(() => ({
      "form-floating": props.floating,
      "was-validated": props.validated
    }));
    return {
      classes
    };
  }
});
const _hoisted_1$i = ["id", "novalidate"];
function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("form", {
    id: _ctx.id,
    novalidate: _ctx.novalidate,
    class: normalizeClass(_ctx.classes),
    onSubmit: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.$emit("submit", $event), ["prevent"]))
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 42, _hoisted_1$i);
}
var BForm = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$t]]);
const _getComputedAriaInvalid = (props) => computed(() => {
  const { ariaInvalid, state } = props;
  if (ariaInvalid === true || ariaInvalid === "true" || ariaInvalid === "") {
    return "true";
  }
  const computedState = typeof state === "boolean" ? props.state : null;
  return computedState === false ? "true" : ariaInvalid;
});
const getClasses = (props) => computed(() => ({
  "form-check": !props.plain && !props.button,
  "form-check-inline": props.inline,
  "form-switch": props.switch,
  [`form-control-${props.size}`]: props.size && props.size !== "md"
}));
const getInputClasses = (props) => computed(() => ({
  "form-check-input": !props.plain && !props.button,
  "is-valid": props.state === true,
  "is-invalid": props.state === false,
  "btn-check": props.button
}));
const getLabelClasses = (props) => computed(() => ({
  "form-check-label": !props.plain && !props.button,
  "btn": props.button,
  [`btn-${props.buttonVariant}`]: props.button,
  [`btn-${props.size}`]: props.button && props.size && props.size !== "md"
}));
const getGroupAttr = (props) => computed(() => ({
  "aria-invalid": _getComputedAriaInvalid(props).value,
  "aria-required": props.required.toString() === "true" ? "true" : null
}));
const getGroupClasses = (props) => computed(() => ({
  "was-validated": props.validated,
  "btn-group": props.buttons && !props.stacked,
  "btn-group-vertical": props.stacked,
  [`btn-group-${props.size}`]: props.size
}));
const slotsToElements = (slots, nodeType, disabled) => slots.filter((e) => e.type.name === nodeType).map((e) => {
  const txtChild = (e.children.default ? e.children.default() : []).find((e2) => e2.type.toString() === "Symbol(Text)");
  return {
    props: __spreadValues({
      disabled
    }, e.props),
    text: txtChild ? txtChild.children : ""
  };
});
const optionToElement = (option, props) => {
  const { valueField, disabled, disabledField, textField, htmlField } = props;
  if (typeof option === "string") {
    return {
      props: {
        value: option,
        disabled
      },
      text: option
    };
  }
  return {
    props: __spreadValues({
      value: option[valueField],
      disabled: disabled || option[disabledField]
    }, option.props),
    text: option[textField],
    html: option[htmlField]
  };
};
const bindGroupProps = (el, idx, props, computedName, computedId) => {
  const { buttonVariant, buttons, stacked, form, state, plain, size, required } = props;
  return __spreadProps(__spreadValues({}, el), {
    props: __spreadValues({
      "button-variant": buttonVariant,
      form,
      "name": computedName.value,
      "id": `${computedId.value}_option_${idx}`,
      "button": buttons,
      state,
      plain,
      size,
      "inline": !stacked,
      required
    }, el.props)
  });
};
const _sfc_main$u = defineComponent({
  name: "BFormCheckbox",
  props: {
    id: { type: String, default: void 0 },
    ariaLabel: { type: String },
    ariaLabelledBy: { type: String },
    autofocus: { type: Boolean, default: false },
    plain: { type: Boolean, default: false },
    button: { type: Boolean, default: false },
    switch: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    buttonVariant: { type: String, default: "secondary" },
    form: { type: String },
    indeterminate: { type: Boolean },
    inline: { type: Boolean, default: false },
    name: { type: String },
    required: { type: Boolean, default: void 0 },
    size: { type: String, default: "md" },
    state: { type: Boolean, default: null },
    uncheckedValue: { type: [Boolean, String, Array, Object], default: false },
    value: { type: [Boolean, String, Array, Object], default: true },
    modelValue: { type: [Boolean, String, Array, Object], default: null }
  },
  emits: ["update:modelValue", "input", "change"],
  setup(props, { emit }) {
    const computedId = useId(props.id, "form-check");
    const input = ref(null);
    const isFocused = ref(false);
    const localChecked = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit("input", newValue);
        emit("update:modelValue", newValue);
        emit("change", newValue);
      }
    });
    const isChecked = computed(() => {
      if (Array.isArray(props.modelValue)) {
        return props.modelValue.indexOf(props.value) > -1;
      }
      return JSON.stringify(props.modelValue) === JSON.stringify(props.value);
    });
    const classes = getClasses(props);
    const inputClasses = getInputClasses(props);
    const labelClasses = getLabelClasses(props);
    watch(() => props.modelValue, (newValue) => {
      emit("input", newValue);
    });
    const focus2 = () => {
      isFocused.value = true;
      if (!props.disabled)
        input.value.focus();
    };
    const blur = () => {
      isFocused.value = false;
      if (!props.disabled) {
        input.value.blur();
      }
    };
    const handleClick = (checked) => {
      if (!Array.isArray(props.modelValue)) {
        localChecked.value = checked ? props.value : props.uncheckedValue;
      } else {
        const tempArray = props.modelValue;
        if (checked) {
          const index = tempArray.indexOf(props.value);
          if (index < 0) {
            tempArray.push(props.value);
          }
        } else {
          const index = tempArray.indexOf(props.value);
          if (index > -1) {
            tempArray.splice(index, 1);
          }
        }
        localChecked.value = tempArray;
      }
    };
    if (props.autofocus) {
      onMounted(() => {
        input.value.focus();
      });
    }
    return {
      input,
      computedId,
      classes,
      inputClasses,
      labelClasses,
      localChecked,
      isChecked,
      isFocused,
      handleClick,
      focus: focus2,
      blur
    };
  }
});
const _hoisted_1$h = ["id", "disabled", "required", "name", "form", "aria-label", "aria-labelledby", "aria-required", "value", "indeterminate", "checked"];
const _hoisted_2$9 = ["for"];
function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classes)
  }, [
    createElementVNode("input", mergeProps({ id: _ctx.computedId }, _ctx.$attrs, {
      ref: "input",
      class: _ctx.inputClasses,
      type: "checkbox",
      disabled: _ctx.disabled,
      required: _ctx.name && _ctx.required,
      name: _ctx.name,
      form: _ctx.form,
      "aria-label": _ctx.ariaLabel,
      "aria-labelledby": _ctx.ariaLabelledBy,
      "aria-required": _ctx.name && _ctx.required ? "true" : null,
      value: _ctx.value,
      indeterminate: _ctx.indeterminate,
      checked: _ctx.isChecked,
      onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.handleClick($event.target.checked), ["stop"])),
      onFocus: _cache[1] || (_cache[1] = ($event) => _ctx.focus()),
      onBlur: _cache[2] || (_cache[2] = ($event) => _ctx.blur())
    }), null, 16, _hoisted_1$h),
    _ctx.$slots.default || !_ctx.plain ? (openBlock(), createElementBlock("label", {
      key: 0,
      for: _ctx.computedId,
      class: normalizeClass([_ctx.labelClasses, { active: _ctx.isChecked, focus: _ctx.isFocused }])
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 10, _hoisted_2$9)) : createCommentVNode("", true)
  ], 2);
}
var BFormCheckbox = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$s]]);
const _sfc_main$t = defineComponent({
  name: "BFormCheckboxGroup",
  props: {
    modelValue: { type: Array, default: () => [] },
    ariaInvalid: { type: [Boolean, String], default: null },
    autofocus: { type: Boolean, default: false },
    buttonVariant: { type: String, default: "secondary" },
    buttons: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    disabledField: { type: String, default: "disabled" },
    form: { type: String },
    htmlField: { type: String, default: "html" },
    id: { type: String },
    name: { type: String },
    options: { type: Array, default: () => [] },
    plain: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    size: { type: String },
    stacked: { type: Boolean, default: false },
    state: { type: Boolean, default: null },
    switches: { type: Boolean, default: false },
    textField: { type: String, default: "text" },
    validated: { type: Boolean, default: false },
    valueField: { type: String, default: "value" }
  },
  emits: ["update:modelValue", "change", "input"],
  setup(props, { emit, slots }) {
    const slotsName = "BFormCheckbox";
    const computedId = useId(props.id, "checkbox");
    const computedName = useId(props.name, "checkbox");
    const localChecked = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        if (JSON.stringify(newValue) === JSON.stringify(props.modelValue))
          return;
        emit("input", newValue);
        emit("update:modelValue", newValue);
        emit("change", newValue);
      }
    });
    const checkboxList = computed(() => {
      const { modelValue, switches, disabled, options } = props;
      return (slots.first ? slotsToElements(slots.first(), slotsName, disabled) : []).concat(options.map((e) => optionToElement(e, props))).concat(slots.default ? slotsToElements(slots.default(), slotsName, disabled) : []).map((e, idx) => bindGroupProps(e, idx, props, computedName, computedId)).map((e) => {
        var _a;
        return __spreadProps(__spreadValues({}, e), {
          model: modelValue.find((mv) => {
            var _a2;
            return ((_a2 = e.props) == null ? void 0 : _a2.value) === mv;
          }) ? (_a = e.props) == null ? void 0 : _a.value : false,
          props: __spreadValues({
            switch: switches
          }, e.props)
        });
      });
    });
    const childUpdated = (newValue, checkedValue) => {
      const resp = props.modelValue.filter((e) => JSON.stringify(e) !== JSON.stringify(checkedValue));
      if (JSON.stringify(newValue) === JSON.stringify(checkedValue))
        resp.push(newValue);
      emit("update:modelValue", resp);
      emit("change", resp);
    };
    const attrs = getGroupAttr(props);
    const classes = getGroupClasses(props);
    watch(() => props.modelValue, (newValue) => {
      emit("input", newValue);
    });
    return {
      attrs,
      classes,
      checkboxList,
      childUpdated,
      computedId,
      localChecked
    };
  }
});
const _hoisted_1$g = ["id"];
const _hoisted_2$8 = ["innerHTML"];
const _hoisted_3$4 = ["textContent"];
function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_form_checkbox = resolveComponent("b-form-checkbox");
  return openBlock(), createElementBlock("div", mergeProps(_ctx.attrs, {
    id: _ctx.computedId,
    role: "group",
    class: [_ctx.classes, "bv-no-focus-ring"],
    tabindex: "-1"
  }), [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.checkboxList, (item, key) => {
      return openBlock(), createBlock(_component_b_form_checkbox, mergeProps({
        key,
        modelValue: item.model,
        "onUpdate:modelValue": ($event) => item.model = $event
      }, item.props, {
        onChange: ($event) => {
          var _a;
          return _ctx.childUpdated($event, (_a = item.props) == null ? void 0 : _a.value);
        }
      }), {
        default: withCtx(() => [
          item.html ? (openBlock(), createElementBlock("span", {
            key: 0,
            innerHTML: item.html
          }, null, 8, _hoisted_2$8)) : (openBlock(), createElementBlock("span", {
            key: 1,
            textContent: toDisplayString(item.text)
          }, null, 8, _hoisted_3$4))
        ]),
        _: 2
      }, 1040, ["modelValue", "onUpdate:modelValue", "onChange"]);
    }), 128))
  ], 16, _hoisted_1$g);
}
var BFormCheckboxGroup = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$r]]);
const _sfc_main$s = defineComponent({
  name: "BFormRadio",
  props: {
    ariaLabel: { type: String },
    ariaLabelledBy: { type: String },
    autofocus: { type: Boolean, default: false },
    modelValue: { type: [Boolean, String, Array, Object], default: null },
    plain: { type: Boolean, default: false },
    button: { type: Boolean, default: false },
    switch: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    buttonVariant: { type: String, default: "secondary" },
    form: { type: String },
    id: { type: String },
    inline: { type: Boolean, default: false },
    name: { type: String },
    required: { type: Boolean, default: false },
    size: { type: String },
    state: { type: Boolean, default: null },
    value: { type: [String, Boolean, Object], default: true }
  },
  emits: ["update:modelValue", "change", "input"],
  setup(props, { emit }) {
    const computedId = useId(props.id, "form-check");
    const input = ref(null);
    const isFocused = ref(false);
    const localChecked = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit("input", newValue);
        emit("change", newValue);
        emit("update:modelValue", newValue);
      }
    });
    const focus2 = () => {
      isFocused.value = true;
      if (!props.disabled)
        input.value.focus();
    };
    const blur = () => {
      isFocused.value = false;
      if (!props.disabled) {
        input.value.blur();
      }
    };
    const isChecked = computed(() => {
      const { value, modelValue } = props;
      if (Array.isArray(modelValue)) {
        return (modelValue || []).find((e) => e === value);
      }
      return JSON.stringify(modelValue) === JSON.stringify(value);
    });
    const classes = getClasses(props);
    const inputClasses = getInputClasses(props);
    const labelClasses = getLabelClasses(props);
    const handleClick = async (checked) => {
      const { modelValue, value } = props;
      if (Array.isArray(modelValue)) {
        if ((modelValue || [])[0] !== value) {
          localChecked.value = [value];
        }
      } else if (checked && modelValue !== value) {
        localChecked.value = value;
      }
    };
    watch(() => props.modelValue, (newValue) => {
      emit("input", newValue);
    });
    if (props.autofocus) {
      onMounted(() => {
        input.value.focus();
      });
    }
    return {
      localChecked,
      computedId,
      classes,
      inputClasses,
      labelClasses,
      isChecked,
      isFocused,
      input,
      handleClick,
      focus: focus2,
      blur
    };
  }
});
const _hoisted_1$f = ["id", "disabled", "required", "name", "form", "aria-label", "aria-labelledby", "value", "checked", "aria-required"];
const _hoisted_2$7 = ["for"];
function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classes)
  }, [
    createElementVNode("input", mergeProps({ id: _ctx.computedId }, _ctx.$attrs, {
      ref: "input",
      class: _ctx.inputClasses,
      type: "radio",
      disabled: _ctx.disabled,
      required: _ctx.name && _ctx.required,
      name: _ctx.name,
      form: _ctx.form,
      "aria-label": _ctx.ariaLabel,
      "aria-labelledby": _ctx.ariaLabelledBy,
      value: _ctx.value,
      checked: _ctx.isChecked,
      "aria-required": _ctx.name && _ctx.required ? "true" : null,
      onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.handleClick($event.target.checked), ["stop"])),
      onFocus: _cache[1] || (_cache[1] = (...args) => _ctx.focus && _ctx.focus(...args)),
      onBlur: _cache[2] || (_cache[2] = (...args) => _ctx.blur && _ctx.blur(...args))
    }), null, 16, _hoisted_1$f),
    _ctx.$slots.default || !_ctx.plain ? (openBlock(), createElementBlock("label", {
      key: 0,
      for: _ctx.computedId,
      class: normalizeClass([_ctx.labelClasses, { active: _ctx.isChecked, focus: _ctx.isFocused }])
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 10, _hoisted_2$7)) : createCommentVNode("", true)
  ], 2);
}
var BFormRadio = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$q]]);
const _sfc_main$r = defineComponent({
  name: "BFormRadioGroup",
  props: {
    modelValue: { type: [String, Boolean, Array, Object], default: "" },
    ariaInvalid: { type: [Boolean, String], default: null },
    autofocus: { type: Boolean, default: false },
    buttonVariant: { type: String, default: "secondary" },
    buttons: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    disabledField: { type: String, default: "disabled" },
    form: { type: String },
    htmlField: { type: String, default: "html" },
    id: { type: String },
    name: { type: String },
    options: { type: Array, default: () => [] },
    plain: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    size: { type: String },
    stacked: { type: Boolean, default: false },
    state: { type: Boolean, default: null },
    textField: { type: String, default: "text" },
    validated: { type: Boolean, default: false },
    valueField: { type: String, default: "value" }
  },
  emits: ["update:modelValue", "input", "change"],
  setup(props, { emit, slots }) {
    const slotsName = "BFormRadio";
    const computedId = useId(props.id, "radio");
    const computedName = useId(props.name, "checkbox");
    const localChecked = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit("input", newValue);
        emit("update:modelValue", newValue);
        emit("change", newValue);
      }
    });
    const checkboxList = computed(() => {
      const { modelValue, disabled, options } = props;
      return (slots.first ? slotsToElements(slots.first(), slotsName, disabled) : []).concat(options.map((e) => optionToElement(e, props))).concat(slots.default ? slotsToElements(slots.default(), slotsName, disabled) : []).map((e, idx) => bindGroupProps(e, idx, props, computedName, computedId)).map((e) => {
        var _a, _b;
        return __spreadProps(__spreadValues({}, e), {
          model: JSON.stringify(modelValue) === JSON.stringify((_a = e.props) == null ? void 0 : _a.value) ? (_b = e.props) == null ? void 0 : _b.value : null
        });
      });
    });
    const childUpdated = (newValue) => {
      emit("change", newValue);
      emit("update:modelValue", newValue);
    };
    const attrs = getGroupAttr(props);
    const classes = getGroupClasses(props);
    return {
      attrs,
      classes,
      checkboxList,
      childUpdated,
      computedId,
      localChecked
    };
  }
});
const _hoisted_1$e = ["id"];
const _hoisted_2$6 = ["innerHTML"];
const _hoisted_3$3 = ["textContent"];
function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_form_radio = resolveComponent("b-form-radio");
  return openBlock(), createElementBlock("div", mergeProps(_ctx.attrs, {
    id: _ctx.computedId,
    role: "radiogroup",
    class: [_ctx.classes, "bv-no-focus-ring"],
    tabindex: "-1"
  }), [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.checkboxList, (item, key) => {
      return openBlock(), createBlock(_component_b_form_radio, mergeProps({
        key,
        modelValue: item.model,
        "onUpdate:modelValue": ($event) => item.model = $event
      }, item.props, { onChange: _ctx.childUpdated }), {
        default: withCtx(() => [
          item.html ? (openBlock(), createElementBlock("span", {
            key: 0,
            innerHTML: item.html
          }, null, 8, _hoisted_2$6)) : (openBlock(), createElementBlock("span", {
            key: 1,
            textContent: toDisplayString(item.text)
          }, null, 8, _hoisted_3$3))
        ]),
        _: 2
      }, 1040, ["modelValue", "onUpdate:modelValue", "onChange"]);
    }), 128))
  ], 16, _hoisted_1$e);
}
var BFormRadioGroup = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$p]]);
const allowedTypes = [
  "text",
  "number",
  "email",
  "password",
  "search",
  "url",
  "tel",
  "date",
  "time",
  "range",
  "color"
];
const _sfc_main$q = defineComponent({
  name: "BFormInput",
  props: {
    ariaInvalid: {
      type: [Boolean, String],
      default: false
    },
    autocomplete: { type: String },
    autofocus: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    form: { type: String },
    formatter: { type: Function },
    id: { type: String },
    lazy: { type: Boolean, default: false },
    lazyFormatter: { type: Boolean, default: false },
    list: { type: String },
    max: { type: [String, Number] },
    min: { type: [String, Number] },
    modelValue: { type: [String, Number], default: "" },
    name: { type: String },
    number: { type: Boolean, default: false },
    placeholder: { type: String },
    plaintext: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    size: { type: String },
    step: { type: [String, Number] },
    state: { type: Boolean, default: null },
    trim: { type: Boolean, default: false },
    type: {
      type: String,
      default: "text",
      validator: (value) => allowedTypes.includes(value)
    }
  },
  emits: ["update:modelValue", "change", "blur", "input"],
  setup(props, { emit }) {
    const input = ref();
    let inputValue = null;
    const computedId = useId(props.id, "input");
    const _formatValue = (value, evt, force = false) => {
      const { formatter, lazyFormatter } = props;
      value = String(value);
      if (typeof formatter === "function" && (!lazyFormatter || force)) {
        return formatter(value, evt);
      }
      return value;
    };
    const _getModelValue = (value) => {
      const { trim, number } = props;
      if (trim)
        return value.trim();
      if (number)
        return parseFloat(value);
      return value;
    };
    const handleAutofocus = () => {
      nextTick(() => {
        var _a;
        if (props.autofocus)
          (_a = input.value) == null ? void 0 : _a.focus();
      });
    };
    onMounted(handleAutofocus);
    onMounted(() => {
      if (input.value) {
        input.value.value = props.modelValue;
      }
    });
    onActivated(handleAutofocus);
    const classes = computed(() => {
      const { plaintext, size, state, type } = props;
      const isRange = type === "range";
      const isColor = type === "color";
      return {
        "form-range": isRange,
        "form-control": isColor || !plaintext && !isRange,
        "form-control-color": isColor,
        "form-control-plaintext": plaintext && !isRange && !isColor,
        [`form-control-${size}`]: size,
        "is-valid": state === true,
        "is-invalid": state === false
      };
    });
    const computedAriaInvalid = computed(() => {
      const { ariaInvalid, state } = props;
      if (ariaInvalid) {
        return ariaInvalid.toString();
      }
      return state === false ? "true" : null;
    });
    const localType = computed(() => allowedTypes.includes(props.type) ? props.type : "text");
    const onInput = (evt) => {
      const { lazy, modelValue } = props;
      const { value } = evt.target;
      const formattedValue = _formatValue(value, evt);
      if (formattedValue === false || evt.defaultPrevented) {
        evt.preventDefault();
        return;
      }
      if (lazy)
        return;
      emit("input", formattedValue);
      const nextModel = _getModelValue(formattedValue);
      if (modelValue !== nextModel) {
        inputValue = value;
        emit("update:modelValue", nextModel);
      }
    };
    const onChange = (evt) => {
      const { lazy, modelValue } = props;
      const { value } = evt.target;
      const formattedValue = _formatValue(value, evt);
      if (formattedValue === false || evt.defaultPrevented) {
        evt.preventDefault();
        return;
      }
      if (!lazy)
        return;
      inputValue = value;
      emit("update:modelValue", formattedValue);
      const nextModel = _getModelValue(formattedValue);
      if (modelValue !== nextModel) {
        emit("change", formattedValue);
      }
    };
    const onBlur = (evt) => {
      const { lazy, lazyFormatter } = props;
      emit("blur", evt);
      if (!lazy && !lazyFormatter)
        return;
      const { value } = evt.target;
      const formattedValue = _formatValue(value, evt, true);
      inputValue = value;
      emit("update:modelValue", formattedValue);
    };
    const focus2 = () => {
      var _a;
      if (!props.disabled)
        (_a = input.value) == null ? void 0 : _a.focus();
    };
    const blur = () => {
      var _a;
      if (!props.disabled) {
        (_a = input.value) == null ? void 0 : _a.blur();
      }
    };
    watch(() => props.modelValue, (newValue) => {
      if (!input.value)
        return;
      input.value.value = inputValue ? inputValue : newValue;
      inputValue = null;
    });
    return {
      input,
      computedId,
      computedAriaInvalid,
      classes,
      localType,
      onInput,
      onChange,
      onBlur,
      focus: focus2,
      blur
    };
  }
});
const _hoisted_1$d = ["id", "name", "form", "type", "disabled", "placeholder", "required", "autocomplete", "readonly", "min", "max", "step", "list", "aria-required", "aria-invalid"];
function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("input", mergeProps({
    id: _ctx.computedId,
    ref: "input",
    class: _ctx.classes,
    name: _ctx.name || null,
    form: _ctx.form || null,
    type: _ctx.localType,
    disabled: _ctx.disabled,
    placeholder: _ctx.placeholder,
    required: _ctx.required,
    autocomplete: _ctx.autocomplete || null,
    readonly: _ctx.readonly || _ctx.plaintext,
    min: _ctx.min,
    max: _ctx.max,
    step: _ctx.step,
    list: _ctx.type !== "password" ? _ctx.list : null,
    "aria-required": _ctx.required ? "true" : null,
    "aria-invalid": _ctx.computedAriaInvalid
  }, _ctx.$attrs, {
    onInput: _cache[0] || (_cache[0] = ($event) => _ctx.onInput($event)),
    onChange: _cache[1] || (_cache[1] = ($event) => _ctx.onChange($event)),
    onBlur: _cache[2] || (_cache[2] = ($event) => _ctx.onBlur($event))
  }), null, 16, _hoisted_1$d);
}
var BFormInput = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$o]]);
const _sfc_main$p = defineComponent({
  name: "BFormFloatingLabel",
  props: {
    labelFor: { type: String },
    label: { type: String }
  }
});
const _hoisted_1$c = { class: "form-floating" };
const _hoisted_2$5 = ["for"];
function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$c, [
    renderSlot(_ctx.$slots, "default"),
    createElementVNode("label", { for: _ctx.labelFor }, toDisplayString(_ctx.label), 9, _hoisted_2$5)
  ]);
}
var BFormFloatingLabel = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$n]]);
const _sfc_main$o = defineComponent({
  name: "BFormSelectOption",
  props: {
    value: { required: true },
    disabled: { type: Boolean, default: false }
  }
});
const _hoisted_1$b = ["value", "disabled"];
function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("option", {
    value: _ctx.value,
    disabled: _ctx.disabled
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 8, _hoisted_1$b);
}
var BFormSelectOption = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$m]]);
const _sfc_main$n = defineComponent({
  name: "BFormSelectOptionGroup",
  components: { BFormSelectOption },
  props: {
    label: { type: String, required: true },
    disabledField: { type: String, default: "disabled" },
    htmlField: { type: String, default: "html" },
    options: { type: [Array, Object], default: () => [] },
    textField: { type: String, default: "text" },
    valueField: { type: String, default: "value" }
  },
  setup(props) {
    const formOptions = computed(() => normalizeOptions(props.options));
    const normalizeOption = (option, key = null) => {
      if (Object.prototype.toString.call(option) === "[object Object]") {
        const { valueField, textField, htmlField, disabledField } = props;
        const value = option[valueField];
        const text = option[textField];
        return {
          value: typeof value === "undefined" ? key || text : value,
          text: String(typeof value === "undefined" ? key : text),
          html: option[htmlField],
          disabled: Boolean(option[disabledField])
        };
      }
      return {
        value: key || option,
        text: String(option),
        disabled: false
      };
    };
    const normalizeOptions = (options) => {
      if (Array.isArray(options)) {
        return options.map((option) => normalizeOption(option));
      }
      return [];
    };
    return {
      formOptions
    };
  }
});
const _hoisted_1$a = ["label"];
function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_form_select_option = resolveComponent("b-form-select-option");
  return openBlock(), createElementBlock("optgroup", { label: _ctx.label }, [
    renderSlot(_ctx.$slots, "first"),
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.formOptions, (option, index) => {
      return openBlock(), createBlock(_component_b_form_select_option, mergeProps({
        key: `option_${index}`,
        value: option.value,
        disabled: option.disabled
      }, _ctx.$attrs, {
        textContent: toDisplayString(option.text),
        innerHTML: option.html
      }), null, 16, ["value", "disabled", "textContent", "innerHTML"]);
    }), 128)),
    renderSlot(_ctx.$slots, "default")
  ], 8, _hoisted_1$a);
}
var BFormSelectOptionGroup = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$l]]);
const getNested = (obj, path) => {
  if (!obj)
    return obj;
  if (path in obj)
    return obj[path];
  const paths = path.split(".");
  return getNested(obj[paths[0]], paths.splice(1).join("."));
};
const _sfc_main$m = defineComponent({
  name: "BFormSelect",
  components: { BFormSelectOption, BFormSelectOptionGroup },
  props: {
    ariaInvalid: {
      type: [Boolean, String],
      default: false
    },
    autofocus: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    disabledField: { type: String, default: "disabled" },
    form: { type: String },
    htmlField: { type: String, default: "html" },
    id: { type: String },
    labelField: { type: String, default: "label" },
    multiple: { type: Boolean, default: false },
    name: { type: String },
    options: { type: [Array, Object], default: () => [] },
    optionsField: { type: String, default: "options" },
    plain: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    selectSize: { type: Number, default: 0 },
    size: { type: String },
    state: {
      type: Boolean,
      default: null
    },
    textField: { type: String, default: "text" },
    valueField: { type: String, default: "value" },
    modelValue: { type: [String, Array, Object], default: "" }
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const input = ref();
    const computedId = useId(props.id, "input");
    const handleAutofocus = () => {
      nextTick(() => {
        var _a;
        if (props.autofocus)
          (_a = input.value) == null ? void 0 : _a.focus();
      });
    };
    onMounted(handleAutofocus);
    onActivated(handleAutofocus);
    const classes = computed(() => {
      const { plain, size, state } = props;
      return {
        "form-control": plain,
        [`form-control-${size}`]: size && plain,
        "form-select": !plain,
        [`form-select-${size}`]: size && !plain,
        "is-valid": state === true,
        "is-invalid": state === false
      };
    });
    const computedSelectSize = computed(() => {
      if (props.selectSize || props.plain) {
        return props.selectSize;
      }
      return null;
    });
    const computedAriaInvalid = computed(() => {
      const { ariaInvalid, state } = props;
      if (ariaInvalid) {
        return ariaInvalid.toString();
      }
      return state === false ? "true" : null;
    });
    const formOptions = computed(() => normalizeOptions(props.options));
    const normalizeOption = (option, key = null) => {
      if (Object.prototype.toString.call(option) === "[object Object]") {
        const { valueField, textField, optionsField, labelField, htmlField, disabledField } = props;
        const value = getNested(option, valueField);
        const text = getNested(option, textField);
        const html = getNested(option, htmlField);
        const disabled = getNested(option, disabledField);
        const options = option[optionsField] || null;
        if (options !== null) {
          return {
            label: String(getNested(option, labelField) || text),
            options: normalizeOptions(options)
          };
        }
        return {
          value: typeof value === "undefined" ? key || text : value,
          text: String(typeof value === "undefined" ? key : text),
          html,
          disabled: Boolean(disabled)
        };
      }
      return {
        value: key || option,
        text: String(option),
        disabled: false
      };
    };
    const normalizeOptions = (options) => {
      if (Array.isArray(options)) {
        return options.map((option) => normalizeOption(option));
      } else if (Object.prototype.toString.call(options) === "[object Object]") {
        console.warn('[BootstrapVue warn]: BFormSelect - Setting prop "options" to an object is deprecated. Use the array format instead.');
        return Object.keys(options).map((key) => {
          const el = options[key];
          switch (typeof el) {
            case "object":
              return normalizeOption(el.text, String(el.value));
            default:
              return normalizeOption(el, String(key));
          }
        });
      }
      return [];
    };
    const onChange = (evt) => {
      const { target } = evt;
      const selectedVal = Array.from(target.options).filter((o) => o.selected).map((o) => "_value" in o ? o._value : o.value);
      nextTick(() => {
        emit("change", target.multiple ? selectedVal : selectedVal[0]);
        emit("update:modelValue", target.multiple ? selectedVal : selectedVal[0]);
      });
    };
    const focus2 = () => {
      var _a;
      if (!props.disabled)
        (_a = input.value) == null ? void 0 : _a.focus();
    };
    const blur = () => {
      var _a;
      if (!props.disabled) {
        (_a = input.value) == null ? void 0 : _a.blur();
      }
    };
    return {
      input,
      computedId,
      computedSelectSize,
      computedAriaInvalid,
      classes,
      formOptions,
      onChange,
      focus: focus2,
      blur
    };
  }
});
const _hoisted_1$9 = ["id", "name", "form", "multiple", "size", "disabled", "required", "aria-required", "aria-invalid", "value"];
function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_form_select_option_group = resolveComponent("b-form-select-option-group");
  const _component_b_form_select_option = resolveComponent("b-form-select-option");
  return openBlock(), createElementBlock("select", mergeProps({
    id: _ctx.computedId,
    ref: "input",
    class: _ctx.classes,
    name: _ctx.name,
    form: _ctx.form || null,
    multiple: _ctx.multiple || null,
    size: _ctx.computedSelectSize,
    disabled: _ctx.disabled,
    required: _ctx.required,
    "aria-required": _ctx.required ? "true" : null,
    "aria-invalid": _ctx.computedAriaInvalid
  }, _ctx.$attrs, {
    value: _ctx.modelValue,
    onChange: _cache[0] || (_cache[0] = ($event) => _ctx.onChange($event))
  }), [
    renderSlot(_ctx.$slots, "first"),
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.formOptions, (option, index) => {
      return openBlock(), createElementBlock(Fragment, null, [
        Array.isArray(option.options) ? (openBlock(), createBlock(_component_b_form_select_option_group, {
          key: `option_${index}`,
          label: option.label,
          options: option.options
        }, null, 8, ["label", "options"])) : (openBlock(), createBlock(_component_b_form_select_option, {
          key: `option_${index}`,
          value: option.value,
          disabled: option.disabled,
          textContent: toDisplayString(option.text),
          innerHTML: option.html
        }, null, 8, ["value", "disabled", "textContent", "innerHTML"]))
      ], 64);
    }), 256)),
    renderSlot(_ctx.$slots, "default")
  ], 16, _hoisted_1$9);
}
var BFormSelect = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$k]]);
const _sfc_main$l = defineComponent({
  name: "BFormText",
  props: {
    id: { type: String },
    tag: { type: String, default: "small" },
    textVariant: { type: String, default: "muted" }
  },
  setup(props) {
    const classes = computed(() => ({
      [`text-${props.textVariant}`]: props.textVariant ? props.textVariant : null
    }));
    return {
      classes
    };
  }
});
function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    id: _ctx.id,
    class: normalizeClass(["form-text", _ctx.classes])
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["id", "class"]);
}
var BFormText = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$j]]);
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  name: "BIcon",
  props: {
    icon: {
      type: String,
      required: true
    },
    variant: {
      type: String
    },
    size: {
      type: String
    },
    flipH: {
      type: Boolean
    },
    flipV: {
      type: Boolean
    },
    rotate: {
      type: [String, Number],
      validator: (value) => value >= -360 && value <= 360
    },
    animation: {
      type: String
    }
  },
  computed: {
    cssClasses() {
      const classes = [];
      if (this.variant)
        classes.push(`bootstrap-icon--variant-${this.variant}`);
      if (this.size)
        classes.push(`bootstrap-icon--size-${this.size}`);
      if (this.animation)
        classes.push(`bootstrap-icon--animation-${this.animation}`);
      return classes;
    },
    svgTransform() {
      if (!this.flipH && !this.flipV && !this.rotate)
        return "";
      let scale;
      let rotate;
      if (this.flipV && this.flipH) {
        scale = "-1 -1";
      } else if (this.flipH) {
        scale = "-1 1";
      } else if (this.flipV) {
        scale = "1 -1";
      }
      if (this.rotate) {
        rotate = this.rotate;
      }
      return (scale ? `scale(${scale})` : "") + (rotate ? `rotate(${rotate})` : "");
    },
    svgSprite() {
      return BootstrapIcons;
    }
  },
  methods: {
    upperFirst(str) {
      if (typeof str !== "string")
        return str;
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }
});
const _hoisted_1$8 = ["transform"];
const _hoisted_2$4 = ["xlink:href"];
function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", mergeProps({
    class: ["bootstrap-icon", _ctx.cssClasses]
  }, _ctx.$attrs), [
    createElementVNode("g", {
      transform: _ctx.svgTransform,
      "transform-origin": "center"
    }, [
      createElementVNode("use", {
        "xlink:href": `${_ctx.svgSprite}#${_ctx.icon}`
      }, null, 8, _hoisted_2$4)
    ], 8, _hoisted_1$8)
  ], 16);
}
var BIcon = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$i]]);
const BLANK_TEMPLATE = '<svg width="%{w}" height="%{h}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %{w} %{h}" preserveAspectRatio="none"><rect width="100%" height="100%" style="fill:%{f};"></rect></svg>';
const makeBlankImgSrc = (width, height, color) => {
  const src = encodeURIComponent(BLANK_TEMPLATE.replace("%{w}", String(width)).replace("%{h}", String(height)).replace("%{f}", color));
  return `data:image/svg+xml;charset=UTF-8,${src}`;
};
const _sfc_main$j = defineComponent({
  name: "BImg",
  props: {
    src: { type: String },
    srcset: { type: [String, Array] },
    sizes: { type: [String, Array] },
    alt: { type: String, default: null },
    width: { type: [Number, String] },
    height: { type: [Number, String] },
    block: { type: Boolean, default: false },
    fluid: { type: Boolean, default: false },
    fluidGrow: { type: Boolean, default: false },
    rounded: { type: [Boolean, String], default: false },
    thumbnail: { type: Boolean, default: false },
    left: { type: Boolean, default: false },
    right: { type: Boolean, default: false },
    center: { type: Boolean, default: false },
    blank: { type: Boolean, default: false },
    blankColor: { type: String, default: "transparent" }
  },
  setup(props) {
    const attrs = computed(() => {
      let { src } = props;
      let width = (typeof props.width === "number" ? props.width : parseInt(props.width, 10)) || null;
      let height = (typeof props.height === "number" ? props.height : parseInt(props.height, 10)) || null;
      let srcset = "";
      if (typeof props.srcset === "string")
        srcset = props.srcset.split(",").filter((x) => x).join(",");
      else if (Array.isArray(props.srcset))
        srcset = props.srcset.filter((x) => x).join(",");
      let sizes = "";
      if (typeof props.sizes === "string")
        sizes = props.sizes.split(",").filter((x) => x).join(",");
      else if (Array.isArray(props.sizes))
        sizes = props.sizes.filter((x) => x).join(",");
      if (props.blank) {
        if (!height && width) {
          height = width;
        } else if (!width && height) {
          width = height;
        }
        if (!width && !height) {
          width = 1;
          height = 1;
        }
        src = makeBlankImgSrc(width, height, props.blankColor || "transparent");
        srcset = "";
        sizes = "";
      }
      return {
        src,
        alt: props.alt,
        width: width || null,
        height: height || null,
        srcset: srcset || null,
        sizes: sizes || null
      };
    });
    const classes = computed(() => {
      let align = "";
      let { block } = props;
      if (props.left) {
        align = "float-left";
      } else if (props.right) {
        align = "float-right";
      } else if (props.center) {
        align = "mx-auto";
        block = true;
      }
      return {
        "img-thumbnail": props.thumbnail,
        "img-fluid": props.fluid || props.fluidGrow,
        "w-100": props.fluidGrow,
        "rounded": props.rounded === "" || props.rounded === true,
        [`rounded-${props.rounded}`]: typeof props.rounded === "string" && props.rounded !== "",
        [align]: !!align,
        "d-block": block
      };
    });
    return {
      attrs,
      classes
    };
  }
});
function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("img", mergeProps({ class: _ctx.classes }, _ctx.attrs), null, 16);
}
var BImg = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$h]]);
const _sfc_main$i = defineComponent({
  name: "BInputGroup",
  props: {
    size: { type: String },
    append: { type: String },
    prepend: { type: String }
  },
  setup(props) {
    const classes = computed(() => ({
      "input-group-sm": props.size === "sm",
      "input-group-lg": props.size === "lg"
    }));
    return {
      classes
    };
  }
});
const _hoisted_1$7 = {
  key: 0,
  class: "input-group-text"
};
const _hoisted_2$3 = {
  key: 0,
  class: "input-group-text"
};
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["input-group", _ctx.classes]),
    role: "group"
  }, [
    renderSlot(_ctx.$slots, "prepend", {}, () => [
      _ctx.prepend ? (openBlock(), createElementBlock("span", _hoisted_1$7, toDisplayString(_ctx.prepend), 1)) : createCommentVNode("", true)
    ]),
    renderSlot(_ctx.$slots, "default"),
    renderSlot(_ctx.$slots, "append", {}, () => [
      _ctx.append ? (openBlock(), createElementBlock("span", _hoisted_2$3, toDisplayString(_ctx.append), 1)) : createCommentVNode("", true)
    ])
  ], 2);
}
var BInputGroup = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$g]]);
const _sfc_main$h = defineComponent({
  name: "BInputGroupText",
  props: {
    tag: { type: String, default: "span" }
  }
});
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), { class: "input-group-text" }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  });
}
var BInputGroupText = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$f]]);
const _sfc_main$g = defineComponent({
  name: "BLink",
  props: {
    active: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    href: { type: String, default: null },
    rel: { type: String, default: null },
    target: { type: String, default: "_self" },
    activeClass: { type: String },
    append: { type: Boolean, default: false },
    event: { type: [String, Array], default: "click" },
    exact: { type: Boolean, default: false },
    exactActiveClass: { type: String },
    replace: { type: Boolean, default: false },
    routerTag: { type: String, default: "a" },
    to: { type: [String, Object], default: null },
    routerComponentName: { type: String, default: "router-link" }
  },
  setup(props) {
    const tag = computed(() => {
      const { to, disabled, routerComponentName } = props;
      if (disabled || !to) {
        return "a";
      }
      return routerComponentName;
    });
    return {
      tag
    };
  }
});
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    href: _ctx.href ? _ctx.href : null,
    rel: _ctx.target === "_blank" && _ctx.rel === null ? "noopener" : _ctx.rel || null,
    target: _ctx.target,
    tabindex: _ctx.disabled ? "-1" : typeof _ctx.$attrs.tabindex === "undefined" ? null : _ctx.$attrs.tabindex,
    "aria-disabled": _ctx.disabled ? "true" : null,
    class: normalizeClass({ active: _ctx.active, disabled: _ctx.disabled })
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["href", "rel", "target", "tabindex", "aria-disabled", "class"]);
}
var BLink = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$e]]);
const _sfc_main$f = defineComponent({
  name: "BListGroup",
  props: {
    flush: { type: Boolean, default: false },
    horizontal: { type: [Boolean, String], default: false },
    numbered: { type: Boolean, default: false },
    tag: { type: String, default: "div" }
  },
  setup(props) {
    const classes = computed(() => {
      const horizontal = props.flush ? false : props.horizontal;
      return {
        "list-group-flush": props.flush,
        "list-group-horizontal": horizontal === true,
        [`list-group-horizontal-${horizontal}`]: typeof horizontal === "string",
        "list-group-numbered": props.numbered
      };
    });
    return {
      classes
    };
  }
});
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    class: normalizeClass(["list-group", _ctx.classes])
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]);
}
var BListGroup = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$d]]);
const ACTION_TAGS = ["a", "router-link", "button", "b-link"];
const _sfc_main$e = defineComponent({
  name: "BListGroupItem",
  props: {
    action: { type: Boolean, default: null },
    active: { type: Boolean, default: false },
    button: { type: Boolean, default: null },
    disabled: { type: Boolean, default: false },
    tag: { type: String, default: "div" },
    variant: { type: String }
  },
  setup(props, context) {
    const link = false;
    //!!(props.href || props.to);
    const tagComputed = computed(() => props.button ? "button" : props.tag);
    const classes = computed(() => {
      const { button, variant, active, disabled } = props;
      const action = props.action || link || button || ACTION_TAGS.includes(props.tag);
      return {
        [`list-group-item-${variant}`]: variant,
        "list-group-item-action": action,
        active,
        disabled
      };
    });
    const attrs = computed(() => {
      const attrs2 = {};
      if (props.button) {
        if (!context.attrs || !context.attrs.type) {
          attrs2.type = "button";
        }
        if (props.disabled) {
          attrs2.disabled = true;
        }
      }
      return attrs2;
    });
    return {
      tagComputed,
      classes,
      attrs
    };
  }
});
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tagComputed), mergeProps({
    class: ["list-group-item", _ctx.classes],
    "aria-current": _ctx.active ? true : null,
    "aria-disabled": _ctx.disabled ? true : null
  }, _ctx.attrs), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16, ["class", "aria-current", "aria-disabled"]);
}
var BListGroupItem = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$c]]);
const _sfc_main$d = defineComponent({
  name: "BModal",
  props: {
    modelValue: { type: Boolean, default: false },
    noBackdrop: { type: Boolean, default: false },
    centered: { type: Boolean, default: false },
    fade: { type: Boolean, default: false },
    fullscreen: { type: [Boolean, String], default: false },
    id: { type: String },
    title: { type: String },
    scrollable: { type: Boolean, default: false },
    show: { type: Boolean, default: false },
    size: { type: String },
    staticBackdrop: { type: Boolean }
  },
  emits: ["update:modelValue", "show", "shown", "hide", "hidden", "hide-prevented", "ok", "cancel"],
  setup(props, { emit }) {
    const element = ref();
    const instance = ref();
    const classes = computed(() => ({
      fade: props.fade,
      show: props.show
    }));
    const modalDialogClasses = computed(() => ({
      "modal-fullscreen": typeof props.fullscreen === "boolean" ? props.fullscreen : false,
      [`modal-fullscreen-${props.fullscreen}-down`]: typeof props.fullscreen === "string" ? props.fullscreen : false,
      [`modal-${props.size}`]: props.size,
      "modal-dialog-centered": props.centered,
      "modal-dialog-scrollable": props.scrollable
    }));
    useEventListener(element, "shown.bs.modal", () => emit("shown"));
    useEventListener(element, "hidden.bs.modal", () => emit("hidden"));
    useEventListener(element, "hidePrevented.bs.modal", () => emit("hide-prevented"));
    useEventListener(element, "show.bs.modal", () => {
      emit("show");
      emit("update:modelValue", true);
    });
    useEventListener(element, "hide.bs.modal", () => {
      emit("hide");
      emit("update:modelValue", false);
    });
    onMounted(() => {
      var _a;
      instance.value = new Modal(element.value, {
        backdrop: props.staticBackdrop ? "static" : !props.noBackdrop,
        keyboard: !props.staticBackdrop
      });
      if (props.modelValue) {
        (_a = instance.value) == null ? void 0 : _a.show();
      }
    });
    watch(() => props.modelValue, (value) => {
      var _a, _b;
      if (value) {
        (_a = instance.value) == null ? void 0 : _a.show();
      } else {
        (_b = instance.value) == null ? void 0 : _b.hide();
      }
    });
    return {
      element,
      classes,
      modalDialogClasses
    };
  }
});
const _hoisted_1$6 = ["id"];
const _hoisted_2$2 = { class: "modal-content" };
const _hoisted_3$2 = { class: "modal-header" };
const _hoisted_4$1 = { class: "modal-title" };
const _hoisted_5$1 = /* @__PURE__ */ createElementVNode("button", {
  type: "button",
  class: "btn-close",
  "data-bs-dismiss": "modal",
  "aria-label": "Close"
}, null, -1);
const _hoisted_6 = { class: "modal-body" };
const _hoisted_7 = { class: "modal-footer" };
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Teleport, { to: "body" }, [
    createElementVNode("div", {
      id: _ctx.id,
      ref: "element",
      class: normalizeClass(["modal", _ctx.classes]),
      tabindex: "-1"
    }, [
      createElementVNode("div", {
        class: normalizeClass(["modal-dialog", _ctx.modalDialogClasses])
      }, [
        createElementVNode("div", _hoisted_2$2, [
          createElementVNode("div", _hoisted_3$2, [
            createElementVNode("h5", _hoisted_4$1, [
              renderSlot(_ctx.$slots, "title", {}, () => [
                createTextVNode(toDisplayString(_ctx.title), 1)
              ])
            ]),
            _hoisted_5$1
          ]),
          createElementVNode("div", _hoisted_6, [
            renderSlot(_ctx.$slots, "default")
          ]),
          createElementVNode("div", _hoisted_7, [
            createElementVNode("button", {
              type: "button",
              class: "btn btn-secondary",
              "data-bs-dismiss": "modal",
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("cancel"))
            }, " Cancel "),
            createElementVNode("button", {
              type: "button",
              class: "btn btn-primary",
              "data-bs-dismiss": "modal",
              onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("ok"))
            }, " OK ")
          ])
        ])
      ], 2)
    ], 10, _hoisted_1$6)
  ]);
}
var BModal$1 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$b]]);
const _sfc_main$c = defineComponent({
  name: "BNav",
  props: {
    align: { type: String },
    fill: { type: Boolean, default: false },
    justified: { type: Boolean, default: false },
    pills: { type: Boolean, default: false },
    tabs: { type: Boolean, default: false },
    vertical: { type: Boolean, default: false }
  },
  setup(props) {
    const classes = computed(() => ({
      "flex-column": props.vertical,
      [`justify-content-${props.align}`]: props.align,
      "nav-tabs": props.tabs,
      "nav-pills": props.pills,
      "nav-fill": props.fill,
      "nav-justified": props.justified
    }));
    return {
      classes
    };
  }
});
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("ul", {
    class: normalizeClass(["nav", _ctx.classes])
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
var BNav = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$a]]);
const _sfc_main$b = defineComponent({
  name: "BNavItem",
  props: {
    active: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  setup(props) {
    const classes = computed(() => ({
      active: props.active,
      disabled: props.disabled
    }));
    return {
      classes
    };
  }
});
const _hoisted_1$5 = ["tabindex", "aria-disabled"];
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("li", {
    class: normalizeClass(["nav-item", _ctx.classes])
  }, [
    createElementVNode("a", {
      href: "#",
      class: "nav-link",
      tabindex: _ctx.disabled ? -1 : null,
      "aria-disabled": _ctx.disabled ? true : null
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 8, _hoisted_1$5)
  ], 2);
}
var BNavItem = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$9]]);
const _sfc_main$a = defineComponent({
  name: "BNavItemDropdown",
  components: {
    BDropdown
  },
  props: {
    autoClose: { type: String, default: "true" },
    id: { type: String },
    dark: { type: Boolean, default: false },
    dropleft: { type: Boolean, default: false },
    dropright: { type: Boolean, default: false },
    dropup: { type: Boolean, default: false },
    right: { type: [Boolean, String], default: false },
    left: { type: [Boolean, String], default: false },
    text: { type: String },
    offset: { type: String },
    offsetParent: { type: Boolean, default: false },
    split: { type: Boolean, default: false },
    splitVariant: { type: String },
    size: { type: String },
    variant: { type: String, default: "link" }
  },
  setup(props) {
    return {
      props
    };
  }
});
const _hoisted_1$4 = { class: "nav-item dropdown" };
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_dropdown = resolveComponent("b-dropdown");
  return openBlock(), createElementBlock("li", _hoisted_1$4, [
    createVNode(_component_b_dropdown, normalizeProps(guardReactiveProps(_ctx.$props)), {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "default")
      ]),
      _: 3
    }, 16)
  ]);
}
var BNavItemDropdown = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$8]]);
const _sfc_main$9 = defineComponent({
  name: "BOffcanvas",
  props: {
    modelValue: { type: Boolean, default: false },
    bodyScrolling: { type: Boolean, default: false },
    backdrop: { type: Boolean, default: true },
    placement: { type: String, default: "start" },
    title: { type: String, required: true }
  },
  emits: ["update:modelValue", "show", "shown", "hide", "hidden"],
  setup(props, { emit }) {
    const element = ref();
    const instance = ref();
    useEventListener(element, "shown.bs.offcanvas", () => emit("shown"));
    useEventListener(element, "hidden.bs.offcanvas", () => emit("hidden"));
    useEventListener(element, "show.bs.offcanvas", () => {
      emit("show");
      emit("update:modelValue", true);
    });
    useEventListener(element, "hide.bs.offcanvas", () => {
      emit("hide");
      emit("update:modelValue", false);
    });
    onMounted(() => {
      var _a;
      instance.value = new Offcanvas(element.value);
      if (props.modelValue) {
        (_a = instance.value) == null ? void 0 : _a.show(element.value);
      }
    });
    const classes = computed(() => ({
      [`offcanvas-${props.placement}`]: props.placement
    }));
    watch(() => props.modelValue, (value) => {
      var _a, _b;
      if (value) {
        (_a = instance.value) == null ? void 0 : _a.show(element.value);
      } else {
        (_b = instance.value) == null ? void 0 : _b.hide();
      }
    });
    return {
      element,
      classes
    };
  }
});
const _hoisted_1$3 = ["data-bs-backdrop", "data-bs-scroll"];
const _hoisted_2$1 = { class: "offcanvas-header" };
const _hoisted_3$1 = {
  id: "offcanvasLabel",
  class: "offcanvas-title"
};
const _hoisted_4 = /* @__PURE__ */ createElementVNode("button", {
  type: "button",
  class: "btn-close text-reset",
  "data-bs-dismiss": "offcanvas",
  "aria-label": "Close"
}, null, -1);
const _hoisted_5 = { class: "offcanvas-body" };
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    ref: "element",
    class: normalizeClass(["offcanvas", _ctx.classes]),
    tabindex: "-1",
    "aria-labelledby": "offcanvasLabel",
    "data-bs-backdrop": _ctx.backdrop,
    "data-bs-scroll": _ctx.bodyScrolling
  }, [
    createElementVNode("div", _hoisted_2$1, [
      createElementVNode("h5", _hoisted_3$1, [
        renderSlot(_ctx.$slots, "title", {}, () => [
          createTextVNode(toDisplayString(_ctx.title), 1)
        ])
      ]),
      _hoisted_4
    ]),
    createElementVNode("div", _hoisted_5, [
      renderSlot(_ctx.$slots, "default")
    ])
  ], 10, _hoisted_1$3);
}
var BOffcanvas = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$7]]);
const DEFAULT_LIMIT = 5;
const DEFAULT_PER_PAGE = 20;
const DEFAULT_TOTAL_ROWS = 0;
const ELLIPSIS_THRESHOLD = 3;
const sanitizePerPage = (value) => Math.max(toInteger(value) || DEFAULT_PER_PAGE, 1);
const sanitizeTotalRows = (value) => Math.max(toInteger(value) || DEFAULT_TOTAL_ROWS, 0);
const _sfc_main$8 = defineComponent({
  name: "BPagination",
  props: {
    currentPage: { type: Number, default: 1 },
    perPage: { type: Number, default: DEFAULT_PER_PAGE },
    totalRows: { type: Number, default: DEFAULT_TOTAL_ROWS },
    limit: { type: Number, default: DEFAULT_LIMIT },
    firstNumber: { type: Boolean, default: false },
    lastNumber: { type: Boolean, default: false },
    hideEllipsis: { type: Boolean, default: false },
    ellipsisClass: { type: Array, default: () => [] },
    ellipsisText: { type: String, default: "\u2026" },
    align: { type: String, default: "left" }
  },
  emits: ["update:modelValue", "update:current-page"],
  setup(props, { emit, slots }) {
    const numberOfPages = computed(() => Math.ceil(sanitizeTotalRows(props.totalRows) / sanitizePerPage(props.perPage)));
    const currentPage = toRef(props, "currentPage");
    const pLimit = toRef(props, "limit");
    const pHideEllipsis = toRef(props, "hideEllipsis");
    const pFirstNumber = toRef(props, "firstNumber");
    const pLastNumber = toRef(props, "lastNumber");
    ref();
    const startNumber = computed(() => {
      let lStartNumber = 1;
      const cLimit = unref(pLimit);
      const cNumberOfPages = unref(numberOfPages);
      const cNumberOfLinks = unref(numberOfLinks);
      const cCurrentPage = unref(currentPage);
      unref(pFirstNumber);
      const cLastNumber = unref(pLastNumber);
      const pagesLeft = cNumberOfPages - cCurrentPage;
      if (pagesLeft + 2 < cLimit && cLimit > ELLIPSIS_THRESHOLD) {
        lStartNumber = cNumberOfPages - cNumberOfLinks + 1;
      } else {
        lStartNumber = cCurrentPage - Math.floor(cNumberOfLinks / 2);
      }
      if (lStartNumber < 1) {
        lStartNumber = 1;
      } else if (lStartNumber > cNumberOfPages - cNumberOfLinks) {
        lStartNumber = cNumberOfPages - cNumberOfLinks + 1;
      }
      if (cLimit <= ELLIPSIS_THRESHOLD) {
        if (cLastNumber && cNumberOfPages === lStartNumber + cNumberOfLinks - 1) {
          lStartNumber = Math.max(lStartNumber - 1, 1);
        }
      }
      return lStartNumber;
    });
    const showFirstDots = computed(() => {
      const cLimit = unref(pLimit);
      const cNumberOfPages = unref(numberOfPages);
      unref(numberOfLinks);
      const cCurrentPage = unref(currentPage);
      const cHideEllipsis = unref(pHideEllipsis);
      const cFirstNumber = unref(pFirstNumber);
      const pagesLeft = cNumberOfPages - cCurrentPage;
      let rShowDots = false;
      if (pagesLeft + 2 < cLimit && cLimit > ELLIPSIS_THRESHOLD) {
        if (cLimit > ELLIPSIS_THRESHOLD) {
          rShowDots = true;
        }
      } else {
        if (cLimit > ELLIPSIS_THRESHOLD) {
          rShowDots = !!(!cHideEllipsis || cFirstNumber);
        }
      }
      if (startNumber.value <= 1) {
        rShowDots = false;
      }
      if (rShowDots && cFirstNumber && startNumber.value < 4) {
        rShowDots = false;
      }
      return rShowDots;
    });
    const numberOfLinks = computed(() => {
      const cLimit = unref(pLimit);
      const cNumberOfPages = unref(numberOfPages);
      const cHideEllipsis = unref(pHideEllipsis);
      const cFirstNumber = unref(pFirstNumber);
      const cLastNumber = unref(pLastNumber);
      let n = cLimit;
      if (cNumberOfPages <= cLimit) {
        n = cNumberOfPages;
      } else if (currentPage.value < cLimit - 1 && cLimit > ELLIPSIS_THRESHOLD) {
        if (!cHideEllipsis || cLastNumber) {
          n = cLimit - (cFirstNumber ? 0 : 1);
        }
        n = Math.min(n, cLimit);
      } else if (cNumberOfPages - currentPage.value + 2 < cLimit && cLimit > ELLIPSIS_THRESHOLD) {
        if (!cHideEllipsis || cFirstNumber) {
          n = cLimit - (cLastNumber ? 0 : 1);
        }
      } else {
        if (cLimit > ELLIPSIS_THRESHOLD) {
          n = cLimit - (cHideEllipsis ? 0 : 2);
        }
      }
      return n;
    });
    const pagenumberfinal = computed(() => {
      unref(pLimit);
      const cNumberOfPages = unref(numberOfPages);
      unref(pHideEllipsis);
      const cFirstNumber = unref(pFirstNumber);
      const cLastNumber = unref(pLastNumber);
      let n = unref(numberOfLinks);
      if (showFirstDots.value && cFirstNumber && startNumber.value < 4) {
        n = n + 2;
      }
      const lastPageNumber = startNumber.value + n - 1;
      if (showLastDots.value && cLastNumber && lastPageNumber > cNumberOfPages - 3) {
        n = n + (lastPageNumber === cNumberOfPages - 2 ? 2 : 3);
      }
      n = Math.min(n, cNumberOfPages - startNumber.value + 1);
      return n;
    });
    const showLastDots = computed(() => {
      const cLimit = unref(pLimit);
      const cNumberOfPages = unref(numberOfPages);
      const cNumberOfLinks = unref(numberOfLinks);
      const cCurrentPage = unref(currentPage);
      const cHideEllipsis = unref(pHideEllipsis);
      const cLastNumber = unref(pLastNumber);
      unref(pFirstNumber);
      const paginationWindowEnd = cNumberOfPages - cNumberOfLinks;
      let rShowDots = false;
      if (cCurrentPage < cLimit - 1 && cLimit > ELLIPSIS_THRESHOLD) {
        if (!cHideEllipsis || cLastNumber) {
          rShowDots = true;
        }
      } else {
        if (cLimit > ELLIPSIS_THRESHOLD) {
          rShowDots = !!(!cHideEllipsis || cLastNumber);
        }
      }
      if (startNumber.value > paginationWindowEnd) {
        rShowDots = false;
      }
      const lastPageNumber = startNumber.value + cNumberOfLinks - 1;
      if (rShowDots && cLastNumber && lastPageNumber > cNumberOfPages - 3) {
        rShowDots = false;
      }
      return rShowDots;
    });
    const pagination = reactive({
      perPage: sanitizePerPage(props.perPage),
      totalRows: sanitizeTotalRows(props.totalRows),
      numberOfPages
    });
    const pageClick = (event, pageNumber) => {
      if (pageNumber === currentPage.value) {
        return;
      }
      emit("update:current-page", pageNumber);
    };
    watch(pagination, (oldValue, newValue) => {
      if (!isUndefinedOrNull(oldValue)) {
        if (newValue.perPage !== oldValue.perPage && newValue.totalRows === oldValue.totalRows) {
          currentPage.value = 1;
        } else if (newValue.numberOfPages !== oldValue.numberOfPages && currentPage.value > newValue.numberOfPages) {
          currentPage.value = 1;
        }
      }
    });
    const pages = computed(() => Array.apply(null, { length: numberOfLinks.value }).map((_, i) => ({
      number: startNumber.value + i,
      classes: null
    })));
    return {
      pageClick,
      pages,
      numberOfPages,
      numberOfLinks,
      startNumber,
      showLastDots,
      pagenumberfinal,
      showFirstDots
    };
  },
  computed: {},
  render() {
    const buttons = [];
    const pageNumbers = this.pages.map((p) => p.number);
    const isActivePage = (pageNumber) => pageNumber === this.currentPage;
    const noCurrentPage = this.currentPage < 1;
    const fill = this.align === "fill";
    const makeEndBtn = (linkTo, btnText, pageTest) => {
      const isDisabled2 = isActivePage(pageTest) || noCurrentPage || linkTo < 1 || linkTo > this.numberOfPages;
      const pageNumber = linkTo < 1 ? 1 : linkTo > this.numberOfPages ? this.numberOfPages : linkTo;
      return h("li", {
        class: ["page-item", { disabled: isDisabled2 }]
      }, h(isDisabled2 ? "span" : "button", {
        class: ["page-link"],
        onClick: (event) => {
          if (isDisabled2) {
            return;
          }
          this.pageClick(event, pageNumber);
        }
      }, btnText));
    };
    const makeEllipsis = (isLast) => {
      return h("li", {
        class: [
          "page-item",
          "disabled",
          "bv-d-xs-down-none",
          fill ? "flex-fill" : "",
          this.ellipsisClass
        ],
        role: "separator",
        key: `ellipsis-${isLast ? "last" : "first"}`
      }, [
        h("span", { class: ["page-link"] }, "...")
      ]);
    };
    const makePageButton = (page, idx) => {
      const active = isActivePage(page.number);
      page.number;
      this.disabled ? null : active || noCurrentPage && idx === 0 ? "0" : "-1";
      const inner = h(this.disabled ? "span" : "button", {
        class: ["page-link", { "flex-grow-1": !this.disabled && fill }],
        onClick: (event) => {
          this.pageClick(event, page.number);
        }
      }, page.number);
      return h("li", {
        class: [
          "page-item",
          {
            "disabled": this.disabled,
            active,
            "flex-fill": fill,
            "d-flex": fill && !this.disabled
          }
        ],
        key: `page-${page.number}`
      }, inner);
    };
    const previousButton = makeEndBtn(this.currentPage - 1, "Previous", 1);
    buttons.push(previousButton);
    if (this.firstNumber && pageNumbers[0] !== 1) {
      buttons.push(makePageButton({ number: 1 }, 0));
    }
    if (this.showFirstDots) {
      buttons.push(makeEllipsis(false));
    }
    this.pages.forEach((page) => {
      const active = isActivePage(page.number);
      const button = h("li", {
        "class": ["page-item", { active }],
        "aria-current": active ? "page" : null
      }, h("button", {
        class: ["page-link"],
        onClick: (event) => {
          this.pageClick(event, page.number);
        }
      }, page.number));
      buttons.push(button);
    });
    const nextButton = makeEndBtn(this.currentPage + 1, "Next", this.numberOfPages);
    if (this.showLastDots) {
      buttons.push(makeEllipsis(true));
    }
    if (this.lastNumber && pageNumbers[pageNumbers.length - 1] !== this.numberOfPages) {
      buttons.push(makePageButton({ number: this.numberOfPages }, -1));
    }
    buttons.push(nextButton);
    return h("nav", {}, h("ul", { class: "pagination" }, buttons));
  }
});
const _sfc_main$7 = defineComponent({
  name: "BPopover",
  props: {
    content: { type: String },
    id: { type: String },
    noninteractive: { type: Boolean, default: false },
    placement: { type: String, default: "right" },
    target: { type: String, required: true },
    title: { type: String },
    triggers: { type: String, default: "click" },
    show: { type: Boolean, default: false },
    variant: { type: String, default: void 0 }
  },
  emits: ["show", "shown", "hide", "hidden", "inserted"],
  setup(props, { emit }) {
    const element = ref();
    const target = ref();
    const instance = ref();
    const titleRef = ref();
    const contentRef = ref();
    const classes = computed(() => ({
      [`b-popover-${props.variant}`]: props.variant
    }));
    onMounted(() => {
      var _a, _b, _c, _d;
      instance.value = new Popover(`#${props.target}`, {
        container: "body",
        trigger: props.triggers,
        placement: props.placement,
        title: ((_a = titleRef.value) == null ? void 0 : _a.innerHTML) || "",
        content: ((_b = contentRef.value) == null ? void 0 : _b.innerHTML) || "",
        html: true
      });
      if (document.getElementById(props.target)) {
        target.value = document.getElementById(props.target);
      }
      (_d = (_c = element.value) == null ? void 0 : _c.parentNode) == null ? void 0 : _d.removeChild(element.value);
      if (props.show) {
        instance.value.show();
      }
    });
    watch(() => props.show, (show, oldVal) => {
      var _a, _b;
      if (show !== oldVal) {
        if (show) {
          (_a = instance.value) == null ? void 0 : _a.show();
        } else {
          (_b = instance.value) == null ? void 0 : _b.hide();
        }
      }
    });
    useEventListener(target, "show.bs.popover", () => emit("show"));
    useEventListener(target, "shown.bs.popover", () => emit("shown"));
    useEventListener(target, "hide.bs.popover", () => emit("hide"));
    useEventListener(target, "hidden.bs.popover", () => emit("hidden"));
    useEventListener(target, "inserted.bs.popover", () => emit("inserted"));
    return {
      element,
      titleRef,
      contentRef,
      classes
    };
  }
});
const _hoisted_1$2 = ["id"];
const _hoisted_2 = { ref: "titleRef" };
const _hoisted_3 = { ref: "contentRef" };
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    id: _ctx.id,
    ref: "element",
    class: normalizeClass(["popover b-popover", _ctx.classes]),
    role: "tooltip",
    tabindex: "-1"
  }, [
    createElementVNode("div", _hoisted_2, [
      renderSlot(_ctx.$slots, "title", {}, () => [
        createTextVNode(toDisplayString(_ctx.title), 1)
      ])
    ], 512),
    createElementVNode("div", _hoisted_3, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(toDisplayString(_ctx.content), 1)
      ])
    ], 512)
  ], 10, _hoisted_1$2);
}
var BPopover$1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6]]);
const injectionKey = Symbol();
const _sfc_main$6 = defineComponent({
  name: "BProgress",
  props: {
    animated: { type: Boolean, default: false },
    max: { type: [Number, String] },
    height: { type: String },
    precision: { type: [Number, String], default: 0 },
    showProgress: { type: Boolean, default: false },
    showValue: { type: Boolean, default: false },
    striped: { type: Boolean, default: false },
    value: { type: [Number, String], default: 0 },
    variant: { type: String }
  },
  setup(props) {
    provide(injectionKey, {
      animated: props.animated,
      max: props.max,
      showProgress: props.showProgress,
      showValue: props.showValue,
      striped: props.striped
    });
  }
});
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_progress_bar = resolveComponent("b-progress-bar");
  return openBlock(), createElementBlock("div", {
    class: "progress",
    style: normalizeStyle({ height: _ctx.height })
  }, [
    renderSlot(_ctx.$slots, "default", {}, () => [
      createVNode(_component_b_progress_bar, normalizeProps(guardReactiveProps({
        animated: _ctx.animated,
        max: _ctx.max,
        precision: _ctx.precision,
        showProgress: _ctx.showProgress,
        showValue: _ctx.showValue,
        striped: _ctx.striped,
        value: _ctx.value,
        variant: _ctx.variant
      })), null, 16)
    ])
  ], 4);
}
var BProgress = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5]]);
const _sfc_main$5 = defineComponent({
  name: "BProgressBar",
  props: {
    animated: { type: Boolean, default: false },
    label: { type: String },
    labelHtml: { type: String },
    max: { type: [Number, String] },
    precision: { type: [Number, String], default: 0 },
    showProgress: { type: Boolean, default: false },
    showValue: { type: Boolean, default: false },
    striped: { type: Boolean, default: false },
    value: { type: [Number, String], default: 0 },
    variant: { type: String }
  },
  setup(props, { slots }) {
    const parent = inject(injectionKey);
    const classes = computed(() => ({
      "progress-bar-animated": props.animated || (parent == null ? void 0 : parent.animated),
      "progress-bar-striped": props.striped || (parent == null ? void 0 : parent.striped) || props.animated || (parent == null ? void 0 : parent.animated),
      [`bg-${props.variant}`]: props.variant
    }));
    const computedLabel = computed(() => {
      if (props.showValue || (parent == null ? void 0 : parent.showValue)) {
        return parseFloat(props.value).toFixed(props.precision);
      }
      if (props.showProgress || (parent == null ? void 0 : parent.showProgress)) {
        const progress = (props.value * 100 / parseInt(props.max || 100)).toString();
        return parseFloat(progress).toFixed(props.precision);
      }
      return props.label || "";
    });
    const width = computed(() => {
      if (props.max || (parent == null ? void 0 : parent.max)) {
        return `${props.value * 100 / parseInt(props.max || (parent == null ? void 0 : parent.max))}%`;
      }
      return typeof props.value === "string" ? props.value : `${props.value}%`;
    });
    const progressProps = computed(() => {
      const rawProps = {
        "class": ["progress-bar", classes.value],
        "role": "progressbar",
        "aria-valuenow": props.value,
        "aria-valuemin": 0,
        "aria-valuemax": props.max,
        "style": { width: width.value }
      };
      if (props.labelHtml) {
        return __spreadProps(__spreadValues({}, rawProps), {
          innerHTML: props.labelHtml
        });
      }
      return rawProps;
    });
    return () => {
      var _a;
      return h("div", progressProps.value, ((_a = slots.default) == null ? void 0 : _a.call(slots)) || computedLabel.value);
    };
  }
});
const rowColsProps = getBreakpointProps("cols", [""], { type: [String, Number], default: null });
const _sfc_main$4 = defineComponent({
  name: "BRow",
  props: __spreadValues({
    tag: { type: String, default: "div" },
    gutterX: { type: String, default: null },
    gutterY: { type: String, default: null },
    alignV: { type: String, default: null },
    alignH: { type: String, default: null },
    alignContent: { type: String, default: null }
  }, rowColsProps),
  setup(props) {
    const rowColsClasses = getClasses$1(props, rowColsProps, "cols", "row-cols");
    const classes = computed(() => ({
      [`gx-${props.gutterX}`]: props.gutterX !== null,
      [`gy-${props.gutterY}`]: props.gutterY !== null,
      [`align-items-${props.alignV}`]: props.alignV,
      [`justify-content-${props.alignH}`]: props.alignH,
      [`align-content-${props.alignContent}`]: props.alignContent
    }));
    return {
      classes,
      rowColsClasses
    };
  }
});
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    class: normalizeClass(["row", [_ctx.classes, _ctx.rowColsClasses]])
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]);
}
var BRow = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
const _sfc_main$3 = defineComponent({
  name: "BSpinner",
  props: {
    label: { type: String },
    role: { type: String, default: "status" },
    small: { type: Boolean, default: false },
    tag: { type: String, default: "span" },
    type: { type: String, default: "border" },
    variant: { type: String }
  },
  setup(props) {
    const classes = computed(() => ({
      "spinner-border": props.type === "border",
      "spinner-border-sm": props.type === "border" && props.small,
      "spinner-grow": props.type === "grow",
      "spinner-grow-sm": props.type === "grow" && props.small,
      [`text-${props.variant}`]: !!props.variant
    }));
    return {
      classes
    };
  }
});
const _hoisted_1$1 = {
  key: 0,
  class: "visually-hidden"
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    class: normalizeClass(_ctx.classes),
    role: _ctx.label || _ctx.$slots.label ? _ctx.role : null,
    "aria-hidden": _ctx.label || _ctx.$slots.label ? null : true
  }, {
    default: withCtx(() => [
      _ctx.label || _ctx.$slots.label ? (openBlock(), createElementBlock("span", _hoisted_1$1, [
        renderSlot(_ctx.$slots, "label", {}, () => [
          createTextVNode(toDisplayString(_ctx.label), 1)
        ])
      ])) : createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["class", "role", "aria-hidden"]);
}
var BSpinner = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
const RX_UNDERSCORE = /_/g;
const RX_LOWER_UPPER = /([a-z])([A-Z])/g;
const RX_FIRST_START_SPACE_WORD = /(\s|^)(\w)/;
const startCase = (str) => str.replace(RX_UNDERSCORE, " ").replace(RX_LOWER_UPPER, (str2, $1, $2) => `${$1} ${$2}`).replace(RX_FIRST_START_SPACE_WORD, (str2, $1, $2) => $1 + $2.toUpperCase());
const useItemHelper = () => {
  const normaliseFields = (origFields, items) => {
    const fields = [];
    if (!(origFields == null ? void 0 : origFields.length) && (items == null ? void 0 : items.length)) {
      Object.keys(items[0]).forEach((k) => fields.push({ key: k, label: startCase(k) }));
      return fields;
    }
    if (Array.isArray(origFields)) {
      origFields.forEach((f) => {
        if (typeof f === "string") {
          fields.push({ key: f, label: startCase(f) });
        } else if (isObject(f) && f.key && isString(f.key)) {
          fields.push(__spreadValues({}, f));
        }
      });
      return fields;
    }
    return fields;
  };
  return {
    normaliseFields
  };
};
const _sfc_main$2 = defineComponent({
  name: "BTable",
  props: {
    align: { type: String },
    caption: { type: String },
    captionTop: { type: Boolean, default: false },
    borderless: { type: Boolean, default: false },
    bordered: { type: Boolean, default: false },
    borderVariant: { type: String },
    dark: { type: Boolean, default: false },
    fields: { type: Array, default: () => [] },
    footClone: { type: Boolean, default: false },
    hover: { type: Boolean, default: false },
    items: { type: Array, default: () => [] },
    responsive: { type: [Boolean, String], default: false },
    small: { type: Boolean, default: false },
    striped: { type: Boolean, default: false },
    variant: { type: String }
  },
  setup(props, { slots }) {
    const classes = computed(() => ({
      [`align-${props.align}`]: props.align,
      [`table-${props.variant}`]: props.variant,
      "table-striped": props.striped,
      "table-hover": props.hover,
      "table-dark": props.dark,
      "table-bordered": props.bordered,
      [`border-${props.borderVariant}`]: props.borderVariant,
      "table-borderless": props.borderless,
      "table-sm": props.small,
      "caption-top": props.captionTop
    }));
    const itemHelper = useItemHelper();
    const computedFields = computed(() => itemHelper.normaliseFields(props.fields, props.items));
    const headerTable = computed(() => {
      if (computedFields.value.length > 0) {
        return computedFields.value.map((f) => f.label);
      }
      return [];
    });
    return () => {
      const tHead = h("thead", h("tr", headerTable.value.map((th) => h("th", { scope: "col" }, th))));
      const tBody = [
        h("tbody", props.items.map((tr) => h("tr", computedFields.value.map((field) => {
          var _a;
          const slotName = `cell(${field.key})`;
          let tdContent = tr[field.key];
          if (slots[slotName]) {
            tdContent = (_a = slots[slotName]) == null ? void 0 : _a.call(slots, {
              value: tr[field.key],
              items: props.items
            });
          }
          return h("td", tdContent);
        }))))
      ];
      const tableContent = [tHead, tBody];
      if (slots["table-caption"]) {
        tableContent.push(h("caption", slots["table-caption"]()));
      } else {
        if (props.caption) {
          const tCaption = h("caption", props.caption);
          tableContent.push(tCaption);
        }
      }
      if (props.footClone) {
        const tFoot = h("tfoot", h("tr", headerTable.value.map((th) => h("th", { scope: "col" }, th))));
        tableContent.push(tFoot);
      }
      const table = h("table", {
        class: ["table", classes.value]
      }, tableContent);
      if (props.responsive) {
        return h("div", {
          class: {
            "table-responsive": typeof props.responsive === "boolean",
            [`table-responsive-${props.responsive}`]: typeof props.responsive === "string"
          }
        }, table);
      }
      return table;
    };
  }
});
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div");
}
var BTable = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
const getTabs = (slots) => {
  if (!slots || !slots.default)
    return [];
  return slots.default().reduce((arr, slot) => {
    if (typeof slot.type === "symbol") {
      arr = arr.concat(slot.children);
    } else {
      arr.push(slot);
    }
    return arr;
  }, []).filter((child) => child.type.name === "BTab");
};
const _sfc_main$1 = defineComponent({
  name: "BTabs",
  props: {
    activeNavItemClass: { type: [Array, Object, String], default: null },
    activeTabClass: { type: [Array, Object, String], default: null },
    align: { type: String, default: null },
    card: { type: Boolean, default: false },
    contentClass: { type: [Array, Object, String], default: null },
    fill: { type: Boolean, default: false },
    id: { type: String, default: null },
    justified: { type: Boolean, default: false },
    navClass: { type: [Array, Object, String], default: null },
    navWrapperClass: { type: [Array, Object, String], default: null },
    noFade: { type: Boolean, default: false },
    noNavStyle: { type: Boolean, default: false },
    pills: { type: Boolean, default: false },
    small: { type: Boolean, default: false },
    tag: { type: String, default: "div" },
    vertical: { type: Boolean, default: false },
    modelValue: { type: Number, default: -1 }
  },
  emits: ["update:modelValue", "click"],
  setup(props, { slots, emit }) {
    const tabs = computed(() => {
      let tabs2 = [];
      if (slots.default) {
        tabs2 = getTabs(slots).map((tab, idx) => {
          if (!tab.props)
            tab.props = {};
          const buttonId = tab.props["button-id"] || getID("tab");
          const contentId = tab.props.id || getID();
          const active = props.modelValue > -1 ? idx === props.modelValue : tab.props.active === "";
          return {
            buttonId,
            contentId,
            active,
            navItemClasses: [
              {
                active,
                disabled: tab.props.disabled === ""
              },
              active && props.activeNavItemClass ? props.activeNavItemClass : null,
              tab.props["title-link-class"]
            ],
            tabClasses: [
              {
                fade: !props.noFade
              },
              active && props.activeTabClass ? props.activeTabClass : null
            ],
            target: `#${contentId}`,
            tab
          };
        });
      }
      return tabs2;
    });
    const classes = computed(() => ({
      "d-flex align-items-start": props.vertical
    }));
    const navTabsClasses = computed(() => ({
      "nav-pills": props.pills,
      "flex-column me-3": props.vertical,
      [`justify-content-${props.align}`]: !!props.align,
      "nav-fill": props.fill,
      "card-header-tabs": props.card,
      "nav-justified": props.justified,
      "nav-tabs": !props.noNavStyle && !props.pills,
      "small": props.small
    }));
    const tabIndex = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit("update:modelValue", value);
      }
    });
    watch(() => props.modelValue, (newValue, oldValue) => {
      const tabs2 = slots.default ? getTabs(slots) : null;
      const disabledSlotsIdx = tabs2 ? tabs2.reduce((arr, child, idx) => {
        if (child.props.disabled === "")
          arr.push(idx);
        return arr;
      }, []) : [];
      const maxIdx = tabs2 ? tabs2.length - 1 : 0;
      if (disabledSlotsIdx.includes(newValue)) {
        const forward = newValue > oldValue;
        let nextIdx = null;
        let i = newValue;
        while (i >= 0 || i <= maxIdx) {
          i += forward ? 1 : -1;
          if (!disabledSlotsIdx.includes(i)) {
            nextIdx = i;
            break;
          }
        }
        emit("update:modelValue", nextIdx !== null ? nextIdx : oldValue);
      } else if (newValue < 0 || newValue > maxIdx) {
        emit("update:modelValue", oldValue);
      }
    });
    return {
      tabs,
      classes,
      navTabsClasses,
      tabIndex
    };
  }
});
const _hoisted_1 = ["id", "data-bs-target", "aria-controls", "aria-selected", "onClick"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    id: _ctx.id,
    class: normalizeClass(["tabs", _ctx.classes])
  }, {
    default: withCtx(() => [
      createElementVNode("div", {
        class: normalizeClass([_ctx.navWrapperClass, { "card-header": _ctx.card }])
      }, [
        createElementVNode("ul", {
          class: normalizeClass(["nav", [_ctx.navTabsClasses, _ctx.navClass]]),
          role: "tablist"
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.tabs, ({ tab, buttonId, contentId, navItemClasses, active, target }, i) => {
            return openBlock(), createElementBlock("li", {
              key: i,
              class: normalizeClass(["nav-item", tab.props["title-item-class"]])
            }, [
              createElementVNode("a", mergeProps({
                id: buttonId,
                class: ["nav-link", navItemClasses],
                "data-bs-toggle": "tab",
                "data-bs-target": target,
                href: "#",
                role: "tab",
                "aria-controls": contentId,
                "aria-selected": active
              }, tab.props["title-link-attributes"], {
                onClick: withModifiers((e) => {
                  _ctx.$emit("click", e);
                  _ctx.tabIndex = i;
                }, ["stop"])
              }), [
                tab.children && tab.children.title ? (openBlock(), createBlock(resolveDynamicComponent(tab.children.title), { key: 0 })) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(tab.props.title), 1)
                ], 64))
              ], 16, _hoisted_1)
            ], 2);
          }), 128))
        ], 2)
      ], 2),
      createElementVNode("div", {
        class: normalizeClass(["tab-content", _ctx.contentClass])
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.tabs, ({ tab, contentId, tabClasses, active }, i) => {
          return openBlock(), createBlock(resolveDynamicComponent(tab), {
            key: i,
            id: contentId,
            class: normalizeClass(tabClasses),
            active
          }, null, 8, ["id", "class", "active"]);
        }), 128))
      ], 2)
    ]),
    _: 1
  }, 8, ["id", "class"]);
}
var BTabs = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _sfc_main = defineComponent({
  name: "BTab",
  props: {
    active: { type: Boolean, default: false },
    buttonId: { type: String, default: null },
    disabled: { type: Boolean, default: false },
    id: { type: String },
    noBody: { type: [Boolean, String], default: false },
    tag: { type: String, default: "div" },
    title: { type: String },
    titleItemClass: { type: [Array, Object, String], default: null },
    titleLinkAttribute: { type: Object, default: null },
    titleLinkClass: { type: [Array, Object, String], default: null }
  },
  setup(props) {
    const classes = computed(() => ({
      "active": props.active,
      "show": props.active,
      "card-body": props.noBody === false
    }));
    return {
      classes
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    id: _ctx.id,
    class: normalizeClass(["tab-pane", _ctx.classes]),
    role: "tabpanel",
    "aria-labelledby": "profile-tab"
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["id", "class"]);
}
var BTab = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
var Components = {
  BAccordion,
  BAccordionItem,
  BAlert,
  BAvatar,
  BBadge,
  BBreadcrumb,
  BBreadcrumbItem,
  BButton,
  BButtonGroup,
  BButtonToolbar,
  BCard,
  BCardBody,
  BCardFooter,
  BCardGroup,
  BCardHeader,
  BCardImg,
  BCardSubTitle,
  BCardText,
  BCardTitle,
  BCarousel,
  BCarouselSlide,
  BCloseButton,
  BCol,
  BCollapse,
  BContainer,
  BDropdown,
  BDropdownDivider,
  BDropdownForm,
  BDropdownGroup,
  BDropdownHeader,
  BDropdownItem,
  BDropdownItemButton,
  BDropdownText,
  BForm,
  BFormSelect,
  BFormSelectOption,
  BFormSelectOptionGroup,
  BFormFloatingLabel,
  BFormInput,
  BFormText,
  BIcon,
  BImg,
  BInputGroup,
  BInputGroupText,
  BLink,
  BListGroup,
  BListGroupItem,
  BModal: BModal$1,
  BNav,
  BNavItem,
  BNavItemDropdown,
  BOffcanvas,
  BPagination: _sfc_main$8,
  BPopover: BPopover$1,
  BProgress,
  BProgressBar: _sfc_main$5,
  BRow,
  BSpinner,
  BTable,
  BTabs,
  BTab,
  BFormCheckbox,
  BFormCheckboxGroup,
  BFormRadio,
  BFormRadioGroup
};
var BModal = {
  mounted(el, binding) {
    el.setAttribute("data-bs-toggle", "modal");
    el.setAttribute("data-bs-target", `#${binding.arg}`);
  }
};
const BPopover = {
  mounted(el, binding) {
    let placement = "right";
    const trigger = [];
    if (binding.modifiers.left) {
      placement = "left";
    } else if (binding.modifiers.right) {
      placement = "right";
    } else if (binding.modifiers.bottom) {
      placement = "bottom";
    } else if (binding.modifiers.top) {
      placement = "top";
    }
    if (binding.modifiers.manual) {
      trigger.push("manual");
    } else {
      if (binding.modifiers.click) {
        trigger.push("click");
      }
      if (binding.modifiers.hover) {
        trigger.push("hover");
      }
      if (binding.modifiers.focus) {
        trigger.push("focus");
      }
    }
    el.setAttribute("data-bs-toggle", "popover");
    new Popover(el, {
      trigger: trigger.length === 0 ? "click" : trigger.join(" "),
      placement,
      content: binding.value
    });
  },
  unmounted(el) {
    const instance = Popover.getInstance(el);
    instance == null ? void 0 : instance.dispose();
  }
};
function resolveTrigger(modifiers) {
  if (modifiers.manual) {
    return "manual";
  }
  const trigger = [];
  if (modifiers.click) {
    trigger.push("click");
  }
  if (modifiers.hover) {
    trigger.push("hover");
  }
  if (modifiers.focus) {
    trigger.push("focus");
  }
  if (trigger.length > 0) {
    return trigger.join(" ");
  }
  return "hover focus";
}
function resolvePlacement(modifiers) {
  if (modifiers.left) {
    return "left";
  }
  if (modifiers.right) {
    return "right";
  }
  if (modifiers.bottom) {
    return "bottom";
  }
  return "top";
}
const BTooltip = {
  beforeMount(el, binding) {
    el.setAttribute("data-bs-toogle", "tooltip");
    const isHtml = /<("[^"]*"|'[^']*'|[^'">])*>/.test(el.title);
    const trigger = resolveTrigger(binding.modifiers);
    const placement = resolvePlacement(binding.modifiers);
    new Tooltip(el, {
      trigger,
      placement,
      html: isHtml
    });
  },
  updated(el) {
    const title = el.getAttribute("title");
    if (title !== "") {
      const instance = Tooltip.getInstance(el);
      instance == null ? void 0 : instance.hide();
      el.setAttribute("data-bs-original-title", title || "");
      el.setAttribute("title", "");
    }
  },
  unmounted(el) {
    const instance = Tooltip.getInstance(el);
    instance == null ? void 0 : instance.dispose();
  }
};
const observerInstances = new Map();
function destroy(el) {
  if (observerInstances.has(el)) {
    const observer = observerInstances.get(el);
    if (observer && observer.stop) {
      observer.stop();
    }
    observerInstances.delete(el);
  }
}
function bind(el, binding) {
  const options = {
    margin: "0px",
    once: false,
    callback: binding.value
  };
  Object.keys(binding.modifiers).forEach((mod) => {
    if (Number.isInteger(mod)) {
      options.margin = `${mod}px`;
    } else if (mod.toLowerCase() === "once") {
      options.once = true;
    }
  });
  destroy(el);
  const observer = new VisibilityObserver(el, options.margin, options.once, options.callback, binding.instance);
  observerInstances.set(el, observer);
}
const BVisible = {
  beforeMount(el, binding) {
    bind(el, binding);
  },
  updated(el, binding) {
    bind(el, binding);
  },
  unmounted(el) {
    destroy(el);
  }
};
class VisibilityObserver {
  constructor(element, margin, once, callback, instance) {
    __publicField(this, "element");
    __publicField(this, "margin");
    __publicField(this, "once");
    __publicField(this, "callback");
    __publicField(this, "instance");
    __publicField(this, "observer");
    __publicField(this, "doneOnce");
    __publicField(this, "visible");
    this.element = element;
    this.margin = margin;
    this.once = once;
    this.callback = callback;
    this.instance = instance;
    this.createObserver();
  }
  createObserver() {
    if (this.observer) {
      this.stop();
    }
    if (this.doneOnce || typeof this.callback !== "function") {
      return;
    }
    try {
      this.observer = new IntersectionObserver(this.handler.bind(this), {
        root: null,
        rootMargin: this.margin,
        threshold: 0
      });
    } catch (e) {
      console.error("Intersection Observer not supported");
      this.doneOnce = true;
      this.observer = void 0;
      this.callback(null);
      return;
    }
    this.instance.$nextTick(() => {
      if (this.observer) {
        this.observer.observe(this.element);
      }
    });
  }
  handler(entries) {
    const [entry] = entries;
    const isIntersecting = Boolean(entry.isIntersecting || entry.intersectionRatio > 0);
    if (isIntersecting !== this.visible) {
      this.visible = isIntersecting;
      this.callback(isIntersecting);
      if (this.once && this.visible) {
        this.doneOnce = true;
        this.stop();
      }
    }
  }
  stop() {
    this.observer && this.observer.disconnect();
    this.observer = null;
  }
}
var focus = {
  mounted(el, binding) {
    if (binding.value !== false) {
      el.focus();
    }
  }
};
var Directives = {
  BModal,
  BPopover,
  BToggle,
  BTooltip,
  BVisible,
  focus
};
var styles = "";
const plugin = {
  install(app, options = {}) {
    Object.entries(Components).forEach(([name, component]) => {
      app.component(name, component);
    });
    Object.entries(Directives).forEach(([name, component]) => {
      app.directive(name, component);
    });
    createBreadcrumb(app);
  }
};
export { plugin as default };