import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText !== '') {
      setMessages([...messages, {sender: 'Me', message: inputText}]);
      setInputText('');
    }
  };

  useEffect(() => {
    // An example of loading messages from a database or API
    const loadedMessages = [
      {sender: 'John', message: 'Hey, how are you?'},
      {sender: 'Me', message: 'I\'m good, thanks for asking.'},
      {sender: 'Sarah', message: 'Not much, just hanging out at home.'},
      {sender: 'Tom', message: 'Sorry, I can\'t make it today.'},
      {sender: 'Me', message: 'No problem, we can reschedule for next week.'},
    ];
    setMessages(loadedMessages);
  }, []);

  const renderItem = ({ item }) => {
    const isSender = item.sender === 'Me';
    const messageStyle = isSender ? styles.senderMessage : styles.recipientMessage;
    const textStyle = isSender ? styles.senderText : styles.recipientText;
    const alignStyle = isSender ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' };
    return (
      <View style={[styles.message, messageStyle, alignStyle]}>
        <Text style={[styles.messageText, textStyle]}>{item.message}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Icon 
                name="send"
                size={24}
                color="blue"
              />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  message: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  senderMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007aff',
  },
  recipientMessage: {
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  senderText: {
    color: '#fff',
  },
  recipientText: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
