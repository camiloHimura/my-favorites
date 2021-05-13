import React from 'react';
import { Tag } from './Tag';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../../../utils/test';
const initialProps = {
  id: 'idTest',
  color: 'FFFF',
  name: 'testName',
  updateTag: jest.fn(),
  onClose: jest.fn(),
};
let component;
beforeEach(() => {
  component = setUp();
});
it('take snapshot', () => {
  expect(component).toMatchSnapshot();
});

it('render tag, no edit mode', () => {
  expect(findByTestAttr(component, 'Icon').length).toBe(1);
  expect(findByTestAttr(component, 'tag-name').text()).toBe(initialProps.name);
  expect(findByTestAttr(component, 'input-edit').length).toBe(0);
});

it('closing', () => {
  findByTestAttr(component, 'Icon').simulate('click');
  expect(initialProps.onClose).toHaveBeenCalledTimes(1);
});

it('disable to edit', () => {
  const component = setUp({ updateDisable: true });
  findByTestAttr(component, 'tag-name').simulate('doubleClick');
  expect(findByTestAttr(component, 'tag-name').length).toBe(1);
  expect(findByTestAttr(component, 'input-edit').length).toBe(0);
});

describe('edit mode', () => {
  beforeEach(() => {
    findByTestAttr(component, 'tag-name').simulate('doubleClick');
  });

  it('render tag, edit mode', () => {
    expect(findByTestAttr(component, 'tag-name').length).toBe(0);
    expect(findByTestAttr(component, 'input-edit').props().placeholder).toBe(initialProps.name);
  });

  it('hiddin edit mode, onblur', () => {
    findByTestAttr(component, 'container').simulate('blur');
    expect(findByTestAttr(component, 'tag-name').length).toBe(1);
    expect(findByTestAttr(component, 'input-edit').length).toBe(0);
  });

  it('updating tag', () => {
    const name = 'newNameTest';
    findByTestAttr(component, 'input-edit').getElement().ref.current = {
      value: name,
    };
    findByTestAttr(component, 'input-edit').simulate('keyPress', {
      key: 'Enter',
    });
    expect(initialProps.updateTag).toHaveBeenCalled();
  });
});

function setUp(props = {}) {
  const initialState = {};
  return shallow(<Tag {...initialProps} {...props} />);
}
