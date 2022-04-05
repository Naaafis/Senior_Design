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
    const {messages,currentMember,userName} = this.props;

    console.log('this is the test of the tests of the tests' + JSON.stringify(messages));
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
            Happy Chatting!! {userName}
          </Text>
        )}
      />
      </SafeAreaView>
    );
  }

  renderMessage(message){
    const { member, text } = message;
    console.log('this is the members username' + member.username);
    console.log(text);
    const { currentMember } = this.props;
    console.log('qwerwqerewerewerwerewerewerwewerew'+currentMember.username);
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
          {messageFromMe ? (
            <Text style={styles.Message_content_username}>{currentMember.username}</Text>
          ) : (
            <Text style={styles.Message_content_username}>{member.username}</Text>
          )}

        </View>
        <View style={textName}>
          <Text style={textName}>{text}</Text>
        </View>
      </View>
    );
  }
}

export default Messages;
