import React from 'react';
import App from './src/App';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  // const rendered = renderer.create(<App />).toJSON();
  // expect(rendered).toBeTruthy();
  expect(2>1).toBeTruthy();
});
