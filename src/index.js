import React from 'react';
import './reset.scss'
import 'antd/dist/antd.css'
import './index.scss';
import './App.scss';
import App from './App';

import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { getAllQuestions } from './actions'

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

store.dispatch(getAllQuestions())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
