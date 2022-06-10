import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
//thunk란, 특정 작업을 나중에 하도록 미루기 위해서 함수형태로 감싼것을 칭합니다.


import { reducers } from './reducers';
import App from './App';
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
