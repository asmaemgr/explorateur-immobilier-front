import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import ImageC from "../../components/ImageC";
import TextInputC from "../../components/TextInputC";
import ButtonC from "../../components/ButtonC";
import * as ImagePicker from "expo-image-picker";

export default function AddAnnonceScreen({ navigation }) {
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const handleImagePicker = async () => {
    // Request permission to access media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    // Launch image picker for multiple selection
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Photo,
      selectionLimit: 5, 
      allowsMultipleSelection: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImages(result.assets);
    }
  };

  const removeImage = (uri) => {
    setImages((prevImages) => prevImages.filter((image) => image.uri !== uri));
  };

  const handleNext = () => {
    if (!description) {
      Alert.alert("Erreur", "Veuillez remplir la description.");
      return;
    }
    if (images.length === 0) {
      Alert.alert("Erreur", "Veuillez choisir des images.");
      return;
    }
    navigation.navigate("AddProperty", { description, images });
  };

  return (
    <View style={styles.container}>
      <ImageC
        source={require("../../../assets/AddAnnonce.png")}
        resizeMode="contain"
      />

      <Text style={styles.title}>Créer votre Annonce</Text>
      <Text style={styles.subtitle}>
        Ajouter une description et des images pour votre propriété.
      </Text>

      <TextInputC
        placeholder="Description"
        setValue={setDescription}
        value={description}
        iconName="document-text-outline"
        style={styles.inputField}
      />

      <TouchableOpacity style={styles.imagePicker} onPress={handleImagePicker}>
        <Text style={styles.imagePickerText}>
          {images.length > 0 ? "Images sélectionnées" : "Ajouter des images"}
        </Text>
      </TouchableOpacity>

      {/* Display selected images */}
      {images.length > 0 && (
        <ScrollView horizontal contentContainerStyle={styles.imagePreviewContainer}>
          {images.map((image, index) => (
            <View key={index} style={styles.imagePreviewWrapper}>
              <Image source={{ uri: image.uri }} style={styles.imagePreview} />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => removeImage(image.uri)}
              >
                <Text style={styles.removeImageButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      <ButtonC
        title="Suivant"
        color="#4CAF50"
        onPress={handleNext}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  imagePickerText: {
    fontSize: 16,
    color: "gray",
  },
  imagePreviewContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  imagePreviewWrapper: {
    position: "relative",
    marginRight: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  removeImageButton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    borderRadius: 10,
    padding: 5,
  },
  removeImageButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
