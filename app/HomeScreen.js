import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Text} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Otpverification from './Otpverification';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Login';
const Tab = createBottomTabNavigator();

const HomeScreen = () => {
    return(

        <Text>HomeScreen</Text>
    )
}
// function MyTabs() {
//     return (
//       <Tab.Navigator
//         initialRouteName="HomePage"
//         screenOptions={{
//           tabBarActiveTintColor: '#e91e63',
//         }}
//       >
//         <Tab.Screen
//           name="A"
//           component={Login}
//           options={{
//             tabBarLabel: 'Home',
//             tabBarIcon: ({ color, size }) => (
//               <Icon name="home" color={color} size={size} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="B"
//           component={Otpverification}
//           options={{
//             tabBarLabel: 'Updates',
//             tabBarIcon: ({ color, size }) => (
//               <Icon name="bell" color={color} size={size} />
//             ),
//             tabBarBadge: 3,
//           }}
//         />
//         <Tab.Screen
//           name="C"
//           component={Otpverification}
//           options={{
//             tabBarLabel: 'Profile',
//             tabBarIcon: ({ color, size }) => (
//               <Icon name="account" color={color} size={size} />
//             ),
//           }}
//         />
//       </Tab.Navigator>
//     );
//   }
export default HomeScreen