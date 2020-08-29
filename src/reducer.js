import {combineReducers} from 'redux';
import calReducer from './actions';

const reducer = combineReducers({
  calReducer,
  // more reducers
});

export default reducer;
