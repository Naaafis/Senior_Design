import React, {Component} from 'react';
import {useNavigation} from '@react-navigation/core';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';
import {Auth} from 'aws-amplify';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      email: '',
      nameName: '',
      dogName: '',
      dog_breed: '',
      abt: '',
      dob: '',
      registeredFlag: false,
      userExists: false
    }
    
    this.nameChange = this.nameChange.bind(this);
    this.dobChange = this.dobChange.bind(this);
    this.dog_breedChange = this.dog_breedChange.bind(this);
    this.abtChange = this.abtChange.bind(this);

    Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => (this.setState({userName: user.username, email: user.attributes.email, nameName: user.attributes.name, dogName: user.attributes.preferred_username })))
    .catch(err => console.log(err));
  }

  dog_breedChange(dog_breed){
    this.setState({dog_breed});
  }
  dobChange(dob){
    this.setState({dob});
  }
  abtChange(abt){
    this.setState({abt});
  }

  nameChange(userName) {
    this.setState({username: userName});
  }

  onSubmit(e) {
    this.setState({username: userName});
  }

  sendToServer(e){
    const requestOptions = {
      method: 'POST',
      headers: {Accept: 'application/json'  , 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
        fullname: this.state.nameName,
        username: this.state.userName,
        dob: this.state.dob,
        email: this.state.email,
        dogname: this.state.dogName,
        dogbreed: this.state.dog_breed,
        abt: this.state.abt
      }
      ),
    };
    fetch('http://18.219.228.229:3000/profile', requestOptions) //elastic ip.. cool.
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data))
        // this.setState({ message: data })
      })
      .catch(error=> console.log(error))
    //this.pushData();
  }
  
  componentDidMount(){ //even though not used the fetch call isn't sent unless prevProps is included
    //this is where I want to check if the user exists in the database. 
    Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => (this.functionN({userName: user.username, email: user.attributes.email, nameName: user.attributes.name, dogName: user.attributes.preferred_username })))
    .catch(err => console.log(err))
  }

  functionN({userName, email, nameName, dogName}){
    const requestOptions = {
      method: 'POST',
      headers: {Accept: 'application/json'  , 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
        fullname: nameName,
        username: userName,
        dob: this.state.dob,
        email: email,
        dogname: dogName,
        dogbreed: this.state.dog_breed,
        abt: this.state.abt,
        }
      ),
    };
    fetch('http://18.219.228.229:3000/check_if_user_exists', requestOptions) //elastic ip.. cool.
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data))
        if (data !==  'user does not exist'){
          this.setState({userExists: true})
        }
      })
      .catch(error=> console.log(error))
  }
  // componentDidUpdate(prevProps, prevState){ //even though not used the fetch call isn't sent unless prevProps is included
  //   //this is where I want to check if the user exists in the database. 

  //   const requestOptions = {
  //     method: 'POST',
  //     headers: {Accept: 'application/json'  , 'Content-Type': 'application/json' },
  //     body: JSON.stringify(
  //       {
  //       fullname: this.state.nameName,
  //       username: this.state.userName,
  //       dob: this.state.dob,
  //       email: this.state.email,
  //       dogname: this.state.dogName,
  //       dogbreed: this.state.dog_breed,
  //       abt: this.state.abt,
  //       datejoined: this.state.date_joined
  //       }
  //     ),
  //   };
  //   if (!this.state.registeredFlag && (this.state.rand !== prevState.rand)){
  //     return fetch('http://localhost:3001/profile', requestOptions) //elastic ip.. cool.
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(JSON.stringify(data))
  //       if (data.message !== "Received Profile Information. Thanks!"){ //check if the user exists in the db
  //         //if the user exists then update the information and navigate to next page because they're good to go
  //         this.setState({rand: 'hello'})
  //         //this.props.navigation.navigate('Main Menu')
  //       }else{
  //         //if the user doesn't exist in the database, ask them to fill it in
  //       }
        
  //     })
  //     .catch(error=> console.log(error))
    
      
  //   }
    
  // }

  //replaced code after the ternary operator s
  


  render() {
    const {navigation} = this.props;
    
    const flag = this.state.userExists ; // should be this commented out if not connected to server

    console.log('Flag' + flag);
    console.log('Abt:' + this.state.abt);

    const signOut = () => {
      Auth.signOut();
    };

   //onPress={() => navigation.navigate('Main Menu', {nameOfFriend: this.state.userName})}
    return (
      <View>
        {flag ? ( 
          <View>
          <Text>You have already registered the remaining part of your profile page. Enjoy the rest of the application!</Text>
          <Button
            title="Go to Main Menu"
            onPress={() => navigation.navigate('Main Menu', this.state)}
          />
        </View>
          
          
        ) : (
          <View style={{alignItems: 'center'}}>
            <Text style={{marginTop: 20, marginBottom: 200, fontSize: 48, alignItems:'center'}}>Welcome! Please enter some more info and enjoy WOOF!</Text>
            
            <Text>userName: {this.state.userName}</Text>
            <Text>email: {this.state.email}</Text>
            <Text>nameName: {this.state.nameName}</Text>
            <Text>dogName: {this.state.dogName}</Text>
            <Text >DOB (yyyy-mm-dd)</Text>

            <TextInput
              placeholder="Enter your date of birth here"
              value = {this.state.dob}
              onChangeText = {this.dobChange}
            />
            <Text>Dog Breed</Text>
            <TextInput
              placeholder="Enter your dogbreed here" 
              value = {this.state.dog_breed}
              onChangeText = {this.dog_breedChange}
            />
            <Text>About Section</Text>
            <TextInput
              placeholder="Enter your description here" 
              value = {this.state.abt}
              onChangeText = {this.abtChange}
            />
            <Button
              title = "Register"
              onPress= {() => (navigation.navigate('Main Menu', this.state),this.sendToServer(this.state.name), this.setState({registeredFlag: true, rand: 'hello'}))}
              color='blue'
            />
            <Button
              title="Go to Main Menu"
              onPress={() => navigation.navigate('Main Menu', this.state)}
            />
            <Text
              onPress={signOut}
              style={{
                width: '100%',
                textAlign: 'center',
                color: 'red',
                fontSize: 20,
              }}>
              Sign out
            </Text>
          </View>
        )}
      </View>
    );
  }
}

export default Index;

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