import React from 'react';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';
import { Text } from 'react-native-elements';
import LoginScreen from './LoginScreen';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icons from 'react-native-vector-icons/FontAwesome5';
const IntroScreen = ({ navigation }) => {
  //   const [isDone, setIsDone] = useState(false);

  const slides = [
    {
      key: 'one',

      image: require('../asset/images/Log.png'),

    },
    {
      key: 'two',
      title: 'Connecting ',
      text: 'Your',
      text2: 'Future',

      image: require('../asset/images/Log.png'),

    },
    // {
    //   key: 'three',
    //   title: 'Develop Your Brand',
    //   text: 'Leverage cutting edge technology to scale ',
    //   text2: 'Up your efforts & profits exponentially',
    //   image: require('../asset/images/intro3.png'),
    //   backgroundColor: '#22bcb5',
    //   styles: {marginTop: 60},
    // },
  ];

  const renderItem = ({ item }) => {
    return (
      <ImageBackground source={require('../asset/images/Angle.png')} style={styles.backgroundImage}>
        <View style={styles.container}>

          <Image
            source={item.image}
            resizeMode="contain"
            style={[styles.img, item.styles]}
          />
          <View style={{ marginHorizontal: 10 }}>
            <Text
              style={{
                color: '#A2C1C5',
                textAlign: 'center',
                fontFamily: 'Gilroy',
                fontSize: 36.681,
                fontStyle: 'normal',
                fontWeight: '800',
                lineHeight: 35.662,
                letterSpacing: -0.734,
                top:170,
              }}>
              {item.title}
            </Text>
            <Text
              style={{
                color: '#A2C1C5',
                textAlign: 'center',
                fontFamily: 'Gilroy',
                fontSize: 24.454,
                fontStyle: 'normal',
                fontWeight: '800',
                lineHeight: 35.662,
                letterSpacing: -0.489,
                top:170,
              }}>
              {item.text}
            </Text>
            <Text
              style={{
                color: '#F2FF46',
                textAlign: 'center',
                fontFamily: 'Gilroy',
                fontSize: 65.21,
                fontStyle: 'normal',
                fontWeight: '800',
                top:160,
                letterSpacing: -1.304,
                width: 290.389,
                height: 82.983,
                transform: [{ rotate: '0.043deg' }],
                flexShrink: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {item.text2}
            </Text>
            <Text style={{
              color: '#F2FF46',
              textAlign: 'center',
              fontFamily: 'Gilroy',
              fontSize: 65.21,
              fontStyle: 'normal',
              fontWeight: '800',
              lineHeight: 35.662,
              letterSpacing: -1.304,
            }}>
              {item?.text3}
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  };
  const renderDoneButton = () => {
    return (
      <View>
        <Image source={require('../asset/images/nextBtnBackground.png')} />
        <Icons
          name="angle-right"
          style={{ position: 'absolute', left: 18, top: 12, fontSize: 18 }}
        />
      </View>
    );
  };
  const renderNextButton = () => {
    return (
      <View>
        <Image source={require('../asset/images/nextBtnBackground.png')} />
        <Icons
          name="angle-right"
          style={{ position: 'absolute', left: 18, top: 12, fontSize: 18 }}
        />
      </View>
    );
  };

  const onDone = () => {
    navigation.navigate('LoginScreen');
  };
  const renderSkipButton = () => {
    return (
      <Text
        style={{
          color: '#8d8d8d',
          fontWeight: 'bold',
          position: 'absolute',
          top: 760,
          left: 5,
        }}>
        Skip
      </Text>
    );
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      showSkipButton="true"
      renderNextButton={renderNextButton}
      renderDoneButton={renderDoneButton}
      renderSkipButton={renderSkipButton}
      activeDotStyle={{ backgroundColor: '#6180d5' }}
      onDone={onDone}
    />
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 100,

  },
  img: {
    width: 183.913,
    height: 36.1,
    transform: [{ rotate: '-0.043deg' }],
    flexShrink: 0,
    top: 360
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    bottom: 18,
    position: 'relative',
    width:414,
    height:816


  },
});