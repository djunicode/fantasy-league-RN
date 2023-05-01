import React from 'react';
import Login from './Login';
import { useNavigation } from "@react-navigation/native";
import SignUp from './SignUp';
import Forgotpassword from './Forgotpassword';
import NewPasswordScreen from './NewPasswordScreen';
import StackNavigation from './StackNavigation';
import HomeScreen from './HomeScreen'
import Otpverification from './Otpverification';
import HomePage from './HomePage';
import ChatScreen from './ChatScreen';
import {
  StyleSheet,
} from 'react-native';

const App = () => {
  return (
  <StackNavigation/>
  )
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  aradhya: {
    fontSize: 50,
    textAlign: 'center',
    marginTop: 100,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 9,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
