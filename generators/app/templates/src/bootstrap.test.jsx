import React from 'react';
import { render } from 'react-dom';
import bootstrap from './bootstrap';

jest.mock('react-dom', () => ({
  render: jest.fn(),
}));
jest.mock('react-redux', () => ({
  Provider: () => <div>Provider</div>,
}));
jest.mock('./configure-store', () => () => ({ the: 'store' }));
jest.mock('./content', () => ({
  Content: () => <div>Content</div>,
}));
jest.mock('./index.raw.css', () => ({}));
jest.mock('./global.raw.css', () => ({}));
delete document.getElementById;
document.getElementById = jest.fn().mockReturnValue('test');

describe('bootstrap', () => {
  it('renders with ReactDOM on root', () => {
    bootstrap();
    expect(render).toHaveBeenCalled();
    expect(document.getElementById).toHaveBeenCalledWith('root');
  });
});
