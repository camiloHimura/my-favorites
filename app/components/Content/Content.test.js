import React from 'react';
import { shallow, mounted } from 'enzyme';

import Content from './Content';

import { storeFactory, setPropTypes, findByTestAttr } from '../../utils/test';
var Component;
const props = {
        links: [],
        numLoadingCards: 10,
        getAllLinks: jest.fn()
      }
const linkData = {id: 'id test', title: 'title test', url: 'test url', description: 'test description'}

beforeEach(() => {
  Component = setUp(props);
});

it('checking prop types', () => {
  let response;
  const component = Content;
  const requiredValues = props;

  response = setPropTypes({component, requiredValues, prop: 'getAllLinks', value: ()=>{}})
  expect(response).toBeUndefined();
  
  response = setPropTypes({component, requiredValues, prop: 'links', value: []})
  expect(response).toBeUndefined();
});

test('render loading links', () => {
  expect(findByTestAttr(Component, 'cardLoading').length).toBe(props.numLoadingCards);
});

test('render loading links', () => {
  expect(findByTestAttr(Component, 'cardLoading').length).toBe(props.numLoadingCards);
});

test.skip('getAllLinks is called', () => {
  expect(props.getAllLinks).toHaveBeenCalled();
});

test('render final links', () => {
  const links = [linkData, linkData, linkData]
  Component = setUp(props, {links});
  expect(findByTestAttr(Component, 'card').length).toBe(links.length);
  expect(findByTestAttr(Component, 'card').at(0).props()).toEqual({...linkData, 'data-test': 'card'});
});

test('passing tags to TagList component', () => {
  const tags = Array.from({length: 3}, () => ({name: 'tagName', id: 123}));
  Component = setUp(props, {tags});
  expect(findByTestAttr(Component, 'tagList').prop('options')).toBe(tags);
});

function setUp(props = {}, initialState = {}){
  const store = storeFactory(initialState);
  return shallow(<Content {...props} store={store}/>).dive().dive()
}