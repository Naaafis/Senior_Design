import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

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
      dateJoined: '',
    };
  }
  //const {userName, nameOfFriend} = this.props.route.params;
  // <Text style={style.label}>From main menu: {JSON.stringify(userName)}</Text>
  // <Text style={style.label}>From Home: {JSON.stringify(nameOfFriend)}</Text>
  componentDidMount() {
    const requestOptions = {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({username: 'hihihi'}),
    };
    fetch('http://18.219.228.229:3000/get_profile', requestOptions) //elastic ip.. cool.
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data));
        console.log('testing: ' + data[0]['username']);
        console.log('suername ' + data['username']);
        this.setState({userName: data[0]['username']});
        this.setState({fullName: data[0]['fullname']});
        this.setState({dob: data[0]['dob']});
        this.setState({email: data[0]['email']});
        this.setState({dogName: data[0]['dogname']});
        this.setState({dog_breed: data[0]['dogbreed']});
        this.setState({abt: data[0]['abt']});
        this.setState({dateJoined: data[0]['datejoined']});
      })
      .catch(error => console.log(error));
  }
  render() {
    const {userName, email, nameName, dogName} = this.props.route.params;

    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Profile</Text>
        <ScrollView style={styles.scroll}>
          <Text style={styles.body}>User Name = {this.state.userName}</Text>
          <Text style={styles.body}>Full Name = {this.state.fullName}</Text>
          <Text style={styles.body}>Date of Birth = {this.state.dob}</Text>
          <Text style={styles.body}>Email = {this.state.email}</Text>
          <Text style={styles.body}>Dog Name = {this.state.dogName}</Text>
          <Text style={styles.body}>Dog Breed = {this.state.dog_breed}</Text>
          <Text style={styles.body}>About Section = {this.state.abt}</Text>
          <Text style={styles.body}>Date Joined = {this.state.dateJoined}</Text>
        </ScrollView>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.props.navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'darksalmon',
  },
  scroll: {
    alignSelf: 'center',
    backgroundColor: 'peachpuff',
    maxHeight: 500,
    width: '90%',
  },
  title: {
    alignSelf: 'center',
    marginTop: 1,
    fontFamily: 'Sarpanch-ExtraBold',
    fontSize: 48,
    color: 'yellow',
  },
  body: {
    marginTop: 20,
    marginLeft: 20,
    fontFamily: 'Sarpanch-Bold',
    fontSize: 20,
    color: 'black',
  },
  buttonContainer: {
    marginTop: 20,
    alignSelf: 'center',
    minWidth: 200,
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

export {ProfileScreen};
