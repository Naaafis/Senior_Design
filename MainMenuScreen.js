import React , {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

class MainMenuScreen extends Component{
  render(){
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={style.title}>Main Menu</Text>
        <Button title="Profile" onPress={() => this.props.navigation.push('Profile')} />
        <Button title="Friends" onPress={() => this.props.navigation.push('Friends')} />
        <Button
          title="Add Friends"
          onPress={() => this.props.navigation.push('Add Friends')}
        />
        <Button
          title="Dog Status"
          onPress={() => this.props.navigation.push('Dog Status')}
        />
        <Button title="Map" onPress={() => this.props.navigation.push('Map')} />
        <Button title="Chat" onPress={() => this.props.navigation.push('Chat')} />
        <Button title="Logout" onPress={() => this.props.navigation.navigate('Home')} />
      </View>
    );
  }
}

export {MainMenuScreen};

const style = StyleSheet.create({
  title: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 48,
  },
});
