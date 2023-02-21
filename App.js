import React from 'react';
import {App as Index} from './src/routes/Index';
import {Provider as AuthProvider} from './src/context/AuthContext';
import { Provider as PaperProvider, Provider } from 'react-native-paper';
import {enableLatestRenderer} from 'react-native-maps';
enableLatestRenderer();
const App = () => {
  return (
    <Provider>
    <AuthProvider>
      <Index />
    </AuthProvider>
    </Provider>
  );
};

export default App;
