import React from "react";
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { BlurView } from "expo-blur";
import GestureFlipView from "react-native-gesture-flip-card";

interface CardCharacterProps {
  character: Character;
  onPress: (id: number) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Alive":
      return "green";
    case "Dead":
      return "red";
    default:
      return "#808080";
  }
};

const WebComponent: React.FC<CardCharacterProps> = ({ character, onPress }) => {
  const statusColor = getStatusColor(character.status);
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          flex: 1,
          // backgroundColor: 'gray'
        },
      ]}
      activeOpacity={0.9}
      onPress={() => onPress(character.id)}
    >
      <BlurView intensity={80} style={styles.blurContainer}>
        <Image source={{ uri: character.image }} style={styles.image} />
        <Text style={[styles.statusText, { color: statusColor }]}>
          {character.status}
        </Text>
        <Text style={styles.name}>{character.name}</Text>
        <Text style={styles.info}>
          {`${character.species}, ${character.gender}`}
        </Text>
      </BlurView>
    </TouchableOpacity>
  );
};

const AndroidComponent: React.FC<CardCharacterProps> = ({
  character,
  onPress,
}) => {
  const statusColor = getStatusColor(character.status);
  const showType = character.type.length > 0;

  const renderFront = () => (
    <View style={[styles.container, styles.containerAndroid]}>
      <Text style={styles.numberCard}>
        {`#${String(character.id).padStart(3, "0")}`}
      </Text>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={[styles.statusText, { color: statusColor }]}>
        {character.status}
      </Text>
      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.info}>
        {`${character.species}, ${character.gender}`}
      </Text>
    </View>
  );

  const renderBack = () => (
    <View style={[styles.container, styles.containerAndroid]}>
      {showType ? (
        <Text style={styles.info}>
          <Text style={styles.subtitle}>Type: </Text>
          {character.type}
        </Text>
      ) : null}
      {showType ? <View style={styles.divider} /> : null}
      <Text style={styles.info}>
        <Text style={styles.subtitle}>Location: </Text>
        {character.location.name}
      </Text>
      <View style={styles.divider} />
      <Text style={styles.info}>
        <Text style={styles.subtitle}>Origin: </Text>
        {character.origin.name}
      </Text>
      <View style={styles.divider} />
      <Text style={styles.info}>
        <Text style={styles.subtitle}>Espisodes: </Text>
        {character.episode.length}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <GestureFlipView width={150} height={200}>
        {renderFront()}
        {renderBack()}
      </GestureFlipView>
    </View>
  );
};

const CardCharacterComponent: React.FC<CardCharacterProps> = ({
  character,
  onPress,
}) => {
  const isWeb = Platform.OS === "web";
  return (
    <>
      {isWeb ? (
        <WebComponent character={character} onPress={onPress} />
      ) : (
        <AndroidComponent character={character} onPress={onPress} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    margin: 8,
    alignSelf: "flex-start",
  },
  numberCard: {
    position: "absolute",
    top: 0,
    backgroundColor: "black",
    color: "white",
    padding: 4,
    borderRadius: 16,
    margin: 4,
    right: 0,
  },
  containerAndroid: {
    flex: 1,
    backgroundColor: "#ffffffC0",
    alignItems: "center",
    height: 250,
    justifyContent: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  blurContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#dddddd",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
  },
  statusText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  info: {
    textAlign: "center",
  },
  divider: {
    height: 2,
    backgroundColor: "#80808080",
    width: "100%",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default CardCharacterComponent;
