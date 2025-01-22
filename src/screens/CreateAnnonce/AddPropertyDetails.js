import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TextInputC from "../../components/TextInputC";
import { useDispatch, useSelector } from "react-redux";
import { addAnnonce } from "../../redux/Actions/annonceActions";
import ButtonC from "../../components/ButtonC";

export default function AddPropertyDetailsScreen({ navigation, route }) {
  const {
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
  } = route.params;
  const [etage, setEtage] = useState("");
  const [avecAscenceur, setAscenceur] = useState(false);
  const [nbEtages, setNbEtages] = useState("");
  const [avecGarage, setAvecGarage] = useState(false);
  const [avecSousSol, setAvecSousSol] = useState(false);
  const [surfaceJardin, setSurfaceJardin] = useState("");
  const [avecPiscine, setAvecPiscine] = useState(false);

  const dispatch = useDispatch();
  const {isLoggedIn, userId} = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate("Login");
    }
  }, [isLoggedIn, navigation]);

  const handleSubmit = async () => {
    const formData = new FormData();
  
    // Append description
    formData.append("description", description);
  
    // Append images
    images.forEach((image, index) => {
      const imageName = `image_${index}.jpg`;
      formData.append("images", {
        uri: image.uri,
        name: imageName,
        type: "image/jpeg",
      });
    });

    formData.append("user", userId);
  
    // Create property details
    const propertyDetails = {
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
    };
  
    if (type === "Appartement") {
      propertyDetails.etage = etage;
      propertyDetails.avecAscenceur = avecAscenceur;
    } else if (type === "Maison") {
      propertyDetails.nbEtages = nbEtages;
      propertyDetails.avecGarage = avecGarage;
      propertyDetails.avecSousSol = avecSousSol;
    } else if (type === "Villa") {
      propertyDetails.nbEtages = nbEtages;
      propertyDetails.surfaceJardin = surfaceJardin;
      propertyDetails.avecGarage = avecGarage;
      propertyDetails.avecPiscine = avecPiscine;
    }
  
    Object.keys(propertyDetails).forEach((key) => {
      formData.append(`property[${key}]`, propertyDetails[key]);
    });

    console.log("Form Data:", formData);
  
    try {
      const response = await dispatch(addAnnonce(formData));
      if (response.success) {
        navigation.navigate("Home");
      } else {
        console.error("Failed to add annonce:", response.error);
      }
    } catch (error) {
      console.error("Unexpected error during handleSubmit:", error);
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Création d'une Annonce</Text>
      <Text style={styles.subtitle}>Détails de la Propriété</Text>

      {type === "Appartement" && (
        <>
          <View>
            <TextInputC
              placeholder="Etage"
              setValue={setEtage}
              value={etage}
              iconName="layers-outline"
              style={styles.inputField}
              keyboardType="numeric"
              onBlur={() => {
                if (!Number.isInteger(Number(etage))) {
                  setEtage("");
                }
              }}
            />
            {!Number.isInteger(Number(etage)) && etage !== "" && (
              <Text style={styles.errorText}>
                Veuillez entrer un nombre entier pour l'étage.
              </Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.checkboxWrapper}>
              <Text>Avec Ascenseur</Text>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setAscenceur(!avecAscenceur)}
              >
                <Ionicons
                  name={avecAscenceur ? "checkbox" : "square-outline"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}

      {type === "Maison" && (
        <>
          <View>
            <TextInputC
              placeholder="Nombre d'Étages"
              style={styles.inputField}
              setValue={setNbEtages}
              value={nbEtages}
              iconName="layers-outline"
              keyboardType="numeric"
              onBlur={() => {
                if (!Number.isInteger(Number(nbEtages))) {
                  setNbEtages("");
                }
              }}
            />
            {!Number.isInteger(Number(nbEtages)) && nbEtages !== "" && (
              <Text style={styles.errorText}>
                Veuillez entrer un nombre entier pour le nombre d'étages.
              </Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.checkboxWrapper}>
              <Text>Avec Garage</Text>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setAvecGarage(!avecGarage)}
              >
                <Ionicons
                  name={avecGarage ? "checkbox" : "square-outline"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.checkboxWrapper}>
              <Text>Avec Sous-Sol</Text>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setAvecSousSol(!avecSousSol)}
              >
                <Ionicons
                  name={avecSousSol ? "checkbox" : "square-outline"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}

      {type === "Villa" && (
        <>
          <View>
            <TextInputC
              placeholder="Nombre d'Étages"
              style={styles.inputField}
              setValue={setNbEtages}
              value={nbEtages}
              iconName="layers-outline"
              keyboardType="numeric"
              onBlur={() => {
                if (!Number.isInteger(Number(nbEtages))) {
                  setNbEtages("");
                }
              }}
            />
            {!Number.isInteger(Number(nbEtages)) && nbEtages !== "" && (
              <Text style={styles.errorText}>
                Veuillez entrer un nombre entier pour le nombre d'étages.
              </Text>
            )}
          </View>
          <TextInputC
            placeholder="Surface du Jardin"
            style={styles.inputField}
            value={surfaceJardin}
            setValue={setSurfaceJardin}
            keyboardType="numeric"
            iconName="leaf-outline"
            unit="m²"
          />
          <View style={styles.inputContainer}>
            <View style={styles.checkboxWrapper}>
              <Text>Avec Garage</Text>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setAvecGarage(!avecGarage)}
              >
                <Ionicons
                  name={avecGarage ? "checkbox" : "square-outline"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.checkboxWrapper}>
              <Text>Avec Piscine</Text>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setAvecPiscine(!avecPiscine)}
              >
                <Ionicons
                  name={avecPiscine ? "checkbox" : "square-outline"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}

      <ButtonC title="Créer l'Annonce" color="#4CAF50" onPress={handleSubmit} />
    </ScrollView>
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  checkboxContainer: {
    marginLeft: "auto",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginRight: 10,
  },
  icon: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
});