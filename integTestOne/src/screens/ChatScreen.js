import Messages from "./Messages";
import Input from "./Input";

import React, { Component } from "react";
import {Alert, View, Text,FlatList,SafeAreaView, StyleSheet} from "react-native";

const Scaledrone = require('scaledrone-react-native');

function randomName() {
  const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

class ChatScreen extends Component {
  state = {
    messages: [
      {
        text: "This is a test message!",
        member: {
          color: "blue",
          username: "bluemoon"
        }
      },
      {
        text: "This is a 2nd test message!",
        member: {
          color: "red",
          username: "redSKY"
        }
      },
      {
        text: "This is a 4th test message!",
        member: {
          color: "green",
          username: "greenDUDE"
        }
      },//add new one here

    ],
    member: {
      username: randomName(),
      color: randomColor(),
      id: 125 //added this just for dev so that the ID is different right off of the bat, remove later.
    }
  }

  constructor() {
    super();
    this.drone = new Scaledrone('EvtqQCsCd39Q10VW', {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});

    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });
  }

  
  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
    //this was a way to send messages without Scaledrone
    // const messages = this.state.messages;
    // const member = this.state.member;
    // member.id = 123;
    // messages.push({
    //   text: message,
    //   member
    // })
    // this.setState({messages: messages})
    // this.setState({member})
  }

  

  render() {
  return (
    <View style={styles.App}>
      <Messages
        messages={this.state.messages}
        currentMember={this.state.member}
      />
      <Input 
        onSendMessage = {this.onSendMessage}
      />
    </View>
  );
  
  
}

}//End of App


const styles = StyleSheet.create({
  App: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '90%',
  },
  App_header: {
    backgroundColor: '#262626',
    overflow: 'visible',
    width: '100%',
    textAlign: 'center',
    color: 'white',
  },
  Messages_list: {
    padding: 20, //0
    maxWidth: 900,
    width: '100%',
    margin: '0 auto',
    listStyle: 'none',
    paddingLeft: 0,
    flexGrow: 1,
    overflow: 'auto',
  },
  Messages_message: { display: 'flex', marginTop: 10 },
  Messages_message_currentMember: {
    flexDirection: "row-reverse",
    textAlign: "right"
  },
  Message_content: { display: 'flex' },
  Message_content_current: { alignItems: "flex-end" },
  Messages_message_avatar: {
    height: 35,
    width: 35,
    borderRadius: '50%',
    display: 'flex',
    margin: '0 10 -10',
  },
  Message_content_username: {
    display: 'flex',
    color: 'gray',
    fontSize: 14,
    paddingBottom: 4,
  },
  Message_content_text: {
    padding: 10,
    maxWidth: 400,
    margin: 0,
    borderRadius: 12,
    backgroundColor: 'cornflowerblue',
    color: 'white',
    display: 'flex',
  },
  currentMember_Message_content_text: {
    padding: 10,
    maxWidth: 400,
    margin: 0,
    borderRadius: 12,
    backgroundColor: 'orangered',
    color: 'white',
    display: 'flex',
  },
  form: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    maxWidth: "900",
    margin: "0 auto 40"
  },
  input: {
    padding: 5,
    fontSize: 16,
    borderRadius: 8,
    // border: 1,
    borderColor: `#ff4500`,
    // flexGrow: 1,
  },
  button: {
    padding: 20,
    flex: 2,
    justifyContent: "flex-end",
    fontSize: 16,
    backgroundColor: `#ff4500`,
    color: 'white',
    // border: 'none',
    borderRadius: 8,
    marginLeft: 10,
  },
});

// /<View style={styles.Messages_message_avatar}>
//           className="avatar"
//         </View>




// import React , {Component} from 'react';
// import {View, Text, Button, StyleSheet} from 'react-native';

// class ChatScreen extends Component {
//   render(){
//     return (
//       <View style={{flex: 1, alignItems: 'center'}}>
//         <Text style={style.title}>Chat</Text>
//         <View style={style.map}></View>
//         <Button title="Back" onPress={() => this.props.navigation.goBack()} />
//       </View>
//     );
//   }
// }

export {ChatScreen};


// const style = StyleSheet.create({
//   title: {
//     marginTop: 20,
//     marginBottom: 20,
//     fontSize: 48,
//   },
//   map: {
//     width: 340,
//     height: 420,
//     backgroundColor: 'aquamarine',
//     marginBottom: 20,
//   },
// });
