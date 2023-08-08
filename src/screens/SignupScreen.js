import React, { useState, useContext, useEffect } from 'react';
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
  ScrollView,
  StatusBar,
} from 'react-native';

import { Input, Text } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faUserPlus, faEnvelope, faEye, faEyeSlash, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { Context as AuthContext } from '../context/AuthContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

console.log(windowHeight);

const SignUpComponent = ({ navigation }) => {
  const handlelogin = () => {
    navigation.navigate('LoginScreen')
  }

  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Visible, setVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const PasswordVisibility = () => {
    setVisible(!Visible);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.card}>
          <Text style={styles.headtext}>Sign up</Text>
          
          <View style={styles.iconsContainer}>
            <TouchableOpacity style={styles.googleButton}>
              <Image
                source={require('../asset/googleLogo.png')}
                style={styles.googleIcon}
              />
              <Text style={styles.googleButtonText}>Log in with Google</Text>
            </TouchableOpacity>
          </View>

        
          <Text style={styles.nametext}>Name</Text>
          <TextInput
            style={[styles.fields, isInputFocused ? styles.inputFocused : null]}
            placeholder="Jhon Doe"
            placeholderTextColor="#707070"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            value={name}
            onChangeText={(text) => setname(text)}
          />
          <Text style={styles.nametext}>Email</Text>
          <TextInput
            style={[styles.fields, isInputFocused ? styles.inputFocused : null]}
            placeholder="example@gmail.com"
            placeholderTextColor="#707070"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Text style={styles.nametext}>Password</Text>
          <TextInput
            style={[styles.fields, isInputFocused ? styles.inputFocused : null]}
            placeholder="at least 8 characters"
            placeholderTextColor="#707070"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            secureTextEntry={!Visible}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity style={styles.passwordVisibility} onPress={PasswordVisibility}>
            <FontAwesomeIcon
              icon={Visible ? faEyeSlash : faEye}
              size={20}
              color="#1A3837"
            />
          </TouchableOpacity>
          <View style={styles.remember}>
            <TouchableOpacity
              style={styles.box}
              onPress={() => setRememberMe(!rememberMe)}
            >
              {rememberMe && <FontAwesomeIcon icon={faCheck} size={18} color="#1A3837" />}
            </TouchableOpacity>
            <Text style={styles.rememberText}>I agree with Terms and Privacy</Text>
          </View>

    
          <View style={styles.Buttoncontainer}>
            <TouchableOpacity style={styles.Button}>
              <Text style={styles.ButtonText}>Sign up</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.loginLinkContainer}>
            <TouchableOpacity onPress={handlelogin}>
              <Text style={styles.loginLinkText}>Already have an account?</Text>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  keyboardAvoidingView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    marginTop: 70,
    marginBottom: 40,
    paddingHorizontal:10
  },
  headtext: {
    fontSize: 24,
    color: '#1A3837',
    fontFamily: 'Roboto',
    fontWeight: '600',
    marginBottom: 30,
    marginLeft:10
  },
  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginLeft:10
  },
  googleButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 327,
    height: 50,
    paddingVertical: 7,
    paddingHorizontal: 39,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#rgba(0, 0, 0, 0.05)',
  },
  googleIcon: {
    height: 15,
    width: 15,
    marginRight: 15,
    backgroundColor: 'none',
    color: 'rgba(0, 0, 0, 0.70)',
  },
  googleButtonText: {
    color: '#1A3837',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '600',
  },
  nametext: {
    color: 'rgba(0, 0, 0, 0.70)',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    marginLeft:15,
    top:4
  },
  fields: {
    height: 50,
    width:327,
    borderRadius: 10,
    borderWidth: 1,
    color: 'rgba(0, 0, 0, 0.50)',
    marginHorizontal: 14,
    paddingHorizontal: 20,
    fontFamily: 'Roboto',
    fontWeight: '600',
    fontStyle: 'normal',
  },
  inputFocused: {
    borderColor: 'rgba(1, 133, 254, 0.70)',
  },
  passwordVisibility: {
    marginRight: 10,
    color: '#A2C1C5',
    flexShrink: 0,
    marginLeft: 300,
    opacity: 0.5,
    bottom: 35,
    marginLeft: 310,
  },
  remember: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft:15
  },
  box: {
    width: 20,
    height: 20,
    flexShrink: 0,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#A2C1C5',
    backgroundColor: '#D8D8D8',
    marginRight: 10,
  },
  rememberText: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.40)',
    fontFamily: 'Roboto',
    fontWeight: '400',
  },
  Buttoncontainer: {
    alignContent: 'center',
    marginBottom: 20,
    marginLeft:15
  },
  Button: {
    display: 'flex',
    width: 320,
    height: 50,
    paddingVertical: 7,
    paddingHorizontal: 10,
    flexShrink: 0,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: '#A2C1C5',
    marginLeft: 2,
  },
  ButtonText: {
    color: '#1A3837',
    fontSize: 16,
    fontFamily: 'Roboto',
    textAlign: 'center',
    fontWeight: '800',
    marginRight:10,
    top:6
  },
  loginLinkContainer: {
    alignItems: 'center',
    marginTop: 20,
    
  },
  loginLinkText: {
    color: 'rgba(0, 0, 0, 0.40)',
    fontFamily: 'Roboto',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: undefined,
    bottom: 20,
  },
  loginLink: {
    flexShrink: 0,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: undefined,
    fontWeight: 'bold',
    color: '#374957',
    marginLeft: 45,
    textDecorationLine: 'underline',
  },
});

export default SignUpComponent;