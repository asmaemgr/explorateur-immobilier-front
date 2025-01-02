import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { viewAnnonce } from '../../redux/Actions/annonceActions';

const ListAnnonces = ({ navigation }) => {
    // const [annonces, setAnnonces] = useState([]);
    const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch();
    const annonces = useSelector(state => state.annonces);

    // if(!isLogged) {
    //     navigation.navigate('Login');
    // }

    useEffect(() => {
        dispatch(viewAnnonce());
    }, [dispatch]);


    // useEffect(() => {
    //     axios.get('http://localhost:3000/annonces')
    //         .then(response => {
    //             setAnnonces(response.data);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }
    // , []);

    
    // useEffect(() => {
    //     const dummyData = [
    //         {
    //             adData: { description: 'Beautiful house with garden' },
    //             propertyData: {
    //                 adresse: '123 Main St',
    //                 ville: 'Paris',
    //                 type: 'House',
    //                 prix: 500000,
    //                 status: 'For Sale'
    //             }
    //         },
    //         {
    //             adData: { description: 'Modern apartment in city center' },
    //             propertyData: {
    //                 adresse: '456 Elm St',
    //                 ville: 'Lyon',
    //                 type: 'Apartment',
    //                 prix: 300000,
    //                 status: 'For Rent'
    //             }
    //         }
    //     ];
    //     setAnnonces(dummyData);
    // }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Annonces</Text>
            <ScrollView style={styles.annoncesList}>
                {annonces && annonces.length > 0 ? (
                    annonces.map((annonce, index) => (
                        <View key={index} style={styles.annonceCard}>
                            <Text style={styles.description}>{annonce.adData.description}</Text>
                            <Text><Text style={styles.label}>Adresse:</Text> {annonce.propertyData.adresse}</Text>
                            <Text><Text style={styles.label}>Ville:</Text> {annonce.propertyData.ville}</Text>
                            <Text><Text style={styles.label}>Type:</Text> {annonce.propertyData.type}</Text>
                            <Text><Text style={styles.label}>Prix:</Text> {annonce.propertyData.prix} €</Text>
                            <Text><Text style={styles.label}>Statut:</Text> {annonce.propertyData.status}</Text>
                            <View style={styles.buttonContainer}><Button title="Voir les détails" color="#4CAF50" onPress={() => {}} /></View>
                        </View>
                    ))
                ) : (
                    <Text>Aucune annonce disponible</Text>
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
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333333',
    },
    annoncesList: {
        marginTop: 20,
    },
    annonceCard: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    description: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#555555',
    },
    label: {
        fontWeight: 'bold',
        color: '#333333',
    },
    buttonContainer: {
        marginTop: 10,
        borderRadius: 10,
        overflow: 'hidden',
      },
    button: {
        backgroundColor: '#4CAF50',
        color: '#ffffff',
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
        marginTop: 10,
    },
});

