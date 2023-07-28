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
  ScrollView,
  StatusBar,
} from 'react-native';

import { supabase } from '../utils/supabase';

import {Input, Text} from 'react-native-elements';
import {Button} from 'react-native-elements';

import {Context as AuthContext} from '../context/AuthContext';
import { on } from 'events';
import { userInfo } from 'os';
import { set } from 'react-native-reanimated';
import { ActivityIndicator } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
console.log(windowHeight);
const LoginScreen = ({navigation}) => {
  const [isLogin, setIsLogin] = useState(true);

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
            updateLoginStatus({userInfo :{email ,id : data.id}})
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
        userInfo = {email , password}
      const { data, error } = await supabase.from('UserInfo').insert([
        {
          Email: userInfo.email
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

    const {state  , handleSignUp} = useContext(AuthContext)

    const onSubmit = () => {
      if (password !== confirmPassword) {
        console.log('password not match');
        setConfirmPassword("");
        return;
      }
      handleSignUpSupa({userInfo : {email , password}})
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
        )
        
        
        
        }
       
      </View>
    );
  };
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="white"
        // translucent={true}
      />
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          marginBottom: windowHeight < 844 ? 50 : 0,
        }}>
        <View style={{position: 'absolute'}}>
          <Image source={require('../asset/loginScreenTop.png')} />
        </View>
        <View
          style={{
            marginTop: 180,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>
            Welcome to HashX
          </Text>
          <Image
            source={require('../asset/logo.png')}
            style={{height: 120, width: 120, resizeMode: 'contain'}}
          />
        </View>
        {isLogin ? <LoginComponent /> : <SignUpComponent />}
      </View>
    </ScrollView>
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
