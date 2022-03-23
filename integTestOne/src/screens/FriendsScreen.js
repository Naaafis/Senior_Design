import React , {Component} from 'react';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';

class FriendsScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      dogname: '',
      prediction: '',
      isVisible: false,
    };
    this.dognameChange = this.dognameChange.bind(this);
    this.predictionChange = this.predictionChange.bind(this);
  }

  dognameChange(dogname){
    this.setState({dogname});
  }

  predictionChange(prediction){
    this.setState({prediction});
  }

  getInfo(e){
    const requestOptions = {
      method: 'POST',
      headers: {Accept: 'application/json'  , 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {dogname: this.state.dogname}
      ),
    };
    fetch('http://18.219.228.229:3000/receive_classification', requestOptions) //elastic ip.. cool.
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data))
        console.log(data)
        this.predictionChange(data["message"])
      })
      .catch(error=> console.log(error))
    //this.pushData();
  }

  renderResults = () =>{
    this.setState({
      isVisible:!this.state.isVisible
    })
  }

  render(){
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={style.title}>Friends</Text>
        <Text style={style.label}>Dog Name</Text>
        {this.state.isVisible?<Text>This is the Prediction: {this.state.prediction}</Text>:null}
        <TextInput
          style={style.label}
          placeholder="What is your dog's name?" 
          value = {this.state.dogname}
          onChangeText = {this.dognameChange}
        />
        <Button
          title = "Receive Classification"
          onPress= {() => this.getInfo(this.state.dogname)}
          color='blue'
        />
        <Button
          title = "Show classification"
          onPress={this.renderResults}
        />
        {/* <Button title="Level 1" />
        <Button title="Level 2" />
        <Button title="Level 3" /> */}
        <Button title="Back" onPress={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}

export {FriendsScreen};

const style = StyleSheet.create({
  title: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 48,
  },
});
