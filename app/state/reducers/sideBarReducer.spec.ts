import sideBarReducer from './sideBarReducer';
import { setSideBarIndexAction } from '../actions';

describe('Error', () => {
  it('initial state', () => {
    const newState = sideBarReducer(undefined, {});
    expect(newState.activeIndex).toEqual(0);
  });

  it('valid index', () => {
    const newState = sideBarReducer(undefined, setSideBarIndexAction(3));
    expect(newState.activeIndex).toEqual(3);
  });

  it('invalid index double', () => {
    const newState = sideBarReducer(undefined, setSideBarIndexAction(3.2));
    expect(newState.activeIndex).toEqual(0);
  });
});
