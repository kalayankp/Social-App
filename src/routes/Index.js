import React, { useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// USER DEFINED IMPORTS
import { Context as AuthContext } from '../context/AuthContext';
import LoginFlow from './LoginFlow';
import MainFlow from './MainFlow';
import { navigationRef } from './RootNavigation';

const Stack = createStackNavigator();

const App = () => {
  const { state, autoLogin } = useContext(AuthContext); // Destructure state and autoLogin

  useEffect(() => {
    autoLogin();
  }, []);

  if (state.isLoading) {
    return null;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {state.isSignedIn ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainFlow" component={MainFlow} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LoginFlow" component={LoginFlow} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export { App };
