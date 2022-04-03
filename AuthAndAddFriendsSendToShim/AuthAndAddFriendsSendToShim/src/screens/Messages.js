import React, { Component } from 'react';
import Input from "./Input";
import styles from "./styles";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Item,
  Button,
  StyleSheet,
  SegmentedControlIOSBase
} from 'react-native';
import {List,ListItem, Avatar } from 'react-native-elements';

class Messages extends Component {
  render() {
    const {messages} = this.props;
    const renderItem = ({item}) => { 
      return (
      <View>
        {!!item && <Text>{this.renderMessage(item)}</Text>}
      </View>
      );
    };

    const myListEmpty = () => {
      return (
        <View style={{ alignItems: "center" }}>
        <Text style={styles.item}>No Message History found</Text>
        </View>
      );
    };

    return (
      <SafeAreaView>
      <FlatList
        data={messages}
        renderItem={renderItem}
        ListEmptyComponent={myListEmpty}
        ListHeaderComponent={() => (
          <Text style={{ fontSize: 30, textAlign: "center",marginTop:20,fontWeight:'bold' }}>
            Happy Chatting!!
          </Text>
        )}
      />
      </SafeAreaView>
    );
  }

  renderMessage(message){
    const { member, text } = message;
    console.log(member.username);
    console.log(text);
    const { currentMember } = this.props;
    const messageFromMe = member.id === currentMember.id;
    console.log(member.id);
    console.log(currentMember.id);
    const outerName = messageFromMe ? styles.Messages_message_currentMember : styles.Messages_message;
    const middleName = messageFromMe ? styles.Message_content_current : styles.Message_content;
    const textName = messageFromMe ? styles.currentMember_Message_content_text : styles.Message_content_text;
    return(
      <View style={outerName}>
        <Avatar
          containerStyle={{}}
          size="small"
          rounded
          source={{
            uri: 'https://www.mywebtuts.com/user-defualt-images.jpg',
          }}
        />
        <View style={middleName}>
          <Text style={styles.Message_content_username}>{member.username}</Text>
        </View>
        <View style={textName}>
          <Text style={textName}>{text}</Text>
        </View>
      </View>
    );
  }
}

export default Messages;


// const styles = StyleSheet.create({
//     App: {
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'space-between',
//       height: '100%',
//     },
//     App_header: {
//       backgroundColor: '#262626',
//       overflow: 'visible',
//       width: '100%',
//       textAlign: 'center',
//       color: 'white',
//     },
//     Messages_list: {
//       padding: 20, //0
//       maxWidth: 900,
//       width: '100%',
//       margin: '0 auto',
//       listStyle: 'none',
//       paddingLeft: 0,
//       flexGrow: 1,
//       overflow: 'auto',
//     },
//     Messages_message: { flexDirection: "row", display: 'flex', marginTop: 10 },
//     Messages_message_currentMember: {
//       flexDirection: "row-reverse",
//       justifyContent: "flex-end",
//       // textAlign: "right",
//       // alignItems: "flex-end"
//     },
//     Message_content: { display: 'flex' },
//     Message_content_current: {
      
//       alignItems: "flex-end" 
//     },
//     Messages_message_avatar: {
//       height: 35,
//       width: 35,
//       borderRadius: '50%',
//       display: 'flex',
//       margin: '0 10 -10',
//     },
//     Message_content_username: {
//       display: 'flex',
//       color: 'gray',
//       fontSize: 14,
//       paddingBottom: 4,
//     },
//     Message_content_text: {
//       padding: 10,
//       maxWidth: 400,
//       margin: 0,
//       borderRadius: 12,
//       backgroundColor: 'cornflowerblue',
//       color: 'white',
//       display: 'flex',
//     },
//     currentMember_Message_content_text: {
//       padding: 10,
//       maxWidth: 400,
//       margin: 0,
//       borderRadius: 12,
//       backgroundColor: 'orangered',
//       color: 'white',
//       display: 'flex',
//     },
//     form: {
//       display: "flex",
//       width: "100%",
//       justifyContent: "space-between",
//       maxWidth: "900",
//       margin: "0 auto 40"
//     },
//     input: {
//       padding: 5,
//       fontSize: 16,
//       borderRadius: 8,
//     //   border: 1,
//       borderColor: `#ff4500`,
//       flexGrow: 1,
//     },
//     button: {
//       padding: 20,
//       flex: 1,
//       fontSize: 16,
//       backgroundColor: `#ff4500`,
//       color: 'white',
//       // border: 'none',
//       borderRadius: 8,
//       marginLeft: 10,
//     },
//   });


