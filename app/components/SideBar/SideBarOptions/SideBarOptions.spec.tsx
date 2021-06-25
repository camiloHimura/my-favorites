import 'jsdom-global/register';
import React from 'react';
import SideBarOptions, { iProps } from './SideBarOptions';
import { useAppSelector } from '../../../hooks/redux';
import { findByTestAttr, storeFactory } from '../../../utils/test';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { setSideBarErrorIndexAction, setSideBarIndexAction } from '../../../state/actions';

const setUpDispatch = jest.fn();
jest.mock('../../../hooks/redux', () => ({
  useAppDispatch: () => setUpDispatch,
  useAppSelector: jest.fn(),
}));

jest.mock('../../../state/actions', () => ({
  setSideBarIndexAction: jest.fn(),
  setSideBarErrorIndexAction: jest.fn(),
}));

const setSelectedComponent = jest.fn();
const componentTest = () => <div>test</div>;
const defaultProps: iProps = {
  setSelectedComponent,
  options: [
    { icon: 'test1', component: componentTest },
    { icon: 'test2', component: componentTest },
  ],
};

beforeEach(() => {
  setSelectedComponent.mockReset();
});

it('Should call setSideBarErrorIndexAction and setSelectedComponent', () => {
  const activeIndex = 1;
  setUp({ sideBar: { activeIndex, errorIndex: 0 } });

  expect(setSelectedComponent).toHaveBeenCalledWith(activeIndex);
  expect(setSideBarErrorIndexAction).toHaveBeenCalledWith(defaultProps.options.length - 1);
});

it('Should call setSideBarIndexAction with ans specefic index', () => {
  const component = setUp({ sideBar: { activeIndex: 1, errorIndex: 0 } });
  const index = defaultProps.options.length - 1;

  findByTestAttr(component, 'btn-option').at(index).simulate('click');

  expect(setSideBarIndexAction).toHaveBeenCalledWith(index);
});

const setUp = (initialState = {}, props = {}) => {
  (useAppSelector as jest.Mock).mockImplementation((selector) => selector(initialState));
  const mockStore = storeFactory(initialState);

  return mount(
    <Provider store={mockStore}>
      <SideBarOptions {...defaultProps} {...props} />
    </Provider>,
  );
};
