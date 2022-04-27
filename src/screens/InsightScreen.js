import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Card from '../components/Card';
import Transcation from '../components/Transaction';
import MainHeader from '../components/MainHeader';
// import {LinearGradient} from 'react-native-linear-gradient';
const InsightScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MainHeader title="WALLET" />
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
