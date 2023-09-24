import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar ,ActivityIndicator} from 'react-native';
import { Text } from 'react-native-elements';
import MainHeader from '../components/MainHeader';
import metrics from '../contents/metrics';
import TradeList from '../components/TradeList';
import TradeStatus from '../components/TradeStatus';
import RightIcons from '../components/RightIcons';

import { getTradeData } from './api/data';

const ExploreScreen = () => {
  const [tradeData, setTradeData] = useState([]);
  const [isLoading , setIsLoading] =  useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const dataAsTrader1 = await getTradeData('Trade', 'Trader1');
    const dataAsTrader2 = await getTradeData('Trade', 'Trader2');
    // Concatenate the two arrays
    const mergedData = dataAsTrader1.concat(dataAsTrader2);
    // Sort the merged data by the 'modifiedAt' field in ascending order
    mergedData.sort((a, b) => new Date(a.modifiedAt) - new Date(b.modifiedAt));
    // Filter out items with the same ID
    const filteredData = mergedData.filter((item, index, self) => {
      return index === self.findIndex((t) => (
        t.id === item.id
      ));
    });
  
    setTradeData(filteredData);
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, []);

  const renderTradeList = () => {
    return (
      <TradeList
        data={tradeData}
        style={{ marginBottom: metrics.height / 10 }}
      />
    );
  };

  return (
    <>
      <StatusBar backgroundColor="white" />
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <MainHeader title="YOUR TRADES" rightComponent={RightIcons} />
        <View style={{ flex: 1, marginTop: 10 }}>
          {/* Add your TradeStatus components here */}
          <View style={styles.statusContainer}>
            {/* Replace the count values with actual counts */}
            <TradeStatus type="ALL" count={tradeData.length} />
            {/* Calculate the counts for ONGOING and COMPLETED trades */}
            {/* You can use tradeData.filter() to count based on trade.status */}
            <TradeStatus
              type="ONGOING"
              count={tradeData.filter((trade) => trade.status === 'ONGOING').length}
            />
            <TradeStatus
              type="COMPLETED"
              count={tradeData.filter((trade) => trade.status === 'COMPLETED').length}
            />
          </View>
          <View style={styles.cardLayout}>
            {/* Render the trade list */}

            {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        renderTradeList()
      )}
            
          </View>
        </View>
        <View style={{ marginBottom: metrics.width >= 800 ? 35 : 80 }} />
      </View>
    </>
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
