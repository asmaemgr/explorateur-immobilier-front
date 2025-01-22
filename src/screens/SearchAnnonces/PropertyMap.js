import React from "react";
import { View, StyleSheet, Image } from "react-native";
import MapboxGL from "@rnmapbox/maps";

// Import custom marker images
// import maisonMarker from "../../../assets/maison-marker.png";
// import villaMarker from "../../../assets/villa-marker.png";
import apartmentMarker from "../../../assets/apartment-marker.png";
import { token } from "../../../token";


// Set Mapbox access token
MapboxGL.setAccessToken(token.MAPBOX_API_KEY);

const PropertyMap = ({ route }) => {
  const { longitude, latitude, type, description } = route.params;

  // Function to get the custom marker icon based on property type
  const getMarkerIcon = (type) => {
    switch (type) {
      // case "Villa":
      //   return villaMarker;
      case "Appartement":
        return apartmentMarker;
      // case "Maison":
      //   return maisonMarker;
      default:
        return apartmentMarker; // Default icon
    }
  };

  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera
          centerCoordinate={[longitude, latitude]}
          zoomLevel={14}
        />
        <MapboxGL.PointAnnotation
          id="marker"
          coordinate={[longitude, latitude]}
          title={type}
          snippet={description}
        >
          <View style={styles.markerWrapper}>
            <View style={styles.markerShape}>
              <View style={styles.markerInner}>
                <Image 
                  source={getMarkerIcon(type)} 
                  style={styles.icon} 
                  resizeMode="contain" 
                />
              </View>
              <View style={styles.markerTail} />
            </View>
          </View>
        </MapboxGL.PointAnnotation>
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  map: {
    flex: 1,
  },
  markerWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  markerShape: {
    alignItems: "center",
    justifyContent: "center",
  },
  markerInner: {
    width: 40,
    height: 40,
    backgroundColor: "#4CAF50", // Green color
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  markerTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 15,
    borderStyle: "solid",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#4CAF50", // Same green color as markerInner
    position: "absolute",
    bottom: 0,
    transform: [{ rotate: "180deg" }],
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "#FFFFFF", // White icon
  },
});

export default PropertyMap;
