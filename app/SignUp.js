import { Dimensions, Image, StyleSheet, Text, View, TextInput, TouchableOpacity, Button, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [isSecure, setIsSecure] = useState(false);
  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };
  const navigation = useNavigation();
  const onSignupPressed = () => {
    axios.post('http://fantasyleague-pl7o.onrender.com/user/newUser', {username,email,password,mobile})
      .then(response => {
        console.log(response.data);
        // Handle success, e.g. navigate to a different screen
        navigation.navigate("Login");
      })
      .catch(error => {
        console.log(error);
        // Handle error, e.g. display an error message to the user
      });
  }

  const onLogin = () => {
    navigation.navigate("Login")
  }

  const onGooglepress = () => {
    console.warn('Sign in with Google')
  }

  const onFacebookpress = () => {
    console.warn('Sign in with Facebook')
  }


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./background.jpg')}
          resizeMode="stretch"
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.head}>Signup now</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          value={username}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          value={email}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={setEmail}
        />

        <View style={styles.visible}>
          <TextInput
            style={styles.input}
            placeholder="Enter your Password"
            value={password}
            secureTextEntry={!isSecure}
            onChangeText={(value) => setPassword(value)}
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

        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter mobile number"
            value={mobile}
            autoCorrect={false}
            keyboardType='numeric'
            autoCapitalize="none"
            onChangeText={setMobile}
          />
        </View>

        {/* <View style={styles.visible}>
            <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confpassword}
            secureTextEntry={!isSecure}
            onChangeText={(value) => setConfpassword(value)}
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
            </View> */}

        <TouchableOpacity style={styles.button} onPress={onSignupPressed}>
          <Text style={styles.text}>Signup</Text>
        </TouchableOpacity>

        <View style={styles.container1}>
          <View style={styles.line} />
          <Text style={styles.text2}>Or Signup with</Text>
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
          <Text style={styles.bottom}>Have an Account? </Text>
          <Text style={styles.link} onPress={onLogin}>Login Now</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default SignUp
const { height } = Dimensions.get("screen")
const height_logo = height * 0.28
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
    marginTop: 20,
  },
  link: {
    color: '#0A1C5F',
    marginTop: 20
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
    fontSize: 17,
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