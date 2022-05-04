import React, {Component} from 'react';
import styles from './styles';
import {View, Text, FlatList, SafeAreaView} from 'react-native';
import {Avatar} from 'react-native-elements';

class Messages extends Component {
  render() {
    const {messages, currentMember, userName} = this.props;

    console.log('hellooo' + userName);
    const renderItem = ({item}) => {
      return this.renderMessage(item);
    };

    const myListEmpty = () => {
      return (
        <View style={{alignItems: 'center'}}>
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
            <Text
              style={{
                color: 'blue',
                fontSize: 24,
                textAlign: 'center',
                marginTop: 8,
                marginBottom: 8,
                fontWeight: 'bold',
              }}>
              Happy Chatting!! {userName}
            </Text>
          )}
        />
      </SafeAreaView>
    );
  }

  renderMessage(message) {
    const {member, text} = message;
    console.log('this is the members username' + member.username);
    console.log(text);
    const {currentMember} = this.props;
    const messageFromMe = member.id === currentMember.id;
    const middleName = messageFromMe
      ? styles.Message_content_current
      : styles.Message_content;
    const textName = messageFromMe
      ? styles.currentMember_Message_content_text
      : styles.Message_content_text;

    return (
      <View
        style={
          messageFromMe
            ? {alignItems: 'flex-end', flexDirection: 'row-reverse'}
            : {alignItems: 'flex-start', flexDirection: 'row'}
        }>
        <Avatar
          size="small"
          rounded
          source={{
            uri: 'https://www.mywebtuts.com/user-defualt-images.jpg',
          }}
        />
        <View style={middleName}>
          <Text style={styles.Message_content_username}>{member.username}</Text>
        </View>
        <View>
          <Text style={textName}>{text}</Text>
        </View>
      </View>
    );
  }
}

export default Messages;