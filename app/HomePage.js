import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from './Login';
import Otpverification from './Otpverification';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ChatScreen from './ChatScreen';
import TeamPlayersScreen from './TeamPlayersScreen';
import FootballField from './FootballField';

const Tab = createBottomTabNavigator();
const HomePage = () => {
  return (
      
  <MyTabs/>
      
  )
}
function MyTabs() {
    return (
      <Tab.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          tabBarActiveTintColor: '#0A1C5F',
          headerShown:false,
          tabBarShowLabel:false,
          tabBarStyle:{backgroundColor:'#F5F5F5'}
        }}
      >
        <Tab.Screen
          name="A"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="B"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Awards',
            tabBarIcon: ({ color, size }) => (
              <Icon name="md-trophy-sharp" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="C"
          component={FootballField}
          options={{
            tabBarLabel: 'Awards',
            tabBarIcon: ({ color, size }) => (
              <Icon3 name="md-gift-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="D"
          component={ChatScreen}
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-chatbox-ellipses" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="E"
          component={TeamPlayersScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Icon2 name="account" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
export default HomePage

const styles = StyleSheet.create({})