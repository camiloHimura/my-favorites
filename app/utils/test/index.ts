import storeFactory from './storeFactory';

const useAppDispatchMock = () => jest.fn().mockResolvedValue(jest.fn());

export { storeFactory, useAppDispatchMock };
export * from './findByTestAttr';
