import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

export default function AddPropertyScreen({ navigation, route }) {
  const { description, images } = route.params;
  const [adresse, setAdresse] = useState("");
  const [ville, setVille] = useState("");
  const [superficie, setSuperficie] = useState("");
  const [prix, setPrix] = useState("");
  const [type, setType] = useState("Appartement");
  const [status, setStatus] = useState("A vendre");
  const [nbChambres, setNbChambres] = useState("");
  const [nbSallesDeBain, setNbSallesDeBain] = useState("");
  const [mesureSon, setMesureSon] = useState("");
  const [mesureCO2, setMesureCO2] = useState("");

  const handleNext = async () => {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Création d'une Annonce</Text>
      <Text style={styles.subtitle}>Détails de la Propriété</Text>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="location-outline"
            size={24}
            color="gray"
            style={styles.icon}
          />
          <TextInput
            placeholder="Adresse"
            onChangeText={setAdresse}
            value={adresse}
            style={styles.inputField}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="business-outline"
            size={24}
            color="gray"
            style={styles.icon}
          />
          <TextInput
            placeholder="Ville"
            onChangeText={setVille}
            value={ville}
            style={styles.inputField}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="resize-outline"
            size={24}
            color="gray"
            style={styles.icon}
          />
          <TextInput
            placeholder="Superficie"
            onChangeText={setSuperficie}
            value={superficie}
            style={styles.inputField}
            keyboardType="numeric"
          />
          <Text style={styles.unitText}>m²</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="cash-outline"
            size={24}
            color="gray"
            style={styles.icon}
          />
          <TextInput
            placeholder="Prix"
            onChangeText={setPrix}
            value={prix}
            style={styles.inputField}
            keyboardType="numeric"
          />
          <Text style={styles.unitText}>DHs</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="home-outline"
            size={24}
            color="gray"
            style={styles.icon}
          />

          <Picker
            selectedValue={type}
            style={styles.inputField}
            onValueChange={(itemValue) => setType(itemValue)}
          >
            <Picker.Item label="Appartement" value="Appartement" />
            <Picker.Item label="Maison" value="Maison" />
            <Picker.Item label="Villa" value="Villa" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="pricetag-outline"
            size={24}
            color="gray"
            style={styles.icon}
          />

          <Picker
            selectedValue={status}
            style={styles.inputField}
            onValueChange={(itemValue) => setStatus(itemValue)}
          >
            <Picker.Item label="A vendre" value="A vendre" />
            <Picker.Item label="A louer" value="A louer" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="bed-outline"
            size={24}
            color="gray"
            style={styles.icon}
          />
          <TextInput
            placeholder="Nombre de Chambres"
            onChangeText={setNbChambres}
            value={nbChambres}
            style={styles.inputField}
            keyboardType="numeric"
            onBlur={() => {
              if (!Number.isInteger(Number(nbChambres))) {
                setNbChambres("");
              }
            }}
          />
        </View>
        {!Number.isInteger(Number(nbChambres)) && nbChambres !== "" && (
          <Text style={styles.errorText}>
            Veuillez entrer un nombre entier pour le nombre de chambres.
          </Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="water-outline"
            size={24}
            color="gray"
            style={styles.icon}
          />
          <TextInput
            placeholder="Nombre de Salles de Bain"
            onChangeText={setNbSallesDeBain}
            value={nbSallesDeBain}
            style={styles.inputField}
            keyboardType="numeric"
            onBlur={() => {
              if (!Number.isInteger(Number(setNbSallesDeBain))) {
                setNbSallesDeBain("");
              }
            }}
          />
        </View>
        {!Number.isInteger(Number(nbSallesDeBain)) && setNbSallesDeBain !== "" && (
          <Text style={styles.errorText}>
            Veuillez entrer un nombre entier pour le nombre de salles de bain.
          </Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="volume-high-outline"
            size={24}
            color="gray"
            style={styles.icon}
          />
          <TextInput
            placeholder="Mesure Son"
            onChangeText={setMesureSon}
            value={mesureSon}
            style={styles.inputField}
            keyboardType="numeric"
          />
          <Text style={styles.unitText}>dB</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="cloud-outline"
            size={24}
            color="gray"
            style={styles.icon}
          />
          <TextInput
            placeholder="Mesure CO2"
            onChangeText={setMesureCO2}
            value={mesureCO2}
            style={styles.inputField}
            keyboardType="numeric"
          />
          <Text style={styles.unitText}>ppm</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Suivant"
          color="#4CAF50"
          onPress={() => navigation.navigate("AddPropertyDetails", {
            description,
            images,
          adresse,
          ville,
          superficie,
          prix,
          type,
          status,
          nbChambres,
          nbSallesDeBain,
          mesureSon,
          mesureCO2
        })}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  unitText: {
    fontSize: 16,
    color: "gray",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
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
