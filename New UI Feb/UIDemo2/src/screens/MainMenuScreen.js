import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export const MainMenuScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text style={style.title}>Main Menu</Text>
      <Button title="Profile" onPress={() => navigation.push('Profile')} />
      <Button title="Friends" onPress={() => navigation.push('Friends')} />
      <Button
        title="Add Friends"
        onPress={() => navigation.push('Add Friends')}
      />
      <Button
        title="Dog Status"
        onPress={() => navigation.push('Dog Status')}
      />
      <Button title="Map" onPress={() => navigation.push('Map')} />
      <Button title="Chat" onPress={() => navigation.push('Chat')} />
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
});
