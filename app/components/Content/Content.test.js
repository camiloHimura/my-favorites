import React from 'react';
import { shallow, mounted } from 'enzyme';

import { Content } from './Content';
import Card from '../Card';

var Component;
const props = {
        links: [],
        numLoadingCards: 10,
        getAllLinks: jest.fn()
      }
const linkData = {id: 'id test', title: 'title test', url: 'test url', description: 'test description'}

beforeEach(() => {
  Component = shallow(<Content {...props}/>);    
});

test('take snapshot', () => {
  expect(Component).toMatchSnapshot();
});

test('render loading links', () => {
  expect(Component.find('CardLoading')).toHaveLength(props.numLoadingCards);
});

test('render loading links', () => {
  expect(Component.find('CardLoading')).toHaveLength(props.numLoadingCards);
});

test.skip('getAllLinks is called', () => {
  Component = shallow(<Content {...props}/>);    
  expect(props.getAllLinks).toHaveBeenCalled();
});

test('render snapshot of final links', () => {
  Component = shallow(<Content {...props} links={[linkData, linkData, linkData]}/>);
  expect(Component).toMatchSnapshot();
});

test('render final links', () => {
  Component = shallow(<Content {...props} links={[linkData, linkData, linkData]}/>);
  expect(Component.find(Card)).toHaveLength(3);
  expect(Component.find(Card).at(0).props()).toEqual(linkData);
});


