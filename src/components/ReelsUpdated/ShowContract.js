import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { supabase } from '../../utils/supabase';
import Clause from '../Signing/Clauses';

const ShowContract = () => {
  const [title, setTitle] = useState(null);
  const [clauses, setClauses] = useState([]);
  const [loading, setLoading] = useState(true);

  const route = useRoute();

  const ShowContractFunction = () => {
    const postId = route.params?.postId;

    async function getContract() {
      setLoading(true);
      try {
        const { data, error } = await supabase.from('Post').select('*').eq('id', postId).single();

        if (error) {
          console.log(error);
          setLoading(false);
          return;
        }

        if (data.contract != null) {
          const { data: contract, error: contracterror } = await supabase
            .from('Contract')
            .select('*')
            .eq('id', data.contract)
            .single();

          if (contracterror) {
            console.log(contracterror);
            setLoading(false);
            return;
          }

          setTitle(contract.title);

          const { data: clauses, error: clauseserror } = await supabase
            .from('Clauses')
            .select('*')
            .eq('contract_id', contract.id);

          if (clauseserror) {
            console.log(clauseserror);
            setLoading(false);
            return;
          }

          setClauses(clauses);
        } else {
          setTitle(null);
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    getContract();
  }


  useEffect(ShowContractFunction, [])



  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000000" />
          </View>
        ) : (
          <>
            <Text style={styles.title}>{title || 'No Contract'}</Text>
            <Text style={styles.numberOfClauses}>{clauses.length} Clauses Total</Text>
          </>
        )}
      </View>

      <FlatList
        style={styles.clause}
        data={clauses}
        renderItem={({ item }) => <Clause clause={item.clause} index={item.id} />} // Adjust this as per your data structure
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  title: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 25,
    color: '#525266',
  },
  editButtonText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 18,
    color: '#FF6666',
  },
  backButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  sign: {
    backgroundColor: '#EC4D36',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  signText: {
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  numberOfClauses: {
    fontFamily: 'Inter',
    fontWeight: 'normal',
    fontSize: 10,
    color: '#525266',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: "70%",
  },
});

export default ShowContract;
