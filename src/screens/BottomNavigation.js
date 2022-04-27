import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screens
import ExploreScreen from './ExploreScreen';
import MyCardsScreen from './MyCardsScreen';
import InsightScreen from './InsightScreen';
import ProfileScreen from './ProfileScreen';
import Add from './Add';

//Extras
import {AddIcon} from './AddIcon';

// Navigation Options
import {
  ExploreNavigationOption,
  ProfileNavigationOptions,
  MyCardsNavigationOption,
  InsightNavigationOption,
  BottomNavigationScreenOption,
} from '../components/TabBottomIcons';

function BottomNavigation() {
  const Tab = createBottomTabNavigator();
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

export default BottomNavigation;
