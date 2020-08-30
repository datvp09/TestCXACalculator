import {createActions, handleActions} from 'redux-actions';
import {initialOutput} from './constants';

export const {
  clear,
  evaluate,
  replace,
  replaceBy,
  concat,
  concatWithout,
  resetMath,
} = createActions(
  'CLEAR',
  'EVALUATE',
  'REPLACE',
  'REPLACE_BY',
  'CONCAT',
  'CONCAT_WITHOUT',
  'RESET_MATH',
);

const initialState = {
  output: initialOutput,
  reset: false,
};

const calReducer = handleActions(
  {
    CLEAR: (state) => ({
      ...state,
      output: initialOutput,
    }),
    EVALUATE: (state) => ({
      ...state,
      output: eval(state.output),
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
      output: state.output + action.payload,
    }),
    CONCAT_WITHOUT: (state, action) => ({
      ...state,
      output: action.payload,
    }),
    RESET_MATH: (state, action) => ({
      ...state,
      reset: action.payload,
    }),
  },
  initialState,
);

export default calReducer;
