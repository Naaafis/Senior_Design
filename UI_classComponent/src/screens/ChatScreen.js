import React , {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

class ChatScreen extends Component {
  render(){
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={style.title}>Chat</Text>
        <View style={style.map}></View>
        <Button title="Back" onPress={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}

export {ChatScreen};


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
