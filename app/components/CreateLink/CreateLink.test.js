import React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { CreateLink } from './CreateLink';
import { storeFactory, setPropTypes, findByTestAttr } from '../../utils/test/';
import {CREATE_LINK} from '../../contans/LStorageNames';

import LStorage from '../../utils/LStorage';

jest.mock('../../utils/LStorage')
jest.mock("react-redux", () => ({
  connect: (mapStateToProps, mapDispatchToProps) => (ReactComponent) => ReactComponent
}));

var Component;
const initialProps = {
  tags: [],
  addLink: jest.fn(),
  getAllTags: jest.fn(),
}

describe('Initial set up', () => {
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

  it('get initial tags', () => {
    expect(initialProps.getAllTags).toHaveBeenCalled()
  })

  it('render elements', () => {
    expect(findByTestAttr(Component, 'inp-title')).toHaveLength(1)
    expect(findByTestAttr(Component, 'inp-url')).toHaveLength(1)
    expect(findByTestAttr(Component, 'btn-send')).toHaveLength(1)
    expect(findByTestAttr(Component, 'cp-tagList')).toHaveLength(1)
  })
  
  describe('interacting with imputs', () => {
    it('sending form with invalid data', () => {
      findByTestAttr(Component, 'btn-send').simulate('click');
      expect(initialProps.addLink).not.toHaveBeenCalled();
    })
  
    it('sending form with invalid title and valid url', () => {
      findByTestAttr(Component, 'btn-send').simulate('click');
      findByTestAttr(Component, 'inp-url').instance().value = 'url test';
      expect(initialProps.addLink).not.toHaveBeenCalled();
    })
    
    it('sending form with valid title and invalid url', () => {
      findByTestAttr(Component, 'inp-title').instance().value = 'title test';
      findByTestAttr(Component, 'btn-send').simulate('click');
      expect(initialProps.addLink).not.toHaveBeenCalled();
    })  
  
    it('sending form with valid title and invalid url', () => {
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
})


describe('saving link info in LStorage', () => {
  const testLink = {title: 'testLink', url: 'testUrl', tags: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]};

  it('checking the Lstorage when the component is rendered', () => {
    LStorage.has.mockReturnValue(true);
    Component = setUp();
    expect(LStorage.has).toHaveBeenCalledWith(CREATE_LINK)
  })

  it('rendering saved info in LStorage', () => {
    LStorage.has.mockReturnValue(true);
    LStorage.get.mockReturnValue(testLink);
    Component = setUp();

    expect(findByTestAttr(Component, 'inp-title').instance().value).toBe(testLink.title)
    expect(findByTestAttr(Component, 'inp-url').instance().value).toBe(testLink.url)
    expect(findByTestAttr(Component, 'cp-tagList').prop('initialSavedTags').length).toBe(testLink.tags.length);
  })

  it('saving info in LStorage and keep it if the link is not sent to the endpoint', () => {
    let LStorageLink;
    LStorage.has.mockReturnValue(false);
    LStorage.get.mockReturnValue({});
    LStorage.set.mockImplementation((key, value) => LStorageLink = value);
    Component = setUp();

    findByTestAttr(Component, 'inp-title').instance().value = testLink.title;
    findByTestAttr(Component, 'inp-url').instance().value = testLink.url;
    act(() => {
      findByTestAttr(Component, 'cp-tagList').prop('onTagsSaved')(testLink.tags);
    })

    expect(LStorageLink).toEqual({...testLink});
  })

  it('saving info in LStorage and removed when the link is sent to de endpoint', () => {
    LStorage.has.mockReturnValue(false);
    LStorage.get.mockReturnValue(testLink);
    Component = setUp();

    findByTestAttr(Component, 'inp-title').instance().value = testLink.title;
    findByTestAttr(Component, 'inp-url').instance().value = testLink.url;
    findByTestAttr(Component, 'inp-url').simulate('change');
    act(() => {
      findByTestAttr(Component, 'cp-tagList').prop('onTagsSaved')(testLink.tags);
    })
    findByTestAttr(Component, 'btn-send').simulate('click');

    expect(initialProps.addLink).toHaveBeenCalledWith({...testLink, tags: testLink.tags.map(tag => tag.id)});
    expect(LStorage.remove).toHaveBeenCalled();
  })
})

function setUp(props = {}, initialState = {}){
  const store = storeFactory(initialState);
  return mount(<CreateLink {...initialProps} {...props} store={store}/>)
}
