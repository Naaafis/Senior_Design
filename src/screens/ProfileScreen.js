import React, {Component, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';

class ProfileScreen extends Component {
  render() {
    const {navigation} = this.props;
    const {userName, nameOfFriend} = this.props.route.params;

    return (
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center'}}>
          <Text style={style.title}>Profile</Text>
          <Text style={style.label}>From main menu: {JSON.stringify(userName)}</Text>
          <Text style={style.label}>From Home: {JSON.stringify(nameOfFriend)}</Text>
        </View>
        <Text style={style.label}>Full Name:</Text>
        <TextInput style={style.label} placeholder="Enter your name here" />
        <Text style={style.label}>DOB (mm/dd/yyyy):</Text>
        <TextInput
          style={style.label}
          placeholder="Enter your date of birth here"
        />
        <Text style={style.label}>Email:</Text>
        <TextInput
          style={style.label}
          placeholder="Enter your email address here"
        />
        <Text style={style.label}>Dog Name:</Text>
        <TextInput style={style.label} placeholder="Enter your dog name here" />
        <Text style={style.label}>Dog Breed:</Text>
        <TextInput
          style={style.label}
          placeholder="Enter your dog breed here"
        />
        <Text style={style.label}>About Section:</Text>
        <TextInput
          style={style.label}
          placeholder="Enter information about your dog here"
        />
        <Text style={style.label}>Date Joined (mm/dd/yyyy):</Text>
        <TextInput
          style={style.label}
          placeholder="Enter the date joined here"
        />
        <Button title="Submit" />
        <View style={{marginTop: 5}}></View>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <MyBackButton {...props} navigation={navigation} />;
}

export {ProfileScreen};

const style = StyleSheet.create({
  title: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 24,
  },
  label: {
    marginLeft: 20,
    fontSize: 17,
  },
  input: {
    fontSize: 17,
    textAlign: 'center',
  },
});
