import React, {Component} from 'react';
import {useNavigation} from '@react-navigation/core';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Auth} from 'aws-amplify';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: ''
    }

    this.nameChange = this.nameChange.bind(this);

    Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user =>  this.setState({userName: user.username }))
    .catch(err => console.log(err));
  }

  nameChange(userName) {
    this.setState({username: userName});
  }
  onSubmit(e) {
    this.setState({username: userName});
  }

  
  render() {
    const {navigation} = this.props;
    let username = '';
    const flag = false;

  

    
    
    
    const signOut = () => {
      Auth.signOut();
    };

   

    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={{marginTop: 20, marginBottom: 200, fontSize: 48}}>
          Home
        </Text>
        <Text>Hello: {this.state.userName}</Text>
        
        <Button
          title="Go to Main Menu"
          onPress={() => navigation.navigate('Main Menu', {nameOfFriend: this.state.userName})}
        />
        <Text
          onPress={signOut}
          style={{
            width: '100%',
            textAlign: 'center',
            color: 'red',
            marginTop: 200,
            fontSize: 20,
          }}>
          Sign out
        </Text>
      </View>
    );
  }
}

export default Index;
