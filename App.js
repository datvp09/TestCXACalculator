import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import MainScreen from './src/MainScreen';
import reducer from './src/reducer';

const store = createStore(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainScreen />
      </Provider>
    );
  }
}
