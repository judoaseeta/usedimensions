"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var resize_observer_1 = require("@juggle/resize-observer");
/* function calculateDimensions(initialDimensions: InitialDimensions): CalculatedDimensions
 * - Helper functions for calculating CalculatedDimensions with given IntialDimensions
 *@params-
 *	initialDimensions: InitialDimensions
 *
 * */
var calculateDimensions = function (_a) {
    var _b = _a.width, width = _b === void 0 ? 300 : _b, _c = _a.height, height = _c === void 0 ? 300 : _c, _d = _a.marginLeft, marginLeft = _d === void 0 ? 0.1 : _d, _e = _a.marginRight, marginRight = _e === void 0 ? 0.1 : _e, _f = _a.marginTop, marginTop = _f === void 0 ? 0.1 : _f, _g = _a.marginBottom, marginBottom = _g === void 0 ? 0.1 : _g;
    // If each margin is fraction number(less than 1) used it as fraction of width or height 
    // then, caculate value with given width or height
    // otherwise, used it as static value. 
    var newMarginTop = marginTop < 1 ? Math.floor(height * marginTop) : marginTop;
    var newMarginBottom = marginBottom < 1 ? Math.floor(height * marginBottom) : marginBottom;
    var newMarginLeft = marginLeft < 1 ? Math.floor(width * marginLeft) : marginLeft;
    var newMarginRight = marginRight < 1 ? Math.floor(width * marginRight) : marginRight;
    // calculate each 'bounded'Properties
    var verticalMargins = newMarginTop + newMarginBottom;
    // if height is less equal than verticalMargins no margin on vertical axis.
    var boundedHeight = verticalMargins >= height ? height : Math.max(height - verticalMargins, 0);
    // if width is less equal than horizontalMargins no margin on horizontal axis.
    var horizontalMargins = newMarginRight + newMarginLeft;
    var boundedWidth = horizontalMargins >= width ? width : Math.max(width - horizontalMargins, 0);
    return {
        width: width,
        height: height,
        marginLeft: newMarginLeft,
        marginRight: newMarginRight,
        marginTop: newMarginTop,
        marginBottom: newMarginBottom,
        boundedWidth: boundedWidth,
        boundedHeight: boundedHeight
    };
};
var useDimensions = function (initialDimensions, resizeObserver) {
    if (resizeObserver === void 0) { resizeObserver = resize_observer_1.ResizeObserver; }
    var _a = react_1.useState(null), element = _a[0], setElement = _a[1];
    var ref = react_1.useCallback(function (element) {
        setElement(element);
    }, []);
    var _b = react_1.useState(__assign(__assign({}, calculateDimensions(initialDimensions)), { isResized: false })), dimensions = _b[0], setDimensions = _b[1];
    react_1.useEffect(function () {
        // if DOM is rendered 
        if (element) {
            // resize observer
            var observer_1 = new resizeObserver(function (entries) {
                // if there is entries
                if (entries.length > 0) {
                    // first element of entries is only needed
                    var entry = entries[0];
                    // check current width and height
                    var width = dimensions.width, height = dimensions.height;
                    // check resized width and height
                    var _a = entry.contentRect, newWidth = _a.width, newHeight = _a.height;
                    // if at least one of width and height is changed
                    if (width !== newWidth || height !== newHeight) {
                        // set newly calculatedDimension with new width or height.
                        setDimensions(__assign(__assign({}, calculateDimensions(__assign(__assign({}, initialDimensions), { width: newWidth, height: newHeight }))), { isResized: true }));
                    }
                }
            });
            // start to observer referenced element;
            observer_1.observe(element);
            return function () { return observer_1.unobserve(element); };
        }
    }, [element]);
    /* return values
     * @ref: Callback Ref
     * @dimensions: ResizedDimensions
     * */
    return {
        ref: ref,
        dimensions: dimensions
    };
};
exports.default = useDimensions;
