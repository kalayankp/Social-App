import React from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import TransactionList from './TransactionList';
const Transcation = () => {
  const transaction = [
    {
      day: new Date(),
      transactionType: 'Token Purchase',
      transcationId: '000104281',
      amount: '₹300',
    },
    {
      day: new Date(),
      transactionType: 'Trade',
      transcationId: '000104281',
      amount: '₹300',
    },
    {
      day: new Date(),
      transactionType: 'Trade',
      transcationId: '000104281',
      amount: '₹300',
    },
    {
      day: new Date(),
      transactionType: 'Token Purchase',
      transcationId: '000104281',
      amount: '₹300',
    },
    {
      day: new Date(),
      transactionType: 'Token Purchase',
      transcationId: '000104281',
      amount: '₹300',
    },
    {
      day: new Date(),
      transactionType: 'Token Purchase',
      transcationId: '000104281',
      amount: '₹1000',
    },
    {
      day: new Date(),
      transactionType: 'Trade',
      transcationId: '000104281',
      amount: '₹400',
    },
  ];
  return (
    <View style={styles.mainContainer}>
      <View style={styles.transactionHeader}>
        <Text style={styles.transactionText}>Recent Transactions</Text>
        <Pressable>
          <Text style={styles.allTransaction}>see all</Text>
        </Pressable>
      </View>
      <TransactionList transaction={transaction} />
    </View>
  );
};
export default Transcation;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    marginHorizontal: 30,
    backgroundColor: '#fff',
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  transactionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e2022',
  },
  allTransaction: {
    color: '#6180d5',
  },
});
