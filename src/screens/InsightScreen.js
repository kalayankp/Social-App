import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import Card from '../components/Card';
import Transcation from '../components/Transaction';
import MainHeader from '../components/MainHeader';
import RightIcons from '../components/RightIcons';
// import {LinearGradient} from 'react-native-linear-gradient';
const InsightScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MainHeader title="WALLET" rightComponent={RightIcons} />
      <View style={styles.cardContainer}>
        <Card />
        <Transcation />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    // marginHorizontal: 20,
    marginTop: 10,

    // paddingVertical: 15,
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
});

export default InsightScreen;
