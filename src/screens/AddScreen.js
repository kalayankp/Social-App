import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import MainHeader from '../components/MainHeader';
import Icons from 'react-native-vector-icons/FontAwesome5';
import RightIcons from '../components/RightIcons';
const AddScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <MainHeader title="TRADE SUMMARY" rightComponent={RightIcons} />
      <View style={{marginHorizontal: 15}}>
        <View style={styles.tradeStatusContainer}>
          <View>
            <Text style={styles.tradeIdLabel}>Trade ID</Text>
            <Text style={styles.tradeId}>#517613</Text>
          </View>
          <View>
            <Text style={styles.tradeStatusLabel}>Trade Status</Text>
            <View>
              <Text style={styles.tradeStatus}>CLOSED</Text>
            </View>
          </View>
        </View>
        <View style={styles.tradeDateContainer}>
          <View>
            <Text style={styles.tradeDateLabel}>Trade Date</Text>
            <Text style={styles.tradeDate}>12/02/2022</Text>
          </View>
          <View style={{marginRight: 10}}>
            <Text style={styles.tradeStartedLabel}>Started On</Text>
            <Text style={styles.tradeStarted}>02:43:13</Text>
          </View>
        </View>
      </View>
      <View style={styles.totalCards}>
        <Text style={styles.totalCardsCount}>Trade Details</Text>
      </View>
      <View style={[styles.tradedCardContainer, {marginTop: 50}]}>
        <Text
          style={{
            fontSize: 20,
            color: '#1f1f1f',
            marginLeft: 30,
          }}>
          You Traded ‘4’ Cards
        </Text>
        <Image
          style={{marginLeft: 18}}
          source={require('../asset/images/DownArrow.png')}
        />
      </View>
      <View style={{alignItems: 'center', marginTop: 10}}>
        <Text style={{fontSize: 20}}>&</Text>
      </View>
      <View style={[styles.tradedCardContainer, {marginTop: 40}]}>
        <Text style={{fontSize: 20, color: '#1f1f1f'}}>
          Lokesh Traded ‘6’ Cards
        </Text>
        <Image
          style={{marginLeft: 18}}
          source={require('../asset/images/DownArrow.png')}
        />
      </View>
      <View style={{marginHorizontal: 20, marginTop: 60, padding: 10}}>
        <Text style={{textAlign: 'center', fontSize: 20}}>
          Trade successfully completed on
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 20,
          }}>
          <Text style={{color: '#7c7c7c', fontSize: 25}}>12/02/2022</Text>
          <Text style={{color: '#7c7c7c', fontSize: 25}}>at</Text>
          <Text style={{color: '#7c7c7c', fontSize: 25}}>02:43:13</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 5,
    backgroundColor: '#fff',
  },
  tradeStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 20,
  },
  tradeDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  tradeIdLabel: {
    marginBottom: 8,
    fontSize: 15,
    color: '#1f1f1f',
    fontWeight: '400',
  },
  tradeId: {
    color: '#7c7c7c',
    fontSize: 17,
    marginTop: 2,
  },
  tradeStatusLabel: {
    marginBottom: 8,
    fontSize: 15,
    color: '#1f1f1f',
  },
  tradeStatus: {
    backgroundColor: '#51ba0e',
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 2,
    borderWidth: 0,
    borderRadius: 8,
    overflow: 'hidden',
    fontWeight: '700',
    fontSize: 12,
    marginTop: 4,
  },
  tradeDateLabel: {
    marginBottom: 8,
    color: '#1f1f1f',
    fontSize: 15,
    fontWeight: '400',
  },
  tradeDate: {
    color: '#7c7c7c',
    fontSize: 17,
    fontWeight: '400',
  },
  tradeStartedLabel: {
    marginBottom: 8,
    color: '#1f1f1f',
    fontSize: 15,
    fontWeight: '400',
  },
  tradeStarted: {
    color: '#7c7c7c',
    fontSize: 17,
  },
  totalCards: {
    borderTopColor: '#c7c6c6',
    borderBottomColor: '#c7c6c6',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 10,
    marginTop: 12,
  },
  totalCardsCount: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400',
    color: '#1f1f1f',
  },
  tradedCardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    padding: 20,

    borderRadius: 8,
    backgroundColor: '#f1f1f1',
  },
});

export default AddScreen;
