import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SignedClause from "../components/Signing/SignedClause";



const SigningScreen = () => {
  const navigation = useNavigation();

  const [clauses, setClauses] = useState([
    { id: "1", text: "I agree to use the product for its intended purpose only", isSigned: true },
    { id: "2", text: "I agree not to resell the product", isSigned: false },
    { id: "3", text: "I agree to pay the full amount", isSigned: true},
    

  ]);
  const [totalSingned, setTotalSigned] = useState(0);

  React.useEffect(() => {
    const total = clauses.filter((clause) => clause.isSigned).length;
    setTotalSigned(total);
    }, [clauses]);



  const sign = (id, isSigned) => {
    // setClauses((prevState) =>
    //   prevState.map((clause) =>
    //     clause.id === id ? { ...clause, isSigned } : clause
    //   )
    // );
    console.log(id, isSigned);
  };

  const renderItem = ({ item }) => (
    <SignedClause text={item.text} isSigned={item.isSigned} sign={(isSigned) => sign(item.id, isSigned)} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.terms}>T&amp;C</Text>
      <Text style={styles.numberOfClauses}>Clauses: {totalSingned}/{clauses.length} </Text>
      <FlatList
        data={clauses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />


<View><TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
        <TouchableOpacity
          style={styles.sign}
          onPress={() => { console.log('Save') }}
        >
          <Text style={styles.signText}>Save</Text>
        </TouchableOpacity></View>
    </View>

  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginTop :'50%'
      },
      terms: {
        fontSize: 30,
        fontWeight: "bold",
        color: "black",
      },
      numberOfClauses: {
        fontFamily: 'Inter',
        fontWeight: 'normal',
        fontSize: 10,
        color: '#525266',
      },

      backButtonText: {
        fontFamily: 'Inter',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#FFFFFF',
      },
      backButton: {
        backgroundColor: 'black',  // black
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
        }
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
        }
      },
      signText: {
        fontFamily: 'Inter',
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
      },
    });

export default SigningScreen;