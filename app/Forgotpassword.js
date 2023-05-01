import { Dimensions, Image, StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
const Forgotpassword = () => {
  const navigation = useNavigation();
    const [email,setEmail]=useState('');
    

      const onSendPressed = () => {
        axios.post('http://fantasyleague-pl7o.onrender.com/user/forgotPass',{email})
      .then(response => {
        // Handle successful login response
        console.log(response.data);
        // Navigate to home page or perform any other action
              let signinerror = {field:'', message: ''};
      
            if(email==='')
              {
                alert("Email field is blank")
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
                  navigation.navigate("Otp",{email});
              }
        })
        .catch(error => {
          // Handle error response
          console.error(error);
          // Show error message to the user or perform any other action
        });
      }
      

      const onSignup = () => {
        console.warn('To signup screen')
      }
      const [error, setError] = useState({ field: '', message: '' });

      const onLogin = () => {
        navigation.navigate("Login")
      }

      const onGooglepress = () => {
        console.warn('Sign in with Google')
      }

      const onFacebookpress = () => {
        console.warn('Sign in with Facebook')
      }

      const [emailValidError, setEmailValidError] = useState('');
      const [emailverified, setEmailVerified] = useState(false);

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



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
        source={require('./background.jpg')}
        resizeMode="stretch"
        />
      </View>

      <View style={styles.footer}>
      <Text style={styles.head}>Forgot your password?</Text>
      <Text style={styles.headpara}>Please enter the Email address linked with your account</Text>
            
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
            
            
            <TouchableOpacity style={styles.button} onPress={onSendPressed}>
              <Text style={styles.text}>Send Code</Text>
            </TouchableOpacity>


            <View style={styles.container3}>
            <Text style={styles.bottom}>Remember password? </Text> 
            <Text style={styles.link} onPress={onLogin}>Login Now</Text>
            </View>
      </View>
    </View>
  )
}

export default Forgotpassword
const {height} = Dimensions.get("screen")
const height_logo=height*0.28
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ff0000',
    },
    container3:{
      flexDirection:'row',
      justifyContent:'center'
    },
    bottom:{
      marginTop:110
    },
    headpara:{
        fontSize:16,
        marginTop:54,
        fontWeight:'300',
        color:'#000000'
    },
    link:{
      color:'#0A1C5F',
      marginTop:110
    },
    logogoogle:{
      width: 80,
      height: 80,
      marginRight: 10,
      marginBottom:8
    },
    logofacebook:{
      width: 40,
      height: 40,
      paddingLeft:50,
      marginBottom:10,
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
      marginTop:0
    },
    container2:{
      justifyContent:'space-evenly',
      flexDirection:'row'
    },
    text2:{
      marginHorizontal: 10,
      marginTop:15,
      fontWeight: '300',
      color:'#7C7676',
      fontSize:14
    },
    container1: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    error: {
      color: 'red'
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: '#E8ECF4',
      marginTop:15,
    },
    forgot:{
      textAlign:'right',
      paddingRight:20,
      fontWeight:'400',
      color:'#000000',
      fontSize:14
    },
    visible:{
        flexDirection:'row'
    },
    text:{
      color:'#ffffff',
      fontSize:20,
      fontWeight:'700',
      fontFamily:'Inter'
    },
    touch:{
        alignSelf:'center',
        paddingLeft:10
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#0A1C5F',
      padding: 10,
      width:'95%',
      borderRadius:15,
      marginTop:15
    },
    input:{
        color:'black',
        backgroundColor: '#F5F5F5',
        width:'95%',
        borderColor: '#c6c6c6',
        borderRadius: 15,
        paddingHorizontal: 20,
        marginVertical:15,
      },
    head:{
        fontFamily:'Inter',
        fontSize: 28,
        fontWeight:'800',
        fontStyle:'italic',
        color:'#000000'
    },
    header:{
        height:200,
        justifyContent:'center',
        alignItems:'center'
    },
    footer:{
        flex:1,
        backgroundColor:'#fff',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingVertical:50,
        paddingHorizontal:30
    },
    logo:{
        width: height_logo,
        height: height_logo
    },
})