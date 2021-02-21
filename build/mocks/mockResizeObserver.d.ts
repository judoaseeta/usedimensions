/// <reference types="jest" />
export default function createMockResizeObserver(): {
    observer: {
        new (callback: any): {
            listeners: any[];
            observe(args: any): void;
            unobserve(): void;
            disconnect(): void;
        };
        toString(): string;
    };
    mockObserve: jest.Mock<any, any>;
    listeners: any[];
};
