import React, {useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//USER DEFINED IMPORTS
import {Context as AuthContext} from '../context/AuthContext';
import LoginFlow from './LoginFlow';
import MainFlow from './MainFlow';

const Stack = createStackNavigator();

const App = () => {
  const {state, localSignIn} = useContext(AuthContext);

  useEffect(() => {
    localSignIn();
  }, []);
  console.log(state);

  if (state.isLoading) {
    return null;
  }

  if (!state.isLoading) {
    return (
      <NavigationContainer>
        {state.isSignedIn ? (
          <>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="MainFlow" component={MainFlow} />
            </Stack.Navigator>
          </>
        ) : (
          <>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="LoginFlow" component={LoginFlow} />
            </Stack.Navigator>
          </>
        )}
      </NavigationContainer>
    );
  }
};

export {App};
