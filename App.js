import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import StartGame from "./screens/StartGame";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOver from "./screens/GameOver";
import { useFonts } from 'expo-font'
import AppLoading from "expo-app-loading";

export default function App() {
  const [userNumber, setUserNumber] = useState(null)
  const [gameIsOver, setGameIsOver] = useState(true)
  const [guessRounds, setGuessRounds] = useState(0)

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })

  if(!fontsLoaded){
    return <AppLoading />
  }

  const pickedNumberHandler = (pickedNumberHandler) => {
    setUserNumber(pickedNumberHandler);
    setGameIsOver(false)
  }

  const gameOverHandler = (numberOfRounds) => {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  };

  const onStartNewGame = () => {
    setUserNumber(null)
    setGuessRounds(0);
  }

  let screen = <StartGame onPickedNUmber={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOver
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onStartNewGame={onStartNewGame}
      />
    );
  }

  


    return (
      <LinearGradient
        colors={[Colors.primary800, Colors.accent500, Colors.accentBlue]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>
            {screen}
          </SafeAreaView>
          
        </ImageBackground>
      </LinearGradient>
    );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.20
  }
});
