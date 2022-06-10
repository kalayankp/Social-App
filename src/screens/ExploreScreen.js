import React from 'react';
import {StyleSheet, View, SafeAreaView, StatusBar} from 'react-native';
import {Text} from 'react-native-elements';
import MainHeader from '../components/MainHeader';
import metrics from '../contents/metrics';
import TradeList from '../components/TradeList';
import TradeStatus from '../components/TradeStatus';
import RightIcons from '../components/RightIcons';

const ExploreScreen = () => {
  console.log(metrics.height);
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
    <>
      <StatusBar backgroundColor="white" />
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <MainHeader title="YOUR TRADES" rightComponent={RightIcons} />
        <View style={{flex: 1, marginTop: 10}}>
          <View style={styles.statusContainer}>
            <TradeStatus type="ALL" count="44" />
            <TradeStatus type="ONGOING" count="44" />
            <TradeStatus type="COMPLETED" count="172" />
          </View>
          <View style={styles.cardLayout}>
            <TradeList data={data} />
          </View>
        </View>
        <View style={{marginBottom: metrics.width >= 800 ? 35 : 80}} />
      </View>
    </>

    // </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusContainer: {
    height: metrics.height > 843 ? 160 : 170,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  cardLayout: {
    height: '100%',
  },
});

export default ExploreScreen;
