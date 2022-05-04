import {Component} from 'react';
import React from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {name: ''};

    this.nameChange = this.nameChange.bind(this);
  }

  nameChange(name) {
    this.setState({name});
  }

  onSubmit(e) {
    this.setState({name: ''});
    this.props.onSendMessage(this.state.name);
  }

  render() {
    return (
      <View>
        <TextInput
          style={styles.input}
          placeholder="TYPE MESSAGE HERE"
          placeholderTextColor="blue"
          value={this.state.name}
          onChangeText={this.nameChange}
          autoFocus={true}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.onSubmit(this.state.name)}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Input;
