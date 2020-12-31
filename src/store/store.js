import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import rootReduer from '../reducer';
const store = createStore(rootReduer, applyMiddleware(thunk));


export default store;

