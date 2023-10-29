import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { adminReducer } from './adminReducer';
import { clientReducer } from './clientReducer';


const rootReducer = combineReducers({
  admin: adminReducer,
  client: clientReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));