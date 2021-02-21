import React from 'react';
import useDimensions from '../src/index';
import { act, renderHook } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';
import createMockObserver from '../mocks/mockResizeObserver';

describe('Testing useDimensions',() => {
    it('should return default value', () => {
        const { result } = renderHook(() => useDimensions({}));
        const expected = {
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
    it('With static initial margins', () => {
        const { result } = renderHook(() => useDimensions({
            marginBottom: 5,
            marginTop: 5,
            marginLeft: 20,
            marginRight: 10
        }));
        const expected = {
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
    it('With fractional margins', () => {
        // initialDimensions with fractional margins
        const { result } = renderHook(() => useDimensions({
            width: 500,
            height: 400,
            marginTop: 0.2,
            marginBottom: 0.05,
            marginLeft: 0.1,
            marginRight: 0.2
        }));
        // when 
        const expected = {
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
    it('should resize when listener is invoked', () => {
        const { observer, listeners, mockObserve } = createMockObserver();
        const { result } = renderHook(() => useDimensions({
            width: 500,
            height: 400,
            marginTop: 0.2,
            marginBottom: 0.05,
            marginLeft: 0.1,
            marginRight: 0.2
        },observer));
        render(
            <div 
                ref={result.current.ref}
            ></div>
        );
        // expected output with initialDimensions  
        const initialDimensionExpected = {
            width: 500,
            height: 400,
            marginLeft: 50,
            marginRight: 100,
            marginBottom: 20,
            marginTop: 80,
            boundedWidth: 350,
            boundedHeight: 300,
            isResized: false
        }
        // DOM is rendered.
        // ResizeObserver.observe should be invoked.
        expect(mockObserve).toHaveBeenCalled();
        expect(result.current.dimensions).toEqual(initialDimensionExpected);
        // assume resize happens
        // entries should be passed into listener
        act(() => {
            listeners[0]([{
                contentRect: {
                    width: 1200,
                    height: 500
                }
            }])
        });
        const dimensionsExpected = {
            width: 1200,
            height: 500,
            marginLeft: 120,
            marginRight: 240,
            marginBottom: 25,
            marginTop: 100,
            boundedWidth: 840,
            boundedHeight: 375,
            isResized: true
        }
        expect(result.current.dimensions).toEqual(dimensionsExpected);

        
    });
});