import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import axios from "axios";
import CardCharacterComponent from "./CardCharacterComponent";

const ApiRickAndMortyComponent: React.FC = () => {
  const isWeb = Platform.OS === "web";

  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    let uri = `https://rickandmortyapi.com/api/character?page=${page}`;
    try {
      const response = await axios.get(uri);
      const newCharacters = response.data.results;

      setCharacters((prevCharacters) => [...prevCharacters, ...newCharacters]);
      setLoading(false);
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching uri:", uri);
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleCharacterPress = (characterId: number) => {
    // Realiza alguna acción al hacer clic en un personaje (por ejemplo, mostrar detalles).
    console.log(`Personaje con ID ${characterId} pulsado.`);
  };

  const renderFooter = () => {
    return loading ? <ActivityIndicator size="large" color="black" /> : null;
  };

  return (
    <>
      {isWeb ? (
        <FlatList
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
            // backgroundColor: 'red',
            // padding: 8
          }}
          data={characters}
          renderItem={({ item }) => (
            <CardCharacterComponent
              character={item}
              onPress={handleCharacterPress}
            />
          )}
          keyExtractor={(item: Character) => item.id.toString()}
          contentContainerStyle={styles.contentContainer}
          onEndReached={loadCharacters}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
      ) : (
        <FlatList // Android
          style={{
            height: "100%",
            width: "100%",
            // backgroundColor: 'red',
            // padding: 8
          }}
          data={characters}
          renderItem={({ item }) => (
            <CardCharacterComponent
              character={item}
              onPress={handleCharacterPress}
            />
          )}
          keyExtractor={(item: Character) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.contentContainerAndroid}
          onEndReached={loadCharacters}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "flex-start",
    // backgroundColor: 'blue',
    justifyContent: "center",
  },
  contentContainerAndroid: {
    width: "100%",
    // backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ApiRickAndMortyComponent;
