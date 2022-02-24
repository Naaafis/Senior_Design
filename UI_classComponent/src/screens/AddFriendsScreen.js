import React, {Component, useState} from 'react';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';


class AddFriendsScreen extends Component{
  render() {
    // const {navigation} = this.props.navigate;
    return(
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center'}}>
          <Text style={style.title}>Add Friends</Text>
        </View>
        <Text style={style.label}>Serch User</Text>
        <TextInput style={style.label} placeholder="Enter a user name here" />
        <Button title="Back" onPress={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}

export {AddFriendsScreen};

// = ({navigation}) => {
//   return (
//     <View style={{flex: 1}}>
//       <View style={{alignItems: 'center'}}>
//         <Text style={style.title}>Add Friends</Text>
//       </View>
//       <Text style={style.label}>Serch User</Text>
//       <TextInput style={style.label} placeholder="Enter a user name here" />
//       <Button title="Back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// };

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
