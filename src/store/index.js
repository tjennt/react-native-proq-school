
import {createStore, applyMiddleware} from 'redux';
// import thunk from 'redux-thunk';
import reducers from '../reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';


const store = createStore(
    reducers,
    {},
    devToolsEnhancer()
);

export default store;