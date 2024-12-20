import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';

const ListAnnonces = () => {
    const [annonces, setAnnonces] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/annonces')
            .then(response => {
                setAnnonces(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }
    , []);
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>List of Annonces</Text>
            <ScrollView style={styles.annoncesList}>
                {annonces.map((annonce, index) => (
                    <View key={index} style={styles.annonceCard}>
                        <Text style={styles.description}>{annonce.adData.description}</Text>
                        <Text><Text style={styles.label}>Adresse:</Text> {annonce.propertyData.adresse}</Text>
                        <Text><Text style={styles.label}>Ville:</Text> {annonce.propertyData.ville}</Text>
                        <Text><Text style={styles.label}>Type:</Text> {annonce.propertyData.type}</Text>
                        <Text><Text style={styles.label}>Prix:</Text> {annonce.propertyData.prix} €</Text>
                        <Text><Text style={styles.label}>Status:</Text> {annonce.propertyData.status}</Text>
                        <Button title="Voir les détails" onPress={() => {}} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default ListAnnonces;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    annoncesList: {
        marginTop: 20,
    },
    annonceCard: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
    },
});

