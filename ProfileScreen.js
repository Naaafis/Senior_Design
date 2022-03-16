import React, {Component, useState} from 'react';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';

class ProfileScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      userID: '',
      name: '',
      data: [],
      dob: '',
      pronouns: '',
      email: '',
      password: '',
      dog_name: '',
      dog_breed: '',
      abt: '',
      date_joined: '2022-03-04',
    };
    this.useridChange = this.useridChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.dobChange = this.dobChange.bind(this);
    this.pronounsChange = this.pronounsChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.dog_nameChange = this.dog_nameChange.bind(this);
    this.dog_breedChange = this.dog_breedChange.bind(this);
    this.abtChange = this.abtChange.bind(this);
    this.date_joinedChange = this.date_joinedChange.bind(this);
  }
  
  useridChange(userID){
    this.setState({userID});
  }
  nameChange(name){
    this.setState({name});
  }
  dobChange(dob){
    this.setState({dob});
  }
  pronounsChange(pronouns){
    this.setState({pronouns});
  }
  emailChange(email){
    this.setState({email});
  }
  passwordChange(password){
    this.setState({password});
  }
  dog_nameChange(dog_name){
    this.setState({dog_name});
  }
  dog_breedChange(dog_breed){
    this.setState({dog_breed});
  }
  abtChange(abt){
    this.setState({abt});
  }
  date_joinedChange(date_joined){
    this.setState({date_joined});
  }



  // postName(name){
  //   try {
  //     const response =  fetch('http://localhost:3001/api',
  //       {
  //       method:'POST', 
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({name: this.state.name})
  //       }
  //     );
  //     const json =  response.json();
  //     this.setState({ data: json.message });
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     this.setState({ isLoading: false });
  //   }
  // }

  // async pushData() {
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: {Accept: 'application/json'  , 'Content-Type': 'application/json' ,},
  //     body: JSON.stringify({
  //       message : 'valueRandomapaknfa',
  //     }),
  //   };
  //   try {
  //     const response = await fetch('http://localhost:3001/api',requestOptions);
  //     const json = await response.json();
  //     // this.setState({ data: json.message });
  //     console.log('ehllo')

  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     // this.setState({ isLoading: false });
  //     console.log("byebye");
  //   }
  // }

  // getInfo(e){
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: {Accept: 'application/json'  , 'Content-Type': 'application/json' },
  //     body: JSON.stringify({'p_id':1,'d_id':1,'d_type':"scale",'d':133}),
  //   };
  //   fetch('http://155.41.109.88:5000/data', requestOptions)
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(JSON.stringify(data))
  //       // this.setState({ message: data })
  //     })
  //     .catch(error=> console.log(error))
  //   //this.pushData();
  // }

  getInfo(e){
    const requestOptions = {
      method: 'POST',
      headers: {Accept: 'application/json'  , 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {fullname: this.state.name,
        dob: this.state.dob,
        pronouns: this.state.pronouns,
        email: this.state.email,
        password: this.state.password,
        dogname: this.state.dog_name,
        dogbreed: this.state.dog_breed,
        abt: this.state.abt,
        datejoined: this.state.date_joined
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

  // getInfo(e){
  //   const requestOptions = {
  //     method: 'GET',
  //     headers: {Accept: 'application/json'  , 'Content-Type': 'application/json' },
  //   };
  //   fetch('https://raw.githubusercontent.com/adhithiravi/React-Hooks-Examples/master/testAPI.json', requestOptions)
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data)
  //       // this.setState({ message: data })
  //     })
  //     .catch(error=> console.log(error))
  //   //this.pushData();
  // }
 
  render(){
    return (
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center'}}>
          <Text style={style.title}>Profile</Text>
        </View>
        <Text style={style.label}>userID</Text>
        <TextInput
          style={style.label}
          placeholder="Choose a user ID" 
          value = {this.state.userID}
          onChangeText = {this.useridChange}
        />
        <Text style={style.label}>Name</Text>
        <TextInput
          style={style.label}
          placeholder="Enter your name here" 
          value = {this.state.name}
          onChangeText = {this.nameChange}
        />
        <Text style={style.label}>DOB (yyyy-mm-dd)</Text>
        <TextInput
          style={style.label}
          placeholder="Enter your date of birth here"
          value = {this.state.dob}
          onChangeText = {this.dobChange}
        />
        <Text style={style.label}>Pronouns</Text>
        <TextInput
          style={style.label}
          placeholder="Enter your pronouns here"
          value= {this.state.pronouns}
          onChangeText = {this.pronounsChange}
        />
        <Text style={style.label}>Email</Text>
        <TextInput
          style={style.label}
          placeholder="Enter your email address here"
          value = {this.state.email}
          onChangeText = {this.emailChange}
        />
        <Text style={style.label}>Password</Text>
        <TextInput
          style={style.label}
          placeholder="Enter your Password here" 
          value = {this.state.password}
          onChangeText = {this.passwordChange}
        />
        <Text style={style.label}>Dog Name</Text>
        <TextInput
        style={style.label}
        placeholder="Enter your dog name here"
        value = {this.state.dog_name}
        onChangeText = {this.dog_nameChange}
        />
        <Text style={style.label}>Dog Breed</Text>
        <TextInput
          style={style.label}
          placeholder="Enter your dogbreed here" 
          value = {this.state.dog_breed}
          onChangeText = {this.dog_breedChange}
        />
        <Text style={style.label}>About Section</Text>
        <TextInput
          style={style.label}
          placeholder="Enter your description here" 
          value = {this.state.abt}
          onChangeText = {this.abtChange}
        />
        <Button
          title = "Register"
          onPress= {() => this.getInfo(this.state.name)}
          color='blue'
        />
        <Button
          title="Back" 
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  };
}

export {ProfileScreen};

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
