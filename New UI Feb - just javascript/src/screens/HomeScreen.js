import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text style={style.title}>Home</Text>
      <Button
        title="Registration"
        onPress={() => navigation.navigate('Registration')}
      />
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    marginTop: 20,
    marginBottom: 300,
    fontSize: 48,
  },
});
