import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers/all.js'
import { Provider } from 'react-redux'

let store = createStore(reducers);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
//registerServiceWorker();
serviceWorker.unregister();