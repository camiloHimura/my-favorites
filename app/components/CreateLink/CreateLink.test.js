import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { CreateLink } from './CreateLink';
import { setPropTypes, findByTestAttr } from '../../utils/test/';

var Component;
const initialProps = {
  tags: [],
  addLink: jest.fn(),
  getAllTags: jest.fn(),
}

beforeEach(() => {
  Component = setUp()
})
it('checking prop types', () => {
  let response;
  const component = CreateLink;
  const requiredValues = {};
  response = setPropTypes({component, requiredValues, prop: 'addLink', value:() => {}})
  expect(response).toBeUndefined();
  
  response = setPropTypes({component, requiredValues, prop: 'tags', value: []})
  expect(response).toBeUndefined();
  
});

test('take snapshot', () => {
  expect(Component).toMatchSnapshot();
});

test('get initial tags', () => {
  expect(initialProps.getAllTags).toHaveBeenCalled()
})

test('render elements', () => {
  expect(findByTestAttr(Component, 'inp-title')).toHaveLength(1)
  expect(findByTestAttr(Component, 'inp-url')).toHaveLength(1)
  expect(findByTestAttr(Component, 'btn-send')).toHaveLength(1)
  expect(findByTestAttr(Component, 'cp-tagList')).toHaveLength(1)
  expect(findByTestAttr(Component, 'cp-tagList').prop('tags').length).toBe(0)
})

describe('interacting with imputs', () => {
  test('sending form with invalid data', () => {
    findByTestAttr(Component, 'btn-send').simulate('click');
    expect(initialProps.addLink).not.toHaveBeenCalled();
  })

  test('sending form with invalid title and valid url', () => {
    findByTestAttr(Component, 'btn-send').simulate('click');
    findByTestAttr(Component, 'inp-url').instance().value = 'url test';
    expect(initialProps.addLink).not.toHaveBeenCalled();
  })
  
  test('sending form with valid title and invalid url', () => {
    findByTestAttr(Component, 'inp-title').instance().value = 'title test';
    findByTestAttr(Component, 'btn-send').simulate('click');
    expect(initialProps.addLink).not.toHaveBeenCalled();
  })  

  test('sending form with valid title and invalid url', () => {
    const newLink = {title: 'test title', url: 'test url', tags: [{id : 1}, {id: 2}, {id: 3}]}
    findByTestAttr(Component, 'inp-title').instance().value = newLink.title;
    findByTestAttr(Component, 'inp-url').instance().value = newLink.url;
    //onTagsSaved update the internal state it must be wrapper in this helper 'act'
    act(() => {
      findByTestAttr(Component, 'cp-tagList').prop('onTagsSaved')(newLink.tags);
    })

    const getTagId = tags => tags.map(tag => tag.id);
    findByTestAttr(Component, 'btn-send').simulate('click');
    expect(initialProps.addLink).toHaveBeenCalledWith({...newLink, tags: getTagId(newLink.tags)});
    expect(findByTestAttr(Component, 'inp-title').instance().value).toBe('');
    expect(findByTestAttr(Component, 'inp-url').instance().value).toBe('');
  })
})

function setUp(props = {}){
  return mount(<CreateLink {...initialProps} {...props} />)
}
