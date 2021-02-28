import { ResizeObserver } from '@juggle/resize-observer';
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
interface CalculatedDimensions extends Required<InitialDimensions> {
    boundedHeight: number;
    boundedWidth: number;
}
export interface ResizedDimensions extends CalculatedDimensions {
    isResized: boolean;
}
export declare type ReturnTypeUseDimensions<E extends HTMLElement> = {
    ref: (element: E | null) => void;
    dimensions: ResizedDimensions;
};
declare const useDimensions: <E extends HTMLElement>(initialDimensions: InitialDimensions, resizeObserver?: typeof ResizeObserver) => ReturnTypeUseDimensions<E>;
export default useDimensions;
