import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image source={require('./background.jpg')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default Splash;
