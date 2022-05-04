import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const MainMenuScreen = props => {
  const navigation = useNavigation();
  const {userName, email, nameName, dogName} = props.route.params;

  // <Text>{JSON.stringify(nameOfFriend)}</Text>
  // <Text>{nameOfFriend}</Text>
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Main Menu</Text>

      {/*
      <Text>{userName}</Text>
      <Text>{email}</Text>
      <Text>{nameName}</Text>
      <Text>{dogName}</Text>
      */}

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() =>
          navigation.push('Profile', {userName, email, nameName, dogName})
        }>
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.push('Friends', {userName, email, nameName, dogName})}>
        <Text style={styles.buttonText}>Friends</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() =>
          navigation.push('Add Friends', {userName, email, nameName, dogName})
        }>
        <Text style={styles.buttonText}>Add Friends</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.push('Map', {userName, email, nameName, dogName})}>
        <Text style={styles.buttonText}>Map</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() =>
          navigation.push('Chat', {userName, email, nameName, dogName})}>
        <Text style={styles.buttonText}>Chat</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() =>
          navigation.navigate('Pending Friends', {
            userName,
            email,
            nameName,
            dogName,
          })
        }>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'darksalmon',
  },
  title: {
    marginTop: 10,
    fontFamily: 'Sarpanch-ExtraBold',
    fontSize: 60,
    color: 'yellow',
  },
  body: {
    fontFamily: 'Sarpanch-Bold',
    fontSize: 24,
    color: 'black',
  },
  buttonContainer: {
    marginTop: 28,
    minWidth: 300,
    elevation: 10,
    backgroundColor: '#009688',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

export {MainMenuScreen};