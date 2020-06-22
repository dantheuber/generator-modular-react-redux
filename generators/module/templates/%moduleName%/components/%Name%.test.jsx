import React from 'react';
import { shallow } from 'enzyme';
import { <%= camelName %> } from './<%= camelName %>';

const toggle = jest.fn();

describe('Example component', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<<%= camelName %>
      show
      toggleShow={toggle}
    />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders as expected when not shown', () => {
    const wrapper = shallow(<<%= camelName %>
      show={false}
      toggleShow={toggle}
    />);
    expect(wrapper).toMatchSnapshot();
  });
  it('calls toggleShow when toggle button is clicked', () => {
    const wrapper = shallow(<<%= camelName %>
      show
      toggleShow={toggle}
    />);
    wrapper.find('#toggle').simulate('click');
    expect(toggle).toHaveBeenCalled();
  });
});
