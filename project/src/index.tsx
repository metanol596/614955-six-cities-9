import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app/app';

import { offers } from './mocks/offers';
import { comments } from './mocks/comments';

import { store } from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <App
        offers={offers}
        comments={comments}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
