import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import IntroScreen from '../screens/IntroScreen';

const Stack = createStackNavigator();

const LoginFlow = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="IntroScreen"
        component={IntroScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default LoginFlow;
