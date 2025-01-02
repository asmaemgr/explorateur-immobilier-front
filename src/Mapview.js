import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from 'react-redux';

const Mapview = ({ navigation }) => {
  const isLogged = useSelector(state => state.isLogged);

  if(!isLogged) {
      navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      {isLogged ? (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.697904, // Latitude de la position initiale de la carte
          longitude: -7.4019606, // Longitude de la position initiale de la carte
          latitudeDelta: 0.0922, // Plage de variation de la latitude (zoom sur la carte)
          longitudeDelta: 0.0421, // Plage de variation de la longitude (zoom sur la carte)
        }}
      >
        {/* Marqueur 1 */}
        <Marker
          coordinate={{ latitude: 33.697904, longitude: -7.4019606 }} // Position du marqueur
          title="Marqueur 1" // Titre du marqueur
          description="C'est un marqueur placé sur la carte."
        />
        {/* Marqueur 2 */}
        <Marker
          coordinate={{ latitude: 33.703904, longitude: -7.4059606 }}
          title="Marqueur 2"
          description="Voici un autre marqueur sur la carte."
        />
      </MapView>
      ) : (
        <Text>Veuillez vous connecter pour voir la carte</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Permet à la vue de prendre toute la hauteur disponible
    width: "100%",
    height: "100%",
  },
  map: {
    flex: 1, // Permet à la carte de remplir toute la vue
  },
});
export default Mapview;
