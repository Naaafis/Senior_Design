import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Searchbar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Pending from '../screens/PendingFriends';

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

class AddFriendsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: '',
      isVisible: false,
    };
    this.searchNameChange = this.searchNameChange.bind(this);
  }

  searchNameChange(searchName) {
    this.setState({searchName});
  }

  getInfoOnUsersFriends(e) {
    const requestOptions = {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({username: this.state.searchName}),
    };
    fetch('http://18.219.228.229:3000/get_friends', requestOptions) //elastic ip.. cool.
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data));
        console.log(data);
        //this.predictionChange(data["message"])
      })
      .catch(error => console.log(error));
  }

  addFriend(e) {
    const requestOptions = {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({username: 'Dan', pending: this.state.searchName}),
    };
    fetch('http://18.219.228.229:3000/friends', requestOptions) //elastic ip.. cool.
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data));
        console.log(data);
        //this.predictionChange(data["message"])
      })
      .then(this.checkFriend(this.state.searchName))
      .then(this.deleteFriend(this.state.searchName))
      .catch(error => console.log(error));

    // delay(1000).then(() => this.checkFriend(this.state.searchName));
    // //
    // delay(1000).then(() => this.deleteFriend(this.state.searchName));
  }

  checkFriend(e) {
    const requestOptionsTwo = {
      method: 'GET',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
    };
    fetch('http://18.219.228.229:3000/check_match', requestOptionsTwo) //elastic ip.. cool.
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data));
        console.log(data);
        //this.predictionChange(data["message"])
      })
      .catch(error => console.log(error));
  }

  deleteFriend(e) {
    const requestOptionsThree = {
      method: 'GET',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
    };
    fetch('http://18.219.228.229:3000/delete_pending', requestOptionsThree) //elastic ip.. cool.
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data));
        console.log(data);
        //this.predictionChange(data["message"])
      })
      .catch(error => console.log(error));
  }
  // state = {
  //   text1: '+ADD FRIEND',
  //   text2: '+ADD FRIEND',
  //   text3: '+ADD FRIEND',
  //   text4: '+ADD FRIEND',
  //   text5: '+ADD FRIEND',
  //   disbled1: false,
  //   disbled2: false,
  //   disbled3: false,
  //   disbled4: false,
  //   disbled5: false,
  // };
  //
  // onPress1 = () => {
  //   this.setState({
  //     text1: 'Pending...',
  //     disbled1: true,
  //   });
  // };
  //
  // onPress2 = () => {
  //   this.setState({
  //     text2: 'Pending...',
  //     disbled2: true,
  //   });
  // };
  //
  // onPress3 = () => {
  //   this.setState({
  //     text3: 'Pending...',
  //     disbled3: true,
  //   });
  // };
  // onPress4 = () => {
  //   this.setState({
  //     text4: 'Pending...',
  //     disbled4: true,
  //   });
  // };
  //
  // onPress5 = () => {
  //   this.setState({
  //     text5: 'Pending...',
  //     disbled5: true,
  //   });
  // };

  render() {
    const {userName, email, nameName, dogName} = this.props.route.params;
    console.log('add frieds screen' + userName);

    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Add Friends</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="TYPE MESSAGE HERE"
          value={this.state.searchName}
          onChangeText={this.searchNameChange}
          autoFocus={true}
        />

        <TouchableOpacity
          style={styles.buttonContainer2}
          onPress={() => this.getInfoOnUsersFriends(this.state.searchName)}>
          <Text style={styles.buttonText}>See User's Friends</Text>
        </TouchableOpacity>

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.addFriend(this.state.searchName)}>
            <Text style={styles.buttonText}>Add Friends</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.goBack()}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.body}>Recommended Friends</Text>
        <Pending nameOfUser={userName} />
      </View>
    );
  }
}

const style = StyleSheet.create({
  title: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 48,
  },
  label: {
    marginRight: 40,
    fontSize: 22,
    backgroundColor: 'lightgreen',
  },
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'darksalmon',
  },
  title: {
    alignSelf: 'center',
    marginTop: 1,
    fontFamily: 'Sarpanch-ExtraBold',
    fontSize: 48,
    color: 'yellow',
  },
  body: {
    marginTop: 30,
    marginLeft: 20,
    fontFamily: 'Sarpanch-Bold',
    fontSize: 30,
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
    marginTop: 24,
    alignSelf: 'center',
    minWidth: 160,
    elevation: 10,
    backgroundColor: '#009688',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonContainer2: {
    marginTop: 24,
    alignSelf: 'center',
    minWidth: 300,
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

export {AddFriendsScreen};
