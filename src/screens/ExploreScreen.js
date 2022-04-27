import React from 'react';
import {Text, StyleSheet, View, SafeAreaView} from 'react-native';
import MainHeader from '../components/MainHeader';

import TradeList from '../components/TradeList';
import TradeStatus from '../components/TradeStatus';
const ExploreScreen = () => {
  const data = [
    {
      id: 517665,
      tradeWith: 'Srikanth B R',
      status: 'ONGOING',
    },
    {
      id: 517664,
      tradeWith: 'Anand Krishnan',
      status: 'ONGOING',
    },
    {
      id: 517613,
      tradeWith: 'Lokesh N',
      status: 'COMPLETED',
    },
    {
      id: 517565,
      tradeWith: 'Param G',
      status: 'COMPLETED',
    },
    {
      id: 517561,
      tradeWith: 'Param G',
      status: 'COMPLETED',
    },
    {
      id: 517550,
      tradeWith: 'Param G',
      status: 'COMPLETED',
    },
    {
      id: 517571,
      tradeWith: 'Param G',
      status: 'COMPLETED',
    },
    {
      id: 517581,
      tradeWith: 'Param G',
      status: 'COMPLETED',
    },
    {
      id: 517591,
      tradeWith: 'Param G',
      status: 'COMPLETED',
    },
    {
      id: 517321,
      tradeWith: 'Param G',
      status: 'COMPLETED',
    },
    {
      id: 517322,
      tradeWith: 'Param G',
      status: 'COMPLETED',
    },
    {
      id: 517320,
      tradeWith: 'Param G',
      status: 'COMPLETED',
    },
  ];
  return (
    // <SafeAreaView style={{flex: 1}}>
    // {/* <MainHeader title="YOUR TRADE" /> */}
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MainHeader title="YOUR TRADES" />
      <View style={{flex: 1, marginBottom: 150, marginTop: 10}}>
        <View style={styles.statusContainer}>
          <TradeStatus type="ALL" count="44" />
          <TradeStatus type="ONGOING" count="44" />
          <TradeStatus type="COMPLETED" count="172" />
        </View>
        <View style={styles.cardLayout}>
          <TradeList data={data} />
        </View>
      </View>
    </View>
    // </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusContainer: {
    // marginTop: 5,
    height: 150,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    // padding: 15,
  },
  cardLayout: {
    height: '100%',
  },
});

export default ExploreScreen;
