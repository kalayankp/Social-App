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


import { supabase } from '../utils/supabase';

import {Input, Text} from 'react-native-elements';
import {Button} from 'react-native-elements';

import {Context as AuthContext} from '../context/AuthContext';
import { on } from 'events';
import { userInfo } from 'os';
import { set } from 'react-native-reanimated';
import { ActivityIndicator } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const handleSignup = () => {
    navigation.navigate('SignupScreen');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);


  const LoginComponent = () => {
    const {state  , updateLoginStatus} = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading , setLoading] = useState(false)

    async function handelLogin(){
      console.log("handelLogin")
      console.log(email , password)
      setLoading(true)
      try {
        const {data , error} = await supabase.from("UserInfo")
        .select("*")
        .eq("Email" , email)
        console.log("data " , data)
        
        if(data[0].Email == email){
          console.log(data[0].id)

          try{
            let { data : pass, error } = await supabase.from('Password')
          .select("*")
          .eq("User_Id",data[0].id)
          console.log("pass" , pass)
          if(pass[0].SaltedHash === password){
            console.log("Login Successfull")
            setLoading(false)
            id = data[0].id
            console.log(" this id from login screen" , id)
            updateLoginStatus({email,id})
          }
            else{
              console.log("Password is incorrect")
              setLoading(false)
        }
          }
          catch(error){
            console.log(error)
          }
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }




    return (
      <View>
        {
          loading ? <ActivityIndicator size="large" color="#0000ff" /> : 
          <View>
             <View style={{marginTop: 14}}>
          <TextInput
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.nativeEvent.text)}
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
            onChange={(e) => setPassword(e.nativeEvent.text)}
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
        onPress={handelLogin}
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
        }
      </View>
    );
  };
  const SignUpComponent = () => {
    const [loading , setLoading] = useState(false)
    async function handleSignUpSupa({userInfo}) {
      setLoading(true)
      try {
        userInfo = {email ,name, password}
      const { data, error } = await supabase.from('UserInfo').insert([
        {
          Email: userInfo.email,
          name : userInfo.name,
        },
      ]);
      
      if (error) {
        console.log('Error creating User:', error);
      } else {
        console.log('User created successfully');
      }
      const { data: userData, error: selectError } = await supabase.from('UserInfo').select().eq('Email', userInfo.email);
      
      if (selectError) {
        console.log('Error fetching user data:', selectError);
        setLoading(false)
      } else {
        console.log('User data:', userData);
  
  
      if(userData){
              const {data : pass , error : passError} = await supabase.from("Password")
              .insert([
                {
                  SaltedHash : userInfo.password,
                  User_Id : userData[0].id
                }
              ])
              if(passError){
                console.log('Error creating Password:', passError);
              }else{
                console.log('Password created successfully' , pass);
                console.log(userData[0].id);
                handleSignUp({email : userInfo.email  ,  id:userData[0].id})
      }
      }
      }
      } catch (error) {
        console.log('Error signing up:', error.message);
        setLoading(false)
      }
      setLoading(false)
    }
    const [email, setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('')
    const [name , setName] = useState('')

    const {state  , handleSignUp} = useContext(AuthContext)

    const onSubmit = () => {
      if (password !== confirmPassword) {
        console.log('password not match');
        setConfirmPassword("");
        return;
      }
      handleSignUpSupa({userInfo : {email ,name, password}})
    };
    useEffect(() => {
      if (state.errorMessage) {
        Alert.alert('Oops!', state.errorMessage, [{text: 'OK'}]);
      }
    }, [state.errorMessage]);
    return (
      <View>

        {loading ? <ActivityIndicator size="large" color="#0000ff" /> : (
          <View>
             <View style={{marginTop: 14}}>
              <TextInput
                placeholder="Enter Your Name"
                style={{
                  height: 50,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#C7C6C6',
                  marginHorizontal: 14,
                  paddingHorizontal: 14,
                  color: 'black',
                  margin: 14,
                }}
                placeholderTextColor="#707070"
                onChange={(e) => setName(e.nativeEvent.text)}
              />
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
            onChange={(e) => 
              {
                setEmail(e.nativeEvent.text)}
            }
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
            onChange={(e) => setPassword(e.nativeEvent.text)}
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
            onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
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
          }}
          onPress={onSubmit}
          >
          <Text style={{color: 'white'}}>SIGNUP</Text>

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
        )
        
        
        
        }
       

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