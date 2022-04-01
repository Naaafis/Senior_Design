import React, {Component, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      fullName: '',
      dob: '',
      email: '',
      dogName: '',
      dog_breed: '',
      abt: '',
      dateJoined: ''
    }
  }
  //const {userName, nameOfFriend} = this.props.route.params;
  // <Text style={style.label}>From main menu: {JSON.stringify(userName)}</Text>
  // <Text style={style.label}>From Home: {JSON.stringify(nameOfFriend)}</Text>
  componentDidMount(){
    const requestOptions = {
      method: 'POST',
      headers: {Accept: 'application/json'  , 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {username: "hihihi"}
      ),
    };
    fetch('http://18.219.228.229:3000/get_profile', requestOptions) //elastic ip.. cool.
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data))
        console.log('testing: ' + data[0]['username'])
        console.log('suername ' + data['username'])
        this.setState({userName:  data[0]['username']})
        this.setState({fullName:  data[0]['fullname']})
        this.setState({dob:  data[0]['dob']})
        this.setState({email:  data[0]['email']})
        this.setState({dogName:  data[0]['dogname']})
        this.setState({dog_breed: data[0]['dogbreed']})
        this.setState({abt: data[0]['abt']})
        this.setState({dateJoined: data[0]['datejoined']})
      })
      .catch(error=> console.log(error))
  }
  render() {
    const {navigation} = this.props;
    
    const {userName, email, nameName, dogName} = this.props.route.params;
    return (
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center'}}>
          <Text style={style.title}>Profile</Text>
          
        
        </View>

        <Text style={style.label}>User Name: {this.state.userName}</Text>
        <Text style={style.label}>Full Name: {this.state.fullName}</Text>
        <Text style={style.label}>Date of Birth: {this.state.dob}</Text>
        <Text style={style.label}>Email: {this.state.email}</Text>
        <Text style={style.label}>Dog Name: {this.state.dogName}</Text>
        <Text style={style.label}>Dog Breed: {this.state.dog_breed}</Text>
        <Text style={style.label}>About Section: {this.state.abt}</Text>
        <Text style={style.label}>Date Joined (mm/dd/yyyy): {this.state.dateJoined}</Text>
        
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
