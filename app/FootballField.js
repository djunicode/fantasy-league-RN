import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const formations = [
  { id: 1, name: '4-4-2', defenders: 4, midfielders: 4, forwards: 2 },
  { id: 2, name: '4-3-3', defenders: 4, midfielders: 3, forwards: 3 },
  { id: 3, name: '3-5-2', defenders: 3, midfielders: 5, forwards: 2 },
  { id: 4, name: '5-3-2', defenders: 5, midfielders: 3, forwards: 2 },
];

const positions = [
  { id: 1, name: 'Defender', abbreviation: 'DEF' },
  { id: 2, name: 'Midfielder', abbreviation: 'MID' },
  { id: 3, name: 'Forward', abbreviation: 'FWD' },
];

const players = [
  { id: 1, name: 'Player 1' },
  { id: 2, name: 'Player 2' },
  { id: 3, name: 'Player 3' },
  { id: 4, name: 'Player 4' },
  { id: 5, name: 'Player 5' },
  { id: 6, name: 'Player 6' },
  { id: 7, name: 'Player 7' },
  { id: 8, name: 'Player 8' },
  { id: 9, name: 'Player 9' },
  { id: 10, name: 'Player 10' },
];

const FormationSelector = ({ formations, selectedFormation, onSelectFormation }) => (
  <View style={styles.formationContainer}>
    {formations.map((formation) => (
      <TouchableOpacity
        key={formation.id}
        style={[
          styles.formationButton,
          formation.id === selectedFormation?.id && styles.selectedFormationButton,
        ]}
        onPress={() => onSelectFormation(formation)}
      >
        <Text style={styles.formationButtonText}>{formation.name}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const PlayerSelector = ({ player, onPlayerClick }) => (
  <TouchableOpacity
    style={styles.playerContainer}
    onPress={() => onPlayerClick(player)}
  >
    <Text style={styles.playerText}>{player.name}</Text>
  </TouchableOpacity>
);

const FootballField = () => {
  const [selectedFormation, setSelectedFormation] = useState(formations[0]);
  const [playerList, setPlayerList] = useState(players);

  const handleSelectFormation = (formation) => {
    setSelectedFormation(formation);
  };

  const fetchPlayerProfile = async (player) => {
    try {
      const response = await axios.get('http://fantasyleague-pl7o.onrender.com/team/teamSelect');
      const profile = response.data;
      
      // Update the player's profile
      player.profile = profile;
  
      // Update players array with the updated player object
      const updatedPlayerList = [...playerList];
      const playerIndex = updatedPlayerList.findIndex((p) => p.id === player.id);
      updatedPlayerList[playerIndex] = player;
  
      setPlayerList(updatedPlayerList);
    } catch (error) {
      console.error('Error fetching player profile:', error);
    }
  };

  const onPlayerClick = (player) => {
    if (!player.profile) {
      fetchPlayerProfile(player);
    }
  };

  const renderPlayers = () => {
    const { defenders, midfielders, forwards } = selectedFormation;
    const totalPlayers = defenders + midfielders + forwards;
    const renderedPlayers = [];

    for (let i = 0; i < totalPlayers; i++) {
      const player = playerList[i];
      renderedPlayers.push(
        <PlayerSelector
          key={player.id}
          player={player}
          onPlayerClick={onPlayerClick}
        />
      );
    }

    return renderedPlayers;
  };

  return (
    <View style={styles.container}>
      <FormationSelector
        formations={formations}
        selectedFormation={selectedFormation}
        onSelectFormation={handleSelectFormation}
      />

      <View style={styles.footballField}>
        <View style={styles.playerRow}>
          {renderPlayers().slice(selectedFormation.defenders + selectedFormation.midfielders)}
        </View>
        <View style={styles.playerRow}>
          {renderPlayers().slice(selectedFormation.defenders, selectedFormation.defenders + selectedFormation.midfielders)}
        </View>
        <View style={styles.playerRow}>
          {renderPlayers().slice(0, selectedFormation.defenders)}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'green',
  },
  formationContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  formationButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'lightgray',
    marginBottom: 8,
  },
  selectedFormationButton: {
    backgroundColor: 'gray',
  },
  formationButtonText: {
    fontWeight: 'bold',
    color: 'black',
  },
  footballField: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 4,
  },
  playerContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 8,
    marginVertical: 4,
  },
  playerText: {
    color: 'black',
    textAlign: 'center',
  },
});

export default FootballField;
