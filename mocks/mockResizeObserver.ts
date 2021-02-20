
export default function createMockResizeObserver() {
    const callableListeners: any[] = [];
    const mockObserve = jest.fn();
    const observer = class ResizeObserver {
        listeners: any[] = [];
        constructor(callback: any) {
            this.listeners.push(callback);
            callableListeners.push(callback);
        }
        observe(args: any) {
            mockObserve(args);
        }
        unobserve() {
    
        }
        disconnect() {
    
        }
        static toString() {
            return 'string'
        }
    }
    return {
        observer,
        mockObserve,
        listeners: callableListeners
    }
}