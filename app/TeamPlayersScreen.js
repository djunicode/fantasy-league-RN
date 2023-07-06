import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const TeamPlayersScreen = () => {
  const [playerData, setPlayerData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        'http://fantasyleague-pl7o.onrender.com/team/showPlayers',
        {
          teamId1: '62',
          teamId2: '62',
        }
      );

      const { data1, data2 } = response.data;
      const playersData = [...data1, ...data2];
      setPlayerData(playersData);
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  const renderPlayerCard = (player) => {
    return (
      <View key={player.id} style={styles.cardContainer}>
        <Image source={{ uri: player.image_path }} style={styles.image} />
        <View style={styles.playerInfoContainer}>
          <Text style={styles.playerName}>{player.name}</Text>
          <Text style={styles.playerPosition}>{player.common_name}</Text>
          <Text style={styles.playerDetails}>{`Height: ${player.height}cm`}</Text>
          <Text style={styles.playerDetails}>{`Date of Birth: ${player.date_of_birth}`}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {playerData.map((player) => renderPlayerCard(player))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 12,
  },
  playerInfoContainer: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  playerPosition: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 4,
  },
  playerDetails: {
    fontSize: 14,
    marginBottom: 2,
  },
});

export default TeamPlayersScreen;
