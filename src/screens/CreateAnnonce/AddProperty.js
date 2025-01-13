import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import TextInputC from "../../components/TextInputC";
import ButtonC from "../../components/ButtonC";

export default function AddPropertyScreen({ navigation, route }) {
  const { description, images } = route.params;
  const [adresse, setAdresse] = useState("");
  const [ville, setVille] = useState("");
  const [superficie, setSuperficie] = useState("");
  const [prix, setPrix] = useState("");
  const [type, setType] = useState("Villa");
  const [status, setStatus] = useState("A vendre");
  const [nbChambres, setNbChambres] = useState("");
  const [nbSallesDeBain, setNbSallesDeBain] = useState("");
  const [mesureSon, setMesureSon] = useState("");
  const [mesureCO2, setMesureCO2] = useState("");

  const handleNext = async () => {
    if (
      !adresse ||
      !ville ||
      !superficie ||
      !prix ||
      !nbChambres ||
      !nbSallesDeBain ||
      !mesureSon ||
      !mesureCO2
    ) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    navigation.navigate("AddPropertyDetails", {
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
      mesureCO2,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Création d'une Annonce</Text>
      <Text style={styles.subtitle}>Détails de la Propriété</Text>

      <TextInputC
        placeholder="Adresse"
        setValue={setAdresse}
        value={adresse}
        iconName="location-outline"
        style={styles.inputField}
      />

      <TextInputC
        placeholder="Ville"
        setValue={setVille}
        value={ville}
        iconName="business-outline"
        style={styles.inputField}
      />

      <TextInputC
        placeholder="Superficie"
        setValue={setSuperficie}
        value={superficie}
        iconName="resize-outline"
        style={styles.inputField}
        keyboardType="numeric"
        unit="m²"
      />

      <TextInputC
        placeholder="Prix"
        setValue={setPrix}
        value={prix}
        iconName="cash-outline"
        style={styles.inputField}
        keyboardType="numeric"
        unit="DHs"
      />

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
            <Picker.Item label="Villa" value="Villa" />
            <Picker.Item label="Appartement" value="Appartement" />
            <Picker.Item label="Maison" value="Maison" />
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

      <View>
        <TextInputC
          placeholder="Nombre de Chambres"
          setValue={setNbChambres}
          value={nbChambres}
          iconName="bed-outline"
          style={styles.inputField}
          keyboardType="numeric"
          onBlur={() => {
            if (!Number.isInteger(Number(nbChambres))) {
              setNbChambres("");
            }
          }}
        />
        {!Number.isInteger(Number(nbChambres)) && setNbChambres !== "" && (
          <Text style={styles.errorText}>
            Veuillez entrer un nombre entier pour le nombre de chambres.
          </Text>
        )}
      </View>

      <View>
        <TextInputC
          placeholder="Nombre de Salles de Bain"
          setValue={setNbSallesDeBain}
          value={nbSallesDeBain}
          iconName="water-outline"
          style={styles.inputField}
          keyboardType="numeric"
          onBlur={() => {
            if (!Number.isInteger(Number(nbSallesDeBain))) {
              setNbSallesDeBain("");
            }
          }}
        />
        {!Number.isInteger(Number(nbSallesDeBain)) &&
          setNbSallesDeBain !== "" && (
            <Text style={styles.errorText}>
              Veuillez entrer un nombre entier pour le nombre de salles de bain.
            </Text>
          )}
      </View>

      <TextInputC
        placeholder="Mesure Son"
        setValue={setMesureSon}
        value={mesureSon}
        iconName="volume-high-outline"
        style={styles.inputField}
        keyboardType="numeric"
        unit="dB"
      />

      <TextInputC
        placeholder="Mesure CO2"
        setValue={setMesureCO2}
        value={mesureCO2}
        iconName="cloud-outline"
        style={styles.inputField}
        keyboardType="numeric"
        unit="ppm"
      />

      <ButtonC title="Suivant" color="#4CAF50" onPress={handleNext} />
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
  inputField: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -10,
  },
});
