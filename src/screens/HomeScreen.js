import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

export default function HomeScreen({ navigation }) {

  // Définition d'une valeur partagée pour la position de la boîte
  const translateY = useSharedValue(0);
  // Fonction qui démarre l'animation avec un effet de ressort
  const startSpringAnimation = () => {
    translateY.value = withSpring(10, {
      damping: 2, // Contrôle l'amortissement du ressort
      stiffness: 100, // Contrôle la raideur du ressort
    });
  };
  // Création d'un style animé basé sur la valeur partagée
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }], // Applique la translation animée à la boîte
    };
  });

  useEffect(() => {
    startSpringAnimation();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.pageTitle, animatedStyle]}>
        Explo Immobilier
      </Animated.Text>
      <View style={styles.centerContainer}>
        <Text style={styles.title}>Bienvenue sur la Page d'Accueil!</Text>
        <Text style={styles.subtitle}>Vous êtes connecté.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#4CAF50",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
    marginBottom: 40,
  },
  buttonContainer: {
    width: "100%",
    padding: 10,
  },
  logoutButton: {
    backgroundColor: "#f44336",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
