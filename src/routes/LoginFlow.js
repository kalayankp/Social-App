import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import IntroScreen from '../screens/IntroScreen';
import SignupScreen from '../screens/SignupScreen'
import EditProfile from '../screens/EditProfile'
const Stack = createStackNavigator();

const LoginFlow = () => {
  return (
    <Stack.Navigator initialRouteName="IntroScreen">
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
       <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{headerShown: false}}
      />
        <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />

    </Stack.Navigator>
  );
};

export default LoginFlow;