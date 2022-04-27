import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icons from 'react-native-vector-icons/FontAwesome5';
import FIcon from 'react-native-vector-icons/Feather';
import Navigation from './BottomNavigation';
import MainHeader from '../Components/MainHeader';

// const AddIcon = () => {
//   return (
//     <View
//       style={{
//         width: 70,
//         height: 70,
//         borderRadius: 35,
//         borderWidth: 3,
//         borderColor: '#f5f5f5',
//         backgroundColor: '#5851bc',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 20,
//       }}>
//       <FIcon name="plus" size={40} color="white" />
//     </View>
//   );
// };

const BottomNavigation = () => {
  // const Tab = createBottomTabNavigator();
  return <NavigationContainer>{/* <Navigation /> */}</NavigationContainer>;
};
export default BottomNavigation;
