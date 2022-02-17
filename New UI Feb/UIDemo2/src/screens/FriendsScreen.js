import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export const FriendsScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text style={style.title}>Friends</Text>
      <Button title="Level 1" />
      <Button title="Level 2" />
      <Button title="Level 3" />
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
});
