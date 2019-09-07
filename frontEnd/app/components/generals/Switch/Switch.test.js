import React, {useState} from 'react';
import '../../../setupTests';
import { shallow, mount } from 'enzyme';
import Switch from './Switch'

var wrapper;
beforeEach(() => {
    wrapper = shallow(<Switch/>);
})

describe('component rendering', () =>{    
    
    it('render', () => {
        wrapper = shallow(<Switch/>);
        expect(wrapper.html()).toMatchSnapshot();
    })
})