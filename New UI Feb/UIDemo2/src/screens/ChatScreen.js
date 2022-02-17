import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export const ChatScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text style={style.title}>Chat</Text>
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
  map: {
    width: 340,
    height: 420,
    backgroundColor: 'aquamarine',
    marginBottom: 20,
  },
});
