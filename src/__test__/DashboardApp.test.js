import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { DashboardApp } from '../pages';

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

it('increment investment amount in seven days', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={mockStore}>
      <DashboardApp />
    </Provider>,
    div
  );
});
