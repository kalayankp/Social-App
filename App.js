import React from 'react';
import {App as Index} from './src/routes/Index';
import {Provider as AuthProvider} from './src/context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Index />
    </AuthProvider>
  );
};

export default App;
