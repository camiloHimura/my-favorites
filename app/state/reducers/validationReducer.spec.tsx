import { invalidLink, invalidTag } from '../actions';
import validationReducer from './validationReducer';

describe('Validation reducer', () => {
  it('return default store', () => {
    const newState = validationReducer(undefined, {} as any);
    expect(newState).toEqual({ invalidTag: false, invalidLink: false });
  });

  it('receiving INVALID_TAG type', () => {
    const newState = validationReducer(undefined, invalidTag(true));

    expect(newState.invalidTag).toBe(true);
  });

  it('receiving INVALID_LINK type', () => {
    const newState = validationReducer(undefined, invalidLink(true));

    expect(newState.invalidLink).toBe(true);
  });
});
