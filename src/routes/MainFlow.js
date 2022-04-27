import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screens
import ExploreScreen from '../screens/ExploreScreen';
import MyCardsScreen from '../screens/MyCardsScreen';
import InsightScreen from '../screens/InsightScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Add from '../screens/Add';

//Extras
import {AddIcon} from '../screens/AddIcon';

// Navigation Options
import {
  ExploreNavigationOption,
  ProfileNavigationOptions,
  MyCardsNavigationOption,
  InsightNavigationOption,
  BottomNavigationScreenOption,
} from '../components/TabBottomIcons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigation() {
  return (
    <Tab.Navigator screenOptions={BottomNavigationScreenOption}>
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={ExploreNavigationOption}
      />
      <Tab.Screen
        name="MyCards"
        component={MyCardsScreen}
        options={MyCardsNavigationOption}
      />
      <Tab.Screen
        name="Add"
        component={Add}
        options={{
          tabBarIcon: ({}) => <AddIcon />,
        }}
      />
      <Tab.Screen
        name="Insight"
        component={InsightScreen}
        options={InsightNavigationOption}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={ProfileNavigationOptions}
      />
    </Tab.Navigator>
  );
}

const MainStackFlow = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="MainStackFlow"
        component={MainStackFlow}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
