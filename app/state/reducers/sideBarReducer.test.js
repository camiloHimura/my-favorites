import sideBarReducer from './sideBarReducer';
import { setSideBarIndex } from '../actions';

describe('Error', () => {
  it('initial state', () => {
    const newState = sideBarReducer(undefined, {});
    expect(newState.activeIndex).toEqual(0);
  });

  it('valid index', () => {
    const newState = sideBarReducer(undefined, setSideBarIndex(3));
    expect(newState.activeIndex).toEqual(3);
  });

  it('invalid index double', () => {
    const newState = sideBarReducer(undefined, setSideBarIndex(3.2));
    expect(newState.activeIndex).toEqual(0);
  });

  it('invalid index string', () => {
    const newState = sideBarReducer(undefined, setSideBarIndex('a'));
    expect(newState.activeIndex).toEqual(0);
  });
});
