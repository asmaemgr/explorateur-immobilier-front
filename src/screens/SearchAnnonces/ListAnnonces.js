import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const ListAnnonces = ({ navigation }) => {
  const [annonces, setAnnonces] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({ type: "", prix: "", superficie: "" });

  useEffect(() => {
    const dummyData = [
      {
        description: "Spacious villa in the city center",
        images: [
          require("../../../assets/villa1.jpg"),
          require("../../../assets/villa2.jpg"),
        ],
        property: {
          longitude: 33.703904,
          latitude: -7.4059606,
          adresse: "123 Main Street",
          ville: "Paris",
          superficie: 250,
          prix: 500000,
          type: "Villa",
          status: "A vendre",
          nbChambres: 5,
          nbSallesDeBain: 3,
          mesureSon: 4,
          mesureCO2: 5,
          nbEtages: 2,
          surfaceJardin: 100,
          avecPiscine: true,
          avecGarage: true,
        },
      },
      {
        description: "Cozy apartment near the park",
        images: [
          require("../../../assets/appart1.jpg"),
          require("../../../assets/appart2.jpg"),
          require("../../../assets/appart3.jpg"),
        ],
        property: {
          longitude: 33.697904,
          latitude: -7.4019606,
          adresse: "456 Elm Street",
          ville: "Lyon",
          superficie: 80,
          prix: 300000,
          type: "Apartment",
          status: "A louer",
          nbChambres: 2,
          nbSallesDeBain: 1,
          mesureSon: 4,
          mesureCO2: 5,
          etage: 3,
          avecAscenseur: true,
        },
      },
    ];
    setAnnonces(dummyData);
  }, []);

  const handleSearch = () => {
    const filteredAnnonces = annonces.filter((annonce) => {
      const matchesSearch = annonce.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesType = filter.type
        ? annonce.property.type === filter.type
        : true;

      const matchesPrix = filter.prix
        ? annonce.property.prix <= parseInt(filter.prix)
        : true;

      const matchesSuperficie = filter.superficie
        ? annonce.property.superficie >= parseInt(filter.superficie)
        : true;

      return matchesSearch && matchesType && matchesPrix && matchesSuperficie;
    });

    setAnnonces(filteredAnnonces);
  };

  return (
    <View style={styles.container}>
      {/* Search and Filter Section */}
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />

        <View style={styles.filterContainer}>
          <Picker
            selectedValue={filter.type}
            style={styles.filterPicker}
            onValueChange={(value) => setFilter({ ...filter, type: value })}
            mode="dropdown"
          >
            {filter.type === "" ? <Picker.Item label="Type" value="" /> : null}
            <Picker.Item label="Villa" value="Villa" />
            <Picker.Item label="Apartment" value="Apartment" />
            <Picker.Item label="Maison" value="Maison" />
          </Picker>

          <TextInput
            style={styles.filterInput}
            placeholder="Max Prix"
            keyboardType="numeric"
            value={filter.prix}
            onChangeText={(value) => setFilter({ ...filter, prix: value })}
          />

          <TextInput
            style={styles.filterInput}
            placeholder="Min Superficie"
            keyboardType="numeric"
            value={filter.superficie}
            onChangeText={(value) =>
              setFilter({ ...filter, superficie: value })
            }
          />
        </View>

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Rechercher</Text>
        </TouchableOpacity>
      </View>

      {/* Annonces List Section */}
      <ScrollView style={styles.annoncesList}>
        {annonces && annonces.length > 0 ? (
          annonces.map((annonce, index) => (
            <View key={index} style={styles.annonceCard}>
              <Image source={annonce.images[0]} style={styles.annonceImage} />
              <View style={styles.annonceDetails}>
                <Text style={styles.description}>{annonce.description}</Text>
                <Text>
                  <Text style={styles.label}>Adresse:</Text>{" "}
                  {annonce.property.adresse}
                </Text>
                <Text>
                  <Text style={styles.label}>Ville:</Text>{" "}
                  {annonce.property.ville}
                </Text>
                <Text>
                  <Text style={styles.label}>Type:</Text>{" "}
                  {annonce.property.type}
                </Text>
                <Text>
                  <Text style={styles.label}>Prix:</Text>{" "}
                  {annonce.property.prix} MAD
                </Text>
                <Text>
                  <Text style={styles.label}>Superficie:</Text>{" "}
                  {annonce.property.superficie} m²
                </Text>
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() =>
                    navigation.navigate("DetailsAnnonce", { annonce })
                  }
                >
                  <Text style={styles.detailsButtonText}>Voir les détails</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>Aucune annonce disponible</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ListAnnonces;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  searchSection: {
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#ffffff",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  filterPicker: {
    flex: 1,
    marginRight: 10,
    height: 40,
    backgroundColor: "#ffffff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
  },
  filterInput: {
    flex: 1,
    marginLeft: 10,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
  },
  searchButton: {
    height: 40,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  searchButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  annoncesList: {
    marginTop: 10,
  },
  annonceCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  annonceImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  annonceDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  description: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
  detailsButton: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    alignItems: "center",
  },
  detailsButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  noDataText: {
    textAlign: "center",
    color: "#777",
    fontSize: 16,
  },
});
