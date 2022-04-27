import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import Navigation from '../screens/Navigation';

const Stack = createStackNavigator();

const LoginFlow = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Login"
        component={Navigation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default LoginFlow;
