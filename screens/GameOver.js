import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Title from '../components/game/ui/Title'
import Colors from '../constants/colors'
import PrimaryButtons from '../components/game/ui/PrimaryButtons';

export default function GameOver({roundsNumber, userNumber, onStartNewGame}) {
  
  return (
    <View style={styles.rootContainer}>
      <Title>Game Over</Title>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/success.png")}
        />
      </View>
      <Text style={styles.summaryText}>
        My App need <Text style={styles.highLight}>{roundsNumber}</Text>{" "}
        rounds to guess my number{" "}
        <Text style={styles.highLight}>{userNumber} #thankU4Ex16</Text>
      </Text>

      <PrimaryButtons confirmInputHandler={onStartNewGame}>Start New Game</PrimaryButtons>
    </View>
  );
}

const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
      alignItems: 'center'
    },
    imageContainer: {
      width: 300,
      height: 300,
      borderRadius: 150,
      borderWidth: 3,
      borderColor: Colors.primary800,
      overflow: 'hidden',
      margin: 36
    },
    image: {
      width: '100%',
      height: '100%'
    },
    summaryText: {
      fontFamily: 'open-sans',
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 24
    },
    highLight: {
      fontFamily: 'open-sans-bold',
      color: Colors.primary500
    },

})