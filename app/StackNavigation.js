import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Login from './Login';
import SignUp from './SignUp';
import Forgotpassword from './Forgotpassword';
import HomePage from './HomePage';
import HomeScreen from './HomeScreen';
import Otpverification from './Otpverification';
import NewPasswordScreen from './NewPasswordScreen';

const StackNavigation = () => {
    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Signup" component={SignUp}/>
            <Stack.Screen name="Forgot" component={Forgotpassword}/>
            <Stack.Screen name="Otp" component={Otpverification}/>
            <Stack.Screen name="HomePage" component={HomePage}/>
            <Stack.Screen name="HomeScreen" component={HomeScreen}/>
            <Stack.Screen name="NewPass" component={NewPasswordScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})