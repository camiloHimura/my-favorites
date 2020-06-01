import React from 'react';
import { mount, shallow } from 'enzyme';

import CreateLink from './CreateLink';
import { setPropTypes, findByTestAttr } from '../../utils/test/';
import { LINK_DEFAULTS } from '../../contans/LStorageNames';

jest.mock('../../utils/LStorage')
jest.mock("react-redux", () => ({
  connect: (mapStateToProps, mapDispatchToProps) => (ReactComponent) => ReactComponent
}));

var Component;
const initialProps = {
  tags: [],
  clearLs: jest.fn(),
  addLink: jest.fn(),
  getAllTags: jest.fn(),
  setLsUrl: jest.fn(),
  setLsTitle: jest.fn(),
  setLsTagsAction: jest.fn(),
  localStorage: LINK_DEFAULTS
}

describe('Initial set up', () => {
  beforeEach(() => {
    Component = setUp()
  })
  it('checking prop types', () => {
    let response;
    const component = CreateLink;
    const requiredValues = {localStorage: {}};
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
      findByTestAttr(Component, 'inp-title').simulate('change')

      findByTestAttr(Component, 'inp-url').instance().value = newLink.url;
      findByTestAttr(Component, 'inp-url').simulate('change')


      findByTestAttr(Component, 'btn-send').simulate('click');
      expect(initialProps.addLink).toHaveBeenCalled();
      expect(initialProps.clearLs).toHaveBeenCalled();
      expect(findByTestAttr(Component, 'inp-title').instance().value).toBe('');
      expect(findByTestAttr(Component, 'inp-url').instance().value).toBe('');
    })
  })
})

//Todo move the below code to MY CODE app
/* it('saving info in LStorage and keep it if the link is not sent to the endpoint', () => {
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
}) */

function setUp(props = {}){
  return mount(<CreateLink {...initialProps} {...props}/>)
}
