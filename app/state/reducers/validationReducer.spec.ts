import { INVALID_TAG, INVALID_LINK } from '../actions/actions-types';
import validationReducer from './validationReducer';

describe('Validation reducer', () => {
  it('return default store', () => {
    const newState = validationReducer(undefined, {});
    expect(newState).toEqual({ invalidTag: false, invalidLink: false });
  });

  it('receiving INVALID_TAG type', () => {
    const newState = validationReducer(undefined, {
      type: INVALID_TAG,
      payload: true,
    });

    expect(newState).toEqual({ invalidTag: true, invalidLink: false });
  });

  it('receiving INVALID_LINK type', () => {
    const newState = validationReducer(undefined, {
      type: INVALID_LINK,
      payload: true,
    });

    expect(newState).toEqual({ invalidTag: false, invalidLink: true });
  });
});
