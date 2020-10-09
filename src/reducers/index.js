import {combineReducers} from 'redux';
import newsDetailReducer from './newsDetailReducer';

export default combineReducers({
  newsDetail:newsDetailReducer
});