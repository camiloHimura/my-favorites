import errorsReducer from './errorsReducer';
import { addErrorAction } from '../actions';
import { INVALIR_ERROR_FORMAT, INVALIR_ERROR_TYPE } from '../../contans/ErrorMessages';

describe('Error', () => {
  beforeEach(() => {
    console.warn = jest.fn();
  });

  it('return default store', () => {
    const newState = errorsReducer(undefined, {});
    expect(newState).toEqual([]);
  });

  it('adding invalid format', () => {
    const newState = errorsReducer(undefined, addErrorAction({ test: 'milo' }));
    expect(newState).toEqual([]);
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(INVALIR_ERROR_FORMAT);
  });

  it('adding invalid type', () => {
    const newState = errorsReducer(undefined, addErrorAction({ type: 'milo', info: 'info' }));
    expect(newState).toEqual([]);
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(INVALIR_ERROR_TYPE);
  });
});
