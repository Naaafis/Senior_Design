import React from "react";
import {
  StyleSheet,
  Iconoi,
  Button,
  TextInput,
  Text,
  View
} from "react-native";
import * as firebase from "firebase";
import { AsyncStorage, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


export default class Main extends React.Component {
  state = { currentUser: null };
  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  }
  logoutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // AsyncStorage.removeItem("key");
        this.props.navigation.navigate("Login");
      });
  };
  render() {
    const { currentUser } = this.state;
    return (
        <View  style={styles.container}>
          <Text style={styles.title}>
              Testing in progress, this is Mapbox. 
          </Text>
          <Text style={styles.greeting}>
            {'\n\n'} Hi {currentUser && currentUser.email}! {'\n\n'}
          </Text>
          <TouchableOpacity onPress={this.logoutUser} style={styles.button}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("UserProfile_Woof")} style={styles.button}>
            <Text style={styles.buttonText}>User Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Mapbox")} style={styles.button}>
            <Text style={styles.buttonText}>Mapbox</Text>
          </TouchableOpacity>
          <Text style={styles.greeting}>
            {'\n\n'} App built by WOOF: Team_NoSleep()
          </Text>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
    width: 250,
    height: 65,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',

  },
  title: {
    color: '#888',
    fontSize: 36,
    marginHorizontal: 15,
    marginBottom: 10,
    justifyContent: 'space-evenly',
    textAlign: 'center'
  },
  greeting: {
    color: '#888',
    fontSize: 28,
    marginHorizontal: 15,
    marginBottom: 10,
    justifyContent: 'space-evenly',
    textAlign: 'center'
  }
});
