import React from 'react';
import {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {AddFriendsScreen} from './AddFriendsScreen';

class HomeScreen extends Component {
  render(){
    return(
      <View style={{flex: 1, alignItems: 'center'}}>
      <Text style={style.title}>Home</Text>
      <Button
        title="Registration"
        onPress={() => this.props.navigation.navigate('Registration')}
      />
      <Button title="Login" onPress={() => this.props.navigation.navigate('Login')} />
    </View>
    );
  }
}

// = ({navigation}) => {
//   return (
//     <View style={{flex: 1, alignItems: 'center'}}>
//       <Text style={style.title}>Home</Text>
//       <Button
//         title="Registration"
//         onPress={() => navigation.navigate('Registration')}
//       />
//       <Button title="Login" onPress={() => navigation.navigate('Login')} />
//     </View>
//   );
// };

export {HomeScreen};

const style = StyleSheet.create({
  title: {
    marginTop: 20,
    marginBottom: 300,
    fontSize: 48,
  },
});
