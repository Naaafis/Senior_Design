import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export const DogStatusScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text style={style.title}>Dog Status</Text>
      <Text style={style.label}>Your dog is currently mapping at:</Text>
      <View style={style.map}></View>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 48,
  },
  label: {
    fontSize: 22,
    marginBottom: 20,
  },
  map: {
    width: 340,
    height: 360,
    backgroundColor: 'antiquewhite',
    marginBottom: 20,
  },
});
