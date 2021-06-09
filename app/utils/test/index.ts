import findByTestAttr from './findByTestAttr';
import storeFactory from './storeFactory';

const useAppDispatchMock = () => jest.fn().mockResolvedValue(jest.fn())

export { findByTestAttr, storeFactory, useAppDispatchMock };
