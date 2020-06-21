
import React from 'react';
import { shallow } from 'enzyme';
import { Content } from './Content';

describe('Content component', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<Content />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders <Home /> if currently looking at "/" path', () => {
    const location = { pathname: '/' };
    const wrapper = shallow(<Content />);
    const condition = wrapper.find('#home-fragment').props().withConditions(location);
    expect(condition).toBe(true);
  });
});
