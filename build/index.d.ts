import { MutableRefObject } from 'react';
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
export declare type ReturnTypeUseDimensions = {
    ref: MutableRefObject<HTMLDivElement | null>;
    dimensions: ResizedDimensions;
};
declare const useDimensions: (initialDimensions: InitialDimensions) => ReturnTypeUseDimensions;
export default useDimensions;
