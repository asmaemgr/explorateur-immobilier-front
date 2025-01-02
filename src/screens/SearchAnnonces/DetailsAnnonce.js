import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailsAnnonce = ({ route }) => {
    const { annonce } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{annonce.title}</Text>
            <Text style={styles.description}>{annonce.description}</Text>
            <Text style={styles.price}>Price: {annonce.price}</Text>
            <Text style={styles.location}>Location: {annonce.location}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    location: {
        fontSize: 16,
        color: 'gray',
    },
});

export default DetailsAnnonce;