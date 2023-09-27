import React, { useState } from 'react';
import { useContext } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Text} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Context as AuthContext } from '../context/AuthContext';

import {
  faCheck,
  faUserPlus,
  faEye,
  faEyeSlash,
  faKey,
  faUser,
  faSterlingSign,
} from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../utils/supabase';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = ({ navigation }) => {
  const handleSignup = () => {
    navigation.navigate('SignupScreen');
  };
  const { state, updateLoginStatus } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleLogin() {
    console.log('handleLogin');
    console.log(email, password);
    setLoading(true);
  
    try {
      const { data: userInfo, error: userInfoError } = await supabase
        .from('UserInfo')
        .select('*')
        .eq('Email', email)
        .single(); // Use .single() to get a single result
  
      if (userInfo) {
        console.log(userInfo.id);
  
        try {
          const { data: passwordInfo, error: passwordError } = await supabase
            .from('Password')
            .select('*')
            .eq('User_Id', userInfo.id)
            .single(); // Use .single() to get a single result
  
          if (passwordInfo && passwordInfo.SaltedHash === password) {
            console.log('Login Successful');
            setLoading(false);
            setErrorMessage('');
  
            const id = userInfo.id;
            console.log('this id from login screen', id);
            updateLoginStatus({ email, id });
          } else {
            console.log('Password is incorrect');
            setLoading(false);
            setErrorMessage('Please Check Your Password');
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setLoading(false);
        setErrorMessage('Please Check Your Email');
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErrorMessage('Please Check Your Email');
    }
  }
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../asset/images/Log.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.header}>DOT N LINE</Text>
      <Text style={styles.headertext}>Log in</Text>

      <View style={styles.inputContainer}>
        <FontAwesomeIcon
          icon={faUser}
          size={windowWidth * 0.06}
          color="#A2C1C5"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          underlineColorAndroid="transparent"
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesomeIcon
          icon={faKey}
          size={windowWidth * 0.06}
          color="#A2C1C5"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={(text) => setPassword(text)}
          underlineColorAndroid="transparent"
        />
    

        <TouchableOpacity
          style={styles.passwordVisibilityIcon}
          onPress={togglePasswordVisibility}
        >
          <FontAwesomeIcon
            icon={passwordVisible ? faEyeSlash : faEye}
            size={windowWidth * 0.06}
            color="#979797"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.rememberContainer}>
        <TouchableOpacity
          style={[
            styles.checkbox,
            rememberMe ? styles.checkedCheckbox : null,
          ]}
          onPress={() => setRememberMe(!rememberMe)}
        >
          {rememberMe && (
            <FontAwesomeIcon
              icon={faCheck}
              size={windowWidth * 0.05}
              color="#1A3837"
            />
          )}
        </TouchableOpacity>
        <Text style={styles.rememberLabel}>Remember me</Text>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordLabel}>Forgot Password</Text>
      </TouchableOpacity>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpLabel}>Don't have an account?</Text>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignup}>
          <FontAwesomeIcon
            icon={faUserPlus}
            size={windowWidth * 0.06}
            color="#1A3837"
          />
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: windowWidth * 0.05,
  },
  logo: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.25,
  },
  header: {
    color: '#A2C1C5',
    fontFamily: 'Gilroy',
    fontSize: windowWidth * 0.07,
    fontWeight: '900',
    bottom:50
  },
  headertext: {
    fontSize: windowWidth * 0.06,
    fontWeight: 'bold',
    marginBottom: windowWidth * 0.05,
    bottom:40
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth * 0.8,
    height: windowWidth * 0.12,
    borderBottomWidth: 1,
    borderBottomColor: '#A6A6A6',
    marginBottom: windowWidth * 0.04,
  },
  inputIcon: {
    marginRight: windowWidth * 0.02,
  },
  input: {
    flex: 1,
    fontSize: windowWidth * 0.04,
    color: '#1A3837',
  },
  passwordVisibilityIcon: {
    position: 'absolute',
    right: 0,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: windowWidth * 0.04,
    marginTop:'4%'
  },
  checkbox: {
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
    borderRadius: windowWidth * 0.010,
    borderWidth: 1,
    borderColor: '#A2C1C5',
    backgroundColor: '#D8D8D8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: windowWidth * 0.04,
  },
  checkedCheckbox: {
    backgroundColor: '#A2C1C5',
  },
  rememberLabel: {
    fontSize: windowWidth * 0.04,
    color: 'rgba(0, 0, 0, 0.67)',
    marginRight: windowWidth * 0.41, 
  },
    errorText: {
    color: 'red',
   
    marginLeft: 15,
   bottom:130
  },
  forgotPassword: {
    marginBottom: windowWidth * 0.03,
    marginTop:10
   
  },
  forgotPasswordLabel: {
    fontSize: windowWidth * 0.04,
    color: 'rgba(0, 0, 0, 0.67)',
    textAlign: 'center',
    fontWeight: '600',
  },

  loginButton: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.12,
    borderRadius: windowWidth * 0.06,
    borderWidth: 1,
    borderColor: '#F2FF46',
    backgroundColor: '#A2C1C5',
    marginTop: windowWidth * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#1A3837',
    fontSize: windowWidth * 0.05,
    fontWeight: '800',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: windowWidth * 0.01,
  },
  signUpLabel: {
    fontSize: windowWidth * 0.04,
    color: '#1A3837',
    marginRight: windowWidth * 0.02,
  },
  signUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signUpButtonText: {
    fontSize: windowWidth * 0.04,
    color: '#374957',
    fontWeight: '800',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;