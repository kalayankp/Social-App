import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Animated,
  PanResponder,
} from 'react-native';
import MainHeader from '../components/MainHeader';
import Icons from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IIcons from 'react-native-vector-icons/Ionicons';
import {Shadow} from 'react-native-shadow-2';
import {cardImage1, cardImage2, cardImage3} from '../asset/images';
import metrics from '../contents/metrics';

const AllImages = [cardImage1, cardImage2, cardImage3];
const Cards = ({imgPath, setDragImage}) => {
  console.log(imgPath);
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gesture) => {
        console.log(gesture.dy);
        if (gesture.dy < -283) {
          setDragImage(imgPath);
          console.log(imgPath);
        }
        return Animated.event(
          [
            null,
            {
              dx: pan.x,
              dy: pan.y,
            },
          ],
          {useNativeDriver: false},
        )(evt, gesture);
      },

      onPanResponderGrant: (e, gesture) => {
        // scrollViewSetterFunction(false);
      },
      onPanResponderRelease: () => {
        // scrollViewSetterFunction(true);
        pan.flattenOffset();
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;
  return (
    <Shadow containerViewStyle={{marginRight: 10, marginVertical: 5}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 10,
        }}>
        <Animated.Image
          {...panResponder.panHandlers}
          resizeMode="contain"
          source={imgPath}
          style={{
            transform: [{translateX: pan.x}, {translateY: pan.y}],
            borderRadius: 10,
            height: metrics.height / 4,
            width: metrics.height / 6,
          }}
        />
      </View>
    </Shadow>
  );
};
const CreateTradeScreen = ({navigation}) => {
  const [scrollViewActive, setScrollViewActive] = useState(true);
  const [dragImage, setDragImage] = useState(null);
  console.log(dragImage);

  const Back = () => {
    function back() {
      navigation.navigate('BottomTabNavigation');
    }
    return (
      <View>
        <Pressable onPress={back}>
          <IIcons name="return-up-back" size={28} style={{marginRight: 12}} />
        </Pressable>
      </View>
    );
  };
  console.log(metrics.width);
  return (
    <View style={styles.mainContainer}>
      <MainHeader title="TRADE" rightComponent={Back} />

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
              {dragImage === null ? (
                <View style={[styles.dragCardContainer]}>
                  <Icons
                    name="plus"
                    size={38}
                    color="#c7c7c7"
                    style={{textAlign: 'center', marginBottom: 10}}
                  />
                  <Text
                    style={{
                      color: '#6e6e6e',
                      fontSize: 15,
                    }}>
                    You can drag cards from below to Trade with
                  </Text>
                </View>
              ) : (
                <Image source={dragImage} />
              )}
            </Shadow>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#1f1f1f',
                textAlign: 'center',
                marginTop: 15,
              }}>
              My Deck
            </Text>
          </View>
          <View>
            <Text style={{fontSize: 18, textAlign: 'center', color: '#1f1f1f'}}>
              Srikanth is Trading
            </Text>
            <Shadow containerViewStyle={{marginTop: 20, marginLeft: 10}}>
              <View style={styles.dragCardContainer}>
                <Image source={cardImage2} />
              </View>
            </Shadow>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#1f1f1f',
                textAlign: 'center',
                marginTop: 15,
              }}>
              Srikanth's Deck
            </Text>
          </View>
        </View>
      </View>

      {/* part 2 */}
      <View style={{marginBottom: 30}}>
        {/* <View
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
        </View> */}
        {/* <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#707070',
          }}></View> */}

        <View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 30,
                marginHorizontal: 8,
              }}>
              {AllImages.map((img, i) => {
                console.log(img);
                return (
                  <Cards
                    key={i}
                    imgPath={img}
                    setDragImage={setDragImage}
                    scrollViewSetterFunction={setScrollViewActive}
                  />
                );
              })}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              marginHorizontal: 20,
            }}>
            <Pressable
              style={{
                backgroundColor: '#dedee5',
                width: 150,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text>CANCEL TRADE</Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: '#5851bc',
                width: 150,
                marginLeft: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text>ACCEPT TRADE</Text>
            </Pressable>
          </View>
        </View>
      </View>
      {console.log(metrics, 'jojojo')}
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  yourTradeContainer: {
    // flex: 1,
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
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    borderRadius: 10,

    height: metrics.height / 4,
    width: metrics.height / 6,
  },
});
export default CreateTradeScreen;
