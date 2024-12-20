import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AddAnnonceScreen({ navigation }) {
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/AddAnnonce.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Créer votre Annonce</Text>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="document-text-outline"
            size={24}
            color="gray"
            style={styles.icon}
          />
          <TextInput
            placeholder="Description"
            onChangeText={setDescription}
            value={description}
            style={styles.inputField}
          />
        </View>
      </View>

        <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
                <Ionicons
                    name="image-outline"
                    size={24}
                    color="gray"
                    style={styles.icon}
                />
                <TextInput
                    placeholder="Images"
                    onChangeText={setImages}
                    value={images}
                    style={styles.inputField}
                />
            </View>
        </View>


      <View style={styles.buttonContainer}>
        <Button
          title="Suivant"
          color="#4CAF50"
          onPress={ () => navigation.navigate('AddProperty', { description, images }) }
        />
      </View>
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
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
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
  inputContainer: {
    marginBottom: 15,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  icon: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#4CAF50",
  },
  buttonContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  registerText: {
    color: "gray",
  },
  registerLink: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
});
