import { Text, View, TextInput, StyleSheet, Alert } from "react-native";
import React, { Component, useState } from "react";
import PrimaryButtons from "../components/game/ui/PrimaryButtons";
import Colors from "../constants/colors";
import Title from "../components/game/ui/Title";
import Card from "../components/game/ui/Card";
import InstructionText from "../components/game/ui/InstructionText";

const StartGame = ({ onPickedNUmber }) => {
  const [enteredNumber, setEnteredNumber] = useState("");

  const confirmInputHandler = () => {
    const chooseNumber = parseInt(enteredNumber);

    if (isNaN(chooseNumber) || chooseNumber <= 0 || chooseNumber > 99) {
      Alert.alert("Invalid Number", "Number should be between 1 - 99", [
        { text: "Okay", style: "destructive", onPress: resetInput },
      ]);
      return;
    }
    onPickedNUmber(chooseNumber);
  };

  const resetInput = () => {
    setEnteredNumber("");
  };

  return (
    <View style={styles.rootContainer}>
      <Title>Guess My Number</Title>
        <Card>
          <InstructionText>Enter a number</InstructionText>
          <TextInput
            style={styles.numberInput}
            maxLength={2}
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCorrect={false}
            value={enteredNumber}
            onChangeText={(text) => setEnteredNumber(text)}
          />
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <PrimaryButtons onPress={resetInput}>Reset</PrimaryButtons>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButtons confirmInputHandler={confirmInputHandler}>
                Confirm
              </PrimaryButtons>
            </View>
          </View>
        </Card>
    </View>
  );
};

export default StartGame;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
