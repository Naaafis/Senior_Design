import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';

export const RegistrationScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View style={{alignItems: 'center'}}>
        <Text style={style.title}>Registration</Text>
      </View>
      <Text style={style.label}>Name</Text>
      <TextInput style={style.label} placeholder="Enter your name here" />
      <Text style={style.label}>DOB (mm/dd/yyyy)</Text>
      <TextInput
        style={style.label}
        placeholder="Enter your date of birth here"
      />
      <Text style={style.label}>Pronouns</Text>
      <TextInput style={style.label} placeholder="Enter your pronouns here" />
      <Text style={style.label}>Email</Text>
      <TextInput
        style={style.label}
        placeholder="Enter your email address here"
      />
      <Text style={style.label}>Dog Name</Text>
      <TextInput style={style.label} placeholder="Enter your dog name here" />
      <Button title="Submit" onPress={() => navigation.push('Main Menu')} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
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
    marginLeft: 20,
    fontSize: 22,
  },
  input: {
    fontSize: 22,
    textAlign: 'center',
  },
});
