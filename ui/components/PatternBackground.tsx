import React, { ReactNode } from "react";
import { StyleSheet, ImageBackground, Platform } from "react-native";

interface PatternBackgroundProps {
  children: ReactNode;
}

const PatternBackground: React.FC<PatternBackgroundProps> = ({ children }) => {
  const isWeb = Platform.OS === "web";

  return (
    <ImageBackground
      source={require(isWeb
        ? "../../assets/chevron-pattern.webp"
        : "../../assets/bg.jpg")}
      style={styles.container}
      resizeMode="repeat" // Esto indica que la imagen debe repetirse para llenar el fondo
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%", // Ocupa todo el ancho disponible
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PatternBackground;
