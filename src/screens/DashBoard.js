import {View, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import MainHeader from '../components/MainHeader';
import BottomNavigation from './BottomNavigation';

function DashBoard() {
  return (
    <View style={styles.container}>
      <BottomNavigation />
    </View>
  );
}
export default DashBoard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between',
  },
});
