import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import config from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { deleteAnnonceById } from "../../redux/Actions/annonceActions";

const CreatedDetailsAnnonce = ({ navigation, route }) => {
  const { annonce } = route.params;
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();

  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const renderPropertyDetails = (property) => {
    const { type } = property;

    switch (type) {
      case "Villa":
        return (
          <>
            <Text style={styles.detail}>
              <Text style={styles.label}>Nombre d'étages :</Text>{" "}
              {property.nbEtages}
            </Text>
            <Text style={styles.detail}>
              <Text style={styles.label}>Surface du jardin :</Text>{" "}
              {property.surfaceJardin} m²
            </Text>
            <Text style={styles.detail}>
              <Text style={styles.label}>Avec piscine :</Text>{" "}
              {property.avecPiscine ? "Oui" : "Non"}
            </Text>
            <Text style={styles.detail}>
              <Text style={styles.label}>Avec garage :</Text>{" "}
              {property.avecGarage ? "Oui" : "Non"}
            </Text>
          </>
        );
      case "Apartment":
        return (
          <>
            <Text style={styles.detail}>
              <Text style={styles.label}>Étage :</Text> {property.etage}
            </Text>
            <Text style={styles.detail}>
              <Text style={styles.label}>Avec ascenseur :</Text>{" "}
              {property.avecAscenseur ? "Oui" : "Non"}
            </Text>
          </>
        );
      case "Maison":
        return (
          <>
            <Text style={styles.detail}>
              <Text style={styles.label}>Nombre d'étages :</Text>{" "}
              {property.nbEtages}
            </Text>
            <Text style={styles.detail}>
              <Text style={styles.label}>Avec garage :</Text>{" "}
              {property.avecGarage ? "Oui" : "Non"}
            </Text>
            <Text style={styles.detail}>
              <Text style={styles.label}>Avec sous sol :</Text>{" "}
              {property.avecSousSol ? "Oui" : "Non"}
            </Text>
          </>
        );
      default:
        return null;
    }
  };

  const deleteAnnonce = () => {
    setModalDeleteVisible(false);
    dispatch(deleteAnnonceById(annonce.id));
    alert("Annonce supprimée avec succès !");
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.centered}>
        <Text style={styles.title}>Détails de l'annonce</Text>
        <View style={styles.annonceContainer}>
          <Text style={styles.title}>{annonce.description}</Text>
          <ScrollView horizontal style={styles.imageContainer}>
            {annonce.images.map((image, idx) => (
              <TouchableOpacity key={idx} onPress={() => openModal(image)}>
                <Image
                  source={{
                    uri: `${config.BASE_URL}/annonces/uploads/${image}`,
                  }}
                  style={styles.image}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={styles.detail}>
            <Text style={styles.label}>Adresse :</Text>{" "}
            {annonce.property.adresse}, {annonce.property.ville}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.label}>Superficie :</Text>{" "}
            {annonce.property.superficie} m²
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.label}>Prix :</Text> {annonce.property.prix} MAD
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.label}>Statut :</Text> {annonce.property.status}
          </Text>
          <View style={styles.separator} />
          <Text style={styles.detail}>
            <Text style={styles.label}>Nombre de chambres :</Text>{" "}
            {annonce.property.nbChambres}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.label}>Nombre de salles de bain :</Text>{" "}
            {annonce.property.nbSallesDeBain}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.label}>Mesure Sonore :</Text>{" "}
            {annonce.property.mesureSon} dB
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.label}>Mesure CO2 :</Text>{" "}
            {annonce.property.mesureCO2} ppm
          </Text>
          <View style={styles.separator} />
          {renderPropertyDetails(annonce.property)}
        </View>
      </ScrollView>

      {/* Floating Delete Button */}
      <TouchableOpacity
        style={[styles.deleteButton]}
        onPress={() => setModalDeleteVisible(true)}
      >
        <Icon name="delete" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Floating Edit Button */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("EditAnnonce", { annonce })}
      >
        <Icon name="edit" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Modal for Enlarged Image */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Image
                  source={{
                    uri: `${config.BASE_URL}/annonces/uploads/${selectedImage}`,
                  }}
                  style={styles.modalImage}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal for Delete Confirmation */}
      <Modal
        visible={modalDeleteVisible}
        animationType="fade"
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={() => setModalDeleteVisible(false)}>
          <View style={styles.modalDeleteOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalDeleteContent}>
                <Text style={styles.title}>Confirmer la suppression ?</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <TouchableOpacity
                    style={[
                      styles.annulDeleteButton,
                    ]}
                    onPress={() => setModalDeleteVisible(false)}
                  >
                    <Text style={{ color: "#FFFFFF" }}>Annuler</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.confirmDeleteButton}
                    onPress={deleteAnnonce}
                  >
                    <Text style={{ color: "#FFFFFF" }}>Confirmer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F0F4F8", // Soft, modern background color
  },
  centered: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  annonceContainer: {
    width: "95%",
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#FFFFFF", // White background for contrast
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6, // Subtle shadow for elevation
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#2C3E50", // Darker color for readability
  },
  separator: {
    marginVertical: 10,
    borderBottomColor: "#D1D1D1",
    borderBottomWidth: 1,
  },
  imageContainer: {
    flexDirection: "row",
    marginBottom: 15,
    marginHorizontal: -10,
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
    color: "#34495E", // Subtle, dark gray for details
  },
  label: {
    fontWeight: "bold",
    color: "#2C3E50",
  },
  editButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#4CAF50", // Vibrant green for visibility
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  messButton: {
    position: "absolute",
    bottom: 20,
    left: "48%",
    transform: [{ translateX: -50 }],
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black overlay
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    width: Dimensions.get("window").width - 40,
    height: Dimensions.get("window").height - 80,
  },
  modalImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  deleteButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "#F44336", // Vibrant red for visibility
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  modalDeleteOverlay: {
    flex: 1,
    // Semi-transparent black overlay
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalDeleteContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    width: Dimensions.get("window").width - 40,
  },
  annulDeleteButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "gray", // Changed to gray
  },
  confirmDeleteButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F44336", // Vibrant red for visibility

  },
});

export default CreatedDetailsAnnonce;
