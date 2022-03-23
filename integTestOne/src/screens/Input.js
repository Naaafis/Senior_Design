import {Component} from "react";
import React from "react";
import { View,TextInput, Text,FlatList,SafeAreaView, StyleSheet, Button, onPress, Alert} from "react-native";
import styles from "./styles";

class Input extends Component {
  constructor(props) {
    super(props);
  
    this.state = { name: '' }
  
    this.nameChange = this.nameChange.bind(this);
  }
  
  nameChange(name) {
    this.setState({name});
  }
  
  onSubmit(e) {
    this.setState({name: ""});
    this.props.onSendMessage(this.state.name);
  }
  
  render() {
    return (
      <View>
        <TextInput 
          style = {styles.input}
          placeholder="TYPE MESSAGE HERE"
          value = {this.state.name}
          onChangeText={this.nameChange}
          autoFocus = {true}
        />
        <Button 
          style = {styles.button}
          title="Send" 
          onPress = {() => this.onSubmit(this.state.name)}
        />
      </View>
    );
  }
  

}


// const styles = StyleSheet.create({
//   App: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     height: '100%',
//   },
//   App_header: {
//     backgroundColor: '#262626',
//     overflow: 'visible',
//     width: '100%',
//     textAlign: 'center',
//     color: 'white',
//   },
//   Messages_list: {
//     padding: 20, //0
//     maxWidth: 900,
//     width: '100%',
//     margin: '0 auto',
//     listStyle: 'none',
//     paddingLeft: 0,
//     flexGrow: 1,
//     overflow: 'auto',
//   },
//   Messages_message: { flexDirection: "row", display: 'flex', marginTop: 10 },
//   Messages_message_currentMember: {
//     flexDirection: "row-reverse",
//     justifyContent: "flex-end",
//     // textAlign: "right",
//     // alignItems: "flex-end"
//   },
//   Message_content: { display: 'flex' },
//   Message_content_current: {
    
//     alignItems: "flex-end" 
//   },
//   Messages_message_avatar: {
//     height: 35,
//     width: 35,
//     borderRadius: '50%',
//     display: 'flex',
//     margin: '0 10 -10',
//   },
//   Message_content_username: {
//     display: 'flex',
//     color: 'gray',
//     fontSize: 14,
//     paddingBottom: 4,
//   },
//   Message_content_text: {
//     padding: 10,
//     maxWidth: 400,
//     margin: 0,
//     borderRadius: 12,
//     backgroundColor: 'cornflowerblue',
//     color: 'white',
//     display: 'flex',
//   },
//   currentMember_Message_content_text: {
//     padding: 10,
//     maxWidth: 400,
//     margin: 0,
//     borderRadius: 12,
//     backgroundColor: 'orangered',
//     color: 'white',
//     display: 'flex',
//   },
//   form: {
//     display: "flex",
//     width: "100%",
//     justifyContent: "space-between",
//     maxWidth: "900",
//     margin: "0 auto 40"
//   },
//   input: {
//     padding: 5,
//     fontSize: 16,
//     borderRadius: 8,
//   //   border: 1,
//     borderColor: `#ff4500`,
//     flexGrow: 1,
//   },
//   button: {
//     padding: 20,
//     flex: 1,
//     fontSize: 16,
//     backgroundColor: `#ff4500`,
//     color: 'white',
//     // border: 'none',
//     borderRadius: 8,
//     marginLeft: 10,
//   },
// });
export default Input;