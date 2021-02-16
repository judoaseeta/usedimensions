import useDimensions from '../src/index';
import { renderHook } from '@testing-library/react-hooks';

describe('Testing useDimensions',() => {
    it('By default, ', () => {
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
});