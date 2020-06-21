import React from 'react';
import { shallow } from 'enzyme';
import { Example } from './Example';

const increaseCount = jest.fn();
const decreaseCount = jest.fn();
const resetCount = jest.fn();

describe('Example component', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<Example
      count={0}
      randomNumber={0}
      increaseCount={increaseCount}
      decreaseCount={decreaseCount}
      resetCount={resetCount}
    />);
    expect(wrapper).toMatchSnapshot();
  });
  it('calls increaseCount when increase button clicked', () => {
    const wrapper = shallow(<Example
      count={0}
      randomNumber={0}
      increaseCount={increaseCount}
      decreaseCount={decreaseCount}
      resetCount={resetCount}
    />);
    wrapper.find('#increase').simulate('click');
    expect(increaseCount).toHaveBeenCalled();
  });
  it('calls decreaseCount when decrease button is clicked', () => {
    const wrapper = shallow(<Example
      count={0}
      randomNumber={0}
      increaseCount={increaseCount}
      decreaseCount={decreaseCount}
      resetCount={resetCount}
    />);
    wrapper.find('#decrease').simulate('click');
    expect(decreaseCount).toHaveBeenCalled();
  });
  it('calls resetCount when reset button is clicked', () => {
    const wrapper = shallow(<Example
      count={0}
      randomNumber={0}
      increaseCount={increaseCount}
      decreaseCount={decreaseCount}
      resetCount={resetCount}
    />);
    wrapper.find('#reset').simulate('click');
    expect(resetCount).toHaveBeenCalled();
  });
});
