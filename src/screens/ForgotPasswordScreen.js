import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="gray" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Image
        source={require('../../assets/ForgotPassword.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Password Assistance</Text>
      <Text style={styles.subtitle}>
        Enter the email address associated with your account
      </Text>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={24} color="gray" style={styles.icon} />
          <TextInput
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            style={styles.inputField}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="CONTINUE"
          color="#4CAF50"
          onPress={() => {
            // Add continue logic here
          }}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.goBack}>
        <Text style={styles.goBackText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    marginLeft: 10,
    color: 'gray',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
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
  buttonContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  goBack: {
    alignSelf: 'center',
  },
  goBackText: {
    color: '#4CAF50',
  },
});
