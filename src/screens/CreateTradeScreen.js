import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import MainHeader from '../components/MainHeader';
import Icons from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IIcons from 'react-native-vector-icons/Ionicons';
import {Shadow} from 'react-native-shadow-2';
import {cardImage1, cardImage2, cardImage3} from '../asset/images';
import metrics from '../contents/metrics';

const Cards = ({imgPath}) => {
  return (
    <Shadow containerViewStyle={{marginRight: 10, marginVertical: 5}}>
      <View
        style={{
          //   marginTop: 20,
          //   marginHorizontal: 5,
          height: 230,
          backgroundColor: 'white',
          borderRadius: 10,
        }}>
        <Image
          resizeMode="contain"
          source={imgPath}
          style={{borderRadius: 10}}
        />
        <View style={{flexDirection: 'row', marginTop: 8, marginLeft: 15}}>
          <Pressable>
            <Icons name="thumbs-o-up" size={15} />
          </Pressable>
          <Pressable style={{marginLeft: 20}}>
            <MaterialIcon name="message-text-outline" size={15} />
          </Pressable>
          <Pressable style={{marginLeft: 20}}>
            <IIcons name="ios-share-social-outline" size={15} />
          </Pressable>
          <Pressable style={{marginLeft: 13}}>
            <MaterialIcon name="dots-vertical" size={15} />
          </Pressable>
        </View>
      </View>
    </Shadow>
  );
};
const CreateTradeScreen = () => {
  console.log(metrics.height);
  return (
    <View style={styles.mainContainer}>
      <MainHeader title="TRADE" />

      <View style={styles.yourTradeContainer}>
        <Text style={styles.tradeHeading}>Your Trades</Text>

        <View style={styles.tradeCardContainer}>
          <View
            style={{
              borderRightWidth: 1,
              borderRightColor: '#d9d9d9',
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                fontSize: 18,
                marginBottom: 20,
                textAlign: 'center',
                color: '#1f1f1f',
              }}>
              You are Trading
            </Text>

            <Shadow containerViewStyle={{marginRight: 20}}>
              <View style={[styles.dragCardContainer, {marginRight: 10}]}>
                <Icons
                  name="plus"
                  size={38}
                  color="#c7c7c7"
                  style={{textAlign: 'center', marginBottom: 10}}
                />
                <Text style={{width: 100, color: '#6e6e6e', fontSize: 15}}>
                  You can drag cards from below to Trade with
                </Text>
              </View>
            </Shadow>
          </View>
          <View>
            <Text style={{fontSize: 18, textAlign: 'center', color: '#1f1f1f'}}>
              Srikanth is Trading
            </Text>
            <Shadow containerViewStyle={{marginTop: 20, marginLeft: 10}}>
              <View style={styles.dragCardContainer}>
                <Icons
                  name="plus"
                  size={38}
                  color="#c7c7c7"
                  style={{textAlign: 'center', marginBottom: 10}}
                />
                <Text style={{width: 100, color: '#6e6e6e', fontSize: 15}}>
                  You can drag cards from below to Trade with
                </Text>
              </View>
            </Shadow>
          </View>
        </View>
      </View>

      {/* part 2 */}
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            marginTop: 10,
            justifyContent: 'space-between',

            paddingBottom: 30,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#1f1f1f'}}>
            My Deck
          </Text>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#1f1f1f'}}>
            Srikanth's Deck
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#707070',
          }}></View>

        <ScrollView
          //   style={{height: 200}}
          //   style={{height: metrics.height > 883 ? 1000 : 200}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <ScrollView
            horizontal={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 30,
                marginHorizontal: 8,
              }}>
              <Cards imgPath={cardImage1} />
              <Cards imgPath={cardImage2} />
              <Cards imgPath={cardImage3} />
            </View>
          </ScrollView>
        </ScrollView>
      </View>

      {/* end of main container */}
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  yourTradeContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  tradeHeading: {
    color: '#1f1f1f',
    fontSize: 27,
  },
  tradeCardContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  dragCardContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    borderRadius: 10,
  },
});
export default CreateTradeScreen;
