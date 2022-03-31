import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {View, Text, Button, StyleSheet} from 'react-native';

export const MainMenuScreen = (props) => {
  const navigation = useNavigation();
  const {nameOfFriend} = props.route.params;

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text style={style.title}>Main Menu</Text>
      <Text>{JSON.stringify(nameOfFriend)}</Text>
      <Text>{nameOfFriend}</Text>
      <View style={{marginTop: 40}}></View>
      <Button title="Profile" onPress={() => navigation.push('Profile' , {userName: 'hello', nameOfFriend: nameOfFriend,})} />
      <View style={{marginTop: 20}}></View>
      <Button title="Friends" onPress={() => navigation.push('Friends')} />
      <View style={{marginTop: 20}}></View>
      <Button
        title="Add Friends"
        onPress={() => navigation.push('Add Friends')}
      />
      <View style={{marginTop: 20}}></View>
      <Button title="Map" onPress={() => navigation.push('Map')} />
      <View style={{marginTop: 20}}></View>
      <Button title="Chat" onPress={() => navigation.push('Chat')} />
      <View style={{marginTop: 20}}></View>
      <Button title="Logout" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 48,
  },
  buttonStyle: {
    padding: 20,
  },
});
