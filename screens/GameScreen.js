import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import Title from "../components/game/ui/Title";
import NumbContainer from "../components/game/NumbContainer";
import PrimaryButtons from "../components/game/ui/PrimaryButtons";
import Card from "../components/game/ui/Card";
import Colors from "../constants/colors";
import InstructionText from "../components/game/ui/InstructionText";
import {Ionicons} from "@expo/vector-icons";
import { FlatList } from "react-native";
import GuessLogItem from "../components/game/GuessLogItem";

const generateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  },[])

  const nextGuessHandler = (direction) => {

   
    if ((currentGuess < userNumber && direction === "lower") || (currentGuess > userNumber && direction === "greater")){
       Alert.alert("Dont lie! You know that this is wrong")
      return 
    }

     if (direction === "lower") {
       maxBoundary = currentGuess;
     } else {
       minBoundary = currentGuess + 1;
     }
   const newRndNumber = generateRandomBetween(minBoundary,maxBoundary, currentGuess)
   setCurrentGuess(newRndNumber)
   setGuessRounds((prev) => [...prev, newRndNumber]);
  }
  
  const guessRoundsListLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <Title>Computer Guess</Title>

      <NumbContainer>{currentGuess}</NumbContainer>

      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or Lower
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButtons
              confirmInputHandler={() => nextGuessHandler("lower")}
            >
              <Ionicons name="md-remove" size={24} color="#ffe7ba" />
            </PrimaryButtons>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButtons
              confirmInputHandler={() => nextGuessHandler("greater")}
            >
              <Ionicons name="md-add" size={24} color="#ffe7ba" />
            </PrimaryButtons>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        {/*
          guessRounds.map((guessRound) => <Text key={guessRound}>{guessRound}</Text>)
         */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundsListLength - itemData.index} guess={itemData.item}/>}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  instructionText: {
    marginBottom: 12
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16
  }
});
