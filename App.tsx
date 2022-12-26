import React from 'react';
import { Provider } from 'react-redux'
import store from './src/screens/store';
import AppNavigator from './src/navigators/MainNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>
  );
};
export default App;
