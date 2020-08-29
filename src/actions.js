import {createActions, handleActions} from 'redux-actions';
import {initialOutput} from './constants';

export const {
  clear,
  evaluate,
  replace,
  replaceBy,
  concat,
  concatWithout,
} = createActions(
  'CLEAR',
  'EVALUATE',
  'REPLACE',
  'REPLACE_BY',
  'CONCAT',
  'CONCAT_WITHOUT',
);

const initialState = {
  output: initialOutput,
};

const calReducer = handleActions(
  {
    CLEAR: (state) => ({
      ...state,
      output: initialOutput,
    }),
    EVALUATE: (state) => ({
      ...state,
      output: '' + eval(state.output),
    }),
    REPLACE: (state, action) => ({
      ...state,
      output: state.output.replace(/.$/, action.payload),
    }),
    REPLACE_BY: (state, action) => ({
      ...state,
      output: state.output.replace(/÷/g, action.payload),
    }),
    CONCAT: (state, action) => ({
      ...state,
      output: state.output + '' + action.payload + '',
    }),
    CONCAT_WITHOUT: (state, action) => ({
      ...state,
      output: action.payload + '',
    }),
  },
  initialState,
);

export default calReducer;
