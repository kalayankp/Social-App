import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Input, Text} from 'react-native-elements';
import {Button} from 'react-native-elements';

import {Context as AuthContext} from '../context/AuthContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = ({navigation}) => {
  const [isLogin, setIsLogin] = useState(true);
  const LoginComponent = () => {
    return (
      <View>
        <View style={{marginTop: 14}}>
          <TextInput
            placeholder="Enter Your Email"
            style={{
              height: 50,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#C7C6C6',
              marginHorizontal: 14,
              paddingHorizontal: 16,
              color: 'black',
            }}
            placeholderTextColor="#707070"
          />
          <TextInput
            placeholder="Enter Your Password"
            style={{
              height: 50,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#C7C6C6',
              marginHorizontal: 14,
              paddingHorizontal: 16,
              color: 'black',
              marginTop: 14,
            }}
            placeholderTextColor="#707070"
          />
        </View>
        <View>
          <TouchableOpacity
            style={{alignSelf: 'flex-end', marginRight: 14, marginTop: 14}}>
            <Text style={{fontWeight: 'bold', color: '#6180D5'}}>
              Forgot Password
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: '#5851BC',
            marginHorizontal: 14,
            marginTop: 14,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>LOGIN</Text>
        </TouchableOpacity>
        <Text style={{textAlign: 'center', marginVertical: 14}}>OR</Text>
        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: '#F1F6FB',
            marginHorizontal: 14,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Image
            source={require('../asset/googleLogo.png')}
            style={{height: 24, width: 24, position: 'absolute', left: 14}}
          />
          <Text style={{flex: 1, textAlign: 'center'}}>LOGIN WITH GOOGLE</Text>
        </TouchableOpacity>
        <View style={{alignItems: 'center', marginTop: 14}}>
          <TouchableOpacity onPress={() => setIsLogin(false)}>
            <Text>
              Don’t have an account ?
              <Text style={{fontWeight: 'bold', color: '#6180D5'}}>
                {' '}
                Sign Up
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const SignUpComponent = () => {
    return (
      <View>
        <View style={{marginTop: 14}}>
          <TextInput
            placeholder="Enter Your Email"
            style={{
              height: 50,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#C7C6C6',
              marginHorizontal: 14,
              paddingHorizontal: 16,
              color: 'black',
            }}
            placeholderTextColor="#707070"
          />
          <TextInput
            placeholder="Enter Your Password"
            style={{
              height: 50,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#C7C6C6',
              marginHorizontal: 14,
              paddingHorizontal: 16,
              color: 'black',
              marginTop: 14,
            }}
            placeholderTextColor="#707070"
          />
          <TextInput
            placeholder="Enter Your Password"
            style={{
              height: 50,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#C7C6C6',
              marginHorizontal: 14,
              paddingHorizontal: 16,
              color: 'black',
              marginTop: 14,
            }}
            placeholderTextColor="#707070"
          />
        </View>

        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: '#5851BC',
            marginHorizontal: 14,
            marginTop: 28,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>SIGNUP</Text>
        </TouchableOpacity>
        <Text style={{textAlign: 'center', marginVertical: 14}}>OR</Text>
        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: '#F1F6FB',
            marginHorizontal: 14,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Image
            source={require('../asset/googleLogo.png')}
            style={{height: 24, width: 24, position: 'absolute', left: 14}}
          />
          <Text style={{flex: 1, textAlign: 'center'}}>SIGNUP WITH GOOGLE</Text>
        </TouchableOpacity>
        <View style={{alignItems: 'center', marginTop: 14}}>
          <TouchableOpacity onPress={() => setIsLogin(true)}>
            <Text>
              Already have an account ?
              <Text style={{fontWeight: 'bold', color: '#6180D5'}}>
                {' '}
                Sign In
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{position: 'absolute'}}>
        <Image source={require('../asset/loginScreenTop.png')} />
      </View>
      <View
        style={{
          marginTop: 180,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>Welcome to HashX</Text>
        <Image
          source={require('../asset/logo.png')}
          style={{height: 120, width: 120, resizeMode: 'contain'}}
        />
      </View>
      {isLogin ? <LoginComponent /> : <SignUpComponent />}
    </View>
  );
};

const styles = StyleSheet.create({
  mainViewContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  logoBgImage: {
    width: windowWidth - 30,
    height: 60,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    marginBottom: 0,
    marginTop: 20,
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },

  logoImage: {
    width: 100,
    height: 100,
  },

  loginContainer: {
    width: windowWidth - 30,
    marginHorizontal: 15,
    borderRadius: 15,
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },

  loginWrapper: {
    backgroundColor: '#FFF',
    borderRadius: 15,
  },

  innerContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
  },

  loginButton: {
    backgroundColor: '#181C32',
    borderRadius: 10,
    paddingVertical: 15,
  },

  loginButtonText: {
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 16,
  },

  image: {
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
  },

  text: {
    color: '#333',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 15,
  },

  registerText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },

  error: {
    color: '#ff0000',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 0,
    fontWeight: '700',
  },

  inputIcon: {
    marginRight: 10,
  },

  inputContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  textInput: {color: 'black', paddingVertical: 0, flex: 1},
});

export default LoginScreen;
