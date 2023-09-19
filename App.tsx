import React from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import ApiRickAndMortyComponent from "./ui/components/ApiRickAndMortyComponent";
import { StatusBar } from "expo-status-bar";
import PatternBackground from "./ui/components/PatternBackground";

export default function App() {
  const isWeb = Platform.OS === "web";
  return (
    <View style={styles.container}>
      <StatusBar translucent={false} />
      {false ? (
        <ApiRickAndMortyComponent />
      ) : (
        <PatternBackground>
          <Text style={styles.title}>Rick and Morty</Text>
          <ApiRickAndMortyComponent />
        </PatternBackground>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    backgroundColor: "black",
    color: "white",
    padding: 16,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    width: "100%",
  },
});
