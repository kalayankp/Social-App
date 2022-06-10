import React from 'react';
import {View, FlatList, StyleSheet, Platform} from 'react-native';
import {Text} from 'react-native-elements';

import moment from 'moment';
const TransactionList = ({transaction}) => {
  function renderTransaction(itemData) {
    let month = moment(itemData.item.day.getMonth(), 'M').format('MMM');
    return (
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Text style={{fontSize: 16}}>{itemData.item.day.getDate()}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 7, marginRight: 3, color: '#535353'}}>
              {month}
            </Text>
            <Text
              style={{
                fontSize: 7,
                color: '#535353',
              }}>
              {itemData.item.day.getFullYear().toString().slice(-2)}
            </Text>
          </View>
        </View>
        <View style={styles.transactionTypeConatiner}>
          <View
            style={{
              //   borderWidth: 1,
              height: 40,
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 13, fontWeight: '700', color: '#1e2022'}}>
              {itemData.item.transactionType}
            </Text>
            <Text style={{fontSize: 13, color: '#77838f'}}>
              {itemData.item.transcationId}
            </Text>
          </View>
          <View>
            <Text>{itemData.item.amount}</Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <FlatList
      style={{marginBottom: 80, marginTop: 20}}
      data={transaction}
      key={Math.random()}
      renderItem={renderTransaction}
    />
  );
};
export default TransactionList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    width: '80%',
    // borderWidth: 1,
  },
  dateContainer: {
    backgroundColor: '#f1f1f1',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',

    padding: 8,
    marginBottom: 5,
  },
  transactionTypeConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    width: '80%',
  },
});
