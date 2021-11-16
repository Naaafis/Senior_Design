import React from "react";
import { Image, StyleSheet, Text, TextInput, View, Button } from "react-native";
import * as firebase from "firebase";
import { AsyncStorage } from "react-native";
import { useFonts } from 'expo-font';

import logo from './assets/dog_image_headshot2.jpg';

export default class Login extends React.Component {
  state = { email: "", password: "", errorMessage: null };
  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // AsyncStorage.setItem("key", "I like to save it.");
        this.props.navigation.navigate("Main");
      })
      .catch(error => this.setState({ errorMessage: error.message }));
  };
  render() {
    return (
    <View style={styles.container}>
        <Text style={{ fontSize: 60 }}> Login </Text>
        <Image source={logo} style={{ width: 305, height: 159 }} />
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate("SignUp")}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
        alignItems: "center",
  },
  textInput: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8
  },
  titleWords: {
      fontSize: 100,
    }
});
