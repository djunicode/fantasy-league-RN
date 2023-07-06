import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native'
import { useNavigation } from "@react-navigation/native";
const Tab = createBottomTabNavigator();

const HomeScreen = () => {
    const navigation = useNavigation();
    const onLogoutPressed = () => {
        fetch('http://fantasyleague-pl7o.onrender.com/user/logout')
          .then(response => {
            console.log('User logged out successfully');
            navigation.navigate('Login')
          })
          .catch(error => {
            console.error('Error logging out:', error);
          });
      };
      
    return(
        <View>
        <Text>HomeScreen</Text>
        <TouchableOpacity style={styles.button} onPress={onLogoutPressed}>
      <Text style={styles.text}>Log Out</Text>
    </TouchableOpacity>

        </View>

    )
}
const styles = StyleSheet.create({
    text:{
        padding: 50,
        fontSize: 50
    }
})

export default HomeScreen