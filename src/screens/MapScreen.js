import React, {Component} from 'react';
import {useNavigation} from '@react-navigation/core';
import {View, Text, Button, StyleSheet} from 'react-native';

class MapScreen extends Component {
  render() {
    const {navigation} = this.props;

    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={style.title}>Map</Text>
        <View style={style.map}></View>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <MyBackButton {...props} navigation={navigation} />;
}

export {MapScreen};

const style = StyleSheet.create({
  title: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 48,
  },
  map: {
    width: 340,
    height: 420,
    backgroundColor: 'antiquewhite',
    marginBottom: 20,
  },
});
