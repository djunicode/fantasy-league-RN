// import React, { useState, useRef } from 'react';
// import { View, TextInput, StyleSheet } from 'react-native';


// const Otpverification = () => {

//     const [otp, setOtp] = useState('');
//     const handleOtpChange = (index, value) => {
//         setOtp((prevOtp) => {
//           let newOtp = prevOtp.split('');
//           newOtp[index] = value;
//           return newOtp.join('');
//         });
      
//         if (index < 3) {
//           boxRefs.current[index + 1].focus();
//         }
//       };
      
//       const boxArray = [1, 2, 3, 4];
//       const boxRefs = useRef(boxArray.map(() => React.createRef()));

//   return (
//     <View style={styles.container}>
//   {boxArray.map((item, index) => (
//     <TextInput
//       key={index}
//       style={styles.box}
//       maxLength={1}
//       value={otp.substring(index, index + 1)}
//       onChangeText={(value) => handleOtpChange(index, value)}
//       keyboardType='numeric'
//       ref={(ref) => (boxRefs.current[index] = ref)}
//       onSubmitEditing={() => {
//         if (index === 3) {
//           boxRefs.current[0].focus();
//         }
//       }}
//     />
//   ))}
// </View>



//   )
// }

// export default Otpverification

// const styles = StyleSheet.create({
//     container: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       width: '50%',
//       alignSelf: 'center',
//     },
//     box: {
//       borderWidth: 1,
//       borderRadius: 5,
//       width: '20%',
//       height: 40,
//       fontSize: 20,
//       textAlign: 'center',
//     },
//   });
  
import { Dimensions, Image, StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native'
import React, {useState} from 'react'
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from 'axios';


const Otpverification = () => {
  const navigation = useNavigation();
  const route= useRoute();
  const email = route.params.email
  const [otp, setOtp] = useState('');
  const [error, setError] = useState({ field: '', message: '' });
  
  // const handleOtpChange = (index, value) => {
  //     setOtp((prevOtp) => {
  //       let newOtp = prevOtp.split('');
  //       newOtp[index] = value;
  //       return newOtp.join('');
  //     });
    
  //     if (index < 3) {
  //       boxRefs.current[index + 1].focus();
  //     }
  //   };
    
  //   const boxArray = [1, 2, 3, 4];
  //   const boxRefs = useRef(boxArray.map(() => React.createRef()));
    
    const onSubmit = () => {
      axios.post('http://fantasyleague-pl7o.onrender.com/user/verifyOtp', {email,otp})
      .then(response => {
        // Handle successful login response
        console.log(response.data);
        // Navigate to home page or perform any other action
              let signinerror = {field:'', message: ''};
      
            if(otp==='')
              {
                alert("Otp field is blank")
              }
            
                // else if(passwordverified===false)
                // {
                //   alert("Wrong password format");
                // }
              else {
                  setError({field:'',message:''});
                  navigation.navigate("NewPass",{email});
              }
        })
        .catch(error => {
          // Handle error response
          console.error(error);
          // Show error message to the user or perform any other action
        });
      
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
      <Text style={styles.head}>OTP Verification</Text>

      <Text style={styles.headpara}>Please enter the code sent to your Email address linked with your account</Text>
            
      <View style={styles.otp}>
      <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            keyboardType='numeric'
            value={otp}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={value => {
              setOtp(value);
            }}
      />
  {/* {boxArray.map((item, index) => (
    <TextInput
      key={index}
      style={styles.box}
      maxLength={1}
      value={otp.substring(index, index + 1)}
      onChangeText={(value) => handleOtpChange(index, value)}
      keyboardType='numeric'
      ref={(ref) => (boxRefs.current[index] = ref)}
      onSubmitEditing={() => {
        if (index === 3) {
          boxRefs.current[0].focus();
        }
      }}
    />
  ))} */}
</View>

            <TouchableOpacity style={styles.button} onPress={onSubmit}>
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>

            
      </View>
    </View>
  )
}

export default Otpverification
const {height} = Dimensions.get("screen")
const height_logo=height*0.28
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ff0000',
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
    otp: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '50%',
      alignSelf: 'flex-start',
    },
    box: {
      borderWidth: 1,
      borderRadius: 16,
      width: 54,
      height: 54,
      fontSize: 20,
      textAlign: 'center',
      margin:15
    },
    container3:{
      flexDirection:'row',
      justifyContent:'center',
    },
    headpara:{
        fontSize:14,
        marginTop:40,
        marginBottom:35,
        fontWeight:'300',
        color:'#000000'
    },
    bottom:{
      marginTop:20,
    },
    link:{
      color:'#0A1C5F',
      marginTop:20
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
    line: {
      flex: 1,
      height: 1,
      backgroundColor: '#E8ECF4',
      marginTop:15,
    },
    visible:{
        flexDirection:'row'
    },
    text:{
      color:'#ffffff',
      fontSize:17,
      fontWeight:'700',
      fontFamily:'Inter'
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#0A1C5F',
      padding: 10,
      width:'95%',
      borderRadius:15,
      marginTop:15
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
  