import { Dimensions, Image, StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation, useRoute} from "@react-navigation/native";
import axios from 'axios';

const NewPasswordScreen = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  // const [confpassword, setConfpassword] = useState('')
  const [isSecure, setIsSecure] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [error, setError] = useState({ field: '', message: '' });

  const route= useRoute();
  const email = route.params.email
  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    setPasswordMatch(value === password);
  };
  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };

  const onReset = () => {
      axios.post('http://fantasyleague-pl7o.onrender.com/user/newPass', { email, password })
    .then(response => {
      // Handle successful login response
      console.log(response.data);
      // Navigate to home page or perform any other action
      let signinerror = {field:'', message: ''};

    if(confirmPassword==='' && password==='')
      {
        alert("Both fields are blank")
      }

       else if (confirmPassword==='') {
          alert("Confirm password field cannot be blank")
      }
      else if (password===''){
          alert("Password field cannot be blank")
        }
        // else if(emailverified===false)
        // {
        //   alert("Wrong email format");
        // }
        // else if(passwordverified===false)
        // {
        //   alert("Wrong password format");
        // }
      else {
          setError({field:'',message:''});
      }
    })
    .catch(error => {
      // Handle error response
      console.error(error);
      // Show error message to the user or perform any other action
    });
    if (passwordMatch) {
      navigation.navigate('Login');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./background.jpg')}
          resizeMode="stretch"
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.head}>Create new password</Text>

        <Text style={styles.headpara}>Enter a new password to continue</Text>
        <View style={styles.visible}>
          <TextInput
            style={styles.input}
            placeholder="Enter your Password"
            value={password}
            secureTextEntry={!isSecure}
            onChangeText={handlePasswordChange}
          />
          {/* <TouchableOpacity 
            onPress={toggleSecureEntry}
            style={styles.touch}
            >
            <Icon name={isSecure ? 'eye' : 'eye-off'} 
            size={24} 
            color="gray" 
            />
            </TouchableOpacity> */}
        </View>

        <View style={styles.visible}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            secureTextEntry={!isSecure}
            onChangeText={handleConfirmPasswordChange}
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
        <View style={styles.passerror}>
          {!passwordMatch && (
            <Text style={{ color: 'red' }}>Passwords do not match</Text>
          )}
          </View>
        <TouchableOpacity style={styles.button} onPress={onReset}>
          <Text style={styles.text}>Reset password</Text>
        </TouchableOpacity>


      </View>
    </View>
  )
}

export default NewPasswordScreen
const { height } = Dimensions.get("screen")
const height_logo = height * 0.28
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff0000',
  },
  passerror:{
    marginLeft:15
  },
  container3: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headpara: {
    fontSize: 14,
    marginTop: 30,
    fontWeight: '300',
    color: '#000000'
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