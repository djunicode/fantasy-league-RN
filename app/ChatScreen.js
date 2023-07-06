import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ChatScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    getTokenFromStorage();
  }, []);

  const getTokenFromStorage = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        'http://fantasyleague-pl7o.onrender.com/user/searchedUsers',
        { query: searchText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    accessChat(user.id);
  };

  const accessChat = async (_id) => {
    try {
      const response = await axios.get(
        `http://fantasyleague-pl7o.onrender.com/chat/accessChat?userId=${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setChats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchChats = async () => {
    try {
      const response = await axios.get(
        'http://fantasyleague-pl7o.onrender.com/chat/fetchChats',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setChats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async () => {
    try {
      const response = await axios.post(
        'http://fantasyleague-pl7o.onrender.com/message/sendMessage',
        {
          recipientId: selectedUser.id,
          message: messageInput,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Message sent:', response.data);
      setMessageInput('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      {/* Search bar */}
      <TextInput
        placeholder="Search by username or email"
        value={searchText}
        onChangeText={setSearchText}
      />
      <Button title="Search" onPress={handleSearch} />

      {/* Display search results */}
      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Button
              title={item.username}
              onPress={() => handleUserClick(item)}
            />
          )}
        />
      )}

      {/* Display chat messages */}
      {selectedUser && (
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.message}</Text>
              <Text>{item.timestamp}</Text>
            </View>)}
        />
      )}

      {/* Message input and send button */}
      {selectedUser && (
        <View>
          <TextInput
            placeholder="Type a message..."
            value={messageInput}
            onChangeText={setMessageInput}
          />
          <Button title="Send" onPress={sendMessage} />
        </View>
      )}
    </View>
  );
};

export default ChatScreen;
