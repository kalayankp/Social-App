import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
const TradeStatus = ({type, count}) => {
  let statusBackground;
  if (type === 'ALL') {
    statusBackground = '#f0faff';
  } else if (type === 'ONGOING') {
    statusBackground = '#fffced';
  } else {
    statusBackground = '#efffe5';
  }
  return (
    <View style={[styles.contianer, {backgroundColor: statusBackground}]}>
      <Text style={styles.statusType}>{type}</Text>
      <Text style={styles.statusCount}>{count}</Text>
    </View>
  );
};
export default TradeStatus;

const styles = StyleSheet.create({
  contianer: {
    justifyContent: 'space-between',
    backgroundColor: '#f0faff',
    borderWidth: 0,
    borderRadius: 15,
    width: 100,
    height: 100,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  statusType: {
    textAlign: 'center',
    // marginBottom: 1,

    fontSize: 12,
    fontWeight: '400',
  },
  statusCount: {
    textAlign: 'center',
    fontSize: 37,
    // fontFamily: 'open sans',

    padding: 10,
    fontWeight: 'bold',
  },
});
