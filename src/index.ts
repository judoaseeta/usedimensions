import {
	useState,
	useEffect,
	useRef,
	MutableRefObject
} from 'react';

import {
	ResizeObserver
} from '@juggle/resize-observer';


/**
 * can provide initial width and height 
 * initial margins could be both fraction or number;
 * 
 */
export interface InitialDimensions {
	width?: number;
	height?: number;
	marginLeft?: number;
	marginRight?: number;
	marginTop?: number;
	marginBottom?: number;
}

/* Calculated dimensions with  given width and height from InitialDimensions;
* 'boundedWidth' and 'boundedHeight' mean pure area without margins. 
*  'bounded'Properties is as same as "(given width or height) - margin of each direction"; 	 
*  This interface is only used inside of useDimensions hooks.
*/
interface CalculatedDimensions extends Required<InitialDimensions> {
	boundedHeight: number;
	boundedWidth: number;
}
/* ResizedDimensions is a interface used externally.
 * This is the type of returned property 'dimensions' by useDimensions hooks.
 * */

export interface ResizedDimensions extends CalculatedDimensions {
	isResized: boolean;
}

/* function calculateDimensions(initialDimensions: InitialDimensions): CalculatedDimensions
 * - Helper functions for calculating CalculatedDimensions with given IntialDimensions
 *@params- 
 *	initialDimensions: InitialDimensions 
 *	
 * */

const calculateDimensions = ({
	width = 300,
	height = 300,
	marginLeft = 0.1,
	marginRight = 0.1,
	marginTop = 0.1,
	marginBottom = 0.1,
}: InitialDimensions): CalculatedDimensions => {
	// If each margin is fraction number(less than 1) used it as fraction of width or height 
	// then, caculate value with given width or height
	// otherwise, used it as static value. 
	const newMarginTop = marginTop < 1 ? Math.floor(height * marginTop) : marginTop;
	const newMarginBottom = marginBottom < 1 ? Math.floor(height * marginBottom) : marginBottom;
	const newMarginLeft = marginLeft < 1 ? Math.floor(width * marginLeft) : marginLeft;
	const newMarginRight = marginRight < 1 ? Math.floor(width * marginRight) : marginRight;

	// calculate each 'bounded'Properties

	const verticalMargins = newMarginTop + newMarginBottom;
	// if height is less equal than verticalMargins no margin on vertical axis.
	const boundedHeight = verticalMargins >= height ? height : Math.max(height - verticalMargins, 0);
	// if width is less equal than horizontalMargins no margin on horizontal axis.
	const horizontalMargins = newMarginRight + newMarginLeft;
	const boundedWidth = horizontalMargins >= width ? width : Math.max(width - horizontalMargins, 0);
	return {
		width,
		height,
		marginLeft: newMarginLeft,
		marginRight: newMarginRight,
		marginTop: newMarginTop,
		marginBottom: newMarginBottom,
		boundedWidth,
		boundedHeight
	}
}


export type ReturnTypeUseDimensions = {
	ref: MutableRefObject<HTMLDivElement|null>,
	dimensions: ResizedDimensions
};

const useDimensions = (initialDimensions: InitialDimensions): ReturnTypeUseDimensions => {
	const ref = useRef<HTMLDivElement>(null);
	const [dimensions, setDimensions] = useState<ResizedDimensions>({
		...calculateDimensions(initialDimensions),
		isResized: false
	});
	useEffect(() => {
		// ref of observed element
		const element = ref.current;
		// if DOM is rendered 
		if (element) {
			// resize observer
			const observer = new ResizeObserver(
				entries => {
					// if there is entries
					if (entries.length > 0) {
						// first element of entries is only needed
						const entry = entries[0];
						// check current width and height
						const {width, height} = dimensions;
						// check resized width and height
						const {width: newWidth, height: newHeight} = entry.contentRect;
						// if at least one of width and height is changed
						if (width !== newWidth || height !== newHeight) {
							// set newly calculatedDimension with new width or height.
							setDimensions({
								...calculateDimensions({
									...initialDimensions,
									width: newWidth,
									height: newHeight,
								}),
								isResized: true
							});

						}
					}
				}
			);
			// start to observer referenced element;
			observer.observe(element);
			return () => observer.unobserve(element);
		}
	});
	/* return values
	 * @ref: React.MutableRefObject 
	 * @dimensions: ResizedDimensions
	 * */
	return {
		ref, 
		dimensions
	};
}

export default useDimensions;
