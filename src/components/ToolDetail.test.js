import React from 'react';
import { shallow } from 'enzyme';
import ToolDetail from './ToolDetail';
import { createStore } from 'redux';
import reducers from '../reducers';

const store = createStore(reducers);

const toolDetails = {
  Title: "Ray's Hammer",
  Price: 1,
  ToolType: 'Hammer',
  FirstName: 'Randy'
};

const wrapper = shallow(
  <ToolDetail toolDetails={toolDetails} store={store} />
).dive();

it('should render the ToolDetail component', () => {
  expect(wrapper).toMatchSnapshot();
});
