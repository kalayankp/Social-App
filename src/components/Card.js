import LinearGradient from 'react-native-linear-gradient';
import {View, StyleSheet, Button, Pressable} from 'react-native';
import {Text} from 'react-native-elements';
import React from 'react';
import Icons from 'react-native-vector-icons';
const Card = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.backGroundContainer}></View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[
          '#ff9b8e',
          '#ff8482',
          '#ff6372',
          '#ff4362',
          '#fe415f',
          '#ff154b',
        ]}
        style={styles.gradient}>
        <View style={styles.mainContainer}>
          <View style={styles.currentAmount}>
            <View style={{flex: 1}}>
              <Text style={styles.currencyStyle}>{'\u20A8 '}3412.12</Text>
              <Text style={styles.currentBalance}>Current Balance</Text>
            </View>
            <View style={styles.btnContainer}>
              <Pressable>
                <Text style={styles.buyBtn}>Buy Tokens</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.starContainer}>
            <View style={styles.starNumber}>
              <Text style={styles.starOne}>****</Text>
              <Text style={styles.starTwo}>****</Text>
              <Text style={styles.starThree}>****</Text>
              <Text
                style={{
                  marginTop: 5,
                  marginLeft: 10,
                  color: 'white',
                  fontWeight: '700',
                }}>
                5321
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};
export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    // flex: 0.5,
    backgroundColor: '#fff',
    marginTop: 10,
    marginHorizontal: 20,
    height: 250,
    width: '90%',

    // borderWidth: 1,
  },
  backGroundContainer: {
    backgroundColor: '#79ff59',
    height: 230,
    right: 12,
    borderRadius: 12,
  },

  gradient: {
    height: 230,
    width: '100%',
    borderRadius: 15,
    position: 'absolute',
    left: 5,
  },
  mainContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    flex: 1,
  },
  currentAmount: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 28,
    marginVertical: 15,

    // borderWidth: 1,
  },
  currencyStyle: {
    marginBottom: 10,
    fontSize: 25,
    color: 'white',
  },
  currentBalance: {
    color: 'white',
  },
  btnContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center',
  },
  buyBtn: {
    fontSize: 18,
    color: '#1f1f1f',
  },
  starContainer: {
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginBottom: 20,
    // borderWidth: 1,
  },

  starNumber: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  starOne: {
    marginRight: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  starTwo: {
    marginRight: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  starThree: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
});
