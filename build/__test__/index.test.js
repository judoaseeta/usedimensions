"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var index_1 = __importDefault(require("../src/index"));
var react_hooks_1 = require("@testing-library/react-hooks");
var react_2 = require("@testing-library/react");
var mockResizeObserver_1 = __importDefault(require("../mocks/mockResizeObserver"));
describe('Testing useDimensions', function () {
    it('should return default value', function () {
        var result = react_hooks_1.renderHook(function () { return index_1.default({}); }).result;
        var expected = {
            width: 300,
            height: 300,
            marginLeft: 30,
            marginRight: 30,
            marginBottom: 30,
            marginTop: 30,
            boundedWidth: 240,
            boundedHeight: 240,
            isResized: false
        };
        expect(result.current.dimensions).toMatchObject(expected);
    });
    it('With static initial margins', function () {
        var result = react_hooks_1.renderHook(function () { return index_1.default({
            marginBottom: 5,
            marginTop: 5,
            marginLeft: 20,
            marginRight: 10
        }); }).result;
        var expected = {
            width: 300,
            height: 300,
            marginLeft: 20,
            marginRight: 10,
            marginBottom: 5,
            marginTop: 5,
            boundedWidth: 270,
            boundedHeight: 290,
            isResized: false
        };
        expect(result.current.dimensions).toMatchObject(expected);
    });
    it('With fractional margins', function () {
        // initialDimensions with fractional margins
        var result = react_hooks_1.renderHook(function () { return index_1.default({
            width: 500,
            height: 400,
            marginTop: 0.2,
            marginBottom: 0.05,
            marginLeft: 0.1,
            marginRight: 0.2
        }); }).result;
        // when 
        var expected = {
            width: 500,
            height: 400,
            marginLeft: 50,
            marginRight: 100,
            marginBottom: 20,
            marginTop: 80,
            boundedWidth: 350,
            boundedHeight: 300,
            isResized: false
        };
        expect(result.current.dimensions).toMatchObject(expected);
    });
    it('should resize when listener is invoked', function () {
        jest.spyOn(react_1.default, 'useRef').mockReturnValue({
            current: {
                clientWidth: 500
            }
        });
        var _a = mockResizeObserver_1.default(), observer = _a.observer, listeners = _a.listeners, mockObserve = _a.mockObserve;
        var result = react_hooks_1.renderHook(function () { return index_1.default({
            width: 500,
            height: 400,
            marginTop: 0.2,
            marginBottom: 0.05,
            marginLeft: 0.1,
            marginRight: 0.2
        }, observer); }).result;
        react_2.render(react_1.default.createElement("div", { ref: result.current.ref }));
        // expected output with initialDimensions  
        var initialDimensionExpected = {
            width: 500,
            height: 400,
            marginLeft: 50,
            marginRight: 100,
            marginBottom: 20,
            marginTop: 80,
            boundedWidth: 350,
            boundedHeight: 300,
            isResized: false
        };
        // DOM is rendered.
        // ResizeObserver.observe should be invoked.
        expect(mockObserve).toHaveBeenCalled();
        expect(result.current.dimensions).toEqual(initialDimensionExpected);
        // assume resize happens
        // entries should be passed into listener
        react_hooks_1.act(function () {
            listeners[0]([{
                    contentRect: {
                        width: 1200,
                        height: 500
                    }
                }]);
        });
        var dimensionsExpected = {
            width: 1200,
            height: 500,
            marginLeft: 120,
            marginRight: 240,
            marginBottom: 25,
            marginTop: 100,
            boundedWidth: 840,
            boundedHeight: 375,
            isResized: true
        };
        expect(result.current.dimensions).toEqual(dimensionsExpected);
    });
});
