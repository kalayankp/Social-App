import React from 'react';
import {View, Text} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';
import FIcon from 'react-native-vector-icons/Feather';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screens
import ExploreScreen from './ExploreScreen';
import MyCardsScreen from './MyCardsScreen';
import InsightScreen from './InsightScreen';
import ProfileScreen from './ProfileScreen';
import Add from './Add';

// Navigation Options
import {
  ExploreNavigationOption,
  ProfileNavigationOptions,
  MyCardsNavigationOption,
  InsightNavigationOption,
} from '../components/TabBottomIcons';

export const AddIcon = () => {
  return (
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 3,
        borderColor: '#f5f5f5',
        backgroundColor: '#5851bc',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      }}>
      <FIcon name="plus" size={40} color="white" />
    </View>
  );
};

function Navigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',

          borderRadius: 15,
        },
      }}>
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

export default Navigation;
