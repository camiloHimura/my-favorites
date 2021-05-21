import React from 'react';
import { shallow } from 'enzyme';

import { CardLoading } from './CardLoading';

let Component;
test('take snapshot', () => {
  Component = shallow(<CardLoading />);
  expect(Component).toMatchSnapshot();
});
