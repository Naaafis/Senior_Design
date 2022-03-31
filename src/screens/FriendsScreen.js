import React, {Component} from 'react';
import {useNavigation} from '@react-navigation/core';
import {View, Text, Button, StyleSheet} from 'react-native';

class FriendsScreen extends Component {
  render() {
    const {navigation} = this.props;

    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={style.title}>Friends</Text>
        <Text style={style.label}>Friend #1</Text>
        <Text style={style.label}>Friend #2</Text>
        <Text style={style.label}>Friend #3</Text>
        <Text style={style.label}>Friend #4</Text>
        <Text style={style.label}>Friend #5</Text>
        <View style={{marginTop: 40}} />
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <MyBackButton {...props} navigation={navigation} />;
}

export {FriendsScreen};

const style = StyleSheet.create({
  title: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 48,
  },
  label: {
    marginTop: 40,
    fontSize: 22,
    backgroundColor: 'lightgreen',
  },
});
