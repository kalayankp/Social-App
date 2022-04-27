import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import Navigation from '../screens/Navigation';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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

const DrawerN = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="LoginFlow"
        component={LoginFlow}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerN;
