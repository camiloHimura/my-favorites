import LStorage from './LStorage';
import { LSTORAGE_INVALID_KEY } from '../contans/ErrorMessages';

describe('Invalid key', () => {
  it('save', () => {
    try {
      LStorage.set([], 'value');
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toEqual(Error(LSTORAGE_INVALID_KEY));
    }
  });

  it('has', () => {
    try {
      LStorage.has([]);
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toEqual(Error(LSTORAGE_INVALID_KEY));
    }
  });

  it('remove', () => {
    try {
      LStorage.remove({});
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toEqual(Error(LSTORAGE_INVALID_KEY));
    }
  });
});

describe('save and retrive the saved vale', () => {
  it('save string', () => {
    const value = 'this is a test';
    const outcome = LStorage.set('test', value);
    expect(outcome).toBe(value);
  });

  it('save an array', () => {
    const value = [1, 2, 3];
    const outcome = LStorage.set('test', value);
    expect(outcome).toEqual(value);
  });

  it('save obj', () => {
    const value = { name: 'test', lastName: 'test lastName' };
    const outcome = LStorage.set('test', value);
    expect(outcome).toEqual(value);
  });

  it('get an array', () => {
    const value = [1, 2, 3];
    LStorage.set('test', value);
    const outcome = LStorage.get('test');
    expect(outcome).toEqual(value);
  });

  it('get an Obj', () => {
    const value = { name: 'test' };
    LStorage.set('test', value);
    const outcome = LStorage.get('test');
    expect(outcome).toEqual(value);
  });

  it('has property', () => {
    const value = { name: 'test', lastName: 'test lastName' };
    LStorage.set('test', value);
    LStorage.set('test 2', 'value');
    expect(LStorage.has('test')).toBe(true);
    expect(LStorage.has('test 4')).toBe(false);
  });

  it('remove property', () => {
    const value = { name: 'test', lastName: 'test lastName' };
    LStorage.set('test', value);
    LStorage.set('test 2', 'value');
    expect(LStorage.remove('test')).toBe(true);
    expect(LStorage.has('test')).toBe(false);
  });
});
