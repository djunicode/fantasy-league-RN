import { Dimensions, Image, StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native'
import Splash from './Splash'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";
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
        // Handle successful login response
        console.log(response.data);
        // Navigate to home page or perform any other action
        let signinerror = {field:'', message: ''};

      if(email==='' && password==='')
        {
          alert("Both fields are blank")
        }
      
         else if (email==='') {
            alert("Email field cannot be blank")
        }
        else if (password===''){
            alert("Password field cannot be blank")
          }
          else if(emailverified===false)
          {
            alert("Wrong email format");
          }
          // else if(passwordverified===false)
          // {
          //   alert("Wrong password format");
          // }
        else {
            setError({field:'',message:''});
            navigation.navigate("HomePage");
        }
      })
      .catch(error => {
        // Handle error response
        console.error(error);
        // Show error message to the user or perform any other action
      });
  }

  const onSignup = () => {
    navigation.navigate("Signup")
  }

  const onGooglepress = () => {
    console.warn('Sign in with Google')
  }

  const onFacebookpress = () => {
    console.warn('Sign in with Facebook')
  }

  const onForgotpasswordpressed = () => {
    navigation.navigate("Forgot")
  }


  const handleValidEmail = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (val.length === 0) {
      setEmailValidError('');
      setEmailVerified(false)
    } else if (reg.test(val) === false) {

      setEmailValidError('Enter valid email address');
      setEmailVerified(false)
    } else if (reg.test(val) === true) {
      setEmailValidError('');
      setEmailVerified(true);

    }
  };

  // const handleValidPassword = val => {
  //   let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  //   if (val.length === 0) {
  //     setPasswordValidError('');
  //     setPasswordVerified(false)
  //   } else if (reg.test(val) === false) {
  //     setPasswordValidError('A password should contain a capital letter, a number, a special character and a minimum length of 8');
  //     setPasswordVerified(false)
  //   } else if (reg.test(val) === true) {
  //     setPasswordValidError('');
  //     setPasswordVerified(true);
  //   }
  // };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); //milliseconds
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  else {
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
                // handleValidPassword(value);
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

          {/* {passwordValidError ? <Text style={styles.error}>{passwordValidError}</Text> : null} */}


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
    )
  }
}

export default Login
const { height } = Dimensions.get("screen")
const height_logo = height * 0.28
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff0000',
  },
  container3: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bottom: {
    marginTop: 40
  },
  link: {
    color: '#0A1C5F',
    marginTop: 40
  },
  logogoogle: {
    width: 80,
    height: 80,
    marginRight: 10,
    marginBottom: 8
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
    // paddingHorizontal: 15,
    // paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 0,
    borderColor: '#ccc',
    marginTop: 0
  },
  container2: {
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
  error: {
    color: 'red'
  },
  text2: {
    marginHorizontal: 10,
    marginTop: 15,
    fontWeight: '300',
    color: '#7C7676',
    fontSize: 14
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
    fontSize: 14
  },
  visible: {
    flexDirection: 'row'
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Inter'
  },
  touch: {
    alignSelf: 'center',
    paddingLeft: 10
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#0A1C5F',
    padding: 10,
    width: '95%',
    borderRadius: 15,
    marginTop: 15
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
    color: '#000000'
  },
  header: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30
  },
  logo: {
    width: height_logo,
    height: height_logo
  },
})