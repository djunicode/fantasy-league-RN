import { Dimensions, Image, StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import Splash from './Splash';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Login = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSecure, setIsSecure] = useState(false);
  const [emailValidError, setEmailValidError] = useState('');
  const [emailverified, setEmailVerified] = useState(false);
  const [passwordValidError, setPasswordValidError] = useState('');
  const [passwordverified, setPasswordVerified] = useState(false);
  const [error, setError] = useState({ field: '', message: '' });

  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };

  const onLoginPressed = () => {
    axios.post('http://fantasyleague-pl7o.onrender.com/user/userLogin', { email, password })
      .then(response => {
        const authToken = response.data.token; 
        AsyncStorage.setItem('authToken', authToken); 

        let signinerror = { field: '', message: '' };

        if (email === '' && password === '') {
          alert("Both fields are blank");
        } else if (email === '') {
          alert("Email field cannot be blank");
        } else if (password === '') {
          alert("Password field cannot be blank");
        } else if (emailverified === false) {
          alert("Wrong email format");
        } else {
          setError({ field: '', message: '' });
          navigation.navigate("HomePage");
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const onSignup = () => {
    navigation.navigate("Signup");
  };

  const onGooglepress = () => {
    console.warn('Sign in with Google');
  };

  const onFacebookpress = () => {
    console.warn('Sign in with Facebook');
  };

  const onForgotpasswordpressed = () => {
    navigation.navigate("Forgot");
  };

  const handleValidEmail = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (val.length === 0) {
      setEmailValidError('');
      setEmailVerified(false);
    } else if (reg.test(val) === false) {
      setEmailValidError('Enter a valid email address');
      setEmailVerified(false);
    } else if (reg.test(val) === true) {
      setEmailValidError('');
      setEmailVerified(true);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const authToken = await AsyncStorage.getItem('authToken');
      if (authToken) {
        navigation.navigate("HomePage");
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3200); // milliseconds
  }, []);

  if (isLoading) {
    return <Splash />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('./background.jpg')}
            resizeMode="stretch"
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.head}>Welcome Back!</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Email"
            value={email}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={value => {
              setEmail(value);
              handleValidEmail(value);
            }}
          />
          {emailValidError ? <Text style={styles.error}>{emailValidError}</Text> : null}

          <View style={styles.visible}>
            <TextInput
              style={styles.input}
              placeholder="Enter your Password"
              value={password}
              secureTextEntry={!isSecure}
              onChangeText={value => {
                setPassword(value);
              }}
            />

            <TouchableOpacity
              onPress={toggleSecureEntry}
              style={styles.touch}
            >
              <Icon name={isSecure ? 'eye' : 'eye-off'}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.forgot} onPress={onForgotpasswordpressed}>Forgot password?</Text>
          <TouchableOpacity style={styles.button} onPress={onLoginPressed}>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>

          <View style={styles.container1}>
            <View style={styles.line} />
            <Text style={styles.text2}>Or login with</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.container2}>
            <TouchableOpacity style={styles.buttongoogle} onPress={onGooglepress}>
              <Image source={require('./google-icon.jpg')} style={styles.logogoogle} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttongoogle} onPress={onFacebookpress}>
              <Image source={require('./facebook-icon.jpg')} style={styles.logofacebook} />
            </TouchableOpacity>
          </View>

          <View style={styles.container3}>
            <Text style={styles.bottom}>Don't have an Account? </Text>
            <Text style={styles.link} onPress={onSignup}>Signup Now</Text>
          </View>
        </View>
      </View>
    );
  }
};

export default Login;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff0000',
  },
  container3: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottom: {
    marginTop: 40,
  },
  link: {
    color: '#0A1C5F',
    marginTop: 40,
  },
  logogoogle: {
    width: 80,
    height: 80,
    marginRight: 10,
    marginBottom: 8,
  },
  logofacebook: {
    width: 40,
    height: 40,
    paddingLeft: 50,
    marginBottom: 10,
    marginLeft: 10,
  },
  buttongoogle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 0,
    borderColor: '#ccc',
    marginTop: 0,
  },
  container2: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  error: {
    color: 'red',
  },
  text2: {
    marginHorizontal: 10,
    marginTop: 15,
    fontWeight: '300',
    color: '#7C7676',
    fontSize: 14,
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E8ECF4',
    marginTop: 15,
  },
  forgot: {
    textAlign: 'right',
    paddingRight: 20,
    fontWeight: '400',
    color: '#000000',
    fontSize: 14,
  },
  visible: {
    flexDirection: 'row',
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  touch: {
    alignSelf: 'center',
    paddingLeft: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#0A1C5F',
    padding: 10,
    width: '95%',
    borderRadius: 15,
    marginTop: 15,
  },
  input: {
    color: 'black',
    backgroundColor: '#F5F5F5',
    width: '95%',
    borderColor: '#c6c6c6',
    borderRadius: 15,
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  head: {
    fontFamily: 'Inter',
    fontSize: 28,
    fontWeight: '800',
    fontStyle: 'italic',
    color: '#000000',
  },
  header: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
});
