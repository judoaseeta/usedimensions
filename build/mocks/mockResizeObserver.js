"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createMockResizeObserver() {
    var callableListeners = [];
    var mockObserve = jest.fn();
    var observer = /** @class */ (function () {
        function ResizeObserver(callback) {
            this.listeners = [];
            this.listeners.push(callback);
            callableListeners.push(callback);
        }
        ResizeObserver.prototype.observe = function (args) {
            mockObserve(args);
        };
        ResizeObserver.prototype.unobserve = function () {
        };
        ResizeObserver.prototype.disconnect = function () {
        };
        ResizeObserver.toString = function () {
            return 'string';
        };
        return ResizeObserver;
    }());
    return {
        observer: observer,
        mockObserve: mockObserve,
        listeners: callableListeners
    };
}
exports.default = createMockResizeObserver;
