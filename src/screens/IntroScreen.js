import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import LoginScreen from './LoginScreen';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icons from 'react-native-vector-icons/FontAwesome5';
const IntroScreen = ({navigation}) => {
  //   const [isDone, setIsDone] = useState(false);

  const slides = [
    {
      key: 'one',
      title: 'Promote your business',
      text: 'Find new customers, Affiliations & ',
      text2: 'Partnerships Easily ',
      image: require('../asset/images/intro1.png'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 'two',
      title: 'Engage your audience',
      text: 'Gain access & insights like never before ',
      text2: 'Reach new people and deepen',
      text3: 'Relationships.',
      image: require('../asset/images/intro2.png'),
      backgroundColor: '#febe29',
    },
    {
      key: 'three',
      title: 'Develop Your Brand',
      text: 'Leverage cutting edge technology to scale ',
      text2: 'Up your efforts & profits exponentially',
      image: require('../asset/images/intro3.png'),
      backgroundColor: '#22bcb5',
      styles: {marginTop: 60},
    },
  ];

  const renderItem = ({item}) => {
    return (
      <View style={styles.container}>
        <Image
          source={item.image}
          resizeMode="contain"
          style={[styles.img, item.styles]}
        />
        <View style={{marginHorizontal: 10}}>
          <Text
            style={{
              fontSize: 27,
              fontWeight: 'bold',
              marginBottom: 20,
              textAlign: 'center',
              color: '#2e3e5c',
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: 15,
              textAlign: 'center',
              marginBottom: 8,
              color: '#7a809d',
            }}>
            {item.text}
          </Text>
          <Text
            style={{
              fontSize: 15,
              textAlign: 'center',
              color: '#7a809d',
              marginBottom: 8,
            }}>
            {item.text2}
          </Text>
          <Text style={{fontSize: 15, textAlign: 'center', color: '#7a809d'}}>
            {item?.text3}
          </Text>
        </View>
      </View>
    );
  };
  const renderDoneButton = () => {
    return (
      <View>
        <Image source={require('../asset/images/nextBtnBackground.png')} />
        <Icons
          name="angle-right"
          style={{position: 'absolute', left: 18, top: 12, fontSize: 18}}
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
          style={{position: 'absolute', left: 18, top: 12, fontSize: 18}}
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
          top: 10,
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
      activeDotStyle={{backgroundColor: '#6180d5'}}
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
    width: 200,
  },
});
