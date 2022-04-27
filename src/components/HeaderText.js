import {Text, View, Image, StyleSheet} from 'react-native';
import React from 'react';
const HeaderText = ({title}) => {
  return (
    <View style={styles.container}>
      {/* <Image
        style={styles.image}
        source={require('../asset/images/logo.png')}
      /> */}
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};
export default HeaderText;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    // width: '100%',
    // justifyContent: 'space-between',

    // marginRight: 28,
  },

  headerText: {
    color: '#27282f',
    // marginTop: 4,
    fontSize: 18,
    // marginTop: 5,
    marginRight: 5,
    // position: 'absolute',
    // right: 50,
    // top: -2,
  },
});
