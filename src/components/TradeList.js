import {
  FlatList,
  View,
  Pressable,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import metrics from '../contents/metrics';
const TradeList = ({data}) => {
  //   const renderTradeList =({items})=>(<View><Text>{items.}</Text></View>)
  function renderTradeList(itemData) {
    let statusBackground =
      itemData.item.status === 'ONGOING' ? '#ffb101' : '#51ba0e';
    return (
      <View style={styles.container}>
        <View style={styles.image}></View>
        <View style={styles.tradedData}>
          <Text style={styles.tradeHeading}>TRADED WITH</Text>

          <Text style={styles.tradePerson}>{itemData.item.tradeWith}</Text>
          <View style={styles.statusContainer}>
            <Text
              style={[styles.tradeStatus, {backgroundColor: statusBackground}]}>
              {itemData.item.status}
            </Text>
          </View>
        </View>

        <View style={styles.subData}>
          <Text style={styles.tradeId}>#{itemData.item.id}</Text>
          <Pressable>
            <Icon name="angle-right" style={styles.icon} />
          </Pressable>
        </View>
      </View>
    );
  }
  return (
    <FlatList
      //   style={{marginBottom: '18%'}}
      style={{marginBottom: metrics.height / 10}}
      data={data}
      keyExtractor={item => item.id}
      renderItem={renderTradeList}
    />
  );
};
export default TradeList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    borderWidth: 0.4,
    borderColor: 'grey',
  },
  image: {
    width: 85,
    height: 85,
    backgroundColor: 'grey',
    // marginHorizontal: 10,
    // marginVertical: 10,
  },
  tradedData: {
    flex: 1,
    justifyContent: 'space-between',
    // marginHorizontal: 20,
    // borderWidth: 1,
    paddingLeft: 20,
    // paddingBottom: 10,
    height: '100%',
  },
  tradeHeading: {
    color: '#7f8e9d',
    fontSize: 11,
  },
  tradePerson: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '400',
  },
  subData: {
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
  },

  tradeStatus: {
    textAlign: 'center',
    paddingHorizontal: 15,

    borderWidth: 0,
    borderRadius: 10,
    overflow: 'hidden',
    color: '#fff',
    fontWeight: 'bold',
  },
  subData: {
    // borderWidth: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  icon: {
    // borderWidth: 1,
    fontSize: 30,
    marginRight: 10,
    color: '#7f8e9d',
  },
  tradeId: {
    textAlign: 'right',
    marginLeft: 15,
    color: '#7f8e9d',
  },
});
