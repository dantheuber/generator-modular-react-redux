import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configure-store';
import { Content } from './content';
// TODO: better css class imports
import './index.raw.css';
import './global.raw.css';

export default function bootstrap() {
  ReactDOM.render(
    <Provider store={configureStore()}>
      <Content />
    </Provider>,
    document.getElementById('root'),
  );
}
