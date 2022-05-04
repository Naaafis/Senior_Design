import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import moment from 'moment';
import {Auth} from 'aws-amplify';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      email: '',
      fullName: '',
      dogName: '',
      dog_breed: '',
      abt: '',
      dob: '',
      registeredFlag: false,
      userExists: false,
    };

    this.nameChange = this.nameChange.bind(this);
    this.dobChange = this.dobChange.bind(this);
    this.dog_breedChange = this.dog_breedChange.bind(this);
    this.abtChange = this.abtChange.bind(this);

    Auth.currentAuthenticatedUser({
      bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then(user =>
        this.setState({
          userName: user.username,
          email: user.attributes.email,
          fullName: user.attributes.name,
          dogName: user.attributes.preferred_username,
        }),
      )
      .catch(err => console.log(err));
  }

  dog_breedChange(dog_breed) {
    this.setState({dog_breed});
  }
  dobChange(dob) {
    this.setState({dob});
  }
  abtChange(abt) {
    this.setState({abt});
  }

  nameChange(userName) {
    this.setState({username: userName});
  }

  onSubmit(e) {
    this.setState({username: userName});
  }

  sendToServer(e) {
    const requestOptions = {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({
        userid: 'xx',
        fullname: this.state.fullName,
        username: this.state.userName,
        dob: this.state.dob,
        email: this.state.email,
        dogname: this.state.dogName,
        dogbreed: this.state.dog_breed,
        abt: this.state.abt,
      }),
    };
    fetch('http://18.219.228.229:3000/profile', requestOptions) //elastic ip.. cool.
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data));
        // this.setState({ message: data })
      })
      .catch(error => console.log(error));
    //this.pushData();
  }

  componentDidMount() {
    //even though not used the fetch call isn't sent unless prevProps is included
    //this is where I want to check if the user exists in the database.
    Auth.currentAuthenticatedUser({
      bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then(user =>
        this.functionN({
          userName: user.username,
          email: user.attributes.email,
          fullName: user.attributes.name,
          dogName: user.attributes.preferred_username,
        }),
      )
      .catch(err => console.log(err));
  }

  functionN({userName, email, fullName, dogName}) {
    const requestOptions = {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({
        fullname: fullName,
        username: userName,
        dob: this.state.dob,
        email: email,
        dogname: dogName,
        dogbreed: this.state.dog_breed,
        abt: this.state.abt,
      }),
    };
    fetch('http://18.219.228.229:3000/check_if_user_exists', requestOptions) //elastic ip.. cool.
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data));
        if (data !== 'user does not exist') {
          this.setState({userExists: true});
        }
      })
      .catch(error => console.log(error));
  }
  // componentDidUpdate(prevProps, prevState){ //even though not used the fetch call isn't sent unless prevProps is included
  //   //this is where I want to check if the user exists in the database.

  //   const requestOptions = {
  //     method: 'POST',
  //     headers: {Accept: 'application/json'  , 'Content-Type': 'application/json' },
  //     body: JSON.stringify(
  //       {
  //       fullname: this.state.fullName,
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
    const flag = this.state.userExists; // should be this commented out if not connected to server

    console.log('Flag' + flag);
    console.log('Abt:' + this.state.abt);

    const signOut = () => {
      Auth.signOut();
    };

    const register = () => {
      if (this.state.dob === '') {
        Alert.alert('Date of Birth', 'The input cannot be empty!');
      } else if (!moment(this.state.dob, 'yyyy-mm-dd').isValid()) {
        Alert.alert(
          'Date of Birth (yyyy-mm-dd)',
          'The input Date of Birth has an invalid format!',
        );
      } else if (this.state.dog_breed === '') {
        Alert.alert('Dog Breed', 'The Dog Breed input cannot be empty!');
      } else if (this.state.abt === '') {
        Alert.alert(
          'About Section',
          'The About Section input cannot be empty!',
        );
      } else {
        this.props.navigation.navigate('Main Menu', this.state),
          this.sendToServer(this.state.name),
          this.setState({registeredFlag: true, rand: 'hello'});
      }
    };

    //onPress={() => navigation.navigate('Main Menu', {nameOfFriend: this.state.userName})}
    return (
      <View style={theme.screen}>
        <Text style={theme.title}>Home</Text>
        {flag ? (
          <View>
            <Text style={theme.title2}>
              You have already registered the remaining part of your profile
              page. Enjoy the rest of the application!
            </Text>

            <TouchableOpacity
              style={theme.buttonContainer2}
              onPress={() =>
                this.props.navigation.navigate('Main Menu', this.state)
              }>
              <Text style={theme.buttonText}>Go to Main Menu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={theme.buttonContainer} onPress={signOut}>
                <Text style={theme.buttonText}>Sign out</Text>
              </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={theme.title2}>
              Welcome! Please enter some more info and enjoy WOOF!
            </Text>
            <Text style={theme.body}>User Name = {this.state.userName}</Text>
            <Text style={theme.body}>Email = {this.state.email}</Text>
            <Text style={theme.body}>Full Name = {this.state.fullName}</Text>
            <Text style={theme.body}>Dog Name = {this.state.dogName}</Text>
            <Text style={theme.body}>DOB (yyyy-mm-dd)</Text>
            <TextInput
              style={theme.inputBox}
              placeholder="Enter your date of birth here"
              onChangeText={this.dobChange}
            />

            <Text style={theme.body}>Dog Breed</Text>
            <TextInput
              style={theme.inputBox}
              placeholder="Enter your dog breed here"
              value={this.state.dog_breed}
              onChangeText={this.dog_breedChange}
            />

            <Text style={theme.body}>About Section</Text>
            <TextInput
              style={theme.inputBox}
              placeholder="Enter your description here"
              value={this.state.abt}
              onChangeText={this.abtChange}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <TouchableOpacity
                style={theme.buttonContainer}
                onPress={register}>
                <Text style={theme.buttonText}>Register</Text>
              </TouchableOpacity>

              <TouchableOpacity style={theme.buttonContainer} onPress={signOut}>
                <Text style={theme.buttonText}>Sign out</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={theme.buttonContainer2}
              onPress={() =>
                this.props.navigation.navigate('Main Menu', this.state)
              }>
              <Text style={theme.buttonText}>Go to Main Menu</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const theme = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'darksalmon',
  },
  title: {
    alignSelf: 'center',
    marginTop: 10,
    fontFamily: 'Sarpanch-ExtraBold',
    fontSize: 60,
    color: 'yellow',
  },
  title2: {
    alignSelf: 'center',
    fontFamily: 'Sarpanch-Bold',
    fontSize: 24,
    color: 'black',
  },
  body: {
    marginTop: 5,
    marginLeft: 20,
    fontFamily: 'Sarpanch-Regular',
    fontSize: 18,
    color: 'black',
  },
  inputBox: {
    marginLeft: 20,
    marginRight: 20,
    height: 40,
    fontSize: 18,
    color: 'black',
    backgroundColor: 'bisque',
  },
  buttonContainer: {
    alignSelf: 'center',
    marginTop: 20,
    minWidth: 140,
    elevation: 10,
    backgroundColor: '#009688',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonContainer2: {
    alignSelf: 'center',
    marginTop: 20,
    minWidth: 240,
    elevation: 10,
    backgroundColor: '#009688',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

export default Index;