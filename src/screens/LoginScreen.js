import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faUserPlus, faEye, faEyeSlash, faKey, faUser, faSterlingSign } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../utils/supabase';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = ({ navigation }) => {
  const handleSignup = () => {
    navigation.navigate('SignupScreen');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async () => {
    try {
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      });

      if (error) {
        // Handle error, show error message, etc.
        console.error('Login Error:', error.message);
      } else {
        // Login successful, do something with the user object.
        console.log('Logged in user:', user);
      }
    } catch (error) {
      console.error('Login Error:', error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../asset/images/Log.png')} style={styles.logo} />
      <Text style={styles.header}>DOT N LINE</Text>
      <Text style={styles.headertext}>Log in</Text>

      <View style={styles.inputContainer}>
        <FontAwesomeIcon icon={faUser} size={25} color="#A2C1C5" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View style={styles.passwordContainer}>
        <FontAwesomeIcon icon={faKey} size={25} color="#A2C1C5" style={styles.inputIcon} />
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.passwordVisibilityIcon} onPress={togglePasswordVisibility}>
          <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} size={25} color="#1A3837" />
        </TouchableOpacity>
      </View>

      <View style={styles.rememberContainer}>
        <TouchableOpacity style={styles.checkbox} onPress={() => setRememberMe(!rememberMe)}>
          {rememberMe && <FontAwesomeIcon icon={faCheck} size={18} color="#1A3837" />}
        </TouchableOpacity>
        <Text style={styles.rememberLabel}>Remember me</Text>
      </View>

           <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordLabel}>Forgot Password</Text>
      </TouchableOpacity>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpLabel}>Don't have an account?</Text>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignup}>
          <FontAwesomeIcon icon={faUserPlus} size={20} color="#1A3837" />
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: 414,
    height: 896,
    backgroundColor: '#DCDCDC',
    padding: 50,
    justifyContent: 'center',
  
  },
  logo: {
    width: 279,
    height: 55.487,
    marginLeft: windowWidth / 2 - 176,
    marginBottom: 20,
    bottom:40,
    
  },
  header: {
    color: '#A2C1C5',
    textAlign: 'center',
    fontFamily: 'Gilroy',
    fontSize: 25,
    fontWeight: '900',
    lineHeight: 31,
    marginTop: 60,
    bottom: 80,
  },
  headertext: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    bottom: 60,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#A6A6A6',
    marginBottom:20
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#1A3837',
    textAlign: 'left',
    marginRight: 40,
    marginLeft:100
   
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#A6A6A6',
  },
  passwordInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#1A3837',
    textAlign: 'left',
    marginLeft:80
  },
  passwordVisibilityIcon: {
    marginRight: 10,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
    top:10
    
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#A2C1C5',
    backgroundColor: '#D8D8D8',
   
  },
  rememberLabel: {
    fontSize: 18,
    color: 'rgba(0, 0, 0, 0.67)',
    marginLeft: 10,
  },
  forgotPassword: {
    marginBottom: 10,
    justifyContent: 'center',
    textAlign:'center',
    top:20
  },
  forgotPasswordLabel: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.67)',
    textAlign:'center',
    fontWeight: '600',

  },
  loginButton: {
    width: 310,
    height: 50.487,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#F2FF46',
    backgroundColor: '#A2C1C5',
    marginTop: 30,
   
  
    
  },
  loginButtonText: {
    color: '#1A3837',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '800',
    top:12
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    padding: 10,
  },
  signUpLabel: {
    fontSize: 16,
    color: '#1A3837',
    marginRight: 5,
  },
  signUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signUpButtonText: {
    fontSize: 16,
    color: '#374957',
    fontWeight: '800',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;