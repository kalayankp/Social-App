import React from 'react';
import {App as Index} from './src/routes/Index';
import {Provider as AuthProvider} from './src/context/AuthContext';
import { Provider as PaperProvider } from 'react-native-paper';
import {enableLatestRenderer} from 'react-native-maps';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from './src/store/store';
import { Provider } from "react-redux";

enableLatestRenderer();
const App = () => {
  return (
   
    <Provider store= {store} >
    <AuthProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Index />
      </GestureHandlerRootView>
    </AuthProvider>
    </Provider>

  );
};

export default App;