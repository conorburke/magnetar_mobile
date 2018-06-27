import React from 'react';
import { shallow } from 'enzyme';
import Tool from './Tool';
import { createStore } from 'redux';
import reducers from '../reducers';

const store = createStore(reducers);

const tool = { Price: 1, ToolType: 'Hammer', FirstName: 'Randy' };

const wrapper = shallow(<Tool tool={tool} store={store} />).dive();

it('should render the Tool component', () => {
  expect(wrapper).toMatchSnapshot();
});
