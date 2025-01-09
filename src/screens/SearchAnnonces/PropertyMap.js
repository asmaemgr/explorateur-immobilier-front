import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Mapview = () => {

  return (
    <View style={styles.container}>
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
      </MapView>
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
