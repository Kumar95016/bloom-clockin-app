/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';
import Main from './src';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-native-toast-notifications'
import Loader from './src/components/loader';

const App = () => {

  return (
    <Provider store={store}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ToastProvider>
          <Main />
        </ToastProvider>
        <Loader />
      </View>
    </Provider>


  );
}

export default App;
