import React from 'react';
import { Fragment } from 'redux-little-router';
import { Home } from './Home';
import { Example } from '../../example';

export const Content = () => (
  <React.Fragment>
    <Fragment id="home-fragment" withConditions={location => location.pathname === '/'}>
      <Home />
    </Fragment>
    <Fragment forRoute="/example">
      <Example />
    </Fragment>
  </React.Fragment>
);

Content.propTypes = {};
Content.displayName = 'Content';
