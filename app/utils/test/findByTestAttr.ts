import { ReactWrapper } from 'enzyme';

export const findByTestAttr = (wrapper, val): ReactWrapper => wrapper.find(`[data-test="${val}"]`);

export const asToHave = (Component: ReactWrapper, times: number) => (name: string) =>
  expect(findByTestAttr(Component, name)).toHaveLength(times);
