import 'react-native';
import React from 'react';
import MainScreen from '../src/MainScreen';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
const store = mockStore({calReducer: {output: '0'}});

describe('MainScreen', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = renderer
        .create(
          <Provider store={store}>
            <MainScreen />
          </Provider>,
        )
        .toJSON();
      expect(component).toMatchSnapshot();
    });
  });
});
