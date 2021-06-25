import 'jsdom-global/register';
import React from 'react';
import Tag from './Tag';
import { mount } from 'enzyme';

import { findByTestAttr, storeFactory } from '../../../utils/test';
import { Provider } from 'react-redux';
import { updateTagAsyncAction } from '../../../state/actions';
const initialProps = {
  id: 'idTest',
  color: 'FFFF',
  name: 'testName',
  updateTag: jest.fn(),
  onClose: jest.fn(),
};

const setUpDispatch = jest.fn();
jest.mock('../../../hooks/redux', () => ({
  useAppDispatch: () => setUpDispatch,
  useAppSelector: jest.fn(),
}));

jest.mock('../../../state/actions', () => ({
  updateTagAsyncAction: jest.fn(),
}));

let component;
beforeEach(() => {
  component = setUp();
});

it('render tag, no edit mode', () => {
  expect(findByTestAttr(component, 'Icon').length).toBe(1);
  expect(findByTestAttr(component, 'tag-name').text()).toBe(initialProps.name);
  expect(findByTestAttr(component, 'input-edit').length).toBe(0);
});

it('should call prop OnClose clicking de icon', () => {
  findByTestAttr(component, 'Icon').simulate('click');
  expect(initialProps.onClose).toHaveBeenCalledTimes(1);
});

it('disable to edit', () => {
  const component = setUp({ isUpdateDisable: true });
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
    expect(findByTestAttr(component, 'input-edit').prop('placeholder')).toBe(initialProps.name);
  });

  it('hide edit mode, onblur', () => {
    findByTestAttr(component, 'container').simulate('blur');
    expect(findByTestAttr(component, 'tag-name').length).toBe(1);
    expect(findByTestAttr(component, 'input-edit').length).toBe(0);
  });

  it('updating tag', () => {
    const name = 'newNameTest';
    (findByTestAttr(component, 'input-edit').getElement() as any).ref.current = {
      value: name,
    };
    findByTestAttr(component, 'input-edit').simulate('keyPress', {
      key: 'Enter',
    });
    expect(updateTagAsyncAction).toHaveBeenCalledWith(initialProps.id, name);
  });

  it('has "noCursor"  class if "isUpdateDisable" is false', () => {
    const component = setUp({ isUpdateDisable: true });
    findByTestAttr(component, 'container').simulate('blur');
    const button = findByTestAttr(component, 'tag-name');
    expect(button.prop('className')).toBe('noCursor');
  });
});

const setUp = (props = {}) => {
  const mockStore = storeFactory({});

  return mount(
    <Provider store={mockStore}>
      <Tag {...initialProps} {...props} />
    </Provider>,
  );
};
