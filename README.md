[![Build Status](https://travis-ci.com/judoaseeta/usedimensions.svg?branch=main)](https://travis-ci.com/judoaseeta/usedimensions)
[![Coverage Status](https://coveralls.io/repos/github/judoaseeta/usedimensions/badge.svg?branch=main)](https://coveralls.io/github/judoaseeta/usedimensions?branch=main)

# use-react-dimensions
React hook for resizing component(especially, svg view box or canvas ) and re-calculating its size-relevant properties.

Version 2.0.1 - There is a complete renewal of the library. A bug which makes a component re-render infinitely without CSS fixed width and height resolved.

# Concept

There is some time we need to calculate element's size and rerender it without CSS styling. Especially, the element's dimensions is fully depending on its parent's width and height. This is particularly useful on SVG, Canvas because they are not controlled by CSS styling per media queries. So, this hook will be useful to control them, but any HTML element without its own styles could be.

You can set margins on four directions as you wish both fractional ratios on width and height and static values.Then, this hook calculates 'bounded' width and height which represents
areas except margin areas and recalculates them whenever 'resize' occurs.

Here is a visual concept of these properties.
```js
--------------------------------------------------
|           Margin-Top                            |
|        __________________________________       |
|       |  ^                               |Margin|
|Margin |  ^                               |Right |
|Left   |  ^BoundedHeight                  |      |
|       |                                  |      |
|       |                                  |      |
|       |                                  |      |
|       |                                  |      |
|       |      BoundedWidth >>>>           |      |
|       |__________________________________|      |
|            Margin-Bottom                        |
|_________________________________________________|
```

# Install

```sh
npm install --save use-react-dimensions
yarn add use-react-dimensions
```
# Usage
```jsx
import React from 'react';
import useDimensions from 'use-react-dimensions';

const SomeComponent:React.FC = () => {
    // ref: React.MutableRefObject<HTMLDivElement>;
    // dimensions : ResizedDimension; 
    const { ref, dimensions } = useDimensions<HTMLDivElement>({
        marginLeft?: /* could be fraction number less than 1 or any real number */
        marginTop?: /* could be fraction number less than 1 or any real number */
        marginRight?: /* could be fraction number less than 1 or any real number */
        marginBottom?: /* could be fraction number less than 1 or any real number */
        width? /*You can give initial width and height of component. But,*/
        height?/* it is unneccesary because those will be calculated by resize observer and updated*/
    } /* or just an empty object {} */);
    // attaching ref to the observed wrapper component
    return <div ref={ref}>
        {
            // to prevent to render with initial dimensions
            dimensions.isDomAttached &&
            <svg
                width={dimensions.width}
                heihgt={dimensions.height}
            >
                ....render children
            </svg>
        }
    </div> 
} 
```

# Types
```typescript
// initial props for useDimensions
// you can just pass an empty object.
interface InitialDimensions {
    width?: number;
    height?: number;
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
}
// Returned dimensions 
interface ResizedDimensions {
    width: number;
    height: number;
    marginLeft: number;
    marginRight: number;
    marginTop: number;
    marginBottom: number;
    boundedHeight: number;
    boundedWidth: number;
    isDomAttached: boolean;
}
```
> ### Note
    margins of between 'InitialDimensions' and 'ResizedDimensions' could be different.
    When you give fraction numbers to the margins on 'InitialDimensions', 
    returned margins of 'ResizedDimensions' will be numbers calculated by fractional ratios of width and height.
